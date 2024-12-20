'use client';

import * as React from 'react';

import { SessionProvider } from 'next-auth/react';

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';
import { SpeedInsights } from '@vercel/speed-insights/next';

//import { useStore } from '@/hooks/use-store';
import { useSidebar } from '@/hooks/use-sidebar';

export function Provider({ children, ...props }: ThemeProviderProps) {
	//const sidebar = useStore(useSidebar, (x) => x);
	//if (!sidebar) return null;
	//const { setIsOpen } = sidebar;
	const { setIsOpen } = useSidebar();

	// I write this into a function for better visibility
	const handleResize = (e: { matches: boolean }) => {
		setIsOpen(e.matches);
	};

	React.useEffect(() => {
		const mediaQuery = window.matchMedia('(min-width: 1024px)');
		mediaQuery.addEventListener('change', handleResize);
		setIsOpen(mediaQuery.matches);
		// Clean up the event listener when the component unmounts
		return () => {
			mediaQuery.removeEventListener('change', handleResize);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<SessionProvider basePath="/api/auth">
			<NextThemesProvider {...props}>{children}</NextThemesProvider>
			{process.env.VERCEL_URL && <SpeedInsights></SpeedInsights>}
		</SessionProvider>
	);
}
