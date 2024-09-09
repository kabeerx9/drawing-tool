'use client';

import Board from '@/components/board/board';
import Menu from '@/components/menu/menu';
import Toolbox from '@/components/toolbox/toolbox';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { socket } from './socket';

export interface IUser {
	id: string;
	name: string;
	color: string;
}

const Page = () => {
	const [connectedUsers, setConnectedUsers] = useState<IUser[]>([]);
	console.log('connectedUsers', connectedUsers);

	useEffect(() => {
		socket.on('user-list', (users) => {
			console.log('User - list event got triggered with users as', users);
			setConnectedUsers(users);
		});

		socket.on('user-joined', (user) => {
			toast.success(`${user.name} joined the room`);
		});

		socket.on('user-left', (user) => {
			toast.error(`${user.name} left the room`);
		});

		socket.on('connect', () => {
			console.log('Connected to the server');
		});

		return () => {
			console.log('Disconnecting from the server');
			socket.off('user-list');
			socket.off('user-joined');
			socket.off('user-left');
			socket.off('connect');
			socket.emit('disconnect');
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
