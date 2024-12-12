import React from 'react';

import { PageHeader, DummyContents } from '@/components/custom-ui';

export const DummyPage = ({ title }: { title: string }) => {
	return (
		<div>
			<PageHeader>{title}</PageHeader>
			<DummyContents size={153} text={`${title} content line by DummyPage.tsx`} classNamesOfWrapper="" />
		</div>
	);
};
