# Microsoft Bot Framework Web Chat with SSO

## Summary

An web parts sample that uses the [botframework-webchat module](https://www.npmjs.com/package/botframework-webchat) to create a React component to render the Bot Framework v4 webchat component. This web parts sample is a single sign-on demo for on behalf of authentication using OAuth.

> When dealing with personal data, please respect user privacy. Follow platform guidelines and post your privacy statement online.

## Compatibility

![SPFx 1.10.0](https://img.shields.io/badge/SPFx-1.10.0-green.svg)
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "The solution requires access to the user's credentials")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

* [SharePoint Framework Web Parts](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/overview-client-side-web-parts)
* [Office 365 developer tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
* [Microsoft Bot Framework](http://dev.botframework.com)

## Prerequisites

> You need to get familiar with [the web parts web chat sample](Placeholder) first as this sample is based on that sample.

> You need to have this [bot](../bot/) created and registered using the Microsoft Bot Framework and registered to use the Direct Line Channel, which will give you the token generation endpoint needed when adding this web parts to the page. For more information on creating a bot and registering the channel you can see the official web site at [dev.botframework.com](http://dev.botframework.com).

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


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-bot-framework-sso") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-bot-framework-sso) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-bot-framework-sso&template=bug-report.yml&sample=react-bot-framework-sso&authors=@stephanbisser&title=react-bot-framework-sso%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-bot-framework-sso&template=question.yml&sample=react-bot-framework-sso&authors=@stephanbisser&title=react-bot-framework-sso%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-bot-framework-sso&template=question.yml&sample=react-bot-framework-sso&authors=@stephanbisser&title=react-bot-framework-sso%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-bot-framework-sso/webpart" />
