'use client';

import * as React from 'react';

import { Sleep } from '@/lib/utils';

//import { Skeleton } from '@/components/shadcn-ui';
import { PageHeader, ProgressCircle } from '@/components/custom-ui';

export default function Page() {
	const [value, setValue] = React.useState(0);
	const [className, setClassName] = React.useState('text-red-500');

	React.useEffect(() => {
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
			setClassName(value < 33 ? 'text-red-500' : value < 66 ? 'text-orange-500' : 'text-green-500');
		}, 153);
		return () => clearTimeout(timeOut);
	}, [value]);

	return (
		<>
			<PageHeader>Circular Progress</PageHeader>
			<div className="flex flex-col w-full items-center justify-center gap-8">
				<ProgressCircle value={value} size="xs" className={className} />
				<ProgressCircle value={value} size="sm" className={className} />
				<ProgressCircle value={value} size="md" className={className} />
				<ProgressCircle value={value} size="lg" className={className} />
				<ProgressCircle value={value} size="xl" className={className} />
				<ProgressCircle value={value} size="2xl" className={className} />
				<ProgressCircle value={value} size="3xl" className={className} />
			</div>
		</>
	);
}
