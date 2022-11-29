import { IAuthenticationService } from "mgwdev-m365-helpers/lib/services";
import { GoogleToken } from "../model/GoogleToken";

export class GoogleDriveAuthService implements IAuthenticationService {
    public client: any;
    private accessToken?: string;
    constructor(protected clientId: string) {
        let accessTokenString = localStorage.getItem("googleAccessToken") || ""
        if (accessTokenString) {
            let gToken = JSON.parse(accessTokenString) as GoogleToken;
            if (new Date(gToken.storeDate).getTime() + 3600000 > new Date().getTime()) {
                this.accessToken = gToken.access_token;
            }
        }
    }
    public getAccessToken(resource: string): Promise<string> {
        if (this.accessToken) {
            return Promise.resolve(this.accessToken);
        }
        return new Promise<string>((resolve, reject) => {
            var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

            // Create <form> element to submit parameters to OAuth 2.0 endpoint.
            var form = document.createElement('form');
            form.setAttribute('method', 'GET'); // Send as a GET request.
            form.setAttribute('action', oauth2Endpoint);

            // Parameters to pass to OAuth 2.0 endpoint.
            var params = {
                'client_id': this.clientId,
                'redirect_uri': window.location.origin + window.location.pathname + "?app=google",
                'response_type': 'token',
                'scope': 'https://www.googleapis.com/auth/drive',
                'include_granted_scopes': 'true',
                'state': 'pass-through value'
            };

            // Add form parameters as hidden input values.
            for (var p in params) {
                var input = document.createElement('input');
                input.setAttribute('type', 'hidden');
                input.setAttribute('name', p);
                //@ts-ignore
                input.setAttribute('value', params[p]);
                form.appendChild(input);
            }

            // Add form to page and submit it to open the OAuth 2.0 endpoint.
            document.body.appendChild(form);
            form.submit();
        }
        )
    }
}