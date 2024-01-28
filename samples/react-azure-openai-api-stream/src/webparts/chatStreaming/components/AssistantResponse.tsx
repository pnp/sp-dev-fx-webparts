import { Stack } from "@fluentui/react";
import { Icon } from '@fluentui/react';
import * as React from "react";
import styles from "./ChatStreaming.module.scss";

export interface IAssistantResponseProps {
  message: string;
}

export default class AssistantResponse extends React.Component<
  IAssistantResponseProps,
  {}
> {
  public render(): React.ReactElement<IAssistantResponseProps> {
    return (
      <Stack horizontal className={styles.assistantResponse}>
        <Icon iconName="Robot" />
        <div className={styles.messageBox}>
          <p className={styles.message}>{this.props.message}</p>
          <div className={styles.beak}/>
        </div>
      </Stack>
    );
  }
}
