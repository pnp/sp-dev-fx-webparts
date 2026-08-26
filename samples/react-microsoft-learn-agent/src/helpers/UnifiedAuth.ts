import { PublicClientApplication, InteractionRequiredAuthError, AccountInfo } from '@azure/msal-browser';

export interface IUnifiedAuthSettings {
  appClientId: string;
  tenantId: string;
  currentUserLogin?: string;
  redirectUri?: string;
  scopes?: string[];
}

export interface ITokenResult {
  accessToken: string;
  account: AccountInfo;
  fromCache: boolean;
}

/**
 * Unified authentication helper that works for both Custom UI and WebChat modes
 * Uses shared MSAL instance and cache for consistent consent state
 */
class UnifiedAuthHelper {
  private static instance: UnifiedAuthHelper;
  private msalInstance: PublicClientApplication | undefined = undefined;
  private currentSettings: IUnifiedAuthSettings | undefined = undefined;

  private constructor() {}

  public static getInstance(): UnifiedAuthHelper {
    if (!UnifiedAuthHelper.instance) {
      UnifiedAuthHelper.instance = new UnifiedAuthHelper();
    }
    return UnifiedAuthHelper.instance;
  }

  private async initializeMsal(settings: IUnifiedAuthSettings): Promise<void> {
    if (this.msalInstance && this.currentSettings?.appClientId === settings.appClientId) {
      return; // Already initialized with same settings
    }

    this.msalInstance = new PublicClientApplication({
      auth: {
        clientId: settings.appClientId,
        authority: `https://login.microsoftonline.com/${settings.tenantId}`,
        redirectUri: settings.redirectUri || window.location.origin
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true // Better for SharePoint scenarios
      }
    });

    await this.msalInstance.initialize();
    this.currentSettings = settings;
  }

  public async acquireToken(settings: IUnifiedAuthSettings): Promise<ITokenResult | undefined> {
    if (!settings?.appClientId || !settings?.tenantId) {
      throw new Error('Invalid auth settings provided');
    }

    await this.initializeMsal(settings);
    const scopes = settings.scopes || ['https://api.powerplatform.com/.default'];

    try {
      // Step 1: Try to get account
      const accounts = await this.msalInstance!.getAllAccounts();
      let userAccount: AccountInfo | undefined = undefined;

      if (accounts.length === 0) {
        console.log('No users signed in, will need interactive login');
      } else if (accounts.length > 1 && settings.currentUserLogin) {
        userAccount = accounts.find(account => 
          account.username.toLowerCase() === settings.currentUserLogin?.toLowerCase()
        ) || accounts[0];
      } else {
        userAccount = accounts[0];
      }

      // Step 2: Try silent token acquisition first
      if (userAccount) {
        try {
          const silentRequest = {
            scopes: scopes,
            account: userAccount,
            forceRefresh: false
          };

          const response = await this.msalInstance!.acquireTokenSilent(silentRequest);
          console.log('Token acquired silently (from cache)');
          return {
            accessToken: response.accessToken,
            account: response.account,
            fromCache: true
          };
        } catch (silentError) {
          console.log('Silent token acquisition failed:', silentError);
          
          // If it's an interaction required error, we'll fall through to interactive
          if (!(silentError instanceof InteractionRequiredAuthError)) {
            throw silentError;
          }
        }
      }

      // Step 3: Interactive token acquisition
      console.log('Attempting interactive token acquisition...');
      const interactiveRequest = {
        scopes: scopes,
        loginHint: settings.currentUserLogin,
        prompt: 'select_account'
      };

      const response = await this.msalInstance!.acquireTokenPopup(interactiveRequest);
      console.log('Token acquired interactively');
      
      return {
        accessToken: response.accessToken,
        account: response.account,
        fromCache: false
      };

    } catch (error) {
      console.error('Token acquisition failed:', error);
      throw error;
    }
  }

  public async refreshToken(settings: IUnifiedAuthSettings): Promise<ITokenResult | undefined> {
    await this.initializeMsal(settings);
    
    const accounts = await this.msalInstance!.getAllAccounts();
    if (accounts.length === 0) {
      throw new Error('No accounts available for token refresh');
    }

    const userAccount = settings.currentUserLogin 
      ? accounts.find(acc => acc.username.toLowerCase() === settings.currentUserLogin?.toLowerCase()) || accounts[0]
      : accounts[0];

    const refreshRequest = {
      scopes: settings.scopes || ['https://api.powerplatform.com/.default'],
      account: userAccount,
      forceRefresh: true
    };

    try {
      const response = await this.msalInstance!.acquireTokenSilent(refreshRequest);
      return {
        accessToken: response.accessToken,
        account: response.account,
        fromCache: false
      };
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Fall back to interactive if refresh fails
      return await this.acquireToken(settings);
    }
  }

  public async acquireTokenSilent(settings: IUnifiedAuthSettings): Promise<ITokenResult | undefined> {
    await this.initializeMsal(settings);
    
    const accounts = await this.msalInstance!.getAllAccounts();
    if (accounts.length === 0) {
      throw new Error('No accounts available for silent token acquisition');
    }

    const userAccount = settings.currentUserLogin 
      ? accounts.find(acc => acc.username.toLowerCase() === settings.currentUserLogin?.toLowerCase()) || accounts[0]
      : accounts[0];

    const silentRequest = {
      scopes: settings.scopes || ['https://api.powerplatform.com/.default'],
      account: userAccount,
      forceRefresh: false
    };

    try {
      const response = await this.msalInstance!.acquireTokenSilent(silentRequest);
      return {
        accessToken: response.accessToken,
        account: response.account,
        fromCache: true
      };
    } catch (error) {
      console.error('Silent token acquisition failed:', error);
      throw error;
    }
  }

  public async signOut(): Promise<void> {
    if (this.msalInstance) {
      const accounts = await this.msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        await this.msalInstance.logoutPopup({
          account: accounts[0]
        });
      }
    }
  }

  public async getAccounts(): Promise<AccountInfo[]> {
    if (!this.msalInstance) return [];
    return await this.msalInstance.getAllAccounts();
  }
}

export const unifiedAuth = UnifiedAuthHelper.getInstance();

// Backward compatibility functions
export async function acquireToken(settings: IUnifiedAuthSettings): Promise<string | undefined> {
  try {
    const result = await unifiedAuth.acquireToken(settings);
    return result?.accessToken;
  } catch (error) {
    console.error('Unified auth error:', error);
    return undefined;
  }
}

export async function refreshToken(settings: IUnifiedAuthSettings): Promise<string | undefined> {
  try {
    const result = await unifiedAuth.refreshToken(settings);
    return result?.accessToken;
  } catch (error) {
    console.error('Unified auth refresh error:', error);
    return undefined;
  }
}