'use client';

import * as React from 'react';

import { signIn, signOut, useSession } from 'next-auth/react';

import { RiLoginCircleLine, RiLogoutCircleRLine } from '@remixicon/react';

import { Button, Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/shadcn-ui';

import { cn } from '@/lib/utils';

export function SignInOutButton2({ isOpen }: { isOpen: boolean }) {
	const { data: session } = useSession();

	return (
		<TooltipProvider disableHoverableContent>
			<Tooltip delayDuration={100}>
				<TooltipTrigger asChild>
					<Button
						className={cn(isOpen ? 'w-full' : 'p-0 w-4 h-4', 'justify-center')}
						size="icon"
						variant={isOpen ? 'outline' : 'ghost'}
						title={session?.user ? 'Sign-out' : 'Sign-in'}
						onClick={() => (session?.user ? signOut() : signIn())}
					>
						{session?.user ? <RiLogoutCircleRLine /> : <RiLoginCircleLine />}
						{isOpen ? <span>{session?.user ? 'Sign-out' : 'Sign-in'}</span> : ''}
					</Button>
				</TooltipTrigger>
				<TooltipContent side="bottom">{session?.user ? 'Sign-out' : 'Sign-in'}</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
