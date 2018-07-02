# SharePoint Framework search with search box, refiners and paging sample

## Summary
This sample shows you how to build user friendly SharePoint search experiences using Office UI fabric tiles, custom refiners, paging and suggestions.

<p align="center">
  <img src="./images/react-search-refiners.gif"/>
</p>

An associated [blog post](http://thecollaborationcorner.com/2017/10/16/build-dynamic-sharepoint-search-experiences-with-refiners-and-paging-with-spfx-office-ui-fabric-and-pnp-js-library/) is available to give you more details about this sample implementation.

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-1.5.1--plusbeta-blue.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-search-refiners | Franck Cornu (aequos) - [@FranckCornu](http://www.twitter.com/FranckCornu)<br/>Mikael Svenson -[@mikaelsvenson](http://www.twitter.com/mikaelsvenson)

## Version history

Version|Date|Comments
-------|----|--------
1.0 | October 17, 2017 | Initial release
1.1 | January 03, 2018 | Improvements and updating to SPFx drop 1.4
1.2 | February 12, 2018 | Added a search box Web Part + Added a "Result Source Id" and "Enable Query Rules" parameters.
1.3 | April 1, 2018 | Added the result count + entered keywords option
1.4 | May 10, 2018 | <ul><li>Added the query suggestions feature to the search box Web Part</li><li>Added the automatic translation for taxonomy filter values according to the current site locale.</li> <li>Added the option in the search box Web Part to send the query to an other page</ul>
1.5 | Jul 2, 2018 | <ul><li>Added a templating feature for search results with Handlebars inspired by the [react-content-query-webpart](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-content-query-webpart) sample.</li><li>Upgraded to 1.5.1-plusbeta to use the new SPFx dynamic data feature instead of event aggregator for Web Parts communication.</li> <li>Code refactoring and reorganization.</ul>

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- In the command line run:
  - `npm install`
  - `gulp serve`

### Web Part Configuration ###

The following settings are available in the Web Part property pane:

<table>
  <tr>
    <td>
      <p align="center"><img src="./images/property_pane.png"/><p>
    </td>
    <td>
      <p align="center"><img src="./images/property_pane2.png"/><p>
    </td>
  </tr>
<table>

#### Search Query Configuration #### 

Setting | Description 
-------|----
Search query keywords | Here you choose to use a static search query or a query coming from a search box Web Part on a page or the "q" URL query string parameter. The search query is in KQL format so you can use search query variables (See this [post](http://www.techmikael.com/2015/07/sharepoint-rest-do-support-query.html) to know which ones are allowed). You can only plug one source to this Web Part.

<p align="center"><img src="./images/wp_connection.png"/><p>

#### Search Settings ####

Setting | Description 
-------|----
Query template | The search query template in KQL format. You can use search variables here (like Path:{Site}).
Result Source Identifier | The GUID of a SharePoint result source. If you specify a value here, query template and query keywords won't be applied. Otherwise the default SharePoint result source is used.
Enable Query Rules | Enable the query rules if applies
Selected properties | The search managed properties to retrieve. You can use these properties then in the code like this (`item.property_name`).
Refiners | The search managed properties to use as refiners. Make sure these are refinable. With SharePoint Online, you have to reuse the default ones to do so (RefinableStringXX etc.). The order is the same as they will appear in the refnement panel. You can also provide your own custom labels using the following format RefinableString01:"You custom filter label",RefinableString02:"You custom filter label",...
Number of items to retrieve per page | Quite explicit. The paging behavior is done directly by the search API (See the *SearchDataProvider.ts* file), not by the code on post-render.

#### Styling Options ####

Setting | Description 
-------|----
Show blank if no result | Shows nothing if there is no result
Show result count | Shows the result count and entered keywords  
Show paging | Indicates whether or not the component should show the paging control at the bottom.
Result Layouts options | Choose the template to use to display search results. Some layouts are defined by default (List oand Tiles) but you can create your own either by clinkg on the **"Custom"** tile, or **"Edit template"** from an existing chosen template. In custom mode, you can set an external template. It has to be in the same SharePoint tenant. Behind the scenes, the Office UI Fabric core CSS components are used in a isolated way.

### Taxonomy values dynamic translation

This Web Part supports the translation for taxonomy based filters according to current site language. To get it work, you must map a new refinable managed property associated with *ows_taxId_<your_column_name>* crawled property.

<p align="center">
  <img src="./images/managed-property.png"/>
</p>

### Query suggestions

The search box supports query suggestions from SharePoint. Refer to the following [article](https://docs.microsoft.com/en-us/sharepoint/search/manage-query-suggestions) to know how to add query suggestions in SharePoint (caution: it can take up to 24h for changes to take effect).

### Templates with Handlebars ###

This Web Part allows you change customize the way you display your search results. The templating feature comes directly from the original [react-content-query-webpart](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-content-query-webpart) so thanks to @spplante!

<p align="center">
  <img src="./images/edit_template.png"/>
</p>

#### Available tokens ####

Setting | Description 
-------|----
`{{showResultsCount}}` | Boolean flag corresponding to the associated in the property pane.
`{{totalRows}}` | The result count.
`{{keywords}}` | The search query.
`{{getSummary HitHighlightedSummary}}` | Format the *HitHighlightedSummary* property with recognized words in bold.
`{{getDate <date_managed_property> "<format>}}"` | Format the date with moment.ts according to the current language.
`{{getPreviewSrc item}}` | Determine the image thumbnail URL if applicable.
`{{getUrl item}}` | Get the item URL. For a document, it means the URL to the Office Online instance or the direct URL (to download it).
`{{getCountMessage totalRows <?keywords>}}` | Display a friendly message displaying the result and the entered keywords.
`{{<search_managed_property_name>}}` | Any valid search managed property returned in the results set. These are typically managed properties set in the *"Selected properties"* setting in the property pane. You don't need to prefix them with `item.` if you are in the "each" loop.

Also the [Handlebars helpers](https://github.com/helpers/handlebars-helpers) (188 helpers) are also available. You can also define your own in the *BaseTemplateService.ts* file.

## Features
This Web Part illustrates the following concepts on top of the SharePoint Framework:

- Build an user friendly search experience on the top of the SharePoint search REST API with paging, refiners and query suggestions using the *@pnp* JavaScript library.
- Use [Handlebars](https://handlebarsjs.com/) to create templates for search results according to your requirements like the good old display templates. 
- Using the SPFx [dynamic data feature](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/dynamic-data) to connect Web Parts and/or Extensions.
- Using SharePoint taxonomy using JSOM in SPFx (filter translations)
- Integrate the [@pnp/spfx-property-controls](https://github.com/SharePoint/sp-dev-fx-property-controls) in your solution (*PlaceHolder* control).
- Integrate multiple Office UI Fabric components (DocumentCard, Panel, GroupedList, ...) to fit with the native Office 365 theme.
- Use the React container component approach inspiring by the [react-todo-basic sample](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples/react-todo-basic).

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-search-refiners" />