import * as React from "react";
import UserQuestion from "./UserQuestion";
import AssitantResponse from "./AssistantResponse";
import { IChatMessage } from "../models/IChatMessage";

import { ScrollablePane, ScrollbarVisibility } from '@fluentui/react';

export interface IMessagesListProps {
    messages: IChatMessage[];
}

export default class MessagesList extends React.Component<IMessagesListProps, {}> {

    public render(): React.ReactElement<IMessagesListProps> {
        const output = this.props.messages.map((m, i) => {
            if (m.role === 'user') {
                return <UserQuestion key={i} message={m.text} />
            }
            return <AssitantResponse key={i} message={m.text} />
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
