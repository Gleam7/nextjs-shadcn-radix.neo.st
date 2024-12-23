'use client';
import React, { useCallback, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

import { cn } from '@/lib/utils';

import { AgGridReact } from 'ag-grid-react';
import {
	ClientSideRowModelModule,
	ClientSideRowModelApiModule,
	ModuleRegistry,
	NumberEditorModule,
	TextEditorModule,
	ValidationModule,
	themeAlpine,
	HighlightChangesModule,
	UndoRedoEditModule,
	ColDef,
	RowValueChangedEvent,
	CellValueChangedEvent,
	ITextCellEditorParams,
	INumberCellEditorParams,
	DateEditorModule,
	DataTypeDefinition,
	ValueParserLiteParams,
	ValueFormatterLiteParams,
} from 'ag-grid-community';

ModuleRegistry.registerModules([
	ClientSideRowModelApiModule,
	NumberEditorModule,
	TextEditorModule,
	ClientSideRowModelModule,
	HighlightChangesModule,
	UndoRedoEditModule,
	DateEditorModule,
	ValidationModule /* Development Only */,
]);
interface IOlympicData {
	athlete: string;
	age: number;
	country: string;
	year: number;
	date: Date;
	sport: string;
	gold: number;
	silver: number;
	bronze: number;
	total: number;
}
export const DataGrid = () => {
	const { theme } = useTheme();
	const [rowData, setRowData] = useState<IOlympicData[]>([]);
	const [columnDefs] = useState<ColDef[]>([
		{
			field: 'athlete',
			minWidth: 160,
			cellEditor: 'agTextCellEditor',
			cellEditorParams: {
				maxLength: 20,
			} as ITextCellEditorParams,
		},
		{
			field: 'age',
			cellEditor: 'agNumberCellEditor',
			cellEditorParams: {
				min: 0,
				max: 100,
				showStepperButtons: true,
				preventStepping: true,
			} as INumberCellEditorParams,
		},
		{ field: 'country', minWidth: 140 },
		{ field: 'year' },
		{
			field: 'date',
			minWidth: 140,
			cellDataType: 'dateString',
			cellEditor: 'agDateCellEditor',
			//cellEditorParams: {
			//	max: dayjs().format('YYYY-MM-DD'),
			//} as IDateCellEditorParams,
			//valueFormatter: (params: ValueFormatterParams<any, Date>) => {
			//	console.log('params @ valueFormatter:', params, 'params.value:', params.value);
			//	if (!params.value) {
			//		return '';
			//	}
			//	//const formattedValue = dayjs(params.value, 'DD/MM/YYYY').format('YYYY-MM-DD');
			//	const formattedValue = dayjs(params.value).format('YYYY-MM-DD');
			//	console.log('formattedValue @ valueFormatter:', formattedValue);
			//	return formattedValue;
			//},
		},
		{ field: 'sport', minWidth: 160 },
		{
			field: 'gold',
			cellEditor: 'agNumberCellEditor',
			cellEditorParams: {
				min: 0,
				max: 100,
				showStepperButtons: true,
				preventStepping: true,
			} as INumberCellEditorParams,
		},
		{
			field: 'silver',
			cellEditor: 'agNumberCellEditor',
			cellEditorParams: {
				min: 0,
				max: 100,
				showStepperButtons: true,
				preventStepping: true,
			} as INumberCellEditorParams,
		},
		{
			field: 'bronze',
			cellEditor: 'agNumberCellEditor',
			cellEditorParams: {
				min: 0,
				max: 100,
				showStepperButtons: true,
				preventStepping: true,
			} as INumberCellEditorParams,
		},
		{
			field: 'total',
			cellEditor: 'agNumberCellEditor',
			cellEditorParams: {
				min: 0,
				max: 100,
				showStepperButtons: true,
				preventStepping: true,
			} as INumberCellEditorParams,
		},
	]);
	const defaultColDef = useMemo(() => {
		return {
			flex: 1,
			minWidth: 50,
			enableCellChangeFlash: true,
			editable: true,
		};
	}, []);
	const getRowId = useCallback((params: any) => params.data.id, []);

	//const onCellEditRequest = useCallback((event: any) => {
	//	const oldData = event.data;
	//	const field = event.colDef.field;
	//	const newValue = event.newValue;
	//	const newData = { ...oldData };
	//	newData[field] = event.newValue;
	//	console.log('onCellEditRequest, updating ' + field + ' to ' + newValue);
	//	const tx = {
	//		update: [newData],
	//	};
	//	event.api.applyTransaction(tx);
	//	return true;
	//}, []);

	const onCellValueChanged = useCallback((event: CellValueChangedEvent) => {
		console.log('event @ onCellValueChanged():', event);
	}, []);
	const onRowValueChanged = useCallback((event: RowValueChangedEvent) => {
		console.log('event @ onRowValueChanged():', event);
	}, []);
	const dataTypeDefinitions = useMemo<{
		[cellDataType: string]: DataTypeDefinition;
	}>(() => {
		return {
			dateString: {
				baseDataType: 'dateString',
				extendsDataType: 'dateString',
				valueParser: (params: ValueParserLiteParams<IOlympicData, string>) =>
					params.newValue != null && params.newValue.match('\\d{2}/\\d{2}/\\d{4}') ? params.newValue : null,
				valueFormatter: (params: ValueFormatterLiteParams<IOlympicData, string>) => (params.value == null ? '' : params.value),
				dataTypeMatcher: (value: any) => typeof value === 'string' && !!value.match('\\d{2}/\\d{2}/\\d{4}'),
				dateParser: (value: string | undefined) => {
					if (value == null || value === '') {
						return undefined;
					}
					const dateParts = value.split('/');
					return dateParts.length === 3 ? new Date(parseInt(dateParts[2]), parseInt(dateParts[1]) - 1, parseInt(dateParts[0])) : undefined;
				},
				dateFormatter: (value: Date | undefined) => {
					if (value == null) {
						return undefined;
					}
					const date = String(value.getDate());
					const month = String(value.getMonth() + 1);
					return `${date.length === 1 ? '0' + date : date}/${month.length === 1 ? '0' + month : month}/${value.getFullYear()}`;
				},
			},
		};
	}, []);

	const onGridReady = useCallback((params: any) => {
		console.log('params @ onGridReady():', params);
		fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
			.then((resp) => resp.json())
			.then((data: IOlympicData[]) => {
				setRowData(data);
				//const formattedData = data.map((row) => {
				//	row.date = dayjs(row.date, 'DD/MM/YYYY');
				//	return row;
				//});
				//setRowData(formattedData);
			});
	}, []);
	//const autoGroupColumnDef = useMemo(() => {
	//	return {
	//		headerName: 'File Explorer',
	//		minWidth: 280,
	//		cellRendererParams: {
	//			suppressCount: true,
	//		},
	//	};
	//}, []);
	//const getDataPath = useCallback((data: any) => data.path, []);
	const customizedTheme = useMemo(() => {
		document.body.dataset.agThemeMode = theme === 'dark' ? 'dark' : 'light';
		return (
			themeAlpine
				//.withPart(iconSetQuartzRegular)
				.withParams({
					spacing: 4,
					fontFamily: 'inherit',
					backgroundColor: 'transparent',
					//tabBarBorder: { width: 0 },
					columnBorder: { width: 0 },
					rowBorder: { width: theme === 'dark' ? 0 : 1 },
				})
		);
	}, [theme]);

	return (
		<div id="" className={cn('flex-1', 'w-full h-[500px]')}>
			<AgGridReact
				theme={customizedTheme}
				singleClickEdit={true}
				undoRedoCellEditing={true}
				undoRedoCellEditingLimit={30}
				readOnlyEdit={false}
				rowData={rowData}
				columnDefs={columnDefs}
				defaultColDef={defaultColDef}
				getRowId={getRowId}
				onGridReady={onGridReady}
				//onCellEditRequest={onCellEditRequest}
				onCellValueChanged={onCellValueChanged}
				onRowValueChanged={onRowValueChanged}
				dataTypeDefinitions={dataTypeDefinitions}
				/* 		treeData={true}
				autoGroupColumnDef={autoGroupColumnDef}
				groupDefaultExpanded={-1}
				getDataPath={getDataPath} */
			/>
		</div>
	);
};
