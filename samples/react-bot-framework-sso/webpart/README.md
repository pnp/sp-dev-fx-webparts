# Microsoft Bot Framework Web Chat with SSO

## Summary

An web parts sample that uses the [botframework-webchat module](https://www.npmjs.com/package/botframework-webchat) to create a React component to render the Bot Framework v4 webchat component. This web parts sample is a single sign-on demo for on behalf of authentication using OAuth.

> When dealing with personal data, please respect user privacy. Follow platform guidelines and post your privacy statement online.

## Used SharePoint Framework Version

![SPFx 1.10.0](https://img.shields.io/badge/drop-1.10.0-green.svg)

## Applies to

* [SharePoint Framework Web Parts](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/overview-client-side-web-parts)
* [Office 365 developer tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
* [Microsoft Bot Framework](http://dev.botframework.com)

## Prerequisites

> You need to get familiar with [the web parts web chat sample](Placeholder) first as this sample is based on that sample.

> You need to have this [bot](../bot/) created and registered using the Microsoft Bot Framework and registered to use the Direct Line Channel, which will give you the token generation endpoint needed when adding this web parts to the page. For more information on creating a bot and registering the channel you can see the official web site at [dev.botframework.com](http://dev.botframework.com).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository

- Edit `BotSignInToast.tsx` file to set your AAD scope uri(`scopeUri`) with `api://YOUR_APP_ID` directly like `api://123a45b6-789c-01de-f23g-h4ij5k67a8bc`:

    ```ts
    return tokenProvider.getToken(scopeUri, true).then((token: string) => {
    ```

- Add the following config to ./config/package-solution.json:

    ```diff
        "webApiPermissionRequests": [
    +     {
    +       "resource": "<YOUR_APP_ID>",
    +       "scope": "<YOUR_AAD_SCOPE_NAME>"
    +     }
        ],
    ```

- Refer [Connect to Azure AD-secured APIs](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aadhttpclient) to publish and approve permissions from admin site

- In the command line run

    ```bash
    cd ../extension
    npm install
    gulp serve
    ```

- Open online test page with user account: https://<YOUR_SITE>.sharepoint.com/_layouts/15/Workbench.aspx
- Config bot endpoint \
    Add the web part, set bot endpoint to https://YOUR_BOT.azurewebsites.net, refresh this page, then you can successfully connet bot with SharePoint.

## Deploy

If you want to deploy it follow [these steps](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/hosting-webpart-from-office-365-cdn) 

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Connecting and communicating with a bot built on the Microsoft Bot Framework using the Direct Line Channel
- Validating Property Pane Settings
- Office UI Fabric
- React
- Demo single sign-on for on behalf of authentication using OAuth

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-bot-framework-sso/webpart" />
