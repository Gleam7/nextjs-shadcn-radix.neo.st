import { FC } from 'react';

import { cn } from '@/lib/utils';

export interface DummyContentsProps {
	size?: number;
	text?: string;
	classNamesOfWrapper?: string;
}

export const DummyContents: FC<DummyContentsProps> = (props: DummyContentsProps) => {
	const loopCount = !props.size || props.size < 1 ? 153 : props.size;
	const contents_text = props.text || '...';
	const class_names = [props.classNamesOfWrapper || ''];

	return (
		<div className={cn(class_names)}>
			{Array.from({ length: loopCount }, (_, idx) => (
				<div key={idx}>
					{idx % 5 === 4 || idx === 0 || idx + 1 === loopCount ? (idx + 1).toString().padStart(3, '0') : contents_text}
					<br />
				</div>
			))}
		</div>
	);
};
