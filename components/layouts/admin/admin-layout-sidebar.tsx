'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

import { cn, getPathToArray } from '@/lib/utils';

import { useSidebar } from '@/hooks/use-sidebar';
import { useStore } from '@/hooks/use-store';

import { MenuItem } from '@/types';

import { GetSubMenuItems } from '@/app/api/MenuItems';

import { RiArrowDownSLine, RiFileLine } from '@remixicon/react';

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
	const { isOpen, getOpenState, setIsHover, settings, setIsOpen } = sidebar;

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
				setIsOpen(false);
				return true;
			}
		};

		return (
			<li key={'li_'.concat(item_key)} color="primary" className={cn('')}>
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
						//expandedMenus.includes(item.href) ? '' : '',
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
							<div className="">
								<RiArrowDownSLine
									key={'li_div_expend_down_'.concat(item_key)}
									className={cn('size-5 transition-all ', expandedMenus.includes(item.href) ? 'rotate-180' : '')}
								/>
							</div>
						)}
					</Link>
				</Button>
				{item.children && (
					<ul
						aria-hidden={!expandedMenus.includes(item.href)}
						data-hidden={!expandedMenus.includes(item.href)}
						data-state={expandedMenus.includes(item.href) ? 'open' : 'closed'}
						className={cn(
							'flex flex-col grow',
							'mt-0.5 ml-5 border-l-[3px] border-dotted',
							//'transition-all duration-500 ',
							//expandedMenus.includes(item.href) ? 'min-h-fit h-20' : 'h-0 truncate'
							//'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
							//expandedMenus.includes(item.href) ? 'animate-accordion-down h-96' : 'h-0 animate-accordion-up',
							expandedMenus.includes(item.href) ? 'slide-down' : 'slide-up truncate',
							//expandedMenus.includes(item.href) ? 'h-fit top-0 translate-y-[height]' : '-translate-y-full truncate',
							''
						)}
					>
						{SidebarMenuNodes(item.children)}
					</ul>
				)}
			</li>
		);
	};
	// Menu items loop
	const SidebarMenuNodes = (sub_menu_items: MenuItem[]): React.ReactNode[] => {
		return sub_menu_items.map((item, idx) => SidebarMenuNode(item, idx));
	};

	return (
		<>
			<aside
				className={cn(
					'backdrop-blur-xl',
					'bg-background/10',
					'border-divider',
					'border-slate-100 dark:border-slate-50/5',
					'border-r',
					'duration-300',
					'ease-in-out',
					'fixed',
					'flex',
					'left-0',
					'h-[calc(100vh-var(--fixed-height))]',
					'overflow-y-auto',
					'p-0',
					'text-default-600',
					'top-14',
					'-translate-x-full',
					'translate-x-0',
					'z-10',
					getOpenState() ? 'w-60' : 'w-0',
					settings.disabled && 'hidden',
					'min-h-fixedLayoutMain'
				)}
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
