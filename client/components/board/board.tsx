'use client';

import { useAppSelector } from '@/app/hooks';
import React, { useEffect, useRef } from 'react';

const Board = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const activeMenuItem = useAppSelector((state) => state.menu.activeMenuItem);
	const { color, size } = useAppSelector(
		(state) => state.toolbox[activeMenuItem]
	);

	useEffect(() => {
		if (!canvasRef.current) return;
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		if (!context) return;

		// when mounting make sure to set the canvas to full screen
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	}, []);

	console.log(color, size);

	return (
		<canvas
			ref={canvasRef}
			className="absolute top-0 left-0 w-full h-full bg-white"
		/>
	);
};

export default Board;
