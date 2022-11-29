import { IAuthenticationService } from "mgwdev-m365-helpers/lib/services";
import { GoogleToken } from "../model/GoogleToken";

export class TeamsGoogleDriveAuthService implements IAuthenticationService {
    private token: string = "";
    constructor(private clientId: string,
        protected teamsJs: typeof import("@microsoft/teams-js-v2"),
        protected callbackPageAbsoluteUrl: string,
        private scope: string = "https://www.googleapis.com/auth/drive") {
            let accessTokenString = localStorage.getItem("googleAccessToken") || ""
            if (accessTokenString) {
                let gToken = JSON.parse(accessTokenString) as GoogleToken;
                if (new Date(gToken.storeDate).getTime() + 3600000 > new Date().getTime()) {
                    this.token = gToken.access_token;
                }
            }

    }
    public async getAccessToken(resource: string): Promise<string> {
        if (!this.token) {
            //as we cannot open teamshostedapp.aspx in auth context we need this web part deployed to another page to handle the auth
            const replyUrl = `${this.callbackPageAbsoluteUrl}?app=google`;
            const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${this.clientId}&redirect_uri=${replyUrl}&response_type=token&scope=${this.scope}&include_granted_scopes=true&state=pass-through value`;
            this.token = await new Promise<string>((resolve, reject) => {
                this.teamsJs.authentication.authenticate({
                    url: authUrl
                }).then(token => {
                    this.token = token;
                    resolve(token);
                }).catch(err => {
                    const token = localStorage.getItem("googleAccessToken") || "";
                    if (token) {
                        this.token = token;
                        resolve(token);
                    } else {
                        reject(err);
                    }
                });
            });
        }

        return this.token;
    }

}