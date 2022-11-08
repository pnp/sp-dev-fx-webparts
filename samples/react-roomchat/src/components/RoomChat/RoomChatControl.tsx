/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @microsoft/spfx/no-async-await */
import * as React from 'react';

import {
  Spinner,
  SpinnerSize,
} from 'office-ui-fabric-react';

import { ChatThreadClient } from '@azure/communication-chat';

import { EProcessingStatus } from '../../constants/EProcessingStatus';
import { EScreens } from '../../constants/EScreens';
import {
  EActionTypes,
  GlobalStateContext,
  IGlobalStateContext,
} from '../../globalStateProvider';
import { useAcsApi } from '../../hooks';
import { IChatModeratorInfo } from '../../models/IChatModeratorInfo';
import { IErrorInfo } from '../../models/IErrorInfo';
import { ChatPanel } from '../ChatPanel/ChatPanel';
import { RoomChatConfig } from '../RoomChatConfig/RoomChatConfig';
import { RoomChatError } from '../RoomChatError/RoomChatError';
import { RoomChatJoin } from '../RoomChatJoin/RoomChatJoin';
import { IRoomChatProps } from './IRoomChatProps';

export const RoomChatControl: React.FunctionComponent<IRoomChatProps> = (
  props: React.PropsWithChildren<IRoomChatProps>
) => {
  const { theme, topic, context, acsConnectString } = props;
  const { GlobalState, setGlobalState } = React.useContext<IGlobalStateContext>(GlobalStateContext);
  const [processingStatus, setProcessingStatus] = React.useState<EProcessingStatus>(EProcessingStatus.Loading);
  const { moderatorInfo } = GlobalState;
  const { threadId, moderatorAccessToken } = moderatorInfo || ({} as IChatModeratorInfo);
  const { getCurrentThreadById } = useAcsApi();

  React.useEffect(() => {
    setGlobalState({
      type: EActionTypes.SET_CONTEXT,
      payload: context,
    });
    setGlobalState({
      type: EActionTypes.SET_THEME,
      payload: theme,
    });
    setProcessingStatus(EProcessingStatus.Done);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setGlobalState({
      type: EActionTypes.SET_ACS_CONNECT_STRING,
      payload: acsConnectString,
    });

    setGlobalState({
      type: EActionTypes.SET_SHOW_SCREEN,
      payload: acsConnectString ? EScreens.RoomChatJoin : EScreens.RoomChatConfig,
    });
    setProcessingStatus(EProcessingStatus.Done);
  }, [acsConnectString, setGlobalState]);

  React.useEffect(() => {
    try {
      if (threadId && moderatorAccessToken ) {

        const currentClient: ChatThreadClient = getCurrentThreadById(threadId, moderatorAccessToken);
        currentClient.updateTopic(topic);
      }
      setGlobalState({
        type: EActionTypes.SET_TOPIC,
        payload: topic,
      });
    } catch (error) {
      if (DEBUG){
        console.log('[RoomChatControl] Error updating topic: ', error);
      }
      setGlobalState({
        type: EActionTypes.SET_ERROR_INFO,
        payload: { hasError: true, error } as IErrorInfo,
      });
    }

  }, [getCurrentThreadById, moderatorAccessToken, setGlobalState, threadId, topic]);

  if (processingStatus === EProcessingStatus.Loading) {
    return <Spinner size={SpinnerSize.medium} />;
  }
  return (
    <>
      <RoomChatError />
      <RoomChatJoin />
      <RoomChatConfig />
      <ChatPanel />
    </>
  );
};
