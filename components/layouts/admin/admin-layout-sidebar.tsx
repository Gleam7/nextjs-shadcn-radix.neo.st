'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { cn, getPathToArray } from '@/lib/utils';

import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';

import { MenuItem } from '@/types';

import { GetSubMenuItems } from '@/app/api/MenuItems';

import { RiArrowDownSLine, RiArrowUpSLine, RiFileLine } from '@remixicon/react';

import { Button, ScrollArea } from '@/components/shadcn-ui';

import { SignInOutButton2 } from '@/components/custom-ui';
import Link from 'next/link';

export function AdminLayoutSidebar() {
	const current_path = usePathname();
	const SidebarMenuItems = GetSubMenuItems(current_path);
	const sidebar = useStore(useSidebar, (x) => x);

	const [activeLink, setActiveLink] = React.useState(current_path);
	const [expandedMenus, setExpandedMenus] = React.useState<string[]>(getPathToArray(current_path));

	if (!sidebar) return null;
	const { isOpen, getOpenState, setIsHover, settings } = sidebar;

	const class_names_for_main_aside = [
		'backdrop-blur-xl',
		'bg-background/10',
		'border-divider',
		'border-slate-100 dark:border-slate-50/5',
		'border-r',
		'duration-300',
		'ease-in-out',
		'fixed',
		'flex',
		//'flex-col',
		'left-0',
		'h-[calc(100vh-var(--fixed-height))]',
		'overflow-y-auto',
		'p-0',
		'text-default-600',
		'top-14',
		'transition-[width]',
		'-translate-x-full',
		//'lg:translate-x-0',
		'translate-x-0',
		'z-10',
	];

	const SidebarMenuNode = (item: MenuItem, idx: number): React.ReactNode => {
		//const item_key = item.href.split('/').join('_');
		const item_key = idx.toString().concat('_').concat(item.href.split('/').join('_'));

		const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
			const id = item.href;
			if (item.children) {
				// Toggle Submenu
				setExpandedMenus((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
				e.preventDefault();
				return false;
			} else {
				setActiveLink(id);
				return true;
			}
		};

		return (
			<li key={'li_'.concat(item_key)} color="primary" className={cn('', expandedMenus.includes(item.href) ? '' : '', '')}>
				<Button
					variant={isOpen && activeLink === item.href ? 'secondary' : 'ghost'}
					className={cn(
						'w-full',
						'px-3',
						'flex',
						'flex-row',
						'[&_svg]:size-5',
						'justify-between',
						'gap-0',
						'hover:text-foreground',
						expandedMenus.includes(item.href) ? '' : '',
						activeLink === item.href ? 'text-primary' : ''
					)}
					asChild
				>
					<Link href={item.href} title={item.label?.toString()} onClick={handleClick}>
						<div className="flex">
							<span className="mr-2">{item.icon ? item.icon : <RiFileLine className="text-muted" />}</span>
							{item.label /*text-muted-foreground  <RiCircleFill className="text-transparent" />*/}
						</div>

						{item.children && (
							<div className="transform transition-transform duration-200">
								{expandedMenus.includes(item.href) ? (
									<RiArrowUpSLine key={'li_div_expend_up_'.concat(item_key)} className="size-5" />
								) : (
									<RiArrowDownSLine key={'li_div_expend_down_'.concat(item_key)} className="size-5" />
								)}
							</div>
						)}
					</Link>
				</Button>
				{item.children && expandedMenus.includes(item.href) && (
					<ul className="mt-0.5 ml-5 border-l-[3px] border-dotted">{SidebarMenuNodes(item.children)}</ul>
				)}
			</li>
		);
	};
	// Menu items loop
	const SidebarMenuNodes = (sub_nenu_items: MenuItem[]): React.ReactNode[] => {
		return sub_nenu_items.map((item, idx) => SidebarMenuNode(item, idx));
	};

	return (
		<>
			<aside
				className={cn(class_names_for_main_aside, !getOpenState() ? 'hidden' : 'w-60', settings.disabled && 'hidden', 'min-h-fixedLayoutMain')}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				<section className="w-full flex flex-col items-start space-y-1">
					<ScrollArea className={cn('[&>div>div[style]]:!block w-full py-2', isOpen ? 'pl-2 pr-3' : 'px-2')}>
						<nav className="">
							<ul className="">{SidebarMenuNodes(SidebarMenuItems)}</ul>
						</nav>
					</ScrollArea>
					<figure className="w-full grow flex justify-center items-end pt-0 pb-3">
						<figcaption className={cn('w-full', 'px-2.5')}>
							<SignInOutButton2 isOpen={isOpen} />
						</figcaption>
					</figure>
				</section>
				{/* <SidebarToggle isOpen={isOpen} setIsOpen={toggleOpen} /> */}
			</aside>
		</>
	);
}
