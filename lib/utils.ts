//import type { ReadonlyURLSearchParams } from 'next/navigation';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ZodError } from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const getErrorMessage = (error: unknown) => {
	if (error instanceof ZodError) return JSON.stringify(error.flatten().fieldErrors).replaceAll('"', "'");
	if (error instanceof Error) return error.message;
	return String(error);
};

export const Wait = (ms: number) => {
	const start = Date.now();
	let now = start;
	while (now - start < ms) {
		now = Date.now();
	}
};
export const Sleep = (ms: number) => {
	return new Promise((resolve) => setTimeout(resolve, ms));
};
export const GetRandomInt = (maxVal: number) => {
	return Math.floor(Math.random() * maxVal);
};
export const GetRandomString = (len: number): string => {
	let s = '';
	while (s.length < len)
		s += Math.random()
			.toString(36)
			.substr(2, len - s.length);
	return s;
};
/**
 * Stole this from the @radix-ui/primitive
 * @see https://github.com/radix-ui/primitives/blob/main/packages/core/primitive/src/primitive.tsx
 */
export function composeEventHandlers<E>(
	originalEventHandler?: (event: E) => void,
	ourEventHandler?: (event: E) => void,
	{ checkForDefaultPrevented = true } = {}
) {
	return function handleEvent(event: E) {
		originalEventHandler?.(event);

		if (checkForDefaultPrevented === false || !(event as unknown as Event).defaultPrevented) {
			return ourEventHandler?.(event);
		}
	};
}

export const GetEnumFromString = <T extends Record<string, string>, K extends keyof T>(enumObj: T, value: string | number): T[keyof T] =>
	enumObj[Object.keys(enumObj).filter((k) => enumObj[k as K].toString() === value)[0] as keyof typeof enumObj];

export const getPathToArray = (path: string): string[] => {
	let prev_path = '';

	const paths = path
		.split('/')
		.filter((item) => item && item !== '')
		.map((item) => {
			prev_path = `${prev_path}/${item}`;
			return prev_path;
		});

	return paths;
};

export function getIsMacOS() {
	if (typeof navigator === 'undefined') return false;
	return navigator.userAgent?.includes('Mac');
}
