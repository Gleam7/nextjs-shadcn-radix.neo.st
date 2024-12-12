'use client';

import React from 'react';

import { RiLayout3Line, RiLayoutTopLine } from '@remixicon/react';

import { useStore } from '@/hooks/use-store';
import { useSidebar } from '@/hooks/use-sidebar';
import { Button, Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/shadcn-ui';

export const SidebarToggleButton = () => {
	const sidebar = useStore(useSidebar, (x) => x);

	if (!sidebar) return null;
	const { getOpenState, toggleOpen } = sidebar;

	//className = 'p-0 min-w-6 w-6 h-6 hidden md:block no-print';
	return (
		<TooltipProvider disableHoverableContent>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<Button
						className="rounded-full"
						size="icon"
						variant="ghost"
						title={getOpenState() ? 'Fold Sidebar' : 'Unfold Sidebar'}
						onClick={toggleOpen}
					>
						{getOpenState() ? <RiLayoutTopLine /> : <RiLayout3Line />}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">{getOpenState() ? 'Fold Sidebar' : 'Unfold Sidebar'}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
};
