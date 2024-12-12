'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/use-store';
import { useSidebar } from '@/hooks/use-sidebar';

import { AdminLayoutSidebar } from './admin-layout-sidebar';

export const AdminLayoutMain = ({ children }: { children: React.ReactNode }) => {
	const sidebar = useStore(useSidebar, (x) => x);

	if (!sidebar) return null;
	const { getOpenState } = sidebar;
	//const useStretch = true;

	const class_names_for_main = ['flex', 'fixed top-14 w-full overflow-y-auto', 'h-[calc(100vh-var(--fixed-height))]', 'text-pretty'];
	const class_names_for_main_section = cn('m-1 w-full');
	const class_names_for_main_section_article = cn('mx-1');
	return (
		<main className={cn(class_names_for_main, getOpenState() ? 'pl-10 lg:pl-60' : 'pl-10')}>
			<section className={class_names_for_main_section}>
				<article className={class_names_for_main_section_article}>{children}</article>
			</section>
			<AdminLayoutSidebar />
		</main>
	);
};
