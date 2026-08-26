import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // Choose a highlight.js theme

export interface IMarkdownRendererProps {
  markdownContent: string;
}

export const MarkdownRenderer: React.FunctionComponent<IMarkdownRendererProps> = (props) => {
  const { markdownContent } = props;

  return (
    <div>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]} // Add GitHub Flavored Markdown support
        rehypePlugins={[rehypeHighlight]} // Add syntax highlighting
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};