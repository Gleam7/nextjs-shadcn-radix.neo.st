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
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    ScrollArea,
} from '@/components/shadcn-ui';

import type { Metadata } from 'next';
import { CodeWithHighlight } from '@/components/custom-ui/code-with-highlight';
import { Wait } from '@/lib/utils';
import { PageHeader } from '@/components/custom-ui';

const initialCodeString = `import React from "react";
import uniquePropHOC from "./lib/unique-prop-hoc";

// this comment is here to demonstrate an extremely long line length, well beyond what you should probably allow in your own code, though sometimes you'll be highlighting code you can't refactor, which is unfortunate but should be handled gracefully

class Expire extends React.Component {
    constructor(props) {
        super(props);
        this.state = { component: props.children }
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                component: null
            });
        }, this.props.time || this.props.seconds * 1000);
    }
    render() {
        return this.state.component;
    }
}

export default uniquePropHOC(["time", "seconds"])(Expire);
`;

export const metadata: Metadata = {
    title: 'About',
};

const Page = async () => {
    Wait(3000);

    const package_json_file = await fs.readFile(process.cwd() + '/package.json', 'utf8');
    const package_json_data = JSON.stringify(JSON.parse(package_json_file), null, 4);
    const session = await getServerSession(authOptions);
    return (
        <>
            <PageHeader>About Page</PageHeader>
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
                        <ScrollArea className="h-72 rounded-md border">
                            <CodeWithHighlight
                                code={JSON.stringify(session, null, 4)}
                                language="json5"
                            />
                        </ScrollArea>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="packageJson">
                    <AccordionTrigger>package.json</AccordionTrigger>
                    <AccordionContent>
                        <CodeWithHighlight code={package_json_data} language="json" />
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="sample_code">
                    <AccordionTrigger>sample_code</AccordionTrigger>
                    <AccordionContent>
                        <CodeWithHighlight code={initialCodeString} language="typescript" />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default Page;
