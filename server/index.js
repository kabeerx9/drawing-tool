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

const RANDOM_NAMES = [
	'Alice',
	'Bob',
	'Charlie',
	'David',
	'Eve',
	'Frank',
	'Grace',
	'Hank',
	'Ivy',
	'Jack',
];

let connectedUsers = [];

const handleAddUser = (socket) => {
	const userData = {
		id: socket.id,
		name: RANDOM_NAMES[connectedUsers.length],
		color: '#' + Math.floor(Math.random() * 16777215).toString(16),
	};

	connectedUsers.push(userData);

	console.log('Connected users: ', connectedUsers);

	// Whenever a new user is added we also need to emit a message to all connected users

	// sending it to the new user
	socket.emit('user-list', connectedUsers);

	// sending it to all other users
	socket.broadcast.emit('user-list', connectedUsers);

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
		// console.log('Cursor move fired with data ', data);
		socket.broadcast.emit('cursor-move', data);
	});

	socket.on('drawLine', (data) => {
		socket.broadcast.emit('drawLine', data);
	});

	socket.on('changeConfig', (data) => {
		// console.log('Change config fired with data ', data);
		socket.broadcast.emit('changeConfig', data);
	});

	socket.on('undo', () => {
		console.log('I received a message from the client with undo');
		socket.broadcast.emit('undo');
	});

	socket.on('disconnect', () => {
		io.emit(
			'user-left',
			connectedUsers.find((user) => user.id === socket.id)
		);
		connectedUsers = connectedUsers.filter((user) => user.id !== socket.id);
		io.emit('user-list', connectedUsers);
		console.log('Connected users now are ', connectedUsers);
	});
});

app.get('/', (req, res) => {
	res.send('Server is running');
});

httpServer.listen(5925, () => {
	console.log('SERVER IS RUNNING');
});
