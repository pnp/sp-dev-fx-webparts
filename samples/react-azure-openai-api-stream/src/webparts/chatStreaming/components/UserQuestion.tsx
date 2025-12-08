import { Stack } from "@fluentui/react";
import * as React from "react";
import styles from "./ChatStreaming.module.scss";

// TypeScript declaration for MGT web components
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'mgt-person': any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'mgt-person-card': any;
    }
  }
}

export interface IUserQuestionProps {
  message: string;
}

export default class UserQuestion extends React.Component<
  IUserQuestionProps,
  {}
> {
  public render(): React.ReactElement<IUserQuestionProps> {
    return (
      <Stack horizontal horizontalAlign="end" className={styles.userQuestion} tokens={{ childrenGap: 12 }}>
        <div className={styles.messageBox}>
          <p className={styles.message}>{this.props.message}</p>
          <div className={styles.beak} />
        </div>
        <div className={styles.avatarContainer}>
          <mgt-person 
            className={styles.avatar} 
            person-query="me" 
            view="image" 
            avatar-size="40"
            person-card="hover"
            show-presence="true"
          />
        </div>
      </Stack>
    );
  }
}