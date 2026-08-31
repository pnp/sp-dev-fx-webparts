define([], function () {
  return {
    PropertyPaneDescription:
      'Point the web part at a Model Context Protocol server, or leave the built-in mock server on to explore the protocol with no setup.',
    ServerGroupName: 'MCP server',
    UseMockServerFieldLabel: 'Use mock server',
    MockOn: 'Built-in mock',
    MockOff: 'Remote server',
    EndpointFieldLabel: 'MCP endpoint URL',
    EndpointFieldDescription:
      'The single POST endpoint of a server speaking Streamable HTTP, for example https://example.com/mcp. It must allow this SharePoint origin via CORS.',
    AadResourceFieldLabel: 'Entra resource URI (optional)',
    AadResourceFieldDescription:
      'Set this to send a bearer token for the signed-in user. Requires a matching permission request in package-solution.json, approved on the tenant API access page. Leave empty to call the server unauthenticated.'
  };
});
