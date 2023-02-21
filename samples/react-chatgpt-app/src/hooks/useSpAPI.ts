import * as React from 'react';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { BaseComponentContext } from '@microsoft/sp-component-base';
import {
  IHttpClientOptions,
  SPHttpClient,
} from '@microsoft/sp-http';

export const useSpAPI = (context: BaseComponentContext) => {
  const getAppCatalog = React.useCallback(async (): Promise<string> => {
    const spHttpClient = context?.spHttpClient;
    const tenant = window.location.hostname.split(".")[0];
    const url = `https://${tenant}.sharepoint.com/_api/SP_TenantSettings_Current `;
    const options: IHttpClientOptions = {
      headers: { "Content-Type": "application/json;odata=verbose" },
      mode: "cors",
      method: "GET",
    };

    const results = await spHttpClient?.get(url, SPHttpClient.configurations.v1, options);
    const response = await results?.json();
    return response?.CorporateCatalogUrl;
  }, [context]);

  const getTenantProperty = React.useCallback(
    async (key: string): Promise<string> => {
      const spHttpClient = context?.spHttpClient;
      const appCatalog = await getAppCatalog();
      if (!appCatalog) return Promise.reject("appCatalog is undefined");
      if (!key) return Promise.reject("key is undefined");
      const url = `${appCatalog}/_api/web/GetStorageEntity('${key}')`;
      const options: IHttpClientOptions = {
        headers: { "Content-Type": "application/json;odata=verbose" },
        mode: "cors",
        method: "GET",
      };

      const results = await spHttpClient?.get(url, SPHttpClient.configurations.v1, options);
      const response = await results?.json();
      return response?.Value ?? undefined;
    },
    [context]
  );

  return { getAppCatalog, getTenantProperty };
};
