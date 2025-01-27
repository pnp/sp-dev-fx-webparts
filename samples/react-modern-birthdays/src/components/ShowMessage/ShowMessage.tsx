import * as React from 'react';

import { Stack } from '@fluentui/react';
import {
  MessageBar,
  MessageBarType,
} from '@fluentui/react/lib/MessageBar';

export interface IShowMessageProps {
  message?: string;
  messageBarType: MessageBarType;
  isShow: boolean;
}

export const ShowMessage: React.FunctionComponent<IShowMessageProps> = (
  props: React.PropsWithChildren<IShowMessageProps>
) => {
  const { message, messageBarType, children, isShow } = props;

  return (
    <>
      {isShow ? (
        <Stack horizontal horizontalAlign="center">
          <MessageBar messageBarType={messageBarType} isMultiline>
            {message}
            {children}
          </MessageBar>
        </Stack>
      ) : null}
    </>
  );
};
