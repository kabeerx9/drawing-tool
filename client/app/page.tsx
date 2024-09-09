'use client';

import Board from '@/components/board/board';
import Menu from '@/components/menu/menu';
import Toolbox from '@/components/toolbox/toolbox';

import { useEffect, useState } from 'react';
import { socket } from './socket';
import { useAppDispatch, useAppSelector } from './hooks';
import { toast } from 'sonner';

export interface IUser {
	id: string;
	name: string;
	color: string;
}

const Page = () => {
	useAppDispatch();
	useAppSelector((state) => state);
	const [connectedUsers, setConnectedUsers] = useState<IUser[]>([]);
	console.log('connectedUsers', connectedUsers);

	useEffect(() => {
		socket.on('user-list', (users) => {
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
			{/* <Board connectedUsers={connectedUsers} /> */}
			<Board />
		</div>
	);
};

export default Page;
