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
});

app.get('/', (req, res) => {
	res.send('Server is running');
});

httpServer.listen(5000, () => {
	console.log('SERVER IS RUNNING');
});
