import * as React from 'react';

import * as strings from 'ChatGptWebPartStrings';
import { format } from 'date-fns';
import { useAtom } from 'jotai';
import {
  Stack,
  StackItem,
  Text,
} from 'office-ui-fabric-react';

import { showNotification } from '@mantine/notifications';

import { CARD } from '../../adaptiveCards/chatGPTAnswerCard';
import { globalState } from '../../atoms';
import { useAdaptiveCardsUtils } from '../../hooks/useAdaptiveCardsUtils';
import { useSendMessageToTeams } from '../../hooks/useSendMessageToTeams';
import { IAdaptativeCardData } from '../../models/IAdaptivecardData';
import { IRenderAnswerProps } from '../../models/IRenderAnswerProps';
import { useChatGptStyles } from '../ChatGpt/useChatGptStyles';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { OpenAIImage } from '../OpenAIImage/OpenAIImage';
import { SendMessageToChat } from '../SendMessageToChat/SendMessageToChat';

export const RenderAnswer: React.FunctionComponent<IRenderAnswerProps> = (
  props: React.PropsWithChildren<IRenderAnswerProps>
) => {
  const { answer, question } = props;
  const { answerStyles, nameStyles, answerContainerStyles, controlStyles } = useChatGptStyles();
  const [appGlobalState] = useAtom(globalState);
  const { lastConversation, context, chatId, teamsId, channelId, parentMessageId, hasTeamsContext } = appGlobalState;
  const [error, setError] = React.useState<Error | undefined>(undefined);

  const { createAdaptiveCard } = useAdaptiveCardsUtils();
  const { sendAdativeCardToUsers } = useSendMessageToTeams(context);
  const hasError = React.useMemo(() => error !== undefined, [error]);


  const onSendMessageToChat = React.useCallback(async () => {
    if (answer &&  hasTeamsContext   ) {
      try {
        const cardData: IAdaptativeCardData = { date: format(new Date(), "PPpp"), answer: answer, question: question ?? ""};
        const card = createAdaptiveCard(cardData, CARD);
        console.log("carddata", cardData);
        console.log("card", card);
        await sendAdativeCardToUsers(card, cardData, chatId, teamsId, channelId, parentMessageId);

        showNotification({
          title: strings.ChatGPTAppNotificationTitle,
          message: strings.ChatGPTAppNotificationMessage,
          autoClose: 3500,
        });
      } catch (error) {
        if (DEBUG) {
          console.log("[RenderAnswer.sendMessageToChat], error:", error.message);
        }
        setError(error);
      }
    }
  }, [answer,teamsId,channelId, hasTeamsContext,  chatId, sendAdativeCardToUsers, createAdaptiveCard, question, parentMessageId]);

  const islastConversation = React.useMemo(() => lastConversation === "answer", [lastConversation]);
  return (
    <>
      <Stack
        tokens={{ childrenGap: 10 }}
        horizontalAlign="start"
        verticalAlign="start"
        horizontal
        styles={answerContainerStyles}
      >
        {islastConversation ? null : (
          <Stack styles={{ root: { paddingTop: 6 } }}>
            <OpenAIImage showImageOnly={true} width={26} height={26} />
          </Stack>
        )}
        <Stack styles={answerStyles} tokens={{ childrenGap: 5 }} horizontalAlign={"stretch"}>
          <Stack horizontal horizontalAlign="start" verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <Text variant="medium" block styles={nameStyles}>
              {strings.CgatGPTAppOpenAILabel}
            </Text>
            <Text variant="small" block>
              {format(new Date(), "HH:mm")}
            </Text>
            <Stack horizontal horizontalAlign="end" grow={3}>
              <SendMessageToChat onSendMessage={onSendMessageToChat} />
            </Stack>
          </Stack>
          <Stack horizontalAlign="start" tokens={{ childrenGap: 10 }}>
            <div
              dangerouslySetInnerHTML={{ __html: answer?.replace("\n\n", " ") }}
              className={controlStyles.answerStyles}
            />
            <StackItem align="stretch">
              <ErrorMessage errorMessage={error?.message} showError={hasError} />
            </StackItem>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
