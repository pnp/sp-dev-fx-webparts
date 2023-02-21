import * as React from 'react';

import {
  MessageBar,
  MessageBarType,
} from 'office-ui-fabric-react/lib/MessageBar';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { IErrorMessageProps } from '../../models/IErrorMessageProps';
import { useChatGptStyles } from '../ChatGpt/useChatGptStyles';

export const ErrorMessage: React.FunctionComponent<IErrorMessageProps> = (
  props: React.PropsWithChildren<IErrorMessageProps>
) => {
  const { showError, errorMessage, children } = props;
  const { messageErrorContainerStyles} = useChatGptStyles();
  if (!showError) return null;
  return (
    <>
      <Stack verticalAlign="center" tokens={{ padding: 10, childrenGap: 10 }} styles={messageErrorContainerStyles}>
        <MessageBar messageBarType={MessageBarType.error} isMultiline={true}>
          {errorMessage}
          {children}
        </MessageBar>
      </Stack>
    </>
  );
};
