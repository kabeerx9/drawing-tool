import React, { useEffect, useState } from 'react';
import { socket } from '@/app/socket';

const RemoteCursor = ({ color, name }: { color: string; name: string }) => {
	const [position, setPosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleCursorMove = (data: {
			x: number;
			y: number;
			userId: string;
		}) => {
			console.log('data.userId is ', data.userId);
			console.log('socket.id is ', socket.id);
			if (data.userId === socket.id) {
				console.log('HELLLLOOO JIIIIII');
				setPosition({ x: data.x, y: data.y });
			}
		};

		socket.on('cursor-move', handleCursorMove);

		return () => {
			socket.off('cursor-move', handleCursorMove);
		};
	}, [name]);

	return (
		<div
			style={{
				position: 'absolute',
				left: position.x,
				top: position.y,
				pointerEvents: 'none',
			}}>
			<svg width="20" height="20">
				<circle cx="10" cy="10" r="5" fill={color} />
			</svg>
			<span
				style={{
					backgroundColor: color,
					padding: '2px 5px',
					borderRadius: '3px',
					color: 'white',
				}}>
				{name}
			</span>
		</div>
	);
};

export default RemoteCursor;
