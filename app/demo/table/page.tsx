import React from 'react';

import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/shadcn-ui';

import type { Metadata } from 'next';

import { PageHeader } from '@/components/custom-ui';
import { GetMoviesData } from '@/app/api/MoviesData';

export const metadata: Metadata = {
	title: 'Table',
};

const Page = async () => {
	const tableData = await GetMoviesData();
	let voteAverage = 0;
	tableData.data.map((row) => {
		voteAverage += row.vote_average;
	});
	voteAverage = Number((voteAverage / tableData.result_count).toFixed(3));

	return (
		<>
			<PageHeader>{metadata.title?.toString()}</PageHeader>

			<Table>
				<TableCaption>A list of your recent invoices.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">Id</TableHead>
						<TableHead>Title</TableHead>
						<TableHead>Release Date</TableHead>
						<TableHead className="text-right">Vote</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{tableData.data.map((row) => (
						<TableRow key={row.id}>
							<TableCell className="font-medium">{row.id}</TableCell>
							<TableCell>{row.original_title}</TableCell>
							<TableCell>{row.release_date}</TableCell>
							<TableCell className="text-right">{row.vote_average}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Vote average point</TableCell>
						<TableCell className="text-right">{voteAverage}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</>
	);
};

export default Page;
