import * as React from 'react';

import { Stack } from 'office-ui-fabric-react/lib/components/Stack';
import {
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react/lib/MessageBar';

export interface IShowMessageProps {
  message: string;
  messageBarType: MessageBarType;
  isShow: boolean;
}

export const ShowMessage: React.FunctionComponent<IShowMessageProps> = (
  props: React.PropsWithChildren<IShowMessageProps>
) => {
  const { message, messageBarType, isShow } = props;
  return (
    <>
      {isShow ? (
        <Stack horizontal horizontalAlign="center">
          <MessageBar messageBarType={messageBarType}>{message}</MessageBar>
        </Stack>
      ) : null}
    </>
  );
};
