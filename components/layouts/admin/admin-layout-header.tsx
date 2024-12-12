'use client';

import React from 'react';

import Link from 'next/link';

import { usePathname, useRouter } from 'next/navigation';

import { RiNextjsFill } from '@remixicon/react';

import { cn } from '@/lib/utils';

import { GetHeaderMenuItems, GetMenuItems } from '@/app/api/MenuItems';

import { FullscreenSwitch, SignInOutButton, ThemeSwitch } from '@/components/custom-ui';

import { MenuItem } from '@/types';

interface HeaderProps {
	//	menuItemsForHeader: MenuItems[];
	//	menuItemsForMenu: MenuItems[];
	useBg?: boolean;
}
export const AdminLayoutHeader = (params: HeaderProps) => {
	const pathname = usePathname();
	const router = useRouter();

	const [menuItem, setMenuItem] = React.useState<MenuItem[]>([]);
	const [menuItem2, setMenuItem2] = React.useState<MenuItem[]>([]);

	const class_names_for_header = cn(
		'flex',
		'items-center',
		'justify-between',
		'backdrop-blur-xl',
		'bg-background/10',
		'fixed top-0 w-full h-14',
		'border-divider',
		'border-slate-100 dark:border-slate-50/5',
		'border-b',
		params.useBg ? 'bg-red-300/30' : ''
	);
	const class_names_for_header_hgroup = cn('flex', 'items-baseline justify-start px-4 gap-2', params.useBg ? 'bg-sky-300/30' : '');
	const class_names_for_header_nav = cn('flex', 'justify-end h-full px-4', params.useBg ? 'bg-green-300/30' : '');
	const class_names_for_header_nav_ul = cn('flex', 'items-center justify-center', 'hidden md:flex', 'gap-4', params.useBg ? 'bg-yellow-300/30' : '');

	React.useEffect(() => {
		GetHeaderMenuItems().then((data) => setMenuItem(data));
		GetMenuItems().then((data) => setMenuItem2(data));
	}, []);

	return (
		<header className={class_names_for_header}>
			<hgroup className={class_names_for_header_hgroup}>
				<h1 className="flex gap-2 font-bold items-center text-inherit text-5xl">
					<RiNextjsFill size={48} />
					<p className="">Title</p>
				</h1>
				{/* <h2 className="text-xs">Subheader</h2> */}
			</hgroup>
			<nav className={class_names_for_header_nav}>
				<ul className={class_names_for_header_nav_ul}>
					{menuItem.map((item, idx) => {
						const isActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);
						return (
							<li
								key={item.href.split('/').join('_').concat('_').concat(idx.toString())}
								className={cn('flex', 'items-center', 'gap-1', 'h-full')}
								onClick={() => {
									router.push(item.href);
									//params.onClick?.call(HTMLElement, e);
								}}
							>
								<Link
									href={item.href}
									title={item.label?.toString()}
									className={cn(
										'flex',
										'gap-1',
										'items-center',
										'h-full',
										'hover:text-primary',
										'hover:shadow-bottom_line',
										'[&_svg]:size-5',
										'text-nowrap',
										isActive ? 'active' : ''
									)}
								>
									{item.icon && <span>{item.icon}</span>}
									<span>{item.label}</span>
								</Link>
							</li>
						);
					})}
				</ul>
				<div className={cn('flex items-center justify-center gap-2', '[&_svg]:size-5', 'ml-2')}>
					<ThemeSwitch />
					<FullscreenSwitch />
					<SignInOutButton />
				</div>
			</nav>

			{menuItem2.map((item, idx) => {
				const isActive = item.href === '/' ? pathname === item.href : pathname.startsWith(item.href);
				console.log(idx, item, isActive);
				return '';
			})}
		</header>
	);
};
