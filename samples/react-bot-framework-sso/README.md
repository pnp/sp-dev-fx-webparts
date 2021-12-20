# SharePoint web part sample with SSO

## Summary

[Web parts](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/overview-client-side-web-parts) is a special kind of SharePoint controls that can be supported by the [Bot Framework](https://dev.botframework.com). This sample will show you how to embed a Bot Framework bot into a SharePoint web site with SSO.

There are two parts included in this sample:

1. A login bot sample
1. A web parts sample

The web parts embeds the login bot by using a webchat. As the user has already login in the SharePoint website, we could use [SSO](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-authentication-sso?view=azure-bot-service-4.0&tabs=csharp%2Ceml) to authorize the bot. This sample shows how to do this including:

- Detect and intercept OAuth process.
- Use SharePoint library to get the exchange token and send it back to the bot.

This demo does not include any threat models and is designed for educational purposes only. When you design a production system, threat-modelling is an important task to make sure your system is secure and provide a way to quickly identify potential source of data breaches. IETF [RFC 6819](https://tools.ietf.org/html/rfc6819) and [OAuth 2.0 for Browser-Based Apps](https://tools.ietf.org/html/draft-ietf-oauth-browser-based-apps-01#section-9) is a good starting point for threat-modelling when using OAuth 2.0.

![demo](assets/sp-wp-sso.gif)


## Compatibility

![SPFx 1.10.0](https://img.shields.io/badge/SPFx-1.10.0-green.svg)
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "The solution requires access to the user's credentials")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)
* [Microsoft Bot Framework](http://dev.botframework.com)

## Prerequisites

- [Node.js](https://nodejs.org) version 10.19 (Node.js v9.x, v11.x, and v12.x are not currently supported with SharePoint Framework development)

    ```bash
    # determine node version
    node --version
    ```

- [python](https://www.python.org/) version 2.7

    ```bash
    # determine python version
    python --version
    ```

## Solution

Solution|Author(s)
--------|---------
web part | Bot Framework Discussions (msbots@service.microsoft.com) <br/> [Stephan Bisser](https://github.com/stephanbisser) (@stephanbisser, bisser.io)
bot | Bot Framework Discussions (msbots@service.microsoft.com)

## Version history

Version|Date|Comments
-------|----|--------
1.0|Nov 10, 2020|Initial release

## Minimal Path to Awesome

### Enlist

- Clone the repository

    ```bash
    git clone https://github.com/pnp/sp-dev-fx-webparts.git
    ```

### [Setup bot with Direct Line](./bot/README.md)

- In a terminal, navigate to `sp-dev-fx-webparts`

    ```bash
    cd sp-dev-fx-webparts
    ```

- Navigate to the folder for this solution:

    ```base
    cd samples
    cd react-bot-framework-sso
    ```

- Install modules

    ```bash
    npm install
    ```

- Register connections. You can get it done by [deploy your bot to Azure](https://aka.ms/azuredeployment). Save your bot service endpoint like: "https://YOUR_BOT.azurewebsites.net". Save your AAD Id as `YOUR_APP_ID`, AAD Name as `YOUR_APP_Name` and secret as `YOUR_APP_PSW` also.

- [Connect to direct line](https://docs.microsoft.com/en-us/azure/bot-service/bot-service-channel-connect-directline?view=azure-bot-service-4.0), copy one of the Secret Key values as YOUR_DIRECT_LINE_SECRET and store this for later. This is your ‘Direct Line Secret’.

- Add `DirectLineSecret` to an `.env` config file under `./bot`

    ```bash
    MicrosoftAppId=YOUR_APP_ID
    MicrosoftAppPassword=YOUR_APP_PSW
    DirectLineSecret=YOUR_DIRECT_LINE_SECRET
    ```

### Setup OAuth via Azure Active Directory for the Bot

[Check here](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-authentication?view=azure-bot-service-4.0&tabs=csharp) for more information about getting an AADv2
application setup for use in Azure Bot Service.

- Go to your [Azure Active Directory](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview)
- Open your bot's application registration
- Save the tenant ID
    - Select the "Overview" blade
    - On the main pane, copy the content of "Directory (tenant) ID" as `YOUR_APP_TENANT` and store this for later
- Update Authentication
    - Select the "Authentication" blade
    - Click "Add a platform" to add web if Web is not added
    - In "Redirect URIs" section, add a new entry `https://token.botframework.com/.auth/web/redirect`
-  Update App Registration Manifest
    - Select the "Manifest" blade
        - Set `accessTokenAcceptedVersion` to `2`
-  Add a scope
    - Select the "Expose an API" blade
    - Click the "Add a scope" button under "Scopes defined by this API"
        - Click "Save and continue"
        - Add a scope named `YOUR_AAD_SCOPE_NAME`
        - Set "Who can consent?" to "Admins and users"
        - Add an admin consent display name
        - Add an admin consent description
        - Click "Add scope"
        - Save the Scope URL to configure authentication for the bot in the Bot Registration in the next section
            - api://123a45b6-789c-01de-f23g-h4ij5k67a8bc/<YOUR_AAD_SCOPE_NAME>
    - Select API permissions
        - Click "API Permissions", select"Add a permission"
        - Select "My APIs", `YOUR_APP_ID`, and enable `YOUR_AAD_SCOPE_NAME` scope `\`
        Otherwise the non-admin user cannot use SSO.

### Setup Authentication via Azure Bot Services for the Bot

Check the [Add authentication to your bot via Azure Bot Service](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-tutorial-authentication?view=azure-bot-service-3.0&tabs=aadv1) article for more information about adding authentication to your bot.

- Add OAuth Connection for the bot to the Bot Channel Registration
    - In the Bot Channel Registration open the settings blade
    - Under "OAuth Connection Settings" click the "Add Setting" button
        - Add new Connection Setting
            - Set the connection "Name"
            - Set the "Service Provider" to "Azure Active Directory 2"
            - Add the Client ID as `YOUR_APP_ID`, Client secret as `YOUR_APP_PSW`, and Tenant ID as `YOUR_APP_TENANT`
            - Set the "Token Exchange URL" to the scope URL that was created in the previous section
                -  api://123a45b6-789c-01de-f23g-h4ij5k67a8bc/<YOUR_AAD_SCOPE_NAME>
            - Set the "Scopes" field to the scopes you want the bot to have permission to access (ie. `user.read`)

### Republish bot

- Update `.env` with `ConnectionName` to `.env` config file under `./bot`

    ```bash
    ConnectionName=YOUR_CONNECTION_NAME
    ```

- Republish your bot with new config or restart it in local use:

    ```bash
    npm start
    ```

### [Setup web parts](./webpart/README.md)

- Edit `BotSignInToast.tsx` to set your AAD scope uri(`scopeUri`) with `api://YOUR_APP_ID` directly like `api://123a45b6-789c-01de-f23g-h4ij5k67a8bc`:

    ```ts
    return tokenProvider.getToken(scopeUri, true).then((token: string) => {
    ```

- Add the following config to `./config/package-solution.json`:

    ```diff
        "webApiPermissionRequests": [
    +     {
    +       "resource": "<YOUR_APP_Name>",
    +       "scope": "<YOUR_AAD_SCOPE_NAME>"
    +     }
        ],
    ```

- Install modules

    ```bash
    cd ../webpart
    npm install
    ```

- [Publish and host webpart](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/hosting-webpart-from-office-365-cdn), prepare for approving permissions

- Refer [Connect to Azure AD-secured APIs](https://docs.microsoft.com/en-us/sharepoint/api-access) to publish and approve permissions from admin site
    - Please ensure your service principal had been enabled for your AAD account.
        - Check "Managed application in local directory" in your AAD overview blade in Azure Portal
    - Go to SharePoint admin center
    - Find "API Access", approve "<YOUR_APP_Name>"

- (Opt. for hosted bot service) Config CORS \
  [CORS](https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) must be set on bot app service to enable SharePoint client to get resource from bot service. Follow these steps to add your workbench to bot app service CORS configuration:
    1. Go to your azure portal
    2. Navigate to your bot app service, search for CORS settings
    3. Add https://localhost:4321 and https://<YOUR_SITE>.sharepoint.com to CORS origins

### Setup OAuth via Azure Active Directory for the SharePoint

The following operations will need an admin account.

- Go to your [Azure Active Directory](https://ms.portal.azure.com/#blade/Microsoft_AAD_IAM/ActiveDirectoryMenuBlade/Overview)
- Open "App registrations", find "SharePoint Online Client Extensibility Web Application Principal"
- Save the client ID
    - Select the "Overview" blade
    - On the main pane, copy the content of "Application ID" as YOUR_SHAREPOINT_ID and store this for later usage
- Update App Registration Manifest
    - Select the "Manifest" blade
        - Set `accessTokenAcceptedVersion` to `2`

### Add a client application to the OAuth for the Bot

- Open your bot's application registration
- Select the "Expose an API" blade
- Click the "Add a client application" under "Authorized client applications"
    - Set the client id to the `YOUR_SHAREPOINT_ID`
    - Check the box next to the scope we added in the previous step under "Authorized scopes"
    - Click "Add application"

### Test web parts
- Go to `webpart` folder, in the command line run

    ```bash
    gulp serve
    ```

    Now web parts is running locally.
- Open online test page with user account: https://<YOUR_SITE>.sharepoint.com/_layouts/15/Workbench.aspx
- Config bot endpoint \
    Add the web parts, set bot endpoint to https://YOUR_BOT.azurewebsites.net, refresh this page, then you can successfully connect bot with SharePoint.

## Features

**Web Chat integration with SSO**

First a store is used to intercept activities with OAuth card. When the client receives an OAuth request, the client will ask the user if it should use SSO to login instead.

```ts
const store = useMemo(
    () =>
        createStore({}, ({ dispatch }) => next => action => {
            if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY' && action.payload.activity.from.role === 'bot') {
                const activity =
                (action.payload.activity.attachments || []).find(
                    ({ contentType }) => contentType === 'application/vnd.microsoft.card.oauth'
                ) || {};
                const { content } = activity;

                if (content) {
                    const { tokenExchangeResource } = content;
                    const { uri } = tokenExchangeResource;

                    if (uri) {
                        dispatch({
                            type: 'WEB_CHAT/SET_NOTIFICATION',
                            payload: {
                                data: { content },
                                id: 'signin',
                                level: 'info',
                                message: 'Please sign in to the app.'
                            }
                            });

                        return false;
                    }
                }
            }

            return next(action);
        }),
    []
);
```

Web Chat could use toast for custom prompts:

```ts
const toastMiddleware = () => next => ({ notification, ...otherArgs }) => {
    const { id } = notification;
    if (id === 'signin') {
        return <BotSignInToast notification={notification} context={props.context}/>;
    }
    else if (id === 'traditionalbotauthentication') {
        return <TraditionalBotAuthenticationToast notification={notification} />;
    }
    return next({ notification, ...otherArgs });
};
```

In the toast, [`aadTokenProvider`](https://docs.microsoft.com/en-us/javascript/api/sp-http/aadtokenprovider?view=sp-typescript-latest) is used to get the required token for exchange. If succeed, send an invoke activity back for authentication:

```ts
context.aadTokenProviderFactory.getTokenProvider().then((tokenProvider: AadTokenProvider) => {
    return tokenProvider.getToken('api://123a45b6-789c-01de-f23g-h4ij5k67a8bc/scope', true).then((token: string) => {
        const { connectionName, tokenExchangeResource } = content;
        const { tokenId } = tokenExchangeResource;

        if (token) {
            postActivity({
                channelData: { invokeId },
                type: 'invoke',
                name: 'signin/tokenExchange',
                value: {
                    id: tokenId,
                    connectionName,
                    token,
                },
            });
        }
    });
});
```

If the SSO approach failed, fallback to traditional sign in link:

```ts
const handleClick = useCallback(() => {
    dismissNotification(id);
    performCardAction(signin);
}, [dismissNotification, id, performCardAction, signin]);
```

Note: The first time users try SSO, users may be presented with an OAuth card to log in. This is because users have not yet given consent to the bot's Azure AD app. To avoid this, users can grant admin consent for any graph permissions requested by the Azure AD app.

Note: due to a [SDK bug](https://github.com/microsoft/botbuilder-js/issues/3006), the consent card could not be shown properly yet. Granting admin consent may be necessary to workaround this.

## Further reading

- [SharePoint Web Parts Development Basics](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/overview-client-side-web-parts)
- [Bot Framework Documentation](https://docs.botframework.com)
- [Bot Basics](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0)
- [Azure Bot Service Introduction](https://docs.microsoft.com/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0)
- [Azure Bot Service Documentation](https://docs.microsoft.com/azure/bot-service/?view=azure-bot-service-4.0)
- [Add authentication to your bot](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-tutorial-authentication?view=azure-bot-service-3.0&tabs=aadv1)
- [Add single sign on to a bot](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-authentication-sso?view=azure-bot-service-4.0&tabs=csharp%2Ceml)
- [Web Chat with SSO using MSAL](https://github.com/microsoft/BotFramework-WebChat/tree/master/samples/07.advanced-web-chat-apps/e.sso-on-behalf-of-authentication)


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-bot-framework-sso") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-bot-framework-sso) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-bot-framework-sso&template=bug-report.yml&sample=react-bot-framework-sso&authors=@stephanbisser&title=react-bot-framework-sso%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-bot-framework-sso&template=question.yml&sample=react-bot-framework-sso&authors=@stephanbisser&title=react-bot-framework-sso%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-bot-framework-sso&template=question.yml&sample=react-bot-framework-sso&authors=@stephanbisser&title=react-bot-framework-sso%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-bot-framework-sso" />
