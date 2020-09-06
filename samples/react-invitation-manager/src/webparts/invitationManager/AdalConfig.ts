const adalConfig: adal.Config = {
  clientId: '2aed3716-947b-4d49-b130-8859eb9363c7',
  tenant: 'giuleon.onmicrosoft.com',
  extraQueryParameter: 'nux=1',
  endpoints: {
    'https://graph.microsoft.com': 'https://graph.microsoft.com'
  },
  postLogoutRedirectUri: window.location.origin,
  cacheLocation: 'sessionStorage'
};

export default adalConfig;