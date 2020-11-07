# Microsoft Bot Framework Web Chat

## Summary

A web part sample that uses the [botframework-webchat module](https://www.npmjs.com/package/botframework-webchat) to create a React component to render the Bot Framework v4 webchat component. This web part is able to render Text and rich attachments (Images, Cards, Adaptive Cards, ...) and has settings for branding purposes.

## Used SharePoint Framework Version

![SPFx 1.10.0](https://img.shields.io/badge/drop-1.10.0-green.svg)

## Applies to

* [SharePoint Framework Web Parts](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/overview-client-side-web-parts)
* [Office 365 developer tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
* [Microsoft Bot Framework](http://dev.botframework.com)

## Prerequisites

> You need to have this [bot](../bot/) created and registered using the Microsoft Bot Framework and registered to use the **Direct Line Channel**, which will give you the token generation endpoint needed when adding this web part to the page. For more information on creating a bot and registering the channel you can see the official web site at [dev.botframework.com](http://dev.botframework.com).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:

  ```bash
  npm install
  gulp serve
  ```

- Set the bot service URI as Bot EndPoint.

- Config bot endpoint \
  Add the web part, set the bot endpoint to `https://YOUR_BOT.azurewebsites.net`, refresh the page, then you can successfully connect the bot with SharePoint.

## Deploy

If you want to deploy the bot follow the steps in the [Host your client-side web part from Microsoft 365 CDN](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/hosting-webpart-from-office-365-cdn) article

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Connecting and communicating with a bot built on the Microsoft Bot Framework using the Direct Line Channel
- Validating Property Pane Settings
- Office UI Fabric
- React

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-bot-framework-secure/webpart" />
