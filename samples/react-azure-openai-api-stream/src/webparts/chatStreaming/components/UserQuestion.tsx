import { Stack } from "@fluentui/react";
import { Person } from "@microsoft/mgt-react/dist/es6/spfx";
import { ViewType } from "@microsoft/mgt-spfx";
import * as React from "react";
import styles from "./ChatStreaming.module.scss";

export interface IUserQuestionProps {
  message: string;
}

export default class UserQuestion extends React.Component<
  IUserQuestionProps,
  {}
> {
  public render(): React.ReactElement<IUserQuestionProps> {
    return (
      <Stack horizontal horizontalAlign="end" className={styles.userQuestion}>
        <div className={styles.messageBox}>
          <p className={styles.message}>{this.props.message}</p>
          <div className={styles.beak} />
        </div>
        <Person className={styles.avatar} personQuery="me" view={ViewType.image} avatarSize="auto" />
      </Stack>
    );
  }
}