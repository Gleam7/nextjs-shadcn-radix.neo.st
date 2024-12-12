/* eslint-disable @typescript-eslint/no-explicit-any */
import type { FetchResult } from '@/types';

const DataBackendURL = 'https://api.thecatapi.com/v1/images/search?limit=100';

export const GetCatsData = async (): Promise<FetchResult<any>> => {
	const rtn: FetchResult<any> = {
		success: false,
		message: '',
		result_count: 0,
		data: [],
	};

	try {
		const res = await fetch(DataBackendURL);
		rtn.data = await res.json();
		rtn.result_count = rtn.data.length;
		rtn.success = true;
	} catch (error) {
		if (error instanceof Error) {
			rtn.message = error.message;
		} else {
			rtn.message = String(error);
		}
	}
	//return rtn;

	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(rtn);
		}, 1500);
	});
};
