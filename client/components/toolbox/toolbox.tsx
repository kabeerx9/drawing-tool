'use client';

import { useAppSelector } from '@/app/hooks';
import { COLORS, MENU_ITEMS } from '@/app/utils/constants';
import { Box } from 'lucide-react';
import React, { useState } from 'react';

const Toolbox = () => {
	const activeMenuItem = useAppSelector((state) => state.menu.activeMenuItem);

	const showStrokeToolOptions = activeMenuItem === MENU_ITEMS.PENCIL;

	const showBrushToolOption =
		activeMenuItem === MENU_ITEMS.PENCIL ||
		activeMenuItem === MENU_ITEMS.ERASER;

	return (
		<div className="flex flex-col mt-10 rounded-md z-20 bg-gray-200 p-5 text-black">
			{showStrokeToolOptions && (
				<div className="flex flex-col items-center justify-between">
					<p>Stroke Color</p>
					<div className="flex items-center justify-between mt-5">
						{Object.values(COLORS).map((color) => (
							<Box
								key={color}
								fill={color}
								className={`${
									activeMenuItem === MENU_ITEMS.PENCIL
										? 'border-2 border-black'
										: ''
								}`}
							/>
						))}
					</div>
				</div>
			)}
			{showBrushToolOption && (
				<div className="flex flex-col items-center justify-between mt-5">
					<p>
						{activeMenuItem === MENU_ITEMS.PENCIL
							? 'Brush Size'
							: 'Eraser Size'}
					</p>
					<input
						type="range"
						min={1}
						max={10}
						step={1}
						// value={strokeWidth}
						// onChange={handleStrokeWidthChange}
					/>
				</div>
			)}
			<div></div>
		</div>
	);
};

export default Toolbox;
