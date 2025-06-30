// MSALWrapper.ts
import { PublicClientApplication, AuthenticationResult, 
    Configuration, InteractionRequiredAuthError } from "@azure/msal-browser";

export class MSALWrapper {
  private msalConfig: Configuration;

  private msalInstance: PublicClientApplication;

  constructor(clientId: string, authority: string) {
    this.msalConfig = {
      auth: {
        clientId: clientId,
        authority: authority,
      },
      cache: {
        cacheLocation: "localStorage",
      },
    };

    this.msalInstance = new PublicClientApplication(this.msalConfig);
  }

  // eslint-disable-next-line @rushstack/no-new-null
  public async handleLoggedInUser(scopes: string[], userEmail: string): Promise<AuthenticationResult | null> {
    try {
        // Ensure MSAL instance is initialized
        if (!this.msalInstance || !this.msalInstance.initialize) {
            throw new Error("MSAL instance not initialized");
        }
        await this.msalInstance.initialize();

        const accounts = this.msalInstance.getAllAccounts();
        let userAccount = null;

        if (!accounts || accounts.length === 0) {
             // eslint-disable-next-line no-console
            console.log("No users are signed in");
            return null;
        } else if (accounts.length > 1) {
            userAccount = this.msalInstance.getAccountByUsername(userEmail);
        } else {
            userAccount = accounts[0];
        }

        if (userAccount) {
            const accessTokenRequest = {
                scopes: scopes,
                account: userAccount
            };

            return this.msalInstance.acquireTokenSilent(accessTokenRequest).then(response => {
                return response;
            }).catch(error => {
                 // eslint-disable-next-line no-console
                console.log("Error acquiring token silently:", error);
                return null;
            });
        }
    } catch (error) {
         // eslint-disable-next-line no-console
        console.error("Error in handleLoggedInUser:", error);
    }
    return null;
}

  // eslint-disable-next-line @rushstack/no-new-null
  public async acquireAccessToken(scopes: string[], userEmail: string): Promise<AuthenticationResult | null> {
    const accessTokenRequest = {
        scopes: scopes,
        loginHint: userEmail
    };

    return this.msalInstance.ssoSilent(accessTokenRequest).then((response) => {
        return response;
    }).catch((silentError) => {
         // eslint-disable-next-line no-console
        console.log(silentError);
        if (silentError instanceof InteractionRequiredAuthError) {
            return this.msalInstance.loginPopup(accessTokenRequest).then((response) => {
                return response;
            }).catch((error) => {
                 // eslint-disable-next-line no-console
                console.log(error);
                return null;
            });
        }
        return null;
    });
  }
}

export default MSALWrapper;