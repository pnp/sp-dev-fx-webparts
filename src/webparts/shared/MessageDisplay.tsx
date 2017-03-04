
import * as React from "react";
import { Guid } from "@microsoft/sp-core-library";
import { MessageBar, MessageBarType } from "office-ui-fabric-react/lib/MessageBar";

/**
 *  A helper class used to hold messages to be displayed in a MessageBar
 * 
 * @export
 * @class Message
 */
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

/**
 * A class used to Display Messages in the webpart.
 * 
 * @export
 * @class MessageDisplay
 * @extends {React.Component<IMessageDisplayProps, any>}
 */
export default class MessageDisplay extends React.Component<IMessageDisplayProps, any> {
    /**
     * 
     * 
     * 
     * @memberOf MessageDisplay
     */
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
