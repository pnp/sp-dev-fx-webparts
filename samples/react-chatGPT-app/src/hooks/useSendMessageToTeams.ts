import * as React from 'react';

import { BaseComponentContext } from '@microsoft/sp-component-base';
import { Guid } from '@microsoft/sp-core-library';
import { isEmpty } from '@microsoft/sp-lodash-subset';

import { IAdaptativeCardData } from '../models/IAdaptivecardData';
import { HostedContents } from '../models/IChatMessage';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const useSendMessageToTeams = (context: BaseComponentContext) => {
  const graphClient = React.useMemo(() => {
    return async () => {
      const client = await context.msGraphClientFactory.getClient("3");
      return client;
    };
  }, [context]);

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

/*   const createChatMembers = React.useCallback((receiverEmail: string) => {
    try {
      const currentUser = context.pageContext.user.email;
      const chatMembers = [
        {
          "@odata.type": "#microsoft.graph.aadUserConversationMember",
          roles: ["owner"],
          "user@odata.bind": `https://graph.microsoft.com/v1.0/users('${currentUser}')`,
        },
        {
          "@odata.type": "#microsoft.graph.aadUserConversationMember",
          roles: ["owner"],
          "user@odata.bind": `https://graph.microsoft.com/v1.0/users('${receiverEmail}')`,
        },
      ];
      return chatMembers;
    } catch (error) {
      if (DEBUG) {
        console.error(`[SendMessage.createChatMembers]: error=${error}`);
        throw error;
      }
    }
  }, []); */
/*
  const createChat = React.useCallback(
    async (receiverEmail) => {
      try {
        const members = createChatMembers(receiverEmail);
        const chat = await (await graphClient()).api("/chats").post({ chatType: "oneOnOne", members: members });
        return chat;
      } catch (error) {
        if (DEBUG) {
          console.error("[SendMessage.createChat]: error=", error);
          throw error;
        }
      }
    },
    [graphClient]
  );
 */
  const sendMessage = React.useCallback(
    async (adaptiveCard: object, adaptiveCardData: IAdaptativeCardData, chatId: string) => {
      try {

        const { body, attachments, hostedContents } = await getSendMessagePayload(adaptiveCard, adaptiveCardData);
        const chatMessagePayload = {
          subject: "OpenAI Answer",
          body: body,
          attachments: attachments,
          hostedContents: hostedContents,
        };
        const chatMessage = await (await graphClient()).api(`/chats/${chatId}/messages`).post(chatMessagePayload);
        return chatMessage;
      } catch (error) {
        if (DEBUG) {
          console.error("[SendMessage]: error=", error);
          throw error;
        }
      }
    },
    [graphClient]
  );

  const sendAdativeCardToUsers = React.useCallback(
    async (adaptiveCard: object, adaptiveCardData: IAdaptativeCardData, chatId: string) => {
      try {
        await sendMessage(adaptiveCard, adaptiveCardData, chatId);
      } catch (error) {
        if (DEBUG) {
          console.error(`[SendMessage.sendAdativeCardToUsers]: error=${error.message}`);
          throw error;
        }
      }
    },
    [graphClient]
  );

  return { sendAdativeCardToUsers };
};
