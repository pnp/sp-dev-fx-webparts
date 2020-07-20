# Links webpart

> NOTE: This sample is available in the [PnP Starter Kit](https://github.com/pnp/sp-starter-kit). You can find the sample code for this web part at https://github.com/pnp/sp-starter-kit/tree/master/solution/src/webparts/links.


This web part provides you the ability to add a per instance listing of links with the ability to group sets of links. Links are stored as a collection of links within the web part's properties, removing the need for link storage within SharePoint lists, tenant properties, or other external link storage requirements.

Links and groups are both customizable.

![Links](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-links.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **Links** web part.
3. Configure the webpart to update its properties.

## Configurable Properties

The `Links` webpart can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Useful links | title | string | no | The webpart title, editable inline with the webpart itself |
| Group names for the links | groupData | collection | no | Collection of group names for grouping links into sets |
| Link data | collectionData | collection | no | Collection of links |

### groupData Collection Properties

Configurable properties for each collection row within the `groupData` collection:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Title | title | string | yes | The name of a group |

### collectionData Collection Properties

Configurable properties for each collection row within the `collectionData` collection:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Title | title | string | yes | The text / title of the link |
| URL | url | string | yes | The link url |
| UI Fabric icon name | icon | fabricIcon | no | Optional UI Fabric icon name |
| Group name | group | dropdown | no | Optional name of the group to add this link to |
| Target | target | dropdown | no | Optional target for this link, current or new window |

# Installing the web part

See getting started from [SP-Starter-Kit repository readme](https://github.com/SharePoint/sp-starter-kit). 

You can also download just the [SharePoint Framework solution package (spppkg) file](https://github.com/SharePoint/sp-starter-kit/blob/master/package/sharepoint-starter-kit.sppkg) and install that to your tenant. This web part does not have external dependencies.

# Screenshots

![Links](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-links.png)

# Source Code

https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/webparts/links

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
1.1|June 2018|Updated collection descriptions


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-links" />