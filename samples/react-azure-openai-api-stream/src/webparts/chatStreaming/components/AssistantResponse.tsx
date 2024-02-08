import { Stack } from "@fluentui/react";
import { Icon } from '@fluentui/react';
import * as React from "react";
import styles from "./ChatStreaming.module.scss";
import MarkdownContent from "./MarkdownContent";

export interface IAssistantResponseProps {
  message: string;
  disableMarkdown?: boolean;
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
          {this.props.disableMarkdown && 
            <p className={styles.message}>{this.props.message}</p>
          }
          {!this.props.disableMarkdown &&
            <MarkdownContent className={styles.message}>{this.props.message}</MarkdownContent>
          }
          <div className={styles.beak}/>
        </div>
      </Stack>
    );
  }
}
