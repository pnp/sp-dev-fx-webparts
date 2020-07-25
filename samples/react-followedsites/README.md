# Followed Sites webpart

> NOTE: This sample is available in the [PnP Starter Kit](https://github.com/pnp/sp-starter-kit). You can find the sample code for this web part at https://github.com/pnp/sp-starter-kit/tree/master/solution/src/webparts/followedSites.


This web part provides you the ability to display a list of site administrator defined number of sites that a given user is following, with paging as well as inline filtering of sites by keyword or phrase. Currently the list of followed sites includes classic as well as modern communication sites but does not include group enabled (modern) team sites.

![Followed Sites](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-followed-sites.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **Followed Sites** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `Followed Sites` webpart can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Followed Sites | title | string | no | The webpart title, editable inline with the webpart itself |
| Number of followed sites to retrieve | nrOfItems | number | no | The number of sites to show per page, default = 10 |
| Specify the sort order of the retrieved sites | sortOrder | number | no | Preferred site sort order. Default sort order driven by SharePoint, or by site name |

# Installing the web part

See getting started from [SP-Starter-Kit repository readme](https://github.com/SharePoint/sp-starter-kit).

You can also download just the [SharePoint Framework solution package (spppkg) file](https://github.com/SharePoint/sp-starter-kit/blob/master/package/sharepoint-starter-kit.sppkg) and install that to your tenant. This web part utilizes the SharePoint Rest API, `/_api/social.following/my/followed(types=4)`, endpoint.

# Screenshots

![Followed Sites](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-followed-sites.png)

# Source Code

https://github.com/SharePoint/sp-starter-kit/tree/master/solution/src/webparts/followedSites

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


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-followed-sites" />