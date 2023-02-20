/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BaseComponentContext } from '@microsoft/sp-component-base';
import {
  AadHttpClient,
  IHttpClientOptions,
} from '@microsoft/sp-http';

/* const APPID = "6b4a20b2-bf2f-4cbb-a162-af960a40c2dc";
const AZURE_FUNCTION_URL = "https://openaifunctionsapp.azurewebsites.net/api/OpenAICompletion"; */

export const useChatGpt = (context: BaseComponentContext, appId: string, AzureFunctionUrl: string) => {
  const client = React.useMemo(() => {
    if (context) {
      return async () => {
        const client = await context.aadHttpClientFactory.getClient(appId);
        return client;
      };
    }
    return undefined;
  }, [context]);

  const getCompletion = React.useCallback(
    async (query: string): Promise<string> => {
      try {
        if (!client) return;
        const options: IHttpClientOptions = {
          headers: { "Content-Type": "application/json;odata=verbose", Accept: "application/json;odata=verbose" },
          mode: "cors",
          body: JSON.stringify({ prompt: query }),
          method: "POST",
        };
        const response = await (await client()).post(AzureFunctionUrl, AadHttpClient.configurations.v1, options);
        const answer = await response.json();
        if (response.status === 200) {
          return answer?.choices[0].text;
        } else {
          console.log("[getCompletion] error:", answer);
          throw new Error("Error on executing the request, please try again later.");
        }
      } catch (error) {
        if (!DEBUG) {
          console.log("[getCompletion] error:", error);
        }
        throw error;
      }
    },
    [client]
  );

  return { getCompletion };
};
