import React from 'react';

import Link from 'next/link';

import { cn } from '@/lib/utils';

import { SidebarToggleButton } from '@/components/custom-ui';

export const AdminLayoutFooter = () => {
	const class_names_for_footer = cn(
		'backdrop-blur-xl',
		'bg-background/10',
		'border-divider',
		'border-slate-100 dark:border-slate-50/5',
		'border-t',
		'bottom-0',
		'fixed',
		'flex',
		'flex-row',
		'gap-0',
		'items-center',
		'justify-between',
		'px-2',
		'py-1',
		'text-default-600',
		'w-full',
		'z-30',
		'text-sm'
	);
	const class_names_for_footer_link = cn('text-primary', 'hover:underline');

	return (
		<footer className={cn(class_names_for_footer)}>
			<div className="flex [&_svg]:size-5">
				<SidebarToggleButton />
			</div>
			<div className="flex">
				<div className="flex">
					<Link href="https://neostory.net/" title="Neostory Networks Inc." target="_blank" className={cn(class_names_for_footer_link)}>
						Neostory Networks Inc.
					</Link>
					{` ©${new Date().getFullYear()}`}
				</div>
				<div className="hidden sm:flex gap-1">
					{`, Powered by `}
					<Link href="https://nextjs.org/" title="Next.js homepage" target="_blank" className={cn(class_names_for_footer_link)}>
						Nextjs
					</Link>
					{' & '}
					<Link href="https://www.radix-ui.com" title="Radix UI homepage" target="_blank" className={cn(class_names_for_footer_link)}>
						Radix UI
					</Link>
					{' & '}
					<Link href="https://ui.shadcn.com" title="shadcn/ui homepage" target="_blank" className={cn(class_names_for_footer_link)}>
						shadcn/ui
					</Link>
					<div className="hidden lg:flex">
						{', The source code is available on '}
						<Link
							href="https://github.com/Gleam7/nextjs-shadcn-radix.neo.st"
							title="GitHub source repository"
							target="_blank"
							className={cn(class_names_for_footer_link)}
						>
							GitHub
						</Link>
						{'.'}
					</div>
				</div>
			</div>
		</footer>
	);
};
