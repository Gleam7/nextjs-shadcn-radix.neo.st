'use client';

import type { Table } from '@tanstack/react-table';
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn-ui';
import {
	RiArrowLeftSLine,
	RiArrowRightSLine,
	RiArrowLeftDoubleLine,
	RiArrowRightDoubleLine,
	RiContractRightLine,
	RiContractLeftLine,
} from '@remixicon/react';
import { cn } from '@/lib/utils';

interface DataTablePaginationProps<TData> {
	table: Table<TData>;
}
export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
	let pageButtonStartIdx = table.getState().pagination.pageIndex - 5;
	if (pageButtonStartIdx < 0) {
		pageButtonStartIdx = 0;
	}
	let pageButtonEndIdx = pageButtonStartIdx + 10;

	if (pageButtonEndIdx >= table.getPageCount()) {
		pageButtonStartIdx = table.getPageCount() - 11;
		pageButtonEndIdx = pageButtonStartIdx + 10;
	}
	if (pageButtonStartIdx < 1) {
		pageButtonStartIdx = 0;
	}
	const PaginationButtons = (strIdx: number, endIdx: number) => {
		const rtn = [];
		for (let i = strIdx; i <= endIdx; i++) {
			rtn.push(
				<Button
					key={i}
					variant="outline"
					className={cn(
						'h-8 min-w-8 p-0 px-1 hidden 2xl:block',
						i === table.getState().pagination.pageIndex ? 'active bg-accent text-accent-foreground' : ''
					)}
					onClick={() => {
						table.setPageIndex(i);
					}}
				>
					<span className="sr-only">Go to {i} page</span>
					{i + 1}
				</Button>
			);
		}
		return rtn;
	};

	return (
		<div className="flex flex-wrap items-center justify-end space-x-2">
			<div className="flex items-center space-x-2">
				<p className="text-sm font-medium">Rows per page</p>
				<Select
					value={`${table.getState().pagination.pageSize}`}
					onValueChange={(value) => {
						table.setPageSize(Number(value));
					}}
				>
					<SelectTrigger className="h-8 w-[70px]">
						<SelectValue placeholder={table.getState().pagination.pageSize} />
					</SelectTrigger>
					<SelectContent side="top">
						{[10, 15, 20, 30, 40, 50, 100].map((pageSize) => (
							<SelectItem key={pageSize} value={`${pageSize}`}>
								{pageSize}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex items-center justify-center text-sm font-medium">
				Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
			</div>
			<div className="flex items-center space-x-1">
				<Button
					variant="outline"
					className="h-8 w-8 p-0 lg:flex"
					onClick={() => {
						table.setPageIndex(0);
					}}
					disabled={table.getState().pagination.pageIndex < 1}
				>
					<span className="sr-only">Go to first page</span>
					<RiContractLeftLine />
				</Button>
				<Button
					variant="outline"
					className="h-8 w-8 p-0 lg:flex"
					onClick={() => {
						table.setPageIndex(table.getState().pagination.pageIndex - 10);
					}}
					disabled={!table.getCanPreviousPage() || !(table.getState().pagination.pageIndex - 10 >= 0)}
				>
					<span className="sr-only">Go to first page</span>
					<RiArrowLeftDoubleLine className="RiArrowLeftSLine" />
				</Button>
				<Button
					variant="outline"
					className="h-8 w-8 p-0"
					onClick={() => {
						table.previousPage();
					}}
					disabled={!table.getCanPreviousPage()}
				>
					<span className="sr-only">Go to previous page</span>
					<RiArrowLeftSLine className="RiArrowLeftSLine" />
				</Button>
				{PaginationButtons(pageButtonStartIdx, pageButtonEndIdx)}
				<Button
					variant="outline"
					className="h-8 w-8 p-0"
					onClick={() => {
						table.nextPage();
					}}
					disabled={!table.getCanNextPage()}
				>
					<span className="sr-only">Go to next page</span>
					<RiArrowRightSLine className="RiArrowLeftSLine" />
				</Button>
				<Button
					variant="outline"
					className="h-8 w-8 p-0"
					onClick={() => {
						table.setPageIndex(table.getState().pagination.pageIndex + 10);
					}}
					disabled={!table.getCanNextPage() || !(table.getState().pagination.pageIndex + 10 <= table.getPageCount())}
				>
					<span className="sr-only">Go to {table.getState().pagination.pageIndex + 10 + 1} page</span>
					<RiArrowRightDoubleLine />
				</Button>
				<Button
					variant="outline"
					className="h-8 w-8 p-0 lg:flex"
					onClick={() => {
						table.setPageIndex(table.getPageCount() - 1);
					}}
					disabled={!table.getCanNextPage()}
				>
					<span className="sr-only">Go to last page</span>
					<RiContractRightLine />
				</Button>
			</div>
		</div>
	);
}
