import * as React from 'react';

import { BaseComponentContext } from '@microsoft/sp-component-base';
import { Guid } from '@microsoft/sp-core-library';
import { isEmpty } from '@microsoft/sp-lodash-subset';

import { useGraphAPI } from '../hooks/useGraphAPI';
import { IAdaptativeCardData } from '../models/IAdaptivecardData';
import { HostedContents } from '../models/IChatMessage';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const useSendMessageToTeams = (context: BaseComponentContext) => {

const { sendMessageToChat, sendMessageToChannel, replyToMessage } = useGraphAPI(context);


  const getHostedContent = React.useCallback(async (adaptiveCard: object, adaptiveCardData: IAdaptativeCardData) => {
    try {
      const hostedContents: HostedContents[] = [];
      const adaptativeCardStringify = JSON.stringify(adaptiveCard);
      // implement your logic to get the hosted content replace all the images with the hosted content Base64 string
      return { hostedContents: hostedContents, adaptativeCardStringify: adaptativeCardStringify };
    } catch (error) {
      if (DEBUG) {
        console.error(`[SendMessage.getHostedContent]: error=${error}`);
        throw error;
      }
    }
  }, []);

  const getSendMessagePayload = React.useCallback(
    async (adaptiveCard: object, adaptiveCardData: IAdaptativeCardData) => {
      const guid = Guid.newGuid().toString();
      const attachments = [];
      if (isEmpty(adaptiveCard)) {
        return;
      }
      const body = {
        contentType: "html",
        content: '<attachment id="'.concat(guid, '"></attachment>'),
      };
      const { hostedContents, adaptativeCardStringify } = await getHostedContent(adaptiveCard, adaptiveCardData);
      attachments.push({
        id: guid,
        contentType: "application/vnd.microsoft.card.adaptive",
        contentUrl: null,
        name: null,
        content: adaptativeCardStringify,
        thumbnailUrl: null,
      });
      return { body: body, attachments: attachments, hostedContents: hostedContents };
    },
    []
  );


  const sendMessage = React.useCallback(
    async (
      adaptiveCard: object,
      adaptiveCardData: IAdaptativeCardData,
      chatId: string,
      teamsId: string,
      channelId: string,
      parentMessageId: string
    ) => {
      try {
        const { body, attachments, hostedContents } = await getSendMessagePayload(adaptiveCard, adaptiveCardData);
        const chatMessagePayload = {
          subject: "OpenAI Answer",
          body: body,
          attachments: attachments,
          hostedContents: hostedContents,
        };
        if (chatId && !teamsId && !channelId) {
          console.log('channelId', channelId);
          console.log('teamsId', teamsId);
          const chatMessage = await  sendMessageToChat(chatId, chatMessagePayload, );
          return chatMessage;
        }
        if (teamsId && channelId && !parentMessageId) {
          const channelMessage =  sendMessageToChannel(teamsId, channelId, chatMessagePayload);
          return channelMessage;
        }
        if (teamsId && channelId && parentMessageId) {
          const replyMessage = await replyToMessage(teamsId, channelId, parentMessageId, chatMessagePayload);
          return replyMessage;
        }
      } catch (error) {
        if (DEBUG) {
          console.error("[SendMessage]: error=", error);
          throw error;
        }
      }
    },
    [getSendMessagePayload, sendMessageToChannel, sendMessageToChat, replyToMessage,  ]
  );

  const sendAdativeCardToUsers = React.useCallback(
    async (
      adaptiveCard: object,
      adaptiveCardData: IAdaptativeCardData,
      chatId: string,
      teamsId: string,
      channelId: string,
      parentMessageId: string
    ) => {
      try {
        await sendMessage(adaptiveCard, adaptiveCardData, chatId, teamsId, channelId, parentMessageId);
      } catch (error) {
        if (DEBUG) {
          console.error(`[SendMessage.sendAdativeCardToUsers]: error=${error.message}`);
          throw error;
        }
      }
    },
    [sendMessage]
  );

  return { sendAdativeCardToUsers };
};
