import { PublicClientApplication, InteractionRequiredAuthError } from '@azure/msal-browser';

export interface IAuthSettings {
  appClientId: string;
  tenantId: string;
  currentUserLogin?: string;
  redirectUri?: string;  
}

export async function acquireToken(settings: IAuthSettings): Promise<string | undefined> {
  if (!settings?.appClientId || !settings?.tenantId) {
    return undefined;
  }

  console.log('using this as a redirect URI: ', settings.redirectUri || window.location.origin);

  const msalInstance = new PublicClientApplication({
    auth: {
      clientId: settings.appClientId,
      authority: `https://login.microsoftonline.com/${settings.tenantId}`,
      redirectUri: settings.redirectUri || window.location.origin  
    },
    cache: {
      cacheLocation: "localStorage"
    }
  });

  await msalInstance.initialize();
  const scopes = ['https://api.powerplatform.com/.default'];

  try {
    const accounts = await msalInstance.getAllAccounts();
    let userAccount = null;

    if (!accounts || accounts.length === 0) {
      console.log("No users are signed in");
    } else if (accounts.length > 1 && settings.currentUserLogin) {
      userAccount = accounts.find(account => 
        account.username.toLowerCase() === settings.currentUserLogin?.toLowerCase()
      ) || null;
    } else {
      userAccount = accounts[0];
    }

    if (userAccount) {
      const accessTokenRequest = {
        scopes: scopes,
        account: userAccount
      };

      try {
        const response = await msalInstance.acquireTokenSilent(accessTokenRequest);
        console.log('Token acquired via acquireTokenSilent');
        return response.accessToken; 
      } catch (errorInternal) {
        console.log('acquireTokenSilent failed:', errorInternal);
        // Fall through to try SSO
      }
    }

    // Only reach here if no account or acquireTokenSilent failed
    const ssoRequest = {
      scopes: scopes,
      loginHint: settings.currentUserLogin
    };

    try {
      const response = await msalInstance.ssoSilent(ssoRequest);
      console.log('Token acquired via ssoSilent');
      return response.accessToken;
    } catch (silentError) {
      console.log('ssoSilent failed:', silentError);
      if (silentError instanceof InteractionRequiredAuthError) {
        try {
          const response = await msalInstance.loginPopup(ssoRequest); 
          console.log('Token acquired via loginPopup');
          return response.accessToken;
        } catch (popupError) {
          console.log('loginPopup failed:', popupError);
          return undefined;
        }
      }
      return undefined;
    }
  } catch (e) {
    console.error('Token acquisition error', e);
    return undefined;
  }
}