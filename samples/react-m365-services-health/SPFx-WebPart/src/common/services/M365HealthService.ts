/* eslint-disable @typescript-eslint/no-explicit-any */
import { ServiceHealth } from "@microsoft/microsoft-graph-types";

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { AadHttpClient, IHttpClientOptions, HttpClientResponse } from "@microsoft/sp-http";
export class M365HealthService {
  private context: WebPartContext;
  private apiBaseUrl: string;
  public aadHttpClient: AadHttpClient | undefined;
  private audience: string;
  //private token: string;
  constructor(context: WebPartContext, apiBaseUrl: string, audience: string) {
    this.context = context;
    this.apiBaseUrl = apiBaseUrl;
    this.audience = audience;
  }

  public initClint = async (): Promise<void> => {
    this.context.aadHttpClientFactory
      .getClient(this.audience)
      .then((client: AadHttpClient) => {
        return (this.aadHttpClient = client);
      })
      .catch((ex) => {
        console.log(ex);
        return (this.aadHttpClient = undefined);
      });
  };

  public getServiceHealth = async (): Promise<ServiceHealth[]> => {
    return this.get(`${this.apiBaseUrl}/api/m365servicehealth`);
  };
  private async get<T>(url: string, headers?: Headers): Promise<T> {
    headers = this.mergeHeaders(headers);

    const options: IHttpClientOptions = {
      headers: headers,
    };

    const resp: HttpClientResponse | undefined = await this.aadHttpClient?.get(url, AadHttpClient.configurations.v1, options);
    return this.handleResponse(resp);
  }

  private async handleResponse(response: HttpClientResponse | undefined): Promise<any> {
    if (response?.ok) {
      try {
        return await response.clone().json();
      } catch (error) {
        return await response.text();
      }
    } else {
      // eslint-disable-next-line no-throw-literal
      throw {
        errorCode: response?.status,
        error: response.statusText,
      };
    }
  }

  private mergeHeaders(headers: Headers | undefined): Headers {
    const commonHeaders = this.getCommonRequestHeaders();

    if (headers) {
      headers?.forEach((value, key) => {
        if (commonHeaders.has(key)) {
          commonHeaders.set(key, value);
        } else {
          commonHeaders.append(key, value);
        }
      });
    }

    return commonHeaders;
  }

  private getCommonRequestHeaders(): Headers {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    headers.append("Cache-Control", "no-cache");
    return headers;
  }
}
