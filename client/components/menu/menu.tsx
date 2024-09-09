// 'use client';
// import { useAppDispatch, useAppSelector } from '@/app/hooks';
// import {
// 	setActionMenuItem,
// 	setActiveMenuItem,
// } from '@/app/store/slices/menu-slice';
// import { MENU_ITEMS } from '@/app/utils/constants';
// import { Download, Eraser, Pencil, Redo, Trash, Undo } from 'lucide-react';
// import cx from 'classnames';
// import { useEffect } from 'react';
// import { toast } from 'sonner';

// const Menu = () => {
// 	const dispatch = useAppDispatch();
// 	const activeMenuItem = useAppSelector((state) => state.menu.activeMenuItem);
// 	const handleActionItem = (item: string) => {
// 		dispatch(setActionMenuItem(item));
// 	};

// 	useEffect(() => {
// 		toast.success('Welcome to the canvas');
// 	}, []);

// 	return (
// 		<div className="z-20 flex px-4 bg-gray-200 text-black  w-full md:w-1/2 h-12 items-center justify-between">
// 			<div
// 				className={cx('p-1 rounded-md cursor-pointer hover:opacity-50', {
// 					'bg-purple-400': activeMenuItem === MENU_ITEMS.PENCIL,
// 				})}>
// 				<Pencil
// 					onClick={() => dispatch(setActiveMenuItem(MENU_ITEMS.PENCIL))}
// 				/>
// 			</div>
// 			<div
// 				className={cx('p-1 rounded-md cursor-pointer hover:opacity-50', {
// 					'bg-purple-400': activeMenuItem === MENU_ITEMS.ERASER,
// 				})}>
// 				<Eraser
// 					onClick={() => dispatch(setActiveMenuItem(MENU_ITEMS.ERASER))}
// 				/>
// 			</div>
// 			<Undo
// 				className="cursor-pointer hover:opacity-50"
// 				onClick={() => handleActionItem(MENU_ITEMS.UNDO)}
// 			/>
// 			<Redo
// 				className="cursor-pointer hover:opacity-50"
// 				onClick={() => handleActionItem(MENU_ITEMS.REDO)}
// 			/>
// 			<Download
// 				className="cursor-pointer hover:opacity-50"
// 				onClick={() => handleActionItem(MENU_ITEMS.DOWNLOAD)}
// 			/>
// 			<Trash
// 				className="cursor-pointer hover:opacity-50"
// 				onClick={() => handleActionItem(MENU_ITEMS.DELETE)}
// 			/>
// 		</div>
// 	);
// };

// export default Menu;

import React from 'react';

const Menu = () => {
	return <div>Menu</div>;
};

export default Menu;
