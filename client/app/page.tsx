import Board from '@/components/board/board';
import Menu from '@/components/menu/menu';
import Toolbox from '@/components/toolbox/toolbox';
import React from 'react';

const Page = () => {
	return (
		<div className="w-full h-full flex flex-col items-center">
			<Menu />
			<div className="flex items-start w-full">
				<Toolbox />
			</div>
			<Board />
		</div>
	);
};

export default Page;
