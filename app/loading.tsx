'use client';

import * as React from 'react';

import { Sleep } from '@/lib/utils';

//import { Skeleton } from '@/components/shadcn-ui';
import { ProgressCircle } from '@/components/custom-ui';

export default function Loading() {
	const [value, setValue] = React.useState(0);

	React.useEffect(() => {
		//const interval = setInterval(() => {
		//	setValue((value) => (value + 1) % 101);
		//}, 153);
		//return () => clearInterval(interval);

		const timeOut = setTimeout(() => {
			const delaySrtVal = 63;
			const newVal = (value + 1) % 101;
			//console.log(`newVal: ${newVal}`);
			if (newVal - delaySrtVal > 0) {
				const delayTime = Math.floor(((newVal - delaySrtVal) * delaySrtVal) / 5);
				//console.log(`delayTime: ${delayTime}ms`);
				Sleep(delayTime);
			}

			setValue(newVal);
		}, 153);
		return () => clearTimeout(timeOut);
	}, [value]);

	// You can add any UI inside Loading, including a Skeleton.
	return (
		<div className="flex flex-col min-h-[50vh] h-dvh w-full items-center justify-center px-4 text-lg">
			<div className="flex items-center space-x-4">
				{/* 				<Skeleton className="h-12 w-12 rounded-full" />
				<div className="space-y-2">
					<Skeleton className="h-4 w-[250px]" />
					<Skeleton className="h-4 w-[200px]" />
				</div> */}
				<ProgressCircle value={value} size="2xl" className={value < 33 ? 'text-red-500' : value < 66 ? 'text-orange-500' : 'text-green-500'} />
			</div>
		</div>
	);
}
