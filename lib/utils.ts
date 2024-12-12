import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const GetRandomString = (len: number): string => {
	let s = '';
	while (s.length < len)
		s += Math.random()
			.toString(36)
			.substr(2, len - s.length);
	return s;
};

//export const GetEnumFromString = <T extends Record<string, string>>(val: string, _enum: T, _default?: T) => {
//	const enumName = (Object.keys(_enum) as Array<keyof T>).find((k) => _enum[k] === val);
//	if (!enumName) return _default || _enum[0]; //throw Error(); // here fail fast as an example
//	return _enum[enumName];
//};

export const GetEnumFromString = <T extends Record<string, string>, K extends keyof T>(enumObj: T, value: string | number): T[keyof T] =>
	enumObj[Object.keys(enumObj).filter((k) => enumObj[k as K].toString() === value)[0] as keyof typeof enumObj];
