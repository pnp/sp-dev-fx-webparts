import * as React from 'react';

import {
  MessageBarType,
  Stack,
} from 'office-ui-fabric-react';

import {
  GlobalStateContext,
  IGlobalStateContext,
} from '../../globalStateProvider';
import { IErrorInfo } from '../../models/IErrorInfo';
import { Message } from '../Message/message';

export interface IRoomChatErrorProps {}

export const RoomChatError: React.FunctionComponent<IRoomChatErrorProps> = () => {
  const { GlobalState } = React.useContext<IGlobalStateContext>(GlobalStateContext);
  const { errorInfo } = GlobalState;
  const { hasError, error } = errorInfo || ({ hasError: false, error: null } as IErrorInfo);

  if (hasError) {
    return (
      <>
        <Stack tokens={{ childrenGap: 10 }} horizontalAlign={"center"}>
          <Message message={error.message} msgType={MessageBarType.error} showMessage={true} />
        </Stack>
      </>
    );
  }
  return null;
};
