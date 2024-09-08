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

let connectedUsers = [];

const handleAddUser = (socket) => {
	const userData = {
		id: socket.id,
		name: `User ${connectedUsers.length + 1}`,
		color: '#' + Math.floor(Math.random() * 16777215).toString(16),
	};

	connectedUsers.push(userData);

	console.log('Connected users: ', connectedUsers);

	// Whenever a new user is added we also need to emit a message to all connected users
	socket.emit('user-list', connectedUsers);

	// We also need to emit a message to all connected users that a new user has joined
	socket.broadcast.emit('user-joined', userData);
};

io.on('connection', (socket) => {
	console.log('A user connected');

	// if user is not added already, add them
	if (!connectedUsers.some((user) => user.id === socket.id)) {
		handleAddUser(socket);
	}

	socket.on('beginPath', (data) => {
		socket.broadcast.emit('beginPath', data);
	});

	socket.on('cursor-move', (data) => {
		console.log('Cursor move fired with data ', data);
		socket.broadcast.emit('cursor-move', data);
	});

	socket.on('drawLine', (data) => {
		socket.broadcast.emit('drawLine', data);
	});

	socket.on('changeConfig', (data) => {
		console.log('Change config fired with data ', data);
		socket.broadcast.emit('changeConfig', data);
	});

	socket.on('undo', () => {
		console.log('I received a message from the client with undo');
		socket.broadcast.emit('undo');
	});

	socket.on('disconnect', () => {
		connectedUsers = connectedUsers.filter((user) => user.id !== socket.id);
		io.emit('user-list', connectedUsers);
		io.emit('user-left', { id: socket.id });
	});
});

app.get('/', (req, res) => {
	res.send('Server is running');
});

httpServer.listen(5001, () => {
	console.log('SERVER IS RUNNING');
});
