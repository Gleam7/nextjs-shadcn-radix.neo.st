import React from 'react';

//import { getServerSession } from 'next-auth';
import { getSession } from 'next-auth/react';

import { RiHome3Line, RiAdminLine, RiFlaskLine, RiArticleLine, RiNewsLine, RiCircleFill, RiTableView } from '@remixicon/react';

//import { authOptions } from '@/lib/auth';

import { MenuItem, MenuItemsGroup } from '@/types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { LayoutGrid, SquarePen, Bookmark, Tag, Users, Settings } from 'lucide-react';

/*****************************************************************************/
const findMenuItemWithParents = (menuItems: MenuItem[], targetHref: string): MenuItem[] => {
	for (const item of menuItems) {
		if (item) {
			if (item.href === targetHref) {
				return [item]; // 찾은 항목을 배열로 반환
			}
			if (item.children) {
				const result = findMenuItemWithParents(item.children, targetHref);
				if (result) {
					return [item, ...result]; // 부모 항목 포함해서 반환
				}
			}
		}
	}
	return []; // 해당 href가 없으면 null 반환
};
const setMunuItemIsActive = (menuItems: MenuItem[], currentPath: string): MenuItem[] => {
	return menuItems.map((item: MenuItem) => {
		item.active = item.href === '/' ? currentPath === item.href : currentPath.startsWith(item.href);
		if (item.children) {
			item.children = setMunuItemIsActive(item.children, currentPath);
		}
		return item;
	});
};
const getDummyMenuSubItems = (hrefPrefix: string, labelPrefix: string, currentDepth: number = 1, maxDepth: number = 3): MenuItem[] => {
	const rtn: MenuItem[] = [];
	Array.from({ length: 5 }, (__, idx) => {
		const menuItem = {
			href: `${hrefPrefix}_${idx + 1}`,
			label: `${labelPrefix}.${idx + 1}`,
		} as MenuItem;
		if (idx % 2 == 0 && currentDepth <= maxDepth) {
			menuItem.children = getDummyMenuSubItems(`${hrefPrefix}_${idx + 1}`, `${labelPrefix}.${idx + 1}`, currentDepth + 1, maxDepth);
		}
		rtn.push(menuItem);
	});
	return rtn;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getDummyMenuItems = (maxDepth: number = 3): MenuItem[] => {
	const rtn: MenuItem[] = [];

	Array.from({ length: 5 }, (_, idx) => {
		const dummy_icon = <RiCircleFill className="text-muted-foreground" />;
		const dummy_menu_item = {
			href: `/dummy_${idx + 1}`,
			label: `Dummy Menu ${idx + 1}`,
			icon: dummy_icon,
		} as MenuItem;
		if (idx % 2 == 0) {
			dummy_menu_item.children = getDummyMenuSubItems(`/dummy_sub_${idx + 1}`, `Sub ${idx + 1}`, 1, maxDepth - 1 < 1 ? 1 : maxDepth - 1);
		}
		rtn.push(dummy_menu_item);
	});

	return rtn;
};
const getMenuItemsGroupByPath = (menuItems: MenuItem[], groupLabel: string, targetHref: string): MenuItemsGroup => {
	const fileteredItems = menuItems.filter((item) => {
		return item.href.startsWith(targetHref);
	});

	const rtn: MenuItemsGroup = {
		groupLabel: groupLabel,
		menus: [],
	};
	fileteredItems.forEach((item) => {
		if (item.children) {
			rtn.menus.push(...item.children);
		}
	});
	return rtn;
};
/*****************************************************************************/
export const GetMenuItemSources = (): MenuItem => {
	return {
		href: '/',
		label: 'Home',
		icon: <RiHome3Line />,
		children: [
			{ href: '/about', label: 'About' },
			{ href: '/docs', label: 'Docs', icon: <RiArticleLine />, roles: ['user'] },
			{ href: '/pricing', label: 'Pricing' },
			{
				href: '/blog',
				label: 'Blog',
				icon: <RiNewsLine />,
				children: [
					{
						href: '/blog',
						label: 'All Posts',
					},
					{
						href: '/blog/new-posts',
						label: 'New Post',
					},
					{
						href: '/blog/categories',
						label: 'Categories',
						icon: <Bookmark />,
					},
					{
						href: '/blog/tags',
						label: 'Tags',
						icon: <Tag />,
					},
				],
			},
			{
				href: '/demo/chart',
				label: 'Demo Pages',
				icon: <RiFlaskLine />,
				children: [
					{ href: '/demo/chart', label: 'Chart' },
					{ href: '/demo/circular-progress', label: 'Circular Progress' },
					{ href: '/demo/font', label: 'Font styles' },
					{ href: '/demo/image', label: 'Image' },
					{ href: '/demo/lazy', label: 'Lazy' },
					{ href: '/demo/movies', label: 'Movies' },
					{ href: '/demo/tree-select', label: 'TreeSelect' },
					{
						href: '/demo/table',
						label: 'Tables',
						icon: <RiTableView />,
						children: [
							{ href: '/demo/table', label: 'Table' },
							{ href: '/demo/data-table', label: 'DataTable (Client)' },
							{ href: '/demo/data-table-server', label: 'DataTable (Server)' },
							{ href: '/demo/data-table-server-2', label: 'DataTable (Server) 2' },
							{ href: '/demo/data-grid', label: 'DataGrid (Jspreadsheet CE)' },
						],
					},

					//{ href: '/demo/file-tree', label: 'File Tree' },
					//{ href: '/demo/table3', label: 'Table 3' },
					//{ href: '/demo/test', label: 'Test' },
				],
			},
			{
				href: '/admin',
				label: 'Admin',
				icon: <RiAdminLine />,
				roles: ['admin'],
				children: [
					{ href: '/dashboard', label: 'Dashboard', icon: <LayoutGrid /> },
					{ href: '/admin/system/auth-group', label: 'Auth Group Mgmt.' },
					{ href: '/users', label: 'Users', icon: <Users /> },
				],
			},
		],
	};
};
export const GetMenuItems = async (): Promise<MenuItem[]> => {
	const session = await getSession();

	const { children, ...menu_items } = GetMenuItemSources();
	const menus = [menu_items, ...(children || [])] as MenuItem[];

	const menus2 = menus.filter((item) => {
		return !item.roles || item.roles?.some((role: string) => session?.user?.roles?.includes(role)) !== false;
	});

	return menus2;
};
export const GetHeaderMenuItems = async (): Promise<MenuItem[]> => {
	const menu_items = await GetMenuItems();
	const menu_items2 = menu_items.map((data: MenuItem) => {
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { children, ...item } = data;
		return item;
	});
	return menu_items2;
};
export const GetSubMenuItems = (currentPath: string): MenuItem[] => {
	const menu_items: MenuItem = GetMenuItemSources();
	const { children, ...menu_items2 } = menu_items;
	let menu_items3 = [menu_items2, ...(children || [])];

	currentPath = currentPath || '/';

	menu_items3 = setMunuItemIsActive(menu_items3, currentPath);

	// Add dummy menu items
	menu_items3 = [...menu_items3, ...getDummyMenuItems()];

	return menu_items3;
};
export const GetSubMenuItemsWithGroup = (currentPath: string): MenuItemsGroup[] => {
	currentPath = currentPath || '/';

	const rtn: MenuItemsGroup[] = [];
	const menu_items: MenuItem = GetMenuItemSources();
	const { children, ...menu_items2 } = menu_items;
	let menu_items3 = [menu_items2, ...(children || [])];
	menu_items3 = setMunuItemIsActive(menu_items3, currentPath);

	rtn.push({
		groupLabel: '',
		menus: menu_items3.filter((item) => {
			return !item.href.startsWith('/admin') && !item.href.startsWith('/demo');
		}),
	});

	rtn.push(getMenuItemsGroupByPath(menu_items3, 'Demo pages', '/demo'));
	rtn.push(getMenuItemsGroupByPath(menu_items3, 'Admin pages', '/admin'));

	// Add dummy menu items
	//rtn.push({ groupLabel: 'Dummy menus', menus: getDummyMenuItems() });

	return rtn;
};

export const GetBreadcrumbItems = (currentPath: string): MenuItem[] => {
	const menu_items: MenuItem[] = [GetMenuItemSources()];
	let breadcrumb_items: MenuItem[];
	currentPath = currentPath || '/';

	breadcrumb_items = findMenuItemWithParents(menu_items, currentPath);

	breadcrumb_items = breadcrumb_items
		.map((data) => {
			if (data && data.children) {
				data.children = undefined!;
			}
			return data;
		})
		.filter((item) => {
			return item != null;
		});

	//console.log('GetBreadcrumbItems::breadcrumb_items: ', breadcrumb_items);

	return breadcrumb_items;
};
