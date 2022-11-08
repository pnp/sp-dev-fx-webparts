/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @microsoft/spfx/no-async-await */
/* eslint-disable @typescript-eslint/typedef */
import * as React from 'react';

import {
  ChatClient,
  ChatThreadClient,
} from '@azure/communication-chat';
import {
  AzureCommunicationTokenCredential,
  CommunicationUserIdentifier,
} from '@azure/communication-common';
import {
  CommunicationAccessToken,
  CommunicationIdentityClient,
} from '@azure/communication-identity';
import {
  ChatAdapter,
  createAzureCommunicationChatAdapter,
  fromFlatCommunicationIdentifier,
} from '@azure/communication-react';

import { ENDPOINT_URL } from '../constants';
import {
  EActionTypes,
  GlobalStateContext,
  IGlobalStateContext,
  IState,
} from '../globalStateProvider';
import { IChatModeratorInfo } from '../models/IChatModeratorInfo';
import { IErrorInfo } from '../models/IErrorInfo';
import { IUserIdentity } from '../models/IUserIdentity';
import { useUtils } from '../utils/useUtils';

export const useAcsApi = () => {
  const { GlobalState, setGlobalState } = React.useContext<IGlobalStateContext>(GlobalStateContext);
  const { context, topic, useIdentity, acsConnectString, moderatorInfo } = GlobalState || ({} as IState);
  const { instanceId } = context || {};
  const { email } = context?.pageContext?.user || {};
  const { displayName } = useIdentity || { displayName: context?.pageContext?.user.displayName };
  const {checkIfSupportListExists, getThreadInformationFromSupportList, saveThreadInformationToSupportList, createChatSupportList } = useUtils();

  const errorHandler = React.useCallback(
    (error: Error, origem: string) => {
      setGlobalState({
        type: EActionTypes.SET_ERROR_INFO,
        payload: { hasError: true, error } as IErrorInfo,
      });
      console.log(`Error in ${origem}: ${error.message}`);
    },
    [setGlobalState]
  );

  const getIdentityClient = React.useCallback(async () => {
    const identityClient = new CommunicationIdentityClient(acsConnectString);

    return identityClient;
  }, [acsConnectString]);

  const getToken = React.useCallback(
    async (
      identityClient: CommunicationIdentityClient,
      userId: CommunicationUserIdentifier
    ): Promise<CommunicationAccessToken> => {
      return await identityClient?.getToken(userId, ["chat"]);
    },
    []
  );

  // get user identity (usersId and Token)
  const getUserIdentity = React.useCallback(async (): Promise<IUserIdentity> => {
    if (!displayName || !acsConnectString || !context) return undefined;

    const identityClient = await getIdentityClient();
    const identityResponse = await identityClient.createUser();
    const tokenResponse = await getToken(identityClient, identityResponse);

    const { token } = tokenResponse;
    const credential = new AzureCommunicationTokenCredential({
      tokenRefresher: async () => (await getToken(identityClient, identityResponse)).token,
      refreshProactively: true,
    });

    return {
      userId: identityResponse.communicationUserId,
      accessToken: token,
      displayName: displayName,
      userCredential: credential,
      email: email,
    };
  }, [acsConnectString, context, displayName, email, getIdentityClient, getToken]);

  const getCredentials = React.useCallback(async (token: string): Promise<AzureCommunicationTokenCredential> => {
    try {
      if (!token) return undefined;
      return new AzureCommunicationTokenCredential(token);
    } catch {
      console.error("Failed to construct token credential");
      throw new Error("Failed to construct token credential");
    }
  }, []);

  const createChatThread = React.useCallback(async (): Promise<IChatModeratorInfo> => {
    if (!acsConnectString || !context) return undefined;

    const configurationListExists =  await checkIfSupportListExists();
    if (!configurationListExists) {
      await createChatSupportList();
    }
    let chatModeratorInfo: IChatModeratorInfo = await getThreadInformationFromSupportList(instanceId);
    if (chatModeratorInfo) {
      return chatModeratorInfo;
    }
    const userIdentity = await getUserIdentity();

    if (!userIdentity) return undefined;
    try {
      const { userId, accessToken, userCredential } = userIdentity || ({} as IUserIdentity);
      const client = new ChatClient(ENDPOINT_URL, userCredential);
      const { chatThread } = await client.createChatThread(
        {
          topic: topic ?? "Room Chat",
        },
        {
          participants: [
            {
              id: fromFlatCommunicationIdentifier(userId),
            },
          ],
        }
      );
      const threadId = chatThread?.id;

      chatModeratorInfo = {
        threadId: threadId,
        moderatorAccessToken: accessToken,
        moderatorUserId: userId,
        email: email,
        page: context?.pageContext?.web?.absoluteUrl,
      } as IChatModeratorInfo;

      await saveThreadInformationToSupportList(instanceId, chatModeratorInfo);

      return chatModeratorInfo;
    } catch (error) {
      errorHandler(error, "createChatThread");
    }
  }, [
    acsConnectString,
    context,
    email,
    errorHandler,
    getThreadInformationFromSupportList,
    getUserIdentity,
    instanceId,
    saveThreadInformationToSupportList,
    topic,
    createChatSupportList,
    checkIfSupportListExists
  ]);

  const getCurrentThreadById = React.useCallback(
    (threadId: string, moderatorAccessToken: string): ChatThreadClient => {
      if (!threadId || !moderatorAccessToken) {
        return undefined;
      }
      try {
        const client = new ChatClient(ENDPOINT_URL, new AzureCommunicationTokenCredential(moderatorAccessToken));
        const currentThread = client.getChatThreadClient(threadId);
        return currentThread;
      } catch (error) {
        errorHandler(error, "getCurrentThreadById");
      }
    },
    [errorHandler]
  );

  const addParticipantsToChatThreadClient = React.useCallback(
    async (userId: string, displayName: string): Promise<void> => {
      if (!moderatorInfo || !userId || !displayName) return;
      try {
        const { threadId, moderatorAccessToken } = moderatorInfo;
        const chatThreadClient = getCurrentThreadById(threadId, moderatorAccessToken);

        await chatThreadClient.addParticipants({
          participants: [{ id: fromFlatCommunicationIdentifier(userId), displayName: displayName }],
        });
      } catch (error) {
        errorHandler(error, "addParticipantsToChatThreadClient");
      }
    },
    [errorHandler, getCurrentThreadById, moderatorInfo]
  );

  const createAdapter = React.useCallback(
    async (userName: string, userId: string, credential, threadId: string): Promise<ChatAdapter> => {
      if (!userName || !userId || !credential || !threadId) return undefined;
      try {
        const chatAdapterArgs = {
          endpoint: ENDPOINT_URL,
          userId: fromFlatCommunicationIdentifier(userId) as CommunicationUserIdentifier,
          displayName: userName,
          credential,
          threadId: threadId,
        };
        // eslint-disable-next-line @typescript-eslint/typedef
        const chatAdapter = await createAzureCommunicationChatAdapter(chatAdapterArgs);
        return chatAdapter;
      } catch (error) {
        errorHandler(error, "createAdapter");
      }
    },
    [errorHandler]
  );

  return {
    errorHandler,
    createChatThread,
    getUserIdentity,
    getCredentials,
    createAdapter,
    getCurrentThreadById,
    addParticipantsToChatThreadClient,
  };
};

