'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button, ScrollArea, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/shadcn-ui';

import { RiFileLine, RiMoreLine } from '@remixicon/react';

import { CollapseMenuButton, SignInOutButton2 } from '@/components/custom-ui';

import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/use-store';
import { useSidebar } from '@/hooks/use-sidebar';

import { GetSubMenuItemsWithGroup } from '@/app/api/MenuItems';

export function AdminLayoutSidebar() {
	const pathname = usePathname();
	const menuList = GetSubMenuItemsWithGroup(pathname);
	const sidebar = useStore(useSidebar, (x) => x);

	if (!sidebar) return null;
	const { isOpen, getOpenState, setIsHover, settings } = sidebar;

	const class_names_for_main_aside = cn(
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
		'z-10'
	);

	return (
		<>
			<aside
				className={cn(class_names_for_main_aside, 'w-10', getOpenState() ? 'w-60' : '', settings.disabled && 'hidden')}
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
			>
				<section className="w-full flex flex-col items-start space-y-1">
					<ScrollArea className={cn('[&>div>div[style]]:!block w-full py-2', isOpen ? 'pl-2 pr-3' : 'px-2')}>
						<nav className="">
							<ul className="">
								{menuList.map(({ groupLabel, menus }, index) => (
									<li className={cn('', groupLabel ? 'pt-3' : '', '')} key={index}>
										{(isOpen && groupLabel) || isOpen === undefined ? (
											<p className="text-sm text-muted-foreground truncate h-6">{groupLabel}</p>
										) : !isOpen && isOpen !== undefined && groupLabel ? (
											<TooltipProvider>
												<Tooltip delayDuration={100}>
													<TooltipTrigger className="inline-flex items-center gap-0 whitespace-nowrap w-full justify-start h-4">
														<RiMoreLine className="text-muted-foreground" style={{ width: '1.1rem', height: '1.1rem' }} />
													</TooltipTrigger>
													<TooltipContent side="right">
														<p>{groupLabel}</p>
													</TooltipContent>
												</Tooltip>
											</TooltipProvider>
										) : (
											''
										)}
										{menus.map(({ href, label, icon, active, children }, index) =>
											!children || children.length === 0 ? (
												<TooltipProvider disableHoverableContent key={index}>
													<Tooltip delayDuration={100}>
														<TooltipTrigger asChild>
															<Button
																variant={
																	isOpen && ((active === undefined && pathname.startsWith(href)) || active)
																		? 'secondary'
																		: 'ghost'
																}
																className={cn('w-full mb-1 px-0', isOpen ? 'justify-start' : 'justify-start', 'gap-0')}
																asChild
															>
																<Link href={href}>
																	<span className="mr-2">
																		{icon || (
																			<RiFileLine
																				className={cn(isOpen ? 'text-muted' : 'text-muted-foreground')}
																			/>
																		)}
																	</span>
																	<span
																		className={cn(
																			'truncate',
																			isOpen === false ? '-translate-x-100 opacity-0' : 'translate-x-0 opacity-100'
																		)}
																	>
																		{label}
																	</span>
																</Link>
															</Button>
														</TooltipTrigger>
														{isOpen === false && <TooltipContent side="right">{label}</TooltipContent>}
													</Tooltip>
												</TooltipProvider>
											) : (
												<CollapseMenuButton
													key={index}
													icon={icon}
													label={label}
													active={active === undefined ? pathname.startsWith(href) : active}
													submenus={children}
													isOpen={isOpen}
												/>
											)
										)}
									</li>
								))}
							</ul>
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
