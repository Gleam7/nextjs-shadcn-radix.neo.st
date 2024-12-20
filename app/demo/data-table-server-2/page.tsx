import React from 'react';

import { PageHeader } from '@/components/custom-ui';

import type { Metadata } from 'next';
import ServerDataTable from './server-data-table';
export const metadata: Metadata = {
	title: 'DataTable (Sever) 2',
};

const Page = async () => {
	return (
		<>
			<PageHeader>{metadata.title?.toString()}</PageHeader>
			<ServerDataTable />
		</>
	);
};

export default Page;
