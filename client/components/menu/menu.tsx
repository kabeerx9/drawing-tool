'use client';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import {
	setActionMenuItem,
	setActiveMenuItem,
} from '@/app/store/slices/menu-slice';
import { MENU_ITEMS } from '@/app/utils/constants';
import { Download, Eraser, Pencil, Redo, Undo } from 'lucide-react';
import cx from 'classnames';

const Menu = () => {
	const dispatch = useAppDispatch();
	const activeMenuItem = useAppSelector((state) => state.menu.activeMenuItem);

	const showStrokeToolOptions = activeMenuItem === MENU_ITEMS.PENCIL;

	const showBrushToolOption =
		activeMenuItem === MENU_ITEMS.PENCIL ||
		activeMenuItem === MENU_ITEMS.ERASER;

	return (
		<div className="z-20 flex px-4 bg-gray-200 text-black  w-full md:w-1/2 h-12 items-center justify-between">
			<div
				className={cx('p-1 rounded-md cursor-pointer hover:opacity-50', {
					'bg-purple-400': activeMenuItem === MENU_ITEMS.PENCIL,
				})}>
				<Pencil
					onClick={() => dispatch(setActiveMenuItem(MENU_ITEMS.PENCIL))}
				/>
			</div>
			<div
				className={cx('p-1 rounded-md cursor-pointer hover:opacity-50', {
					'bg-purple-400': activeMenuItem === MENU_ITEMS.ERASER,
				})}>
				<Eraser
					onClick={() => dispatch(setActiveMenuItem(MENU_ITEMS.ERASER))}
				/>
			</div>
			<Undo
				className="cursor-pointer hover:opacity-50"
				onClick={() => dispatch(setActionMenuItem(MENU_ITEMS.UNDO))}
			/>
			<Redo
				className="cursor-pointer hover:opacity-50"
				onClick={() => dispatch(setActionMenuItem(MENU_ITEMS.REDO))}
			/>
			<Download
				className="cursor-pointer hover:opacity-50"
				onClick={() => dispatch(setActionMenuItem(MENU_ITEMS.DOWNLOAD))}
			/>
		</div>
	);
};

export default Menu;
