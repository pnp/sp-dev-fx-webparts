import * as React from 'react';

/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  Chat,
  ChatMessage,
} from '@microsoft/microsoft-graph-types';
import { BaseComponentContext } from '@microsoft/sp-component-base';

export const useGraphAPI = (context:  BaseComponentContext) => {

  const sendMessage =  React.useCallback(async (chatId: string, message: string):Promise<ChatMessage>  => {
    const client =  await  context.msGraphClientFactory.getClient("3");
    const response:ChatMessage =  await client.api(`/chats/${chatId}/messages`)
      .post({
        body: {
          content:  `${message}  (source: ChatGPT)` ,
        },
      });
    return response;
  },[context]);


const getChatInfo =  React.useCallback(async (chatId:string):Promise<Chat> => {
    const client =  await  context.msGraphClientFactory.getClient("3");
    const response:Chat =  await client.api(`/chats/${chatId}?$expand=members`)
      .get();
    return response;
  },[context]);

  return {sendMessage, getChatInfo}
};

