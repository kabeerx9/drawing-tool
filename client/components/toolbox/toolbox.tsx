'use client';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { changeBrushSize, changeColor } from '@/app/store/slices/toolbox-slice';
import { COLORS, MENU_ITEMS } from '@/app/utils/constants';
import { Box } from 'lucide-react';

const Toolbox = () => {
	const dispatch = useAppDispatch();

	const activeMenuItem = useAppSelector((state) => state.menu.activeMenuItem);
	const { color: activeColor, size } = useAppSelector(
		(state) => state.toolbox[activeMenuItem]
	);
	const showStrokeToolOptions = activeMenuItem === MENU_ITEMS.PENCIL;

	const showBrushToolOption =
		activeMenuItem === MENU_ITEMS.PENCIL ||
		activeMenuItem === MENU_ITEMS.ERASER;

	const handleStrokeWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(changeBrushSize({ item: activeMenuItem, size: e.target.value }));
	};

	const handleColorChange = (color: string) => {
		dispatch(changeColor({ item: activeMenuItem, color }));
	};

	return (
		<div className="flex flex-col mt-10 rounded-md z-20 bg-gray-200 p-5 text-black">
			{showStrokeToolOptions && (
				<div className="flex flex-col items-center justify-between">
					<p>Stroke Color</p>
					<div className="flex items-center gap-3 mt-5">
						{Object.values(COLORS).map((color) => (
							<Box
								size={30}
								key={color}
								fill={color}
								className={`${
									color === activeColor ? 'border-2 border-black shadow-lg' : ''
								}`}
								onClick={() => handleColorChange(color)}
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
						value={size}
						onChange={handleStrokeWidthChange}
					/>
				</div>
			)}
			<div></div>
		</div>
	);
};

export default Toolbox;
