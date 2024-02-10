import { Stack } from "@fluentui/react";
import { Icon } from '@fluentui/react';
import * as React from "react";
import styles from "./ChatStreaming.module.scss";
import MarkdownContent from "./MarkdownContent";
import ThinkingIndicator from "./ThinkingIndicator";

export interface IAssistantResponseProps {
  message: string;
  disableMarkdown?: boolean;
  thinking?: boolean;
}

export default class AssistantResponse extends React.Component<
  IAssistantResponseProps,
  {}
> {
  public render(): React.ReactElement<IAssistantResponseProps> {
    return (
      <Stack horizontal className={styles.assistantResponse}>
        <div className={styles.avatar}>
          <Icon iconName="Robot" />
        </div>
        <div className={styles.messageBox}>
          {this.props.thinking && this.props.message.length === 0 && 
            <ThinkingIndicator />
          }
          {this.props.disableMarkdown && this.props.message.length > 0 &&
            <p className={styles.message}>{this.props.message}</p>
          }
          {!this.props.disableMarkdown && this.props.message.length > 0 &&
            <MarkdownContent className={styles.message}>{this.props.message}</MarkdownContent>
          }
          <div className={styles.beak}/>
        </div>
      </Stack>
    );
  }
}
