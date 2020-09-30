# Thumbnail/preview of pages and files in SharePoint

## Summary
A web part showcasing how to call the [Microsoft Graph Thumbnails API](https://docs.microsoft.com/en-us/graph/api/driveitem-list-thumbnails) to generate a preview image for files and pages in SharePoint. The sample illustrates how to craft the preview URL both from a search result as well as from a SharePoint item object.

_Note that a preview for all file formats (eg. Excel) might not currently be available._

![web part sample](./preview.gif)


The sample calls the Microsoft Graph API directly directly via the _api/2.0 endpoint in SharePoint Online, but can easily be changed to call the Graph API endpoint directly for scenarios outside of SharePoint as long as an access token is retrieved.

The goal of the sample is to illustrate a single call calling pattern for the thumbnail with the following calling pattern:

<pre>
&lt;img src="<i><b>&lt;endpoint&gt;</b>/sites/<b>&lt;site id&gt;</b>/lists/<b>&lt;list id&gt;</b>/items/<b>&lt;item id&gt;</b>/driveItem/thumbnails/0/<b>&lt;custom size&gt;</b>/content</i>">
</pre>

| Token | Description |
---|---
|endpoint| graph.microsoft.com/v1.0 <br/> tenant.sharepoint.com/_api/v2.0
|site id | Site object id - GUID. |
|list id | List object id - GUID. |
|item id | ListItem object id or unique id - Integer/GUID. |
|custom size | See [Requesting custom thumbnail sizes](https://docs.microsoft.com/en-us/graph/api/driveitem-list-thumbnails?view=graph-rest-1.0&tabs=http#requesting-custom-thumbnail-sizes) in the official Microsoft Graph documentation.

## Used SharePoint Framework Version
![drop](https://img.shields.io/badge/drop-1.10.0-green.svg)

## Applies to

* [SharePoint Framework Release GA](https://blogs.office.com/2017/02/23/sharepoint-framework-reaches-general-availability-build-and-deploy-engaging-web-parts-today/)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
js-msgraph-thumbnail | Mikael Svenson ([@mikaelsvenson](http://www.twitter.com/mikaelsvenson), [techmikael.com](techmikael.com))

## Version history

Version|Date|Comments
-------|----|--------
1.0|January 21st, 2020|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome
### Local testing

- Clone this repository
- In the command line run:
  - `npm install`
  - `gulp serve`

### Deploy
* gulp clean
* gulp bundle --ship
* gulp package-solution --ship
* Upload the js-msgraph-thumbnail.sppkg file from sharepoint\solution to your tenant App Catalog
	* E.g.: https://&lt;tenant&gt;.sharepoint.com/sites/AppCatalog/AppCatalog
* Add the web part *Thumbnail* to a site collection where you have files in the `Shared Documents` folder, and test it on a page.
* Change `const libraryPath = "Shared Documents";` if you want to target `SitePages` or a different library.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/js-msgraph-thumbnail" />