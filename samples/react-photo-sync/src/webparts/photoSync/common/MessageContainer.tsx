import * as React from 'react';
import styles from './CommonStyle.module.scss';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { MessageScope } from './IModel';

export interface IMessageContainerProps {
    Message?: string;
    MessageScope: MessageScope;
    ShowDismiss?: boolean;
}

export default function MessageContainer(props: IMessageContainerProps) {
    const [showMessage, setshowMessage] = React.useState<boolean>(true);
    const dismissMessage = () => {
        setshowMessage(false);
    };
    const dismiss = props.ShowDismiss ? dismissMessage : null;
    return (
        <div className={styles.MessageContainer}>
            {
                props.MessageScope === MessageScope.Success && showMessage &&
                <MessageBar messageBarType={MessageBarType.success} onDismiss={dismiss}>
                    <Text block variant={"mediumPlus"}>{props.Message}</Text>
                </MessageBar>
            }
            {
                props.MessageScope === MessageScope.Failure && showMessage &&
                <MessageBar messageBarType={MessageBarType.error} onDismiss={dismiss}>
                    <Text block variant={"mediumPlus"}>{props.Message}</Text>
                </MessageBar>
            }
            {
                props.MessageScope === MessageScope.Warning && showMessage &&
                <MessageBar messageBarType={MessageBarType.warning} onDismiss={dismiss}>
                    <Text block variant={"mediumPlus"}>{props.Message}</Text>
                </MessageBar>
            }
            {
                props.MessageScope === MessageScope.Info && showMessage &&
                <MessageBar messageBarType={MessageBarType.info} className={styles.infoMessage} onDismiss={dismiss}>
                    <Text block variant={"mediumPlus"}>{props.Message}</Text>
                </MessageBar>
            }
            {
                props.MessageScope === MessageScope.Blocked && showMessage &&
                <MessageBar messageBarType={MessageBarType.blocked} onDismiss={dismiss}>
                    <Text block variant={"mediumPlus"}>{props.Message}</Text>
                </MessageBar>
            }
            {
                props.MessageScope === MessageScope.SevereWarning && showMessage &&
                <MessageBar messageBarType={MessageBarType.severeWarning} onDismiss={dismiss}>
                    <Text block variant={"mediumPlus"}>{props.Message}</Text>
                </MessageBar>
            }
        </div>
    );
}