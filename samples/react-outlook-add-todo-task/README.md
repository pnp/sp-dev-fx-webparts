# Create To Do Task from Email (Outlook Add in)

## Summary
This webpart allows us to create a new To Do task using the new ToDo MS Graph endpoint. If deployed as an Outlook Add In, the Task title comes from email subject. Let´s say this is similar to the OOTB "Flag" action, but here you can select the ToDo List where to store the Task, and you can modify the Title before adding it.

![Create ToDo task](./assets/spfx-todo-outlook.gif)

## Graph To-Do Preview endpoints

As of today, To Do endpoint is not very well documented yet. It was presented in latest Build 2020. Here are some of the basic operations. You can get more information and see the Build session from this link: [https://developer.microsoft.com/en-us/office/blogs/introducing-the-new-microsoft-graph-to-do-api/](https://developer.microsoft.com/en-us/office/blogs/introducing-the-new-microsoft-graph-to-do-api/)

### Get lists 
GET https://graph.microsoft.com/beta/me/todo/lists

### Create new List

POST https://graph.microsoft.com/beta/me/todo/lists

```json
{
  displayName: "My new List"
}
```

### Get tasks in list
GET https://graph.microsoft.com/beta/me/todo/lists/{listId}/tasks

### Create new Task in List
POST https://graph.microsoft.com/beta/me/todo/lists/{listId}/tasks

```json
{
  "importance": "high",
  "status": "notStarted",
  "title": "New task to do",
  "body": {
    "content": "You have a new task to do",
    "contentType": "text"
  }
}
```

## Used SharePoint Framework Version

![SPFx v1.10.0](https://img.shields.io/badge/SPFx-1.10.0-green.svg)

## Solution

Solution|Author(s)
--------|---------
react-outlook-add-todo-task|Luis Mañez (MVP, [ClearPeople](http://www.clearpeople.com), @luismanez)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Jun 3, 2020|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* clone repo
* gulp bundle --ship
* gulp package-solution --ship
* deploy package to SharePoint App Catalog (check tenant deploy)
* Using O365 CLI to configure MS Graph permissions to allow creating ToDo tasks
```ps
spo serviceprincipal grant add --resource "Microsoft Graph" --scope "Tasks.ReadWrite"
```
* deploy spfx solution as Outlook add-in following instructions here: [https://docs.microsoft.com/en-us/sharepoint/dev/spfx/office-addins-create#deployment-of-your-add-in](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/office-addins-create#deployment-of-your-add-in)

## Features

This sample illustrates the following concepts on top of the SharePoint Framework:

* New ToDo MS Graph endpoint
* Using __MSGraphClient__ 
* Outlook SPFx add-in
* Using _async / await_ for the async calls
* FluentUI components

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-outlook-add-todo-task" />
