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

io.on('connection', (socket) => {
	console.log('A user connected');

	socket.on('beginPath', (data) => {
		socket.broadcast.emit('beginPath', data);
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
});

app.get('/', (req, res) => {
	res.send('Server is running');
});

httpServer.listen(5000, () => {
	console.log('SERVER IS RUNNING');
});
