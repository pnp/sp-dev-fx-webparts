# Tutorial: Migrate jQuery and FullCalendar solution built using Script Editor Web Part to SharePoint Framework

When building SharePoint solutions, SharePoint developers often use the [FullCalendar](https://fullcalendar.io/) jQuery plug-in to display data in calendar view. FullCalendar is a great alternative to the standard SharePoint calendar view, as it allows you to render as calendar data from multiple calendar lists, data from non-calendar lists, or even data from outside SharePoint. This article illustrates how you would migrate a SharePoint customization by using FullCalendar built with the Script Editor web part to the SharePoint Framework.

This tutorial shows you how to convert a Script Editor web part built using jQuery and FullCalendar to the SharePoint Framework.

![List of tasks displayed as a calendar built using the Script Editor web part](https://docs.microsoft.com/en-us/sharepoint/dev/images/fullcalendar-sewp.png)

The source code for this tutorial can be found on the [GitHub repository](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/tutorials/tutorial-migrate-datatables). The step-by-step guidance is available at [https://dev.office.com/sharepoint/docs/spfx/web-parts/guidance/migrate-jquery-datatables-script-to-spfx](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/tutorials/tutorial-migrate-fullcalendar).

The tutorial is broken down into the stages of the migration process. You can find the source code for a complete working solution that you can run in the browser for each stage, along with the step by step instructions below:

| Tutorial Stage | Folder 
| ------------- | ------------- 
| [Migrate the IT requests overview solution from the Script Editor web part to the SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/migrate-jquery-datatables-script-to-spfx#migrate-the-it-requests-overview-solution-from-the-script-editor-web-part-to-the-sharepoint-framework) | [01-migrated-sewp-to-spfx](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/migrate-jquery-fullcalendar-script-to-spfx#migrate-the-tasks-calendar-solution-from-the-script-editor-web-part-to-the-sharepoint-framework)
| [Add support for configuring the web part through web part properties](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/migrate-jquery-datatables-script-to-spfx#add-support-for-configuring-the-web-part-through-web-part-properties) | [02-added-configuration](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/migrate-jquery-fullcalendar-script-to-spfx#add-support-for-configuring-the-web-part-through-web-part-properties)
| [Transform the plain JavaScript code to TypeScript](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/migrate-jquery-fullcalendar-script-to-spfx#transform-the-plain-javascript-code-to-typescript)| [03-transformed-js-to-typescript](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/tutorials/tutorial-migrate-fullcalendar/03-transformed-js-to-typescript)
| [Replace jQuery AJAX calls with SharePoint Framework API](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/guidance/migrate-jquery-fullcalendar-script-to-spfx#replace-jquery-ajax-calls-with-sharepoint-framework-api) | [04-replaced-jquery-ajax-with-spfx](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/tutorials/tutorial-migrate-fullcalendar/04-replaced-jquery-ajax-with-spfx)

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/tutorials/migrate-datatables" />
