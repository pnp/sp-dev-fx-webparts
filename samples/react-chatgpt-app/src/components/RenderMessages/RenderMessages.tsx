/* eslint-disable require-atomic-updates */
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';

import { useAtom } from 'jotai';
import { ActionButton } from 'office-ui-fabric-react/lib/Button';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

import { ChatMessage } from '@microsoft/microsoft-graph-types';

import { globalState } from '../../atoms/globalState';
import { useChatGpt } from '../../hooks';
import { useGraphAPI } from '../../hooks/useGraphAPI';
import { useHtmlUtils } from '../../hooks/useHtmlUtils';
import { useChatGptStyles } from '../ChatGpt/useChatGptStyles';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loading } from '../LoadingAnswer/Loading';
import { RenderAnswer } from '../RenderAnswer/RenderAnswer';
import { RenderQuestion } from '../RenderQuestion/RenderQuestion';

export interface IRenderMessagesProps {
  isShowMessages: boolean;
}

export const RenderMessages: React.FunctionComponent<IRenderMessagesProps> = (
  props: React.PropsWithChildren<IRenderMessagesProps>
) => {
  const { isShowMessages } = props;
  const [appGlobalState] = useAtom(globalState);
  const { context, appId, AzureFunctionUrl, parentMessageId, chatId, teamsId, channelId } = appGlobalState;
  const { textFieldStyles, controlStyles, buttonIconStyles } = useChatGptStyles();
  const [conversation, setConversation] = React.useState<React.ReactNode[]>([]);
  const [textToAsk, setTextToAsk] = React.useState<string>("");
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { getCompletion } = useChatGpt(context, appId, AzureFunctionUrl);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [error, setError] = React.useState<Error | undefined>(undefined);
  const { getChatParentMessage, getChannelParentMessage } = useGraphAPI(context);
  const executeAutoGetComplete = React.useRef<boolean>(false);
  const { getTextFromHtml } = useHtmlUtils();
  
  const hasParentMessage = React.useMemo(() => !!parentMessageId  , [parentMessageId]);
  const isInChannel = React.useMemo(() => !!teamsId && !!channelId, [teamsId, channelId]);

  const hasError = React.useMemo(() => error !== undefined, [error]);

  const onTextChange = React.useCallback(
    (ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newText: string) => {
      setTextToAsk(newText);
    },
    []
  );
  const addQuestion = React.useCallback(
    (question: string) => {
      const newQuestion = <RenderQuestion question={question} key={conversation.length + 1} />;
      setConversation((prev) => {
        return [...prev, newQuestion];
      });
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }, 100);
    },
    [conversation]
  );

  const addAnswer = React.useCallback(
    (answer: string, question?: string) => {
      const newAnswer = <RenderAnswer answer={answer} question={question} key={conversation.length + 1} />;
      setConversation((prev) => {
        return [...prev, newAnswer];
      });
      setTimeout(() => {
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      }, 100);
    },
    [conversation]
  );

  const onSubmit = React.useCallback(async () => {
    try {
      setIsLoading(true);
      addQuestion(textToAsk);
      const response = await getCompletion(textToAsk);
      addAnswer(response);
      setError(undefined);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
      setTextToAsk("");
    }
  }, [textToAsk]);

  const actionButtonIconProps: IIconProps = React.useMemo(() => {
    return { iconName: "send", styles: buttonIconStyles };
  }, [buttonIconStyles]);

  const onButtonClick = React.useCallback(
    async (ev) => {
      await onSubmit();
    },
    [onSubmit]
  );

  const runAutoGetComplete = React.useCallback(async () => {
    try {
      let messageDetails: ChatMessage = undefined;
      if (!isInChannel   ) {
        messageDetails = await getChatParentMessage(chatId, parentMessageId);
      } else {
        messageDetails = await getChannelParentMessage(teamsId, channelId, parentMessageId);
      }
      const { body } = messageDetails;
      if (body) {
        setError(undefined);
        const { content,  } = body;
        console.log(body);

          const text = getTextFromHtml(content);
          if ( text  ) {
          addQuestion(text);
          setIsLoading(true);
          const response = await getCompletion(text);
          addAnswer(response, text);
        }
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    (async () => {
      if (hasParentMessage && !executeAutoGetComplete.current) {
        executeAutoGetComplete.current = true;
        await runAutoGetComplete();
      }
    })();
  }, [hasParentMessage]);

  if (!isShowMessages) {
    return null;
  }

  return (
    <>
      <div className={controlStyles.scrollableContainerStyles} ref={scrollRef}>
        {conversation}
      </div>

      <Stack tokens={{ padding: 20, childrenGap: 10 }}>
        <Loading isLoading={isLoading} />
        <Stack horizontal tokens={{ childrenGap: 5 }}>
          {hasError ? (
            <ErrorMessage errorMessage={error?.message} showError={hasError} />
          ) : (
            <>
              <TextField
                multiline
                value={textToAsk}
                resizable={false}
                autoAdjustHeight
                styles={textFieldStyles}
                onChange={onTextChange}
              />
              <Stack horizontalAlign="end">
                <ActionButton
                  disabled={!textToAsk.length || isLoading}
                  iconProps={actionButtonIconProps}
                  allowDisabledFocus
                  onClick={onButtonClick}
                />
              </Stack>
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};
