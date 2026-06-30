import * as React from "react";
import styles from "./CopilotChatTab.module.scss";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface IMarkdownRendererProps {
  text: string;
}

export default class MarkdownRenderer extends React.Component<IMarkdownRendererProps> {
  private preprocessMarkdown(text: string): string {
    if (!text) return text;

    let processed = text;

    // Fix markdown links with complex SharePoint/OneDrive URLs
    // Angle-bracket wrap URLs to help the parser handle query params
    processed = processed.replace(
      /\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,
      (_match, label: string, url: string) => {
        const cleanUrl = url.trim().replace(/ /g, "%20");
        return `[${label}](<${cleanUrl}>)`;
      }
    );

    // Remove trailing citation numbers like " 1." or " 2." after links
    // These are already captured in the ReferencesBlock component
    processed = processed.replace(/\)\s+(\d+)\./g, ")");

    return processed;
  }

  public render(): React.ReactElement {
    const { text } = this.props;

    return (
      <ReactMarkdown
        className={styles.assistantMarkdown}
        remarkPlugins={[remarkGfm]}
        components={{
          a: (props) => (
            <a {...props} target="_blank" rel="noreferrer noopener" />
          ),
        }}
      >
        {this.preprocessMarkdown(text)}
      </ReactMarkdown>
    );
  }
}
