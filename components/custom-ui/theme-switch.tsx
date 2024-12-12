'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { RiMoonFill, RiSunLine } from '@remixicon/react';

import { Button, Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/shadcn-ui';

export function ThemeSwitch() {
	const { setTheme, theme } = useTheme();

	return (
		<TooltipProvider disableHoverableContent>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<Button className="rounded-full" size="icon" variant="ghost" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
						<RiSunLine className="w-[1.2rem] h-[1.2rem] rotate-90 scale-0 transition-transform ease-in-out duration-500 dark:rotate-0 dark:scale-100" />
						<RiMoonFill className="absolute w-[1.2rem] h-[1.2rem] rotate-0 scale-1000 transition-transform ease-in-out duration-500 dark:-rotate-90 dark:scale-0" />
						<span className="sr-only">Switch Theme</span>
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">Switch Theme to {theme === 'dark' ? 'light' : 'dark'}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
