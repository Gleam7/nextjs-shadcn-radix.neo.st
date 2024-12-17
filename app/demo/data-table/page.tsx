import React from 'react';

import type { Metadata } from 'next';

import { PageHeader } from '@/components/custom-ui';
import { DataTable } from './data-table';

export const metadata: Metadata = {
	title: 'Table with Search',
};

const Page = async () => {
	return (
		<>
			<PageHeader>{metadata.title?.toString()}</PageHeader>
			<DataTable />
		</>
	);
};

export default Page;
