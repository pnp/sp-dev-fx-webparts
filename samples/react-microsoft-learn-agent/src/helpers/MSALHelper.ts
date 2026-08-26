import {
    PublicClientApplication,
    AuthenticationResult,
    Configuration,
    InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { ConnectionSettings } from "@microsoft/agents-copilotstudio-client";
import getMsalConfig from "../configurations/msalConfig";
import { ERROR_MESSAGES } from "../constants";

export class MSALWrapper {
    private msalConfig: Configuration;
    private msalInstance: PublicClientApplication;
    private isInitialized: boolean = false;

    constructor(connectionSettings: ConnectionSettings) {
        this.msalConfig = getMsalConfig(connectionSettings);
        this.msalInstance = new PublicClientApplication(this.msalConfig);
    }

    // Initialize the MSAL instance
    public async initialize(): Promise<void> {
        if (!this.isInitialized) {
            await this.msalInstance.initialize(); // Ensures initialization
            this.isInitialized = true;
        }
    }

    // eslint-disable-next-line @rushstack/no-new-null
    public async handleLoggedInUser(scopes: string[], userEmail: string): Promise<AuthenticationResult | null> {
        await this.initialize(); // Ensure MSAL is initialized before use

        let userAccount = null;
        const accounts = this.msalInstance.getAllAccounts();

        if (accounts === null || accounts.length === 0) {
            console.log(ERROR_MESSAGES.NO_USERS_SIGNED_IN);
            return null;
        } else if (accounts.length > 1) {
            userAccount = this.msalInstance.getAccountByUsername(userEmail);
        } else {
            userAccount = accounts[0];
        }

        if (userAccount !== null) {
            const accessTokenRequest = {
                scopes: scopes,
                account: userAccount,
            };

            return this.msalInstance
                .acquireTokenSilent(accessTokenRequest)
                .then((response) => {
                    return response;
                })
                .catch((error) => {
                    console.log("Error acquiring token silently:", error);
                    return null;
                });
        }
        return null;
    }

    // eslint-disable-next-line @rushstack/no-new-null
    public async acquireAccessToken(scopes: string[], userEmail: string): Promise<AuthenticationResult | null> {
        await this.initialize(); // Ensure MSAL is initialized before use

        const accessTokenRequest = {
            scopes: scopes,
            loginHint: userEmail,
        };

        return this.msalInstance
            .ssoSilent(accessTokenRequest)
            .then((response) => {
                return response;
            })
            .catch((silentError) => {
                console.log(silentError);
                if (silentError instanceof InteractionRequiredAuthError) {
                    return this.msalInstance
                        .loginPopup(accessTokenRequest)
                        .then((response) => {
                            return response;
                        })
                        .catch((error) => {
                            console.log(error);
                            return null;
                        });
                }
                return null;
            });
    }
}

export default MSALWrapper;