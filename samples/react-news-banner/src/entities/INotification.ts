import { MessageBarType } from "office-ui-fabric-react";

export interface INotification {
    message: string;
    messageBarType: MessageBarType;
    isToShow: boolean;
}
