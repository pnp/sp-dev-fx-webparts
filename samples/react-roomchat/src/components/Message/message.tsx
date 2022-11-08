import * as React from 'react';

import {
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react';

export interface IMessageProps {
showMessage: boolean;
message: string | JSX.Element
msgType: MessageBarType;
}

export const Message: React.FunctionComponent<IMessageProps> = (props: React.PropsWithChildren<IMessageProps>) => {

  const { showMessage, message, msgType } = props;

  if (showMessage) {
    return (
      <MessageBar messageBarType={msgType ?? MessageBarType.info} isMultiline>
        {message}
      </MessageBar>
    )
  }

  return null;
};
