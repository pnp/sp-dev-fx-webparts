const adalConfig: adal.Config = {
  clientId: '00000000-0000-0000-0000-000000000000',
  tenant: 'common',
  extraQueryParameter: 'nux=1',
  endpoints: {
    'https://your-api-app.azurewebsites.net/api/': '00000000-0000-0000-0000-000000000000'
  },
  postLogoutRedirectUri: window.location.origin,
  cacheLocation: 'sessionStorage'
};

export default adalConfig;