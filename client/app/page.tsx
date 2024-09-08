'use client';

import Board from '@/components/board/board';
import Menu from '@/components/menu/menu';
import Toolbox from '@/components/toolbox/toolbox';

import { useEffect, useState } from 'react';
import { socket } from './socket';

export interface IUser {
	id: string;
	name: string;
	color: string;
}

const Page = () => {
	const [connectedUsers, setConnectedUsers] = useState<IUser[]>([]);

	useEffect(() => {
		socket.on('user-list', (users) => {
			setConnectedUsers(users);
		});

		socket.on('user-joined', (user) => {
			setConnectedUsers((prev) => [...prev, user]);
		});

		socket.on('user-left', (user) => {
			setConnectedUsers((prev) => prev.filter((u) => u.id !== user.id));
		});

		socket.on('connect', () => {
			console.log('Connected to the server');
		});

		return () => {
			socket.off('user-list');
			socket.off('user-joined');
			socket.off('user-left');
			socket.off('connect');
		};
	}, []);

	return (
		<div className="w-full h-full flex flex-col items-center">
			<Menu />
			<div className="flex items-start w-full">
				<Toolbox />
			</div>
			<Board connectedUsers={connectedUsers} />
		</div>
	);
};

export default Page;
