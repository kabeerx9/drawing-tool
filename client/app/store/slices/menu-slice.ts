import { createSlice } from '@reduxjs/toolkit';

import { MENU_ITEMS } from '@/app/utils/constants';

const initialState = {
	activeMenuItem: MENU_ITEMS.PENCIL,
	actionMenuItem: null,
};

const menuSlice = createSlice({
	name: 'menu',
	initialState,
	reducers: {
		setActiveMenuItem: (state, action) => {
			state.activeMenuItem = action.payload;
		},
		setActionMenuItem: (state, action) => {
			state.actionMenuItem = action.payload;
		},
	},
});

export const { setActiveMenuItem, setActionMenuItem } = menuSlice.actions;

export default menuSlice.reducer;
