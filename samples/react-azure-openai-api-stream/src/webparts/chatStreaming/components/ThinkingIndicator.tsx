import * as React from "react";
import styles from "./ChatStreaming.module.scss";
import { css } from "@fluentui/react";

export interface IThinkingIndicatorProps {}

export default class ThinkingIndicator extends React.Component<
    IThinkingIndicatorProps,
    {}
> {
    public render(): React.ReactElement<IThinkingIndicatorProps> {
        return (
            <div className={styles.thinkingIndicator}>
                <div className={styles.allDots}>
                    <div className={css(styles.dot, styles.dot1)} />
                    <div className={css(styles.dot, styles.dot2)} />
                    <div className={css(styles.dot, styles.dot3)} />
                </div>
            </div>
        );
    }
}
