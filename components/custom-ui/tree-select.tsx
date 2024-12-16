'use client';

import * as React from 'react';

import { RiArrowRightSLine, RiCheckLine, RiSubtractLine } from '@remixicon/react';

import * as CheckboxPrimitive from '@radix-ui/react-checkbox';

import { cn } from '@/lib/utils';

export interface TreeNode {
	id: string;
	label: string;
	children?: TreeNode[];
}

const TreeSelectCheckbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, checked, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			'peer h-4 w-4 shrink-0 rounded-sm border border-inherit shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-inherit data-[state=indeterminate]:bg-inherit [&_svg]:size-5',
			className
		)}
		checked={checked}
		{...props}
	>
		<CheckboxPrimitive.Indicator className={cn('flex items-center justify-center text-current h-3.5')}>
			{checked === 'indeterminate' && <RiSubtractLine />}
			{checked === true && <RiCheckLine />}
		</CheckboxPrimitive.Indicator>
	</CheckboxPrimitive.Root>
));
TreeSelectCheckbox.displayName = CheckboxPrimitive.Root.displayName;

function TreeNode({
	node,
	level = 0,
	onCheck,
	checkedState,
}: {
	node: TreeNode;
	level?: number;
	onCheck: (id: string, checked: boolean | 'indeterminate') => void;
	checkedState: Map<string, boolean | 'indeterminate'>;
}) {
	const [isOpen, setIsOpen] = React.useState(false);
	const hasChildren = node.children && node.children.length > 0;
	const checked = checkedState.get(node.id);

	const handleCheck = (checked: boolean) => {
		onCheck(node.id, checked);
	};

	return (
		<li className={cn('flex flex-col gap-1', '', hasChildren ? '' : 'border-s border-s-inherit ml-3', '')}>
			<div className={cn('flex gap-1 items-center', level > 0 ? '' : '', hasChildren ? '' : '')}>
				{hasChildren ? (
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="focus:outline-none text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
						aria-label={isOpen ? 'Collapse' : 'Expand'}
					>
						<RiArrowRightSLine className={cn('transition-all', isOpen ? 'rotate-90' : '')} />
					</button>
				) : (
					<span className="w-[calc(0.75em-1px)] " />
				)}
				<TreeSelectCheckbox id={node.id} checked={checked} onCheckedChange={handleCheck} />
				<label htmlFor={node.id} className="ml-2 cursor-pointer select-none text-sm text-gray-700 dark:text-gray-300">
					{node.label}
				</label>
			</div>
			{isOpen && hasChildren && (
				<ul className={cn('ml-3 pl-3', 'border-s border-s-inherit', hasChildren ? '' : '')}>
					{node.children?.map((child) => (
						<TreeNode key={child.id} node={child} level={level + 1} onCheck={onCheck} checkedState={checkedState} />
					))}
				</ul>
			)}
		</li>
	);
}

function getDescendants(node: TreeNode): string[] {
	let descendants: string[] = [node.id];
	if (node.children) {
		node.children.forEach((child) => {
			descendants = descendants.concat(getDescendants(child));
		});
	}
	return descendants;
}

function getAncestors(id: string, nodes: TreeNode[]): string[] {
	for (const node of nodes) {
		if (node.id === id) {
			return [node.id];
		}
		if (node.children) {
			const path = getAncestors(id, node.children);
			if (path.length > 0) {
				return [node.id, ...path];
			}
		}
	}
	return [];
}

function findNode(id: string, nodes: TreeNode[]): TreeNode | null {
	for (const node of nodes) {
		if (node.id === id) {
			return node;
		}
		if (node.children) {
			const found = findNode(id, node.children);
			if (found) {
				return found;
			}
		}
	}
	return null;
}

export function TreeSelect({ data }: { data: TreeNode[] }) {
	const [checkedState, setCheckedState] = React.useState<Map<string, boolean | 'indeterminate'>>(new Map());

	const updateCheckedState = (id: string, checked: boolean | 'indeterminate') => {
		const newCheckedState = new Map(checkedState);

		const updateDescendants = (nodeId: string, state: boolean) => {
			const node = findNode(nodeId, data);
			if (node) {
				const descendants = getDescendants(node);
				descendants.forEach((descId) => {
					newCheckedState.set(descId, state);
				});
			}
		};

		const updateAncestors = (nodeId: string) => {
			const ancestors = getAncestors(nodeId, data);
			ancestors
				.slice(0, -1)
				.reverse()
				.forEach((ancId) => {
					const node = findNode(ancId, data);
					if (node?.children) {
						const childStates = node.children.map((child) => newCheckedState.get(child.id));
						if (childStates.every((state) => state === true)) {
							newCheckedState.set(ancId, true);
						} else if (childStates.some((state) => state === true || state === 'indeterminate')) {
							newCheckedState.set(ancId, 'indeterminate');
						} else {
							newCheckedState.set(ancId, false);
						}
					}
				});
		};

		if (checked === 'indeterminate') {
			newCheckedState.set(id, false);
			updateDescendants(id, false);
		} else {
			newCheckedState.set(id, checked);
			updateDescendants(id, checked);
		}
		updateAncestors(id);

		setCheckedState(newCheckedState);
	};

	const handleCheck = (id: string, checked: boolean | 'indeterminate') => {
		updateCheckedState(id, checked);
	};

	return (
		<ul className="w-full mx-auto min-w-40">
			{data.map((node) => (
				<TreeNode key={node.id} node={node} onCheck={handleCheck} checkedState={checkedState} />
			))}
		</ul>
	);
}
