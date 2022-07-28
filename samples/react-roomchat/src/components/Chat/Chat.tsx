/* eslint-disable no-empty */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable @microsoft/spfx/no-async-await */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';

import {
  ActionButton,
  MessageBarType,
  SpinnerSize,
  Stack,
} from 'office-ui-fabric-react';
import * as strings from 'RoomChatWebPartStrings';

import {
  AvatarPersonaData,
  ChatAdapter,
  ChatComposite,
} from '@azure/communication-react';
import { isEmpty } from '@microsoft/sp-lodash-subset';

import { EProcessingStatus } from '../../constants/EProcessingStatus';
import {
  GlobalStateContext,
  IGlobalStateContext,
} from '../../globalStateProvider';
import { useAcsApi } from '../../hooks/useAcsApi';
import { IErrorInfo } from '../../models/IErrorInfo';
import { IUserIdentity } from '../../models/IUserIdentity';
import { getBackgroundColor } from '../../utils/avatars';
import { useUtils } from '../../utils/useUtils';
import { useChatPanelStyles } from '../ChatPanel/useChatPanelStyles';
import { Message } from '../Message/message';
import { Spinner } from '../Spinner/Spinner';
import { ShowParticipantsButton } from './ShowParticipantsButton';

export interface IChatProps {
  onLeaveChat: () => void;
}

export const Chat: React.FunctionComponent<IChatProps> = (props: React.PropsWithChildren<IChatProps>) => {
  const { onLeaveChat } = props;
  const { stackChatContainer } = useChatPanelStyles();
  const { GlobalState } = React.useContext<IGlobalStateContext>(GlobalStateContext);
  const { useIdentity, chatThreadId, context, theme } = GlobalState;
  const chatAdapterRef: React.MutableRefObject<ChatAdapter> = React.useRef<ChatAdapter>(null);
  const [chatAdapter, setChatAdapter] = React.useState<ChatAdapter>(null);
  const { createAdapter } = useAcsApi();
  const { userId, displayName, userCredential } = useIdentity || ({} as IUserIdentity);
  const [processingStatus, setProcessingStatus] = React.useState<EProcessingStatus>(EProcessingStatus.Loading);
  const [errorInfo, setErrorInfo] = React.useState<IErrorInfo>({ hasError: false, error: undefined });
  const [showParticipants, setShowParticipants] = React.useState(true);
  const { getChatParticipantFromSupportList, removeChatParticipantFromSupportList } = useUtils();

  const onFetchAvatarPersonaData = (userId: string): Promise<AvatarPersonaData> =>
    getChatParticipantFromSupportList(context.instanceId, userId).then((userInfo) => {
      return new Promise((resolve) => {
        return resolve({
          imageInitials: userInfo?.avatar,
          initialsColor: userInfo?.avatar ? getBackgroundColor(userInfo?.avatar)?.backgroundColor : "#0078d4",
          imageUrl: !userInfo?.avatar ? `/_layouts/15/userphoto.aspx?size=L&username=${userInfo?.email}` : undefined,
        });
      });
    });

  React.useEffect(() => {
    (async () => {
      try {
        const chatAdapter: ChatAdapter = await createAdapter(displayName, userId, userCredential, chatThreadId);
        chatAdapterRef.current = chatAdapter;
        setChatAdapter(chatAdapter);
        setProcessingStatus(EProcessingStatus.Done);
        setErrorInfo({ hasError: false, error: undefined });
      } catch (error) {
        setProcessingStatus(EProcessingStatus.Error);
        setErrorInfo({ hasError: true, error });
        setProcessingStatus(EProcessingStatus.Done);
      }
    })();

    return () => {
      chatAdapterRef.current?.dispose();
    };
  }, [chatThreadId, createAdapter, displayName, userCredential, userId]);

  const onLeaveClick: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    async (ev) => {
      ev.preventDefault();
      chatAdapter.removeParticipant(userId);
      await removeChatParticipantFromSupportList(context.instanceId, userId);
      onLeaveChat();
    },
    [chatAdapter, context.instanceId, onLeaveChat, removeChatParticipantFromSupportList, userId]
  );

  const onShowParticipants: React.MouseEventHandler<HTMLButtonElement> = React.useCallback(
    (ev) => {
      ev.preventDefault();
      setShowParticipants(!showParticipants);
    },
    [showParticipants]
  );

  if (isEmpty(useIdentity)) return null;

  if (processingStatus === EProcessingStatus.Error) {
    const { error } = errorInfo;
    return (
      <Message showMessage={true} message={""} msgType={MessageBarType.error}>
        {error.message}
      </Message>
    );
  }

  if (processingStatus === EProcessingStatus.Loading) {
    return <Spinner showSpinner={true} size={SpinnerSize.medium} />;
  }

  if (processingStatus === EProcessingStatus.Done && chatAdapter) {
    return (
      <>
        <Stack horizontal horizontalAlign="end" tokens={{ childrenGap: 10 }}>
          <ActionButton iconProps={{ iconName: "Leave" }} allowDisabledFocus onClick={onLeaveClick}>
            {strings.LeaveChatLabel}
          </ActionButton>

          <ShowParticipantsButton showParticipants={showParticipants} onClick={onShowParticipants} />
        </Stack>
        <Stack tokens={{ childrenGap: 10 }} styles={stackChatContainer}>
          <ChatComposite
            adapter={chatAdapter}
            fluentTheme={{...theme}}
            options={{
              errorBar: true,
              participantPane: showParticipants,
            }}
            onFetchAvatarPersonaData={onFetchAvatarPersonaData}
          />
        </Stack>
      </>
    );
  }
  return null;
};
