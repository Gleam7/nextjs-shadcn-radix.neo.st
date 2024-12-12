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
import { PageHeader } from '@/components/custom-ui';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/shadcn-ui';

import type { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'About',
};

const Page: React.FC = async () => {
	const package_json_file = await fs.readFile(process.cwd() + '/package.json', 'utf8');
	const package_json_data = JSON.stringify(JSON.parse(package_json_file), null, 4);
	const session = await getServerSession(authOptions);
	return (
		<>
			<PageHeader>About Page</PageHeader>
			<Accordion type="single" collapsible className="w-3/4 mx-auto">
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
						<pre>{JSON.stringify(session, null, 4)}</pre>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="packageJson">
					<AccordionTrigger>package.json</AccordionTrigger>
					<AccordionContent>
						<pre>{package_json_data}</pre>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</>
	);
};

export default Page;
