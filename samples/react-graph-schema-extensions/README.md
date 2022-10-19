# Read / Update Microsoft Graph Custom Schema Extensions

## Summary
This sample shows how read and update a custom Schema extension in Microsoft Graph. It shows how to create a
custom Schema extension in Graph to store custom data related to an Office 365 Group, and how we can read and update
that data using an spfx web part.

A possible business scenario here could be if we want to store some additional custom data related to some specific
Office 365 Groups, for instance Sales information, and make it available in the SharePoint site.

![Custom Schema Extension Web part](./assets/webpart.png)


## Compatibility

![SPFx 1.5.1](https://img.shields.io/badge/SPFx-1.5.1-green.svg) 
![Node.js v8 | v6](https://img.shields.io/badge/Node.js-v8%20%7C%20v6-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework Developer](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
react-graph-schema-extensions|Luis Mañez (MVP, [ClearPeople](http://www.clearpeople.com), @luismanez)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Jul 03, 2018|Initial release



## Prerequisites
* Create a custom extenion for Groups using Graph API: Currently, spfx has no permissions to create custom extensions
for entities in Graph API. To create the custom extension, you can use the [MS Graph Explorer website](https://developer.microsoft.com/en-us/graph/graph-explorer).

To create the extension you must do a POST request to:

```js
POST https://graph.microsoft.com/v1.0/schemaExtensions
content-type: application/json
{
    "id": "inheritscloud_SalesCustomData",
    "description": "Adding custom data to Groups created for sales",
    "owner": "ac638f16-63c2-462b-95a4-16f8a60b0628",
    "targetTypes": [
        "Group"
    ],
    "properties": [
        {
            "name": "businessUnit", "type": "String"
        },
        {
            "name": "estimatedBudget", "type": "Integer"
        },
        {
            "name": "expectedClosedDate", "type": "DateTime"
        }
    ]
}
```

See here for more information about the attributes: [https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/schemaextension](https://developer.microsoft.com/en-us/graph/docs/api-reference/beta/resources/schemaextension)

__Note__:
* For the _id_ attribute, You can assign a value in one of two ways:
    * Concatenate the name of one of your verified domains with a name for the schema extension to form a unique string in this format, {domainName}_{schemaName}. As an example, contoso_mySchema. 
    * Provide a schema name, and let Microsoft Graph use that schema name to complete the id assignment in this format: ext{8-random-alphanumeric-chars}_{schema-name}. An example would be extkvbmkofy_mySchema.
* The _owner_ attribute must be a valid ClientId registered in Azure AD
* The _targetTypes_ is an array with the different Entities that you want to extend (users, groups, event, message). However, spfx only allows to update Groups, so the value is set to _group_

## Minimal Path to Awesome

* clone repo
* edit _GraphSchemaExtenion.tsx_ file and change line 141 with the _id_ "inheritscloud_SalesCustomData" assigned when you created the custom Schema extension
* run _gulp serve_

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This sample shows how read and update a custom Schema extension in MS Graph.

This sample illustrates the following concepts on top of the SharePoint Framework:

* How to create a custom schema extension in Graph API using Graph Explorer tool
* Using GraphHttpClient to get data from MS Graph API
* How to update an MS Graph entity (in this case, Office 365 Group) with custom data
* Using async / await for the async calls
* Office UI fabric components


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-graph-schema-extensions" />
