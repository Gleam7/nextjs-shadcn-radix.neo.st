'use client';

import React from 'react';

//import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { title } from '@/public/styles/title';

//import { Breadcrumb, BreadcrumbProps } from 'antd';
//import { GetBreadcrumbItems } from '@/app/api/MenuItems';

type PageHeaderProps = {
	children: React.ReactNode;
	style?: React.CSSProperties;
	//useDefaultBreadcrumbItems?: boolean;
	//breadcrumbProps?: BreadcrumbProps;
} & React.HTMLProps<HTMLDivElement>;

export function PageHeader({
	children,
	style,
	//useDefaultBreadcrumbItems,
	...others
}: PageHeaderProps) {
	//const current_path = usePathname();
	const title_css_class: string[] = ['text-3xl'];

	others.className = `page_header ${others.className || ''}`;

	//useDefaultBreadcrumbItems = useDefaultBreadcrumbItems || !(breadcrumbProps && (breadcrumbProps.items?.length || -1) > 0);
	//
	//if (breadcrumbProps) {
	//	title_style = {
	//		marginTop: '.5em',
	//	};
	//
	//	if (useDefaultBreadcrumbItems) {
	//		breadcrumbProps.items = GetBreadcrumbItems(current_path);
	//	}
	//} else {
	//	if (useDefaultBreadcrumbItems) {
	//		breadcrumbProps = {
	//			items: GetBreadcrumbItems(current_path),
	//		};
	//	}
	//}

	//theme
	return (
		<div className="page_title shadow-md mt-1 mb-4 p-3 w-full dark:shadow-dark" style={style}>
			<h3 className={cn(title(), title_css_class)}>{children}</h3>
		</div>
	);
}
