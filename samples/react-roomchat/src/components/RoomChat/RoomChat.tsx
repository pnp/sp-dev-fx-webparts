import * as React from 'react';

import { Customizer } from 'office-ui-fabric-react';

import { GlobalStateProvider } from '../../globalStateProvider';
import { IRoomChatProps } from './IRoomChatProps';
import { RoomChatControl } from './RoomChatControl';

export const RoomChat: React.FunctionComponent<IRoomChatProps> = (props: React.PropsWithChildren<IRoomChatProps>) => {
  return (
    <>
      <Customizer settings={{ theme: props.theme }}>
        <GlobalStateProvider>
          <RoomChatControl {...props} />
        </GlobalStateProvider>
      </Customizer>
    </>
  );
};
