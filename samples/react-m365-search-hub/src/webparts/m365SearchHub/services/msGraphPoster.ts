import { MSGraphClientV3 } from '@microsoft/sp-http';
import { IGraphPoster } from './GraphSearchService';

/**
 * Posts to Microsoft Graph through the client the SharePoint Framework provides.
 *
 * A note on cancellation, because it is easy to assume more than is true.
 * `MSGraphClientV3` wraps the Microsoft Graph JavaScript Client Library, whose
 * request signature is `post(content, callback)`. There is no `AbortSignal`
 * parameter, so **the HTTP request cannot be aborted** through this client.
 *
 * What the signal does here is decide whether the answer is still wanted. A
 * superseded request still travels and still costs its round trip, but its
 * response is discarded and never reaches the interface. That is weaker than a
 * true abort and it is worth knowing which of the two you have.
 *
 * The signal is still honoured before the call, so a request superseded while
 * the client was being acquired never leaves at all.
 *
 * A second thing worth knowing, confirmed against the installed client and in
 * a proxied workbench run: the Graph client carries a `RetryHandler` that
 * **retries 429, 503 and 504 by itself**, honouring `Retry-After`. This sample
 * adds no retry of its own and never loops, but a single call from here can
 * still become four requests over the wire, and a 429 carrying
 * `Retry-After: 45` keeps the search in its loading state for that long before
 * anything is reported. Nothing above this file can see that happening.
 */
export function createMSGraphPoster(getClient: () => Promise<MSGraphClientV3>): IGraphPoster {
  return {
    async post(path: string, body: unknown, signal?: AbortSignal): Promise<unknown> {
      const client = await getClient();

      if (signal?.aborted) {
        // Superseded while the client was being acquired. Nothing to send.
        throw Object.assign(new Error('Aborted'), { name: 'AbortError' });
      }

      return client.api(path).post(body);
    }
  };
}
