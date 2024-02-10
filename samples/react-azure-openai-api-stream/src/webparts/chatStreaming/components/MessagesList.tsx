import * as React from "react";
import UserQuestion from "./UserQuestion";
import AssistantResponse from "./AssistantResponse";
import { IChatMessage } from "../models/IChatMessage";
import styles from "./ChatStreaming.module.scss";

import { ScrollablePane, ScrollbarVisibility } from '@fluentui/react';

export interface IMessagesListProps {
    messages: IChatMessage[];
    disableMarkdown?: boolean;
    thinking?: boolean;
}

export default class MessagesList extends React.Component<IMessagesListProps, {}> {

    public componentDidUpdate(): void {
        const scrollContainers = document.querySelectorAll(".ms-ScrollablePane--contentContainer");
        const lastScrollContainer = scrollContainers[scrollContainers.length - 1] as HTMLElement;

        if (lastScrollContainer) {
          lastScrollContainer.scrollTop = lastScrollContainer.scrollHeight;
        }
      }


    public render(): React.ReactElement<IMessagesListProps> {
        const output = this.props.messages.map((m, i) => {
            if (m.role === 'user') {
                return <UserQuestion key={i} message={m.text} />
            }
            return <AssistantResponse key={i} message={m.text} disableMarkdown={this.props.disableMarkdown} thinking={this.props.thinking} />
        });

        return (
            <div className={styles.messagesList}>
                <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto} className={styles.scrollablePane}>
                    {output}
                </ScrollablePane>
            </div>
        );
    }
}
