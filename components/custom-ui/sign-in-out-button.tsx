'use client';

import * as React from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';

import { RiLoginCircleLine, RiLogoutCircleRLine } from '@remixicon/react';

import { Button, Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/shadcn-ui';

export function SignInOutButton() {
	const { data: session } = useSession();

	return (
		<TooltipProvider disableHoverableContent>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<Button
						className="rounded-full"
						size="icon"
						variant="ghost"
						title={session?.user ? 'Sign-out' : 'Sign-in'}
						onClick={() => (session?.user ? signOut() : signIn())}
					>
						{session?.user ? <RiLogoutCircleRLine /> : <RiLoginCircleLine />}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">{session?.user ? 'Sign-out' : 'Sign-in'}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
