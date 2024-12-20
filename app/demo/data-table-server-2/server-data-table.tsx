'use client';

import React from 'react';

import Link from 'next/link';
import dayjs from 'dayjs';

import { useDebouncedCallback } from 'use-debounce';
import { ColumnDef } from '@tanstack/react-table';
import { cn } from '@/lib/utils';

import {
	ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFacetedRowModel,
	getFacetedUniqueValues,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	PaginationState,
	SortingState,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';

import {
	Button,
	Checkbox,
	Input,
	Table as ShadcnTable,
	Skeleton,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/shadcn-ui';
import EmptyStateIcon from '@/public/img/EmptyStateIconSvg';
import { RiArrowUpLine } from '@remixicon/react';

import { apiParams, GetNewsData, NewsAPIResponseArticles } from '@/app/api/NewsAPI';
import { DataTablePagination } from '@/components/custom-ui';

function useServerTable() {
	const [pageCount, setPageCount] = React.useState(1);
	const [isTableDataLoading, setIsTableDataLoading] = React.useState(true);
	const [filterText, setFilterText] = React.useState('');
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);
	const [tableData, setTableData] = React.useState<NewsAPIResponseArticles[]>([]);
	const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
		pageIndex: 1,
		pageSize: 10,
	});
	const columnsMemo = React.useMemo(
		() =>
			isTableDataLoading
				? DataTableColumns.map((column) => ({
						...column,
						cell: () => <Skeleton className="h-4 bg-secondary rounded-full" />,
				  }))
				: DataTableColumns,
		[isTableDataLoading]
	);

	React.useEffect(() => {
		setIsTableDataLoading(true);
		const strSorting = sorting.map((item) => `${item.id}:${item.desc ? 'desc' : 'asc'}`).join(',');
		//console.log('strSorting:', strSorting);
		//const strSorting = table.getFilteredRowModel() .map((item) => `${item.id}:${item.desc ? 'desc' : 'asc'}`).join(',');

		//console.log('columnFilters:', columnFilters, 'filterText:', filterText);
		//const title = columnFilters && columnFilters[0] ? String(columnFilters[0].value) : 'Apple';
		//if (title !== filterText) {
		//	console.log('title:', title, 'filterText:', filterText);
		//	setFilterText(title);
		//	setPagination({ pageIndex: 1, pageSize: 10 });
		//}
		GetNewsData({ page: pageIndex + 1, per_page: pageSize, sort: strSorting, query: filterText, fromDate: null } as apiParams).then((rtn) => {
			console.log(rtn);

			setTableData(rtn.data);
			setPageCount(Math.floor(rtn.result_count / 10) + 1);
			setIsTableDataLoading(false);
		});
	}, [pageIndex, pageSize, sorting, filterText]);

	const table = useReactTable<NewsAPIResponseArticles>({
		data: tableData,
		columns: columnsMemo,
		pageCount: pageCount,
		state: {
			pagination: { pageIndex, pageSize },
			rowSelection,
			columnVisibility,
			columnFilters,
			sorting,
		},
		onSortingChange: setSorting,
		onRowSelectionChange: setRowSelection,
		onPaginationChange: setPagination,
		onColumnFiltersChange: setColumnFilters,
		onColumnVisibilityChange: setColumnVisibility,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getSortedRowModel: getSortedRowModel(),
		getFacetedRowModel: getFacetedRowModel(),
		getFacetedUniqueValues: getFacetedUniqueValues(),
		manualPagination: true,
		manualSorting: true,
		manualFiltering: true,
	});

	React.useEffect(() => {
		console.log('columnFilters:', columnFilters, 'filterText:', filterText);
		const title = columnFilters && columnFilters[0] ? String(columnFilters[0].value) : 'Apple';

		if (title !== filterText) {
			console.log('title:', title, 'filterText:', filterText);
			setFilterText(title);
			table.setPageIndex(0);
		}
	}, [columnFilters, filterText, table]);

	return { table };
}

const DataTableColumns: ColumnDef<NewsAPIResponseArticles>[] = [
	{
		id: 'select',
		accessorKey: 'select',
		header: ({ table }) => (
			<Checkbox
				checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
				onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
				aria-label="Select all"
				className=""
			/>
		),
		cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => {
			return (
				<Link href={row.original.url} target="_blank" title={row.getValue('title')} className="hove:text-primary hover:underline line-clamp-1">
					{row.getValue('title')}
				</Link>
			);
		},
		enableSorting: true,
		enableHiding: false,
	},
	{
		accessorKey: 'publishedAt',
		header: ({ column }) => {
			return (
				<Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Published
					<RiArrowUpLine className={cn('size-5 transition-all ', column.getIsSorted() === 'asc' ? '' : 'rotate-180')} />
				</Button>
			);
		},
		cell: ({ row }) => dayjs(row.getValue('publishedAt')).format('YYYY-MM-DD HH:mm:ss'),
		enableSorting: true,
		enableHiding: false,
	},
];

function ServerDataTable() {
	const { table } = useServerTable();
	const onSearch = useDebouncedCallback((value: string) => {
		table.getColumn('title')?.setFilterValue(value);
	}, 700);
	return (
		<div className="w-full">
			<div className="mb-4 flex flex-row justify-between items-center">
				<Input placeholder={'Search by title...'} onChange={(e) => onSearch(e.target.value)} className="h-8 w-36 lg:w-64" />
			</div>
			{table && (
				<div className="rounded-md border">
					<ShadcnTable>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id} className={cn('text-center')}>
									{headerGroup.headers.map((column) => (
										<TableHead
											key={column.id}
											className={cn(
												column.id === 'select' ? 'min-w-7 max-w-7 w-7' : '',
												column.id === 'publishedAt' ? 'w-40' : ''
											)}
										>
											{flexRender(column.column.columnDef.header, column.getContext())}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getRowCount() > 0 ? (
								table.getCoreRowModel().rows.map((row) => (
									<TableRow key={row.id} className="h-10">
										{row.getVisibleCells().map((cell) => (
											<TableCell key={cell.id} className={cn(cell.column.id === 'publishedAt' ? 'text-center' : '')}>
												{flexRender(cell.column.columnDef.cell, cell.getContext())}
											</TableCell>
										))}
									</TableRow>
								))
							) : (
								<TableRow key={'no-data-row'} className="h-80">
									<TableCell key={'no-data'} colSpan={table.getFlatHeaders().length} className={cn('text-center')}>
										<EmptyStateIcon className="w-60 mx-auto" />
										No rows found
									</TableCell>
								</TableRow>
							)}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={table.getFlatHeaders().length} className={cn('')}>
									<div className="flex flex-wrap items-center justify-start space-x-2 py-1">
										<div className="flex text-sm text-muted-foreground">
											{table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
											selected.
										</div>
										<div className="flex flex-auto space-x-2 justify-end">
											<DataTablePagination table={table} />
										</div>
									</div>
								</TableCell>
							</TableRow>
						</TableFooter>
					</ShadcnTable>
				</div>
			)}
		</div>
	);
}

export default ServerDataTable;
