import { configureStore } from '@reduxjs/toolkit';

import MenuReducer from './slices/menu-slice';
import ToolboxReducer from './slices/toolbox-slice';
import SocketReducer from './slices/socket-slice';

export const store = configureStore({
	reducer: {
		menu: MenuReducer,
		toolbox: ToolboxReducer,
		socket: SocketReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
