import React from 'react';

import type { Metadata } from 'next';

import { PageHeader, TreeSelect, type TreeNode } from '@/components/custom-ui';

export const metadata: Metadata = {
	title: 'TreeSelect',
};

const getDummyMenuSubItems = (labelPrefix: string, currentDepth: number = 1, maxDepth: number = 3): TreeNode[] => {
	const rtn: TreeNode[] = [];
	Array.from({ length: 5 }, (__, idx) => {
		const nodeKey = `${labelPrefix}${labelPrefix && '_'}${idx + 1}`;
		const menuItem = {
			id: nodeKey,
			label: nodeKey,
		} as TreeNode;

		if (idx % 3 == 0 && currentDepth < maxDepth) {
			menuItem.children = getDummyMenuSubItems(nodeKey, currentDepth + 1, maxDepth);
		}
		rtn.push(menuItem);
	});
	return rtn;
};

const treeData: TreeNode[] = getDummyMenuSubItems('', 1, 5);

const Page = async () => {
	return (
		<>
			<PageHeader>{metadata.title?.toString()}</PageHeader>
			<div className="flex justify-start items-start mx-auto border border-dotted w-96 h-96 overflow-y-auto mt-[5%]">
				<TreeSelect data={treeData} />
			</div>
		</>
	);
};

export default Page;
