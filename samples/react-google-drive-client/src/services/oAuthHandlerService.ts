import * as teamsSDK from "@microsoft/teams-js-v2";
export class oAuthHandlerService {
    public static async handleOAuthResponse(teamsjs: typeof import("@microsoft/teams-js-v2")): Promise<void> {
        const url = new URL(window.location.href.replace("#state=pass-through%20value", ""));
        const params = new URLSearchParams(url.search);
        const token = params.get("access_token");
        if (token) {
            if (url.searchParams.get("app") === "google") {
                localStorage.setItem("googleAccessToken", JSON.stringify({
                    access_token: token,
                    storeDate: new Date().toISOString()
                }));
                try {
                    //as SPFx in current version does not provide teamsContext in login window we have to work around it
                    if (teamsjs) {
                        await teamsjs.app.initialize();
                        teamsjs.authentication.notifySuccess(token);
                    }
                    else{
                        await teamsSDK.app.initialize();
                        teamsSDK.authentication.notifySuccess(token);
                    }
                }
                catch (err) {
                    console.log(err);
                }
                //if You want You can clear the search params here
            }
        }
    }
}