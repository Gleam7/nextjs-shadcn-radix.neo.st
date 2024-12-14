//import { title } from '@/public/styles/title';
//
//export default function AboutPage() {
//	return (
//		<div>
//			<h1 className={title()}>About</h1>
//		</div>
//	);
//}
import React from 'react';
import { promises as fs } from 'fs';

import { getServerSession } from 'next-auth';

import { authOptions } from '@/lib/auth';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn-ui';

import { CodeWithHighlight } from '@/components/custom-ui/code-with-highlight';
import { PageHeader } from '@/components/custom-ui';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About',
};

const Page = async () => {
	const package_json_file = await fs.readFile(process.cwd() + '/package.json', 'utf8');
	const package_json_data = JSON.stringify(JSON.parse(package_json_file), null, 4);
	const session = await getServerSession(authOptions);
	return (
		<>
			<PageHeader>{metadata.title?.toString()}</PageHeader>
			<Accordion type="single" collapsible className="mx-auto w-3/4">
				<AccordionItem value="item-1">
					<AccordionTrigger>Theme Settings</AccordionTrigger>
					<AccordionContent>
						ThemeSettings
						<br />
						ThemeConfigValues
						{/* 			<ThemeSettings />
						<ThemeConfigValues /> */}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="userInfo">
					<AccordionTrigger>User Info</AccordionTrigger>
					<AccordionContent>
						<CodeWithHighlight code={JSON.stringify(session, null, 4)} language="json5" />
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="packageJson">
					<AccordionTrigger>package.json</AccordionTrigger>
					<AccordionContent>
						<CodeWithHighlight code={package_json_data} language="json" />
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
};

export default Page;
