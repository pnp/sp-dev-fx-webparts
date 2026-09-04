/**
 * The seam between the protocol and the network.
 *
 * Keeping this at the HTTP level rather than the JSON-RPC level means the mock
 * server exercises exactly the same header and body construction as a real
 * server does, so the trace panel shows real wire format in both modes.
 */

export interface IHttpRequest {
  url: string;
  headers: { [name: string]: string };
  body: string;
}

export interface IHttpResponse {
  status: number;
  statusText: string;
  contentType: string;
  body: string;
}

export interface IHttpTransport {
  /** Shown in the UI so it is always obvious which one is in use. */
  readonly label: string;
  post(request: IHttpRequest): Promise<IHttpResponse>;
}
