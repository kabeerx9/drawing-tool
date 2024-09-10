const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
const httpServer = createServer(app);
const io = new Server(httpServer, {
	cors: {},
});

const rooms = new Map();
const randomColors = ['red', 'green', 'blue', 'yellow', 'purple', 'orange'];

function getRandomColor() {
	return randomColors[Math.floor(Math.random() * randomColors.length)];
}

io.on('connection', (socket) => {
	console.log('A user connected');

	socket.on('join-room', (data) => {
		const { roomId, name } = data;

		// Leave previous room if any
		if (socket.currentRoom) {
			socket.leave(socket.currentRoom);
			const oldRoom = rooms.get(socket.currentRoom);
			if (oldRoom) {
				oldRoom.users = oldRoom.users.filter((user) => user.id !== socket.id);
				io.to(socket.currentRoom).emit('user-left', socket.id);

				io.to(socket.currentRoom).emit('user-list', oldRoom.users);
			}
		}

		socket.currentRoom = roomId;
		socket.join(roomId);

		if (!rooms.has(roomId)) {
			rooms.set(roomId, { users: [], history: [] });
		}

		const room = rooms.get(roomId);
		const userData = { id: socket.id, name, color: getRandomColor() };
		room.users.push(userData);

		io.to(roomId).emit('user-list', room.users);
		socket.emit('canvas-history', room.history);
		socket.to(roomId).emit('user-joined', userData);

		Array.from(rooms.values()).forEach((room) => {
			console.log('room', room);
			console.log('room.users', room.users);
			console.log('room.history', room.history);
		});
	});

	socket.on('beginPath', (data) => {
		if (!socket.currentRoom) return;
		socket.to(socket.currentRoom).emit('beginPath', data);
	});

	socket.on('drawLine', (data) => {
		if (!socket.currentRoom) return;
		const room = rooms.get(socket.currentRoom);
		room.history.push({ type: 'drawLine', data });
		socket.to(socket.currentRoom).emit('drawLine', data);
	});

	socket.on('changeConfig', (data) => {
		if (!socket.currentRoom) return;
		socket.to(socket.currentRoom).emit('changeConfig', data);
	});

	socket.on('undo', () => {
		if (!socket.currentRoom) return;
		const room = rooms.get(socket.currentRoom);
		if (room.history.length > 0) {
			room.history.pop();
			io.to(socket.currentRoom).emit('undo');
		}
	});

	socket.on('disconnecting', () => {
		if (socket.currentRoom) {
			const room = rooms.get(socket.currentRoom);
			if (room) {
				room.users = room.users.filter((user) => user.id !== socket.id);
				io.to(socket.currentRoom).emit('user-left', socket.id);
				io.to(socket.currentRoom).emit('user-list', room.users);
			}
		}
	});
});

app.get('/', (req, res) => {
	res.send('Server is running');
});

const PORT = process.env.PORT || 5925;
httpServer.listen(PORT, () => {
	console.log(`SERVER IS RUNNING ON PORT ${PORT}`);
});
