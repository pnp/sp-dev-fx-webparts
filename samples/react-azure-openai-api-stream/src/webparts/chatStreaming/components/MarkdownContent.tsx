import { css } from "@fluentui/react";
import * as React from "react";
import styles from "./ChatStreaming.module.scss";
import { Remark } from "react-remark";
import remarkGfm from "remark-gfm";

export interface IMarkdownContentProps {
  children: string;
  className?: string;
}

export default class MarkdownContent extends React.Component<
  IMarkdownContentProps,
  {}
> {
  public render(): React.ReactElement<IMarkdownContentProps> {
    return (
      <div className={css(styles.markdownContent, this.props.className)}>
        <Remark remarkPlugins={[remarkGfm]}>{this.props.children}</Remark>
      </div>
    );
  }
}