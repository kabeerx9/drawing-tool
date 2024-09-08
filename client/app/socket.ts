import { io } from 'socket.io-client';

const SOCKET_URL =
	process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5001';

export const socket = io(SOCKET_URL);

console.log('Connecting to socket server at:', SOCKET_URL);
