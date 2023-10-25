/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BaseComponentContext } from '@microsoft/sp-component-base';
import {
  AadHttpClient,
  IHttpClientOptions,
} from '@microsoft/sp-http';

enum ERole {
  user = "user",
  assistant = "assistant",
  system = "system",
}
interface IMessages {
  role:ERole;
  content: string;
}

export const useChatGpt = (context: BaseComponentContext, appId:string, AzureFunctionUrl:string) => {
  const messages = React.useRef<IMessages[]>([]);
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
        messages.current.push({ role: ERole.user, content: query });
        if (!client) return;
        const options: IHttpClientOptions = {
          headers: { "Content-Type": "application/json;odata=verbose", Accept: "application/json;odata=verbose" },
          mode: "cors",
          body: JSON.stringify({ messages: messages.current }),
          method: "POST",
        };

        const response = await (await client()).post(AzureFunctionUrl, AadHttpClient.configurations.v1, options);
        const answer = await response.json();
        if (response.status === 200) {
          messages.current.push(answer.choices[0].message)
          return answer.choices[0].message.content;
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
