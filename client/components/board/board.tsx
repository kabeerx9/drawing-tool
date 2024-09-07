'use client';

import { useAppSelector } from '@/app/hooks';
import React, { useEffect, useLayoutEffect, useRef } from 'react';

const Board = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const isDrawing = useRef(false);
	const activeMenuItem = useAppSelector((state) => state.menu.activeMenuItem);
	const { color, size } = useAppSelector(
		(state) => state.toolbox[activeMenuItem]
	);

	useEffect(() => {
		if (!canvasRef.current) return;
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		if (!context) return;

		const changeConfig = () => {
			context.strokeStyle = color || 'black';
			context.lineWidth = size || 3;
		};

		changeConfig();
	}, [color, size]);

	// Component mount we need to add this stuff , this is the main logic for drawing stuff.
	// useLayoutEffect is because we want canvas to be rendered first before we add the above useEffect canvas stroke and other stuff.
	useLayoutEffect(() => {
		if (!canvasRef.current) return;
		const canvas = canvasRef.current;
		const context = canvas.getContext('2d');
		if (!context) return;

		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		const beginPath = (x: number, y: number) => {
			context.beginPath();
			context.moveTo(x, y);
		};

		const drawLine = (x: number, y: number) => {
			context.lineTo(x, y);
			context.stroke();
		};

		const handleMouseDown = (e: MouseEvent) => {
			isDrawing.current = true;
			beginPath(e.clientX, e.clientY);
		};

		const handleMouseMove = (e: MouseEvent) => {
			if (!isDrawing.current) return;
			drawLine(e.clientX, e.clientY);
		};

		const handleMouseUp = () => {
			isDrawing.current = false;
			context.closePath();
		};

		canvas.addEventListener('mousedown', handleMouseDown);
		canvas.addEventListener('mousemove', handleMouseMove);
		canvas.addEventListener('mouseup', handleMouseUp);

		return () => {
			canvas.removeEventListener('mousedown', handleMouseDown);
			canvas.removeEventListener('mousemove', handleMouseMove);
			canvas.removeEventListener('mouseup', handleMouseUp);
		};
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
