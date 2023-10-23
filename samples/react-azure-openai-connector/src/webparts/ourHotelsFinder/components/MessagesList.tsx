import * as React from "react";
import UserQuestion from "./UserQuestion";
import AssistantResponse from "./AssistantResponse";
import { IChatMessage } from "../models/IChatMessage";

import { ScrollablePane, ScrollbarVisibility } from '@fluentui/react';

export interface IMessagesListProps {
    messages: IChatMessage[];
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
            return <AssistantResponse key={i} message={m.text} />
        });

        return (
            <div style= {{ backgroundColor: '#f3f3f3', minHeight: '200px' }}>
                <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto} style={{ padding: '20px' }}>
                    {output}
                </ScrollablePane>
            </div>
        );
    }
}
