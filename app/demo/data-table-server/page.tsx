import React from 'react';

import { PageHeader } from '@/components/custom-ui';

import { apiParams, GetNewsData } from '@/app/api/NewsAPI';

import type { Metadata } from 'next';
import ServerDataTable from './server-data-table';
export const metadata: Metadata = {
	title: 'DataTable (Sever)',
};

const Page = async ({ searchParams }: { searchParams: Promise<apiParams> }) => {
	const newsData = await GetNewsData(await searchParams);
	const totalPageCount = Math.floor(newsData.result_count / 10) + 1;

	return (
		<>
			<PageHeader>{metadata.title?.toString()}</PageHeader>
			<ServerDataTable data={newsData.data} pageCount={totalPageCount} />
		</>
	);
};

export default Page;
