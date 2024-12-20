'use client';

import React from 'react';

import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import dayjs from 'dayjs';
import { z } from 'zod';

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
	Table,
	TableOptions,
	useReactTable,
	VisibilityState,
} from '@tanstack/react-table';

import {
	Button,
	Checkbox,
	Input,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Table as TableC,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/shadcn-ui';
import { RiArrowLeftDoubleLine, RiArrowLeftSLine, RiArrowRightDoubleLine, RiArrowRightSLine, RiArrowUpLine } from '@remixicon/react';

import { NewsAPIResponseArticles } from '@/app/api/NewsAPI';

interface UseServerTableProps<TData> extends Pick<TableOptions<TData>, 'columns' | 'data' | 'pageCount'> {
	search?: {
		searchKey?: keyof TData;
		placeholder: string;
	};
}

interface UseDataTableReturn<TData> {
	table: Table<TData>;
	search?: {
		searchKey?: keyof TData;
		placeholder: string;
	};
}

const searchParamsSchema = z.object({
	page: z.coerce.number().optional(),
	per_page: z.coerce.number().optional(),
	sort: z.string().optional(),
});
//type Sort<TData> = `${Extract<keyof TData, string>}:${'asc' | 'desc'}` | null | undefined;

function useServerTable<TData>(props: UseServerTableProps<TData>): UseDataTableReturn<TData> {
	const searchParams = useSearchParams();
	const router = useRouter();
	const path = usePathname();

	const fullURL = searchParamsSchema.parse(Object.fromEntries(searchParams));
	const page = fullURL.page ?? 1;
	const per_page = fullURL.per_page ?? 10;

	const createQueryString = React.useCallback(
		(params: Record<string, string | number | null>) => {
			const newSearchParams = new URLSearchParams(searchParams?.toString());

			for (const [key, value] of Object.entries(params)) {
				if (value === null) {
					newSearchParams.delete(key);
				} else {
					newSearchParams.set(key, String(value));
				}
			}

			return newSearchParams.toString();
		},
		[searchParams]
	);
	const [rowSelection, setRowSelection] = React.useState({});
	const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
	const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
	const [sorting, setSorting] = React.useState<SortingState>([]);

	React.useEffect(() => {
		router.replace(`${path}?${createQueryString({ page, per_page })}`);
	}, []);
	const [{ pageIndex, pageSize }, setPagination] = React.useState<PaginationState>({
		pageIndex: page - 1,
		pageSize: per_page,
	});

	const pagination = React.useMemo(
		() => ({
			pageIndex,
			pageSize,
		}),
		[pageIndex, pageSize]
	);

	React.useEffect(() => {
		if (sorting[0]) {
			router.push(
				`${path}?${createQueryString({
					page: pageIndex + 1,
					per_page: pageSize,
					sort: `${sorting[0].id}:${sorting[0].desc ? 'desc' : 'asc'}`,
				})}`
			);
		}
	}, [sorting]);

	React.useEffect(() => {
		router.push(
			`${path}?${createQueryString({
				page: pageIndex + 1,
				per_page: pageSize,
			})}`,
			{
				scroll: false,
			}
		);
	}, [pageIndex, pageSize]);

	const table = useReactTable({
		...props,
		state: {
			pagination,
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
	return { table, search: props.search };
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
	},
];

const TableSearch = ({ searchKey = 'search', placeholder = 'Please provide a placeholder' }: { searchKey?: string; placeholder?: string }) => {
	if (!searchKey.length) {
		searchKey = 'search';
	}
	const searchParams = useSearchParams();
	const router = useRouter();
	const path = usePathname();
	const onSearch = useDebouncedCallback((value: string) => {
		const params = new URLSearchParams(searchParams);
		if (value === null || value === '') {
			params.delete(searchKey);
		} else {
			params.set(searchKey, value);
		}

		router.push(`${path}/?${params.toString()}`);
	}, 300);

	return <Input placeholder={placeholder} onChange={(e) => onSearch(e.target.value)} className="h-8 w-36 lg:w-64" />;
};

function TablePagination<TData>({ table }: { table: Table<TData> }) {
	const pageSizes = [10, 25, 50, 100];
	return (
		<div className="flex mt-3 w-full flex-col-reverse justify-end gap-4 overflow-auto p-1 sm:flex-row sm:gap-8 ">
			<div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
				<div className="flex items-center space-x-2">
					<p className="whitespace-nowrap text-sm font-medium">Rows per page</p>
					<Select value={`${table?.getState().pagination.pageSize}`} onValueChange={(value) => table?.setPageSize(+value)}>
						<SelectTrigger className="h-8 w-fit">
							<SelectValue placeholder={table?.getState().pagination.pageSize} />
						</SelectTrigger>
						<SelectContent>
							{pageSizes.map((size) => (
								<SelectItem key={`pagesize-item-${size}`} value={`${size}`}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
				<div className="flex items-center justify-center text-sm font-medium">
					Page {table?.getState().pagination.pageIndex + 1} of {table?.getPageCount()}
				</div>
				<div className="flex items-center space-x-2">
					<Button
						aria-label="Go to first page"
						variant="outline"
						className="hidden size-8 p-0 lg:flex"
						onClick={() => table?.setPageIndex(0)}
						disabled={!table?.getCanPreviousPage()}
					>
						<RiArrowLeftDoubleLine className="size-4" aria-hidden="true" />
					</Button>
					<Button
						aria-label="Go to previous page"
						variant="outline"
						size="icon"
						className="size-8"
						onClick={() => table?.previousPage()}
						disabled={!table?.getCanPreviousPage()}
					>
						<RiArrowLeftSLine className="size-4" aria-hidden="true" />
					</Button>
					<Button
						aria-label="Go to next page"
						variant="outline"
						size="icon"
						className="size-8"
						onClick={() => table?.nextPage()}
						disabled={!table?.getCanNextPage()}
					>
						<RiArrowRightSLine className="size-4" aria-hidden="true" />
					</Button>
					<Button
						aria-label="Go to last page"
						variant="outline"
						size="icon"
						className="hidden size-8 lg:flex"
						onClick={() => table?.setPageIndex(table?.getPageCount() - 1)}
						disabled={!table?.getCanNextPage()}
					>
						<RiArrowRightDoubleLine className="size-4" aria-hidden="true" />
					</Button>
				</div>
			</div>
		</div>
	);
}
function ServerDataTable({ data, pageCount }: { data: NewsAPIResponseArticles[]; pageCount: number }) {
	const { table, search } = useServerTable<NewsAPIResponseArticles>({
		columns: DataTableColumns,
		data,
		pageCount,
		search: { placeholder: 'Search by title...', searchKey: 'title' },
	});

	return (
		<div className="w-full">
			<div className="mb-4 flex flex-row justify-between items-center">
				<TableSearch searchKey={search?.searchKey} placeholder={search?.placeholder} />
			</div>
			{table && (
				<div className="rounded-md border">
					<TableC>
						<TableHeader>
							{table.getHeaderGroups().map((headerGroup) => (
								<TableRow key={headerGroup.id}>
									{headerGroup.headers.map((column) => (
										<TableHead
											key={column.id}
											className={cn(
												column.id === 'select' ? 'min-w-6.5' : '',
												column.id === 'publishedAt' ? 'w-40' : '',
												'text-center'
											)}
										>
											{flexRender(column.column.columnDef.header, column.getContext())}
										</TableHead>
									))}
								</TableRow>
							))}
						</TableHeader>
						<TableBody>
							{table.getCoreRowModel().rows.map((row) => (
								<TableRow key={row.id} className="h-10">
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id} className={cn(cell.column.id === 'publishedAt' ? 'text-center' : '')}>
											{flexRender(cell.column.columnDef.cell, cell.getContext())}
										</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</TableC>
				</div>
			)}
			<TablePagination table={table} />
		</div>
	);
}

export default ServerDataTable;
