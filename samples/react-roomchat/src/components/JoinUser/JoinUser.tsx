/* eslint-disable @microsoft/spfx/no-async-await */
import * as react from 'react';
import * as React from 'react';

import {
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  IDialogContentProps,
  IModalProps,
  PrimaryButton,
  SpinnerSize,
  Stack,
  Text,
  TextField,
} from 'office-ui-fabric-react';
import * as strings from 'RoomChatWebPartStrings';

import { AzureCommunicationTokenCredential } from '@azure/communication-common';

import { EScreens } from '../../constants/EScreens';
import {
  EActionTypes,
  GlobalStateContext,
  IGlobalStateContext,
} from '../../globalStateProvider';
import { useAcsApi } from '../../hooks';
import { IUserIdentity } from '../../models/IUserIdentity';
import { useUtils } from '../../utils/useUtils';
import { Avatars } from '../Avatars/Avatars';
import { Spinner } from '../Spinner/Spinner';
import { useJoinUserStyles } from './useJoinUserStyles';

export interface IJoinUserProps {
  isOpen: boolean;
  onDismiss: () => void;
}

export const JoinUser: React.FunctionComponent<IJoinUserProps> = (props: React.PropsWithChildren<IJoinUserProps>) => {
  const { GlobalState, setGlobalState } = React.useContext<IGlobalStateContext>(GlobalStateContext);
  const { isOpen, onDismiss } = props;
  const { topic, context, chatThreadId, useIdentity, theme } = GlobalState;
  const { displayName, email } = context.pageContext.user;
  const { dialogContentStyles, modalStyles, textAvatarLabelStyles } = useJoinUserStyles();
  const [userName, setUserName] = React.useState(displayName);
  const { addParticipantsToChatThreadClient, getCredentials, getUserIdentity } = useAcsApi();
  const [isRunning, setIsRunning] = React.useState(false);
  const { saveChatParticipantToSupportList } = useUtils();

  const modelProps: IModalProps = react.useMemo(() => {
    return {
      isBlocking: true,
      styles: modalStyles,
    };
  }, [modalStyles]);

  const dialogContentProps: IDialogContentProps = React.useMemo(() => {
    return {
      type: DialogType.largeHeader,
      title: `${strings.DialogTitleLabel} ${topic}`,
      subText: strings.DialogSubTitleLabel,
      styles: dialogContentStyles,
    };
  }, [dialogContentStyles, topic]);

  react.useEffect(() => {
    setGlobalState({
      type: EActionTypes.SET_USER_INFO,
      payload: {
        ...useIdentity,
        displayName: userName,
      } as IUserIdentity,
    });
  }, [userName]);

  const onChange: (
    ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => void = React.useCallback(
    (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string): void => {
      ev.preventDefault();
      setUserName(newValue);
    },
    []
  );

  const hasUserName: boolean = react.useMemo(() => {
    return userName.length > 0;
  }, [userName]);

  const onSelectAvatar: (avatar: string) => void = React.useCallback(
    (avatar: string): void => {
      setGlobalState({
        type: EActionTypes.SET_USER_INFO,
        payload: {
          ...useIdentity,
          displayName: userName,
          avatar: avatar,
        } as IUserIdentity,
      });
    },
    [setGlobalState, useIdentity, userName]
  );

  const onJoin: () => void = React.useCallback(async () => {
    let participantUserId: string;
    let participantDisplayName: string;
    const { userId, displayName } = useIdentity;

    setIsRunning(true);
    if (!userId) {
      const userIdentity: IUserIdentity = await getUserIdentity();
      const { userId, accessToken } = userIdentity;
      const userCredential: AzureCommunicationTokenCredential = await getCredentials(accessToken);
      participantUserId = userId;
      participantDisplayName = displayName;
      const userInfo: IUserIdentity = {
        ...useIdentity,
        userId: userId,
        accessToken: accessToken,
        userCredential: userCredential,
        threadId: chatThreadId,
        email: email,
      } as IUserIdentity;

      setGlobalState({
        type: EActionTypes.SET_USER_INFO,
        payload: userInfo,
      });
      await saveChatParticipantToSupportList(context.instanceId, userInfo);
    } else {
      participantUserId = userId;
      participantDisplayName = displayName;
      await saveChatParticipantToSupportList(context.instanceId, useIdentity);
    }

    await addParticipantsToChatThreadClient(participantUserId, participantDisplayName);
    setIsRunning(false);
    setGlobalState({
      type: EActionTypes.SET_SHOW_SCREEN,
      payload: EScreens.RoomChatJoin,
    });

    setGlobalState({
      type: EActionTypes.SET_START_CHAT,
      payload: true,
    });

    onDismiss();
  }, [
    addParticipantsToChatThreadClient,
    chatThreadId,
    context.instanceId,
    email,
    getCredentials,
    getUserIdentity,
    onDismiss,
    saveChatParticipantToSupportList,
    setGlobalState,
    useIdentity,
  ]);

  return (
    <>
      <Dialog hidden={!isOpen} onDismiss={onDismiss} dialogContentProps={dialogContentProps} modalProps={modelProps}>
        <Stack tokens={{ childrenGap: 10 }} style={{ padding: 0 }}>
          <Text variant="medium" styles={textAvatarLabelStyles}>
            Avatar
          </Text>
          <Avatars onSelect={onSelectAvatar} />
          <TextField value={userName} label={"Name"} onChange={onChange} placeholder={strings.EnterNameLabel} />
        </Stack>

        <DialogFooter>
          <PrimaryButton onClick={onJoin} disabled={!hasUserName}>
            {isRunning ? (
              <Spinner
                size={SpinnerSize.xSmall}
                showSpinner={isRunning}
                styles={{ root: { color: theme.palette.white } }}
              />
            ) : (
              "Join"
            )}
          </PrimaryButton>
          <DefaultButton onClick={onDismiss} text={strings.BurttonLabelCancel} />
        </DialogFooter>
      </Dialog>
    </>
  );
};
