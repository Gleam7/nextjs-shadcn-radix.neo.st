'use client';

import * as React from 'react';

import { RiFullscreenExitLine, RiFullscreenLine } from '@remixicon/react';

import { Button, Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/shadcn-ui';

export function FullscreenSwitch() {
	const [isFullscreenMode, setFullscreenMode] = React.useState(false);

	const onFullscreenToggleClick = () => {
		setFullscreenMode(!document.fullscreenElement);
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen();
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	};

	return (
		<TooltipProvider disableHoverableContent>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<Button
						className="rounded-full"
						size="icon"
						variant="ghost"
						title={isFullscreenMode ? 'Exit Fullscreen' : 'Show in Fullscreen'}
						onClick={onFullscreenToggleClick}
					>
						{isFullscreenMode ? <RiFullscreenExitLine /> : <RiFullscreenLine />}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">{isFullscreenMode ? 'Exit Fullscreen' : 'Show in Fullscreen'}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
