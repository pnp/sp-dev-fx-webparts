
import * as React from "react";
import { Guid } from "@microsoft/sp-core-library";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

export class Message {
   public Id: string;
   public text: string;
    public constructor(msg: string) {
        this.text = msg;
        this.Id = Guid.newGuid().toString();
    }
}
export interface IMessageDisplayProps {
    messages: Array<Message>;
    hideMessage: (messageId) => void;
}

export default class MessageDisplay extends React.Component<IMessageDisplayProps, any> {
    public constructor(props) {
        super(props);
    }
    public createDismissHandler = (messageId) => (vale) => {
            this.props.hideMessage(messageId);
    }
    public render(): React.ReactElement<IMessageDisplayProps> {
           return (
            <div>
                {this.props.messages.map((message, y, z) => {
                    return (
                        <MessageBar
                            messageBarType={MessageBarType.remove}
                            isMultiline={true}
                            onDismiss={this.createDismissHandler(message.Id)}>
                            {message.text}
                        </MessageBar>
                    );
                })}
            </div>
        );
    }
}
