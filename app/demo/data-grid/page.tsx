import React from 'react';

import type { Metadata } from 'next';

import { PageHeader } from '@/components/custom-ui';

import { DataGrid } from './DataGrid';

export const metadata: Metadata = {
	title: 'DataGrid (AG Grid)',
};

const Page = async () => {
	return (
		<>
			<PageHeader>{metadata.title?.toString()}</PageHeader>
			<DataGrid />
		</>
	);
};

export default Page;
