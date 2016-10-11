# Microsoft Bot Framework Web Chat

## Summary
Short summary on functionality and used technologies.

[picture of the web part in action]

## Applies to

* [SharePoint Framework Developer Preview](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)
* [Microsoft Bot Framework](http://dev.botframework.com)

## Prerequisites
 
> You need to have a bot created and registered using the Microsoft Bot Framework and registered to use the Direct Line Channel, 
which will give you the secret needed when adding this web part to the page.  For more information on creating a bot and registering 
the channel you can see the official web site at [dev.botframework.com](http://dev.botframework.com), as well as various tutorials 
over at [www.garypretty.co.uk/category/microsoft-bot-framework/](http://www.garypretty.co.uk/category/microsoft-bot-framework/)

## Solution

Solution|Author(s)
--------|---------
bot-framework | Gary Pretty ([@garypretty](http://www.twitter.com/garypretty), [garypretty.co.uk](www.garypretty.co.uk))

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 11th, 2016|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `tsd install`
  - `gulp serve`

- Register your bot in the Microsoft Bot Framework Portal, configure the Direct Line channel on the bot and obtain your Direct Line secret.

## Features 
This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Connecting and communicating with a bot built on the Microsoft Bot Framework using the Direct Line Channel
- Validating Property Pane Settings
- Office UI Fabric
- React

When adding the web part to a page you need to obtain your Bot Direct Line Channel secret via the [Bot Framework Portal](http://dev.botframework.com).
You then add this secret via the Property Pane of the web part. If there is an error initializing the Direct Line Client with the bot then they will 
be shown in the console within the browser.

Additional settings can be set to style the web part, including;

 - Display title of the web part
 - Web part header background color
 - Placeholder text
 - Foreground / background colors for messages, both from the user and from the bot

Currently this web part only supports plain text conversations with a bot. Other message types, 
such as Rich Cards and Attachments are not supported, but are on the roadmap for a future update.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-bot-framework" />