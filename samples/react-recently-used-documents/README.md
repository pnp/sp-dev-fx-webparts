# Recently Used Documents web part

> NOTE: This sample is available in the [PnP Starter Kit](https://github.com/pnp/sp-starter-kit). You can find the sample code for this web part at https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/webparts/recentlyUsedDocuments.


This web part provides you the ability to display a list of a particular user's recently used documents on a web page. The web part may be configured to display a pre-defined number of documents at a time. This web part is powered by the Microsoft Graph and currently requires that the Office 365 tenant be configured for targeted release for all users.

![Recently Used Documents](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-recently-used-documents.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **Recently Used Documents** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `Recently Used Documents` web part can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Recent Documents | title | string | no | The web part title, editable inline with the web part itself |
| Specify the number of documents to show | nrOfItems | number | no | Default: 3 - The number of documents to show |

# Installing the web part

See getting started from [SP-Starter-Kit repository readme](https://github.com/SharePoint/sp-starter-kit). 

You can also download just the [SharePoint Framework solution package (spppkg) file](https://github.com/SharePoint/sp-starter-kit/blob/master/package/sharepoint-starter-kit.sppkg) and install that to your tenant. This web part requires access to the Microsoft Graph.

# Screenshots

![Recently Used Documents](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-recently-used-documents.png)

# Source Code

https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/webparts/recentlyUsedDocuments

# Minimal Path to Awesome

- Clone this repository
- Move to Solution folder
- in the command line run:
  - `npm install`
  - `gulp serve`

# Version history

Version|Date|Comments
-------|----|--------
1.0|May 2018|Initial release

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-recently-used-documents" />