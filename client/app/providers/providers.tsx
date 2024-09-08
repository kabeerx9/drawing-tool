'use client';
import { Provider } from 'react-redux';

import { store } from '../store/store';
import { Toaster } from 'sonner';

export const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<Provider store={store}>
			{' '}
			<Toaster richColors position="bottom-right" /> {children}
		</Provider>
	);
};
