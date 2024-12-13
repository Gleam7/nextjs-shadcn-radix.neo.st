'use client';

import { ScrollArea } from '@/components/shadcn-ui';

import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus';

export const CodeWithHighlight: React.FC<{ code: string; language?: string }> = ({
    code,
    language = 'ts',
}) => {
    return (
        <ScrollArea className="h-72 rounded-md border px-4 py-2">
            <SyntaxHighlighter
                wrapLongLines
                showLineNumbers
                language={language}
                style={vscDarkPlus}
                className="mockup-code"
            >
                {code}
            </SyntaxHighlighter>
        </ScrollArea>
    );
};
