import { SVGProps } from 'react';

export * from './siteConfig';

export type IconSvgProps = SVGProps<SVGSVGElement> & {
	size?: number;
};

export interface MenuItem {
	href: string;
	label: React.ReactNode;
	icon?: React.ReactNode;
	active?: boolean;
	roles?: string[];
	children?: MenuItem[];
}
export interface MenuItemsGroup {
	groupLabel: string;
	menus: MenuItem[];
}

export interface SearchResultBase {
	key: string;
	description: string;
	disabled: boolean;
	tags?: string[];
}

export interface AuthGroupSearchResult extends SearchResultBase {
	auth_group_name: string;
	auth_group_menus: string[];
	auth_group_users: string[];
}

export type FetchResult<T> = {
	success: boolean | false;
	message: string;
	result_count: number;
	data: T[];
};

//export type SignupFromField = {
//	username?: string;
//	email?: string;
//	password?: string;
//};
//export type SigninFromField = {
//	username?: string;
//	password?: string;
//	remember?: string;
//};
//
export declare interface KeyValue<K, V> {
	key: K;
	value: V;
}

export type StringKeyValue = KeyValue<string, string>;
