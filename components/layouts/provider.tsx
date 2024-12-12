'use client';

import * as React from 'react';

import { SessionProvider } from 'next-auth/react';

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from 'next-themes';

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
	}, []);

	return (
		<SessionProvider>
			<NextThemesProvider {...props}>{children}</NextThemesProvider>
		</SessionProvider>
	);
}

/*
'use client';

import * as React from 'react';

import { useRouter } from 'next/navigation';

import { SessionProvider } from 'next-auth/react';

import { NextUIProvider } from '@nextui-org/system';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProviderProps } from 'next-themes/dist/types';

import { App, ConfigProvider, MappingAlgorithm, ThemeConfig, theme } from 'antd';
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs';

import { useThemeSettings } from '@/stores/themeConfig';

import type Entity from '@ant-design/cssinjs/es/Cache';

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	const router = useRouter();
	const settings = useThemeSettings();
	const cache = React.useMemo<Entity>(() => createCache(), [settings]);

	const [themeAlgorithm, setThemeAlgorithm] = React.useState<MappingAlgorithm[]>([theme.defaultAlgorithm]);
	const theme_config: ThemeConfig = {
		//cssVar: true,
		hashed: false,
		algorithm: themeAlgorithm,
		token: {
			fontSize: 14,
			fontWeightStrong: 100,
			fontFamily: 'Moneygraphy-Rounded, Jal_Haru, MonoplexKR-Regular, NanumGothic, "Noto Sans", sans-serif, "Apple Color Emoji"',
			//colorBgBase: '#fff',
			//colorTextBase: '#fff',
			//colorPrimary: '#52c41a',
		},
	};

	React.useEffect(() => {
		if (settings.themeMode === 'light' || (settings.themeMode === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			setThemeAlgorithm(settings.themeCompact ? [theme.defaultAlgorithm, theme.compactAlgorithm] : [theme.defaultAlgorithm]);
			document.body.classList.remove('dark');
			document.body.classList.add('light');
		} else {
			setThemeAlgorithm(settings.themeCompact ? [theme.darkAlgorithm, theme.compactAlgorithm] : [theme.darkAlgorithm]);
			document.body.classList.remove('light');
			document.body.classList.add('dark');
		}

		if (settings.themeMode === 'light' || (settings.themeMode === 'system' && !window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			setThemeName('light');
		} else {
			setThemeName('dark');
		}
	}, [sidebar_collapsed, settings]);

	return (
		<SessionProvider>
			<NextUIProvider navigate={router.push}>
				<NextThemesProvider {...themeProps}>
					<ConfigProvider theme={theme_config}>
						<App>
							<StyleProvider>{children}</StyleProvider>
						</App>
					</ConfigProvider>
				</NextThemesProvider>
			</NextUIProvider>
		</SessionProvider>
	);
}

*/
