
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import rehypeRaw  from 'rehype-raw';
import rehypeIgnore from 'rehype-ignore';
import rehypeSanitize from 'rehype-sanitize';
import { Box } from '@chakra-ui/react';
import "./../styles/github-markdown.css";

import "highlight.js/styles/github.css";


export default function MarkdownRender({ children }) {
    return (
        <Box w="100%" className="markdown-body">
            <Markdown remarkRehypeOptions={{allowDangerousHtml: true}} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeIgnore, rehypeSanitize]}>{children}</Markdown>
        </Box>
    );
}