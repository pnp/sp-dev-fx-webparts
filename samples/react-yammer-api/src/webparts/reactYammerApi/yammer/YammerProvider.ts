import { IYammerProvider } from './IYammerProvider';
import { IConfiguration } from './IConfiguration';
import { SearchResult } from './SearchResult';
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";

declare const window: any;

/**
 * Yammer JavaScript SDK extended wrapper.
 */
export default class YammerProvider implements IYammerProvider {

    private readonly _config: IConfiguration;

    constructor(config: IConfiguration) {
        this._config = config;
    };

    /**
     * Appends the Yammer platform_js_sdk.js on the page, if not present.
     */
    public loadSdk(): Promise<void> {
        return new Promise<void>((resolve, reject) => {

            if (window.hasYammerSdkLoaded) { return resolve(); }

            let element: HTMLScriptElement = document.createElement("script");
            element.src = "https://c64.assets-yammer.com/assets/platform_js_sdk.js";
            element.async = true;
            element.setAttribute("data-app-id", this._config.clientId);
            document.body.appendChild(element);
            window.hasYammerSdkLoaded = true;

            let attempts: number = 0;
            let scriptLoadedCheck: any = () => {
                if (window.yam) {
                    resolve();
                } else if (attempts === 40) { // timeout
                    reject();
                } else {
                    attempts += 1;
                    window.setTimeout(scriptLoadedCheck, 50);
                }
            };
            scriptLoadedCheck();
            // element.onload can be used instead of setInterval. Not sure will work on all browsers.
        });
    };

    /**
     * Improved Yammer JavaScript SDK "getLoginStatus" function wrapper.
     * Will attepmt to smart authenticate without prompts if the user is not logged in 
     * and the environment is SharePoint online.
     */
    public getLoginStatus(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._getLoginStatus()
                .then((res) => {
                    resolve(res);
                })
                .catch((err) => {
                    if (Environment.type !== EnvironmentType.SharePoint) {
                        return reject(err);
                    }
                    // if SharePoint online then
                    // will attempt smart (no popups) authentication.
                    this._iframeAuthentication()
                        .then((res) => {
                            resolve(res);
                        })
                        .catch((e) => {
                            reject(e);
                        });
                });
        });
    }

    /**
     * Yammer JavaScript SDK "loginButton" function wrapper.
     * See https://developer.yammer.com/docs/js-sdk.
     * @param selector - jQuery selector.
     */
    public loginButton(selector: string): Promise<any> {
        return new Promise((resolve, reject) => {
            window.yam.connect.loginButton(selector, (res: any) => {
                if (res.authResponse) {
                    // Store the token in local storage for any subsequent call to Yammer
                    // so the user doesn't need to sign in again after restarting their
                    // browser session.
                    localStorage.setItem("yammerAuthToken", res.access_token.token);

                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
    }

    /**
    * Yammer JavaScript SDK "login" function wrapper.
    * See https://developer.yammer.com/docs/js-sdk.
    */
    public login(): Promise<any> {
        return new Promise((resolve, reject) => {
            window.yam.platform.login((res: any) => {
                if (res.authResponse) {
                    // Store the token in local storage for any subsequent call to Yammer
                    // so the user doesn't need to sign in again after restarting their
                    // browser session.
                    localStorage.setItem("yammerAuthToken", res.access_token.token);

                    resolve(res);
                }
                else {
                    reject(res);
                }
            });
        });
    }

    /**
     * Yammer JavaScript SDK "request" function wrapper.
     * Public, but not recommended for extensive use. 
     * More fluent methods using "request" function can be created, see the YammerProvider.search method as reference.
     * See https://developer.yammer.com/docs/js-sdk.
     * @param jQueryAjaxSettings - supports the jQuery.ajax() standard attributes.
     */
    public request(jQueryAjaxSettings: any): void {
        window.yam.platform.request(jQueryAjaxSettings);
    }

    /**
     * Yammer search REST endpoint wrapper.
     * See https://developer.yammer.com/docs/js-sdk.
     * @param searchQuery 
     */
    public search(searchQuery: string): Promise<Array<SearchResult>> {
        let results: Array<SearchResult> = new Array<SearchResult>();

        return new Promise((resolve, reject) => {
            this.request({
                url: `search.json?search=${window.encodeURIComponent(searchQuery)}`,
                success: (res) => {
                    if (res.messages) {
                        for (let i: number = 0; i < res.messages.messages.length; i++) {
                            results.push(SearchResult.create(res.messages.messages[i]));
                        }
                    }
                    resolve(results);
                },
                error: (err) => {
                    reject(err);
                }
            });
        });
    };

    /**
     * Yammer JavaScript SDK "getLoginStatus" function wrapper.
     * See https://developer.yammer.com/docs/js-sdk.
     */
    private _getLoginStatus(): Promise<any> {
        return new Promise((resolve, reject) => {
            // Apply the auth token we have stored in local storage
            let token = localStorage.getItem("yammerAuthToken");
            if (token) {
                window.yam.platform.setAuthToken(token);
            }

            window.yam.getLoginStatus((res: any) => {
                if (res.authResponse) {
                    resolve(res);
                } else {
                    reject(res);
                }
            });
        });
    };

    /**
     * Authenticating Office 365 tenant user with OAuth2 call in iframe. 
     * Technique used by Microsoft for the Yammer embed OOTB modern webpart, 
     * discovered by Joseph King (@7kingjoe3).
     * Make sure the client Id and redirect Uri are as specified in the registered Yammer app.
     */
    private _iframeAuthentication(): Promise<any> {
        let self: YammerProvider = this;

        return new Promise((resolve, reject) => {

            let iframeId: string = "authIframe";
            let element: HTMLIFrameElement = document.createElement("iframe");

            element.setAttribute("id", iframeId);
            element.setAttribute("style", "display:none");
            document.body.appendChild(element);
            element.addEventListener("load", _ => {
                try {
                    let elem: HTMLIFrameElement = document.getElementById(iframeId) as HTMLIFrameElement;
                    let token: string = elem.contentWindow.location.hash.split("=")[1];
                    window.yam.platform.setAuthToken(token);
                    this._getLoginStatus()
                        .then((res) => {
                            resolve(res);
                        })
                        .catch((err) => {
                            reject(err);
                        });
                } catch (ex) {
                    reject(ex);
                }
            });
            let domainName: string = window.location.host.split(".")[0];
            let queryString: string = `client_id=${self._config.clientId}&response_type=token&redirect_uri=${self._config.redirectUri}`;
            let url: string = `https://www.yammer.com/${domainName}.onmicrosoft.com/oauth2/authorize?${queryString}`;
            element.src = url;

            // timeout reject promise can be added here, but this is too much defensive programing for me.
        });
    }
}
