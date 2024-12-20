'use client';

import { createContext, useContext, useState } from 'react';
import type { Table } from '@tanstack/react-table';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface DataTableContextProps<T = any> {
	tableInstance: Table<T>;
	setTableInstance: React.Dispatch<React.SetStateAction<Table<T>>>;
}

const DataTableContext = createContext<DataTableContextProps>({
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	tableInstance: {} as Table<any>,
	setTableInstance: () => {},
});

export function useDataTableContext() {
	const context = useContext(DataTableContext);
	if (!context) {
		throw new Error('useDataTableContext must be used within a DataTableContextProvider');
	}
	return context;
}

export function DataTableContextProvider<T>({ table, children }: { table: Table<T>; children: React.ReactNode }) {
	const [tableInstance, setTableInstance] = useState<Table<T>>(table);

	return <DataTableContext.Provider value={{ tableInstance, setTableInstance }}>{children}</DataTableContext.Provider>;
}
