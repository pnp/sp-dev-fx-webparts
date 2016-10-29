# Microsoft Bot Framework Web Chat - Visual Studio 2015 bot project

## Summary
Simple VS 2015 project created with the Microsoft Bot Framework templates. Meant to be used together with associated SP Fx client side web part, which is assocated to talk to this bot.

## Applies to

* [Microsoft Bot Framework](http://dev.botframework.com)

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 28th, 2016|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Open this Visual Studio Project in Visual Studio 2015
- Compile the code
- Register bot in [Bot Framework Portal](http://dev.botframework.com) for getting MicrosoftAppId and MicrosoftAppPassword values needed for web.configure
- Update web.config accordingly
- Deploy to be hosted in Azure

See following URLs for more details on the step-by-step guidance

* [Getting started with the Connector](https://docs.botframework.com/en-us/csharp/builder/sdkreference/gettingstarted.html) - MS Bot Framework documentation
* [Creating your first bot with the Microsoft Bot Framework – Part 1 – Build and test locally](http://www.garypretty.co.uk/2016/07/14/creating-your-first-bot-with-the-microsoft-bot-framework-part-1/) - [@GaryPretty](https://twitter.com/GaryPretty)
* [Creating your first bot with the Microsoft Bot Framework – Part 2 – publishing and chatting through Skype](http://www.garypretty.co.uk/2016/07/16/creating-your-first-bot-with-the-microsoft-bot-framework-part-2/) - [@GaryPretty](https://twitter.com/GaryPretty)

## Needed configuration settings
You will need to update following three configuration options in the web.config for making this template work properly.

```XML
 <appSettings>
    <!-- update these with your BotId, Microsoft App Id and your Microsoft App Password-->
    <add key="BotId" value="update-to-your-value" />
    <add key="MicrosoftAppId" value="update-to-your-value" />
    <add key="MicrosoftAppPassword" value="update-to-your-value" />
  </appSettings>
  ```

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-bot-framework/vs2015-bot-application" />