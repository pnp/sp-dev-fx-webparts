import * as React from 'react';

/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Chat,
  ChatMessage,
} from '@microsoft/microsoft-graph-types';
import { BaseComponentContext } from '@microsoft/sp-component-base';

export const useGraphAPI = (context: BaseComponentContext) => {
  const graphClient = React.useMemo(() => {
    return async () => {
      const client = await context.msGraphClientFactory.getClient("3");
      return client;
    };
  }, [context]);
  const sendMessageToChat = React.useCallback(
    async (chatId: string, chatMessagePayload: object): Promise<ChatMessage> => {
      const chatMessage = await (await graphClient()).api(`/chats/${chatId}/messages`).post(chatMessagePayload);
      return chatMessage;
    },
    [graphClient]
  );

  const sendMessageToChannel = React.useCallback(
    async (teamsId: string, channelId: string, chatMessagePayload: object): Promise<ChatMessage> => {
      const channelMessage = await (await graphClient())
        .api(`/teams/${teamsId}/channels/${channelId}/messages`)
        .post(chatMessagePayload);
      return channelMessage;
    },
    [graphClient]
  );

  const replyToMessage = React.useCallback( async (teamsId: string, channelId: string, parentMessageId: string, chatMessagePayload: object) => {
    return (await graphClient())
      .api(`/teams/${teamsId}/channels/${channelId}/messages/${parentMessageId}/replies`)
      .post(chatMessagePayload);
  }, []);

  const getChatInfo = React.useCallback(
    async (chatId: string): Promise<Chat> => {
      const response: Chat =  await (await graphClient()).api(`/chats/${chatId}`).get();
      return response;
    },
    [context]
  );

 const  getChatParentMessage = React.useCallback(async (chatId: string,  parentMessageId: string):Promise<ChatMessage> => {
    return (await graphClient()).api(`/chats/${chatId}/messages/${parentMessageId}`).get();
  }, []);

  const  getChannelParentMessage = React.useCallback(async (teamId: string,channelId:string,  parentMessageId: string):Promise<ChatMessage> => {
    return (await graphClient()).api(`/teams/${teamId}/channels/${channelId}/messages/${parentMessageId}`).get();
  }, []);

  return { sendMessageToChat, sendMessageToChannel,  replyToMessage, getChatInfo, getChatParentMessage, getChannelParentMessage };
};
