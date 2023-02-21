/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from 'react';

import { useAtom } from 'jotai';
import { Stack } from 'office-ui-fabric-react';

import { globalState } from '../../atoms/globalState';
import {
  APPID_TENANT_PROPERTY,
  AZURE_FUNCTION_URL_TENANT_PROPERTY,
} from '../../constants/constants';
import { useSpAPI } from '../../hooks/useSpAPI';
import { IChatGptProps } from '../../models/IChatGptProps';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Header } from '../Header/Header';
import { Loading } from '../LoadingAnswer/Loading';
import { RenderMessages } from '../RenderMessages/RenderMessages';
import {
  RenderPreviewChatInfo,
} from '../RenderPreviewChatInfo/RenderPreviewChatInfo';
import { useChatGptStyles } from './useChatGptStyles';

export const ChatGptControl: React.FunctionComponent<IChatGptProps> = (
  props: React.PropsWithChildren<IChatGptProps>
) => {
  const { context } = props;
  const [appGlobalState, setAppGlobalState] = useAtom(globalState);
  const { containerStyles } = useChatGptStyles();
  const { hasTeamsContext, chatId } = appGlobalState;
  const { getTenantProperty } = useSpAPI(context);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | undefined>(undefined);

  const isInChat = React.useMemo((): boolean => {
    return hasTeamsContext && !!chatId;
  }, [chatId, hasTeamsContext]);

  const isPreviewChatId = React.useMemo((): boolean => {
    if (isInChat) {
      return chatId.toLowerCase().indexOf("preview") !== -1;
    }
    return false;
  }, [chatId, isInChat]);

  React.useEffect(() => {
    setAppGlobalState((prevState) => {
      return { ...prevState, ...props };
    });
  }, [props]);

  React.useEffect(() => {
    (async () => {
      try {
        const appId = await getTenantProperty(APPID_TENANT_PROPERTY);
        const OpenAIAzureFunctionUrl = await getTenantProperty(AZURE_FUNCTION_URL_TENANT_PROPERTY);
        if (!appId && !OpenAIAzureFunctionUrl) {
          throw new Error("ChatGpt is not configured");
        }
        setError(undefined);
        setAppGlobalState((preveState) => {
          return { ...preveState, appId, AzureFunctionUrl: OpenAIAzureFunctionUrl };
        });
      } catch (error) {
        if (!DEBUG) {
          console.log("[ChatGptControl] Error: ", error.message);
        }
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [getTenantProperty, setAppGlobalState]);

  if (isLoading) {
    return (
      <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 30 }}>
        <Loading isLoading={isLoading} />
      </Stack>
    );
  }

  if (error) {
    const showError = !!error;
    const errorMessage = error?.message;
    return (
      <Stack horizontal horizontalAlign="center" tokens={{ childrenGap: 30 }}>
        <ErrorMessage errorMessage={errorMessage} showError={showError} />
      </Stack>
    );
  }
  return (
    <>
      <Stack tokens={{ childrenGap: 20 }} styles={containerStyles}>
        <Header isInChat={isInChat} />
        <RenderPreviewChatInfo isPreviewChatId={isPreviewChatId} />
        <RenderMessages isShowMessages={!isPreviewChatId} />
      </Stack>
    </>
  );
};
