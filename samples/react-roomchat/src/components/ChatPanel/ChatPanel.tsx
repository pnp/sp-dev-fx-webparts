/* eslint-disable @typescript-eslint/typedef */
import * as React from 'react';

import {
  Panel,
  PanelType,
  Stack,
} from 'office-ui-fabric-react';

import { EScreens } from '../../constants/EScreens';
import {
  EActionTypes,
  GlobalStateContext,
  IGlobalStateContext,
} from '../../globalStateProvider';
import { Chat } from '../Chat/Chat';
import { IChatPanelProps } from './IChatPanelProps';
import { useChatPanelStyles } from './useChatPanelStyles';

export const ChatPanel: React.FunctionComponent<IChatPanelProps> = (
  props: React.PropsWithChildren<IChatPanelProps>
) => {
  const { GlobalState, setGlobalState } = React.useContext<IGlobalStateContext>(GlobalStateContext);
  const { startChat } = GlobalState || {};
  const { panelStyles } = useChatPanelStyles();

  const onDismiss: (ev?: React.SyntheticEvent<HTMLElement, Event> | KeyboardEvent) => void = React.useCallback(
    (ev): void => {
      setGlobalState({
        type: EActionTypes.SET_SHOW_SCREEN,
        payload: EScreens.RoomChatJoin,
      });
      setGlobalState({
        type: EActionTypes.SET_START_CHAT,
        payload: false,
      });
    },
    [setGlobalState]
  );




  return (
    <>
      <Stack>
        <Panel
          isOpen={startChat}
          onDismiss={onDismiss}
          hasCloseButton={false}
          type={PanelType.large}
          styles={panelStyles}
        >

          <Stack tokens={{ childrenGap: 20, padding: 10 }} styles={{root:{height:  `95%`, paddindBottom: 20}}}>
            <Chat onLeaveChat={onDismiss}/>
          </Stack>

        </Panel>
      </Stack>
    </>
  );

};
