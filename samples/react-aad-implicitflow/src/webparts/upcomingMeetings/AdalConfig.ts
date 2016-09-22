const adalConfig: adal.Config = {
  clientId: '00000000-0000-0000-0000-000000000000',
  tenant: 'common',
  extraQueryParameter: 'nux=1',
  endpoints: {
    'https://graph.microsoft.com': 'https://graph.microsoft.com'
  },
  postLogoutRedirectUri: window.location.origin,
  cacheLocation: 'sessionStorage'
};

export default adalConfig;