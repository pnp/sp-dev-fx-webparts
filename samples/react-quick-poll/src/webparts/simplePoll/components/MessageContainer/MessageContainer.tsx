import * as React from 'react';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Text } from 'office-ui-fabric-react/lib/Text';
import styles from './MessageContainer.module.scss';
import { MessageScope } from '../../../../Common/enumHelper';

export interface IMessageContainerProps {
    Message?: string;
    MessageScope: MessageScope;
}

export default function MessageContainer(props: IMessageContainerProps) {
    return (
        <div className={styles.MessageContainer}>
            {
                props.MessageScope === MessageScope.Success &&
                <MessageBar messageBarType={MessageBarType.success}>
                    <Text block variant={"mediumPlus"}>{props.Message}</Text>
                </MessageBar>
            }
            {
                props.MessageScope === MessageScope.Failure &&
                <MessageBar messageBarType={MessageBarType.error}>
                    <Text block variant={"mediumPlus"}>{props.Message}</Text>
                </MessageBar>
            }
            {
                props.MessageScope === MessageScope.Warning &&
                <MessageBar messageBarType={MessageBarType.warning}>
                    <Text block variant={"mediumPlus"}>{props.Message}</Text>
                </MessageBar>
            }
            {
                props.MessageScope === MessageScope.Info &&
                <MessageBar className={styles.infoMessage}>
                    <Text block variant={"mediumPlus"}>{props.Message}</Text>
                </MessageBar>
            }
        </div>
    );
}