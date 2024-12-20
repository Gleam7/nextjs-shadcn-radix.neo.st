import dayjs from 'dayjs';
import { z } from 'zod';
import type { FetchResult } from '@/types';
import { getErrorMessage } from '@/lib/utils';

const DataBackendURL = 'https://newsapi.org/v2/everything?q=[query]&from=[date]&pageSize=[pageSize]&page=[page]&sortBy=[orderBy]&language=[lang]';

export type NewsAPIResponseArticles = {
	source: {
		id: string;
		name: string;
	};
	author: string; //The author of the article
	title: string; //The headline or title of the article.
	description: string; //A description or snippet from the article.
	url: string; //The direct URL to the article.
	urlToImage: string; //The URL to a relevant image for the article.
	publishedAt: string; //The date and time that the article was published, in UTC (+000)
	content: string; //The unformatted content of the article, where available. This is truncated to 200 chars.
};
export const apiParamsSchema = z.object({
	page: z.coerce.number().min(1).optional().default(1),
	per_page: z.coerce.number().min(10).max(100).optional().default(10),
	sort: z.string().optional().default('publishedAt'),
	title: z.string().optional().default('Apple'),
	fromDate: z.coerce.date().optional().nullable(),
});
export type apiParams = z.infer<typeof apiParamsSchema>;

export const GetNewsData = async (params: apiParams): Promise<FetchResult<NewsAPIResponseArticles>> => {
	const rtn: FetchResult<NewsAPIResponseArticles> = {
		success: false,
		message: '',
		result_count: 0,
		data: [],
	};

	try {
		const parsedParams = apiParamsSchema.safeParse(params);
		console.log('params:', params, 'parsedParams:', parsedParams);

		const apiKey = process.env.NEWS_API_KEY || '2721d1f0de38415b978ddeed5ff2291a';
		//console.log('apiKey:', apiKey);
		//const strDate = ;

		if (!parsedParams.success) {
			throw parsedParams.error;
		}

		const reqUrl = DataBackendURL.replace('[page]', parsedParams.data.page.toString())
			.replace('[pageSize]', parsedParams.data.per_page.toString())
			.replace('[query]', encodeURIComponent(parsedParams.data.title))
			.replace('[orderBy]', parsedParams.data.sort)
			.replace('[lang]', 'en')
			.replace('[date]', parsedParams.data.fromDate ? dayjs(parsedParams.data.fromDate).add(-1, 'day').format('YYYY-MM-DD') : '');
		console.log('request url:', reqUrl);

		const res = await fetch(reqUrl, {
			method: 'GET', // *GET, POST, PUT, DELETE 등
			mode: 'cors', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin', // include, *same-origin, omit
			headers: {
				'Content-Type': 'application/json',
				// 'Content-Type': 'application/x-www-form-urlencoded',
				Authorization: `Beares ${apiKey}`,
			},
			redirect: 'follow', // manual, *follow, error
			referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
			//body: JSON.stringify(data),
		});
		const resData = await res.json();
		//console.log('resData:', JSON.stringify(resData, null, 4));

		if (resData.status !== 'ok') throw new Error(resData.message);

		rtn.data = resData.articles;
		rtn.result_count = resData.totalResults;
		rtn.success = resData.status === 'ok';
	} catch (error) {
		console.log(error);
		rtn.message = getErrorMessage(error);
	}
	return rtn;
};
