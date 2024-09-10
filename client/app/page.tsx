'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { socket } from './socket';

const HomePage = () => {
	const [roomId, setRoomId] = useState('');
	const [username, setUsername] = useState('');
	const router = useRouter();

	useEffect(() => {
		const storedUsername = localStorage.getItem('username');
		if (storedUsername) {
			setUsername(storedUsername);
		}
	}, []);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		localStorage.setItem('username', username);
		// join the room now :

		socket.emit('join-room', { roomId, name: username });
		router.push(`/room/${roomId}`);
	};

	return (
		<div className="w-full h-screen flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
			<div className="bg-white p-8 rounded-lg shadow-lg w-96 border border-gray-300">
				<h1 className="text-3xl font-bold mb-6 text-center text-black">
					Join a Room
				</h1>
				<form onSubmit={handleSubmit} className="space-y-6">
					<div>
						<label
							htmlFor="roomId"
							className="block text-sm font-medium text-black mb-1">
							Room ID
						</label>
						<input
							type="text"
							id="roomId"
							value={roomId}
							onChange={(e) => setRoomId(e.target.value)}
							className="mt-1 p-2 border-2 border-black block w-full rounded-md  shadow-sm  text-black"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="username"
							className="block text-sm font-medium text-black mb-1">
							Username
						</label>
						<input
							type="text"
							id="username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							className="mt-1 p-2 border-2 border-black block w-full rounded-md  shadow-sm  text-black"
							required
						/>
					</div>
					<button
						type="submit"
						className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-200">
						Join Room
					</button>
				</form>
			</div>
		</div>
	);
};

export default HomePage;
