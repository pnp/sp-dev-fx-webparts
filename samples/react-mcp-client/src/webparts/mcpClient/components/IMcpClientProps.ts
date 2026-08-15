export interface IMcpClientProps {
  /** MCP endpoint URL. Ignored while the built-in mock server is in use. */
  endpointUrl: string;
  /** True to use the in-browser mock server instead of a real remote server. */
  useMockServer: boolean;
  /**
   * Entra resource URI of the MCP server. When set, the web part acquires an
   * access token for the signed-in user and sends it as a bearer token.
   */
  aadResourceUri: string;
  /** Supplied by the web part, which owns the SPFx token provider. */
  getToken?: () => Promise<string | undefined>;
  hasTeamsContext: boolean;
}
