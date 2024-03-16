# Property Bag Navigation Web parts

## Summary

A set of web parts that lets you set property bag settings on site collections and enable navigation using those properties.
![PropertyBagEditorDisplay](./assets/PropertyBagEditorDisplay.PNG)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.0.0](https://img.shields.io/badge/SPFx-1.0.0-green.svg)
![Node.js v6](https://img.shields.io/badge/Node.js-v6-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Compatible with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Compatible-green.svg)
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://blogs.office.com/2017/02/23/sharepoint-framework-reaches-general-availability-build-and-deploy-engaging-web-parts-today/)
* [Microsoft 365 tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

> pnp-js-core

## Contributors

* [Russell Gove](https://github.com/russgove)

## Version history

Version|Date|Comments
-------|----|--------
1.0|march 19, 2017|Initial release
2.0|Feb 21, 2024|Upgraded to SPFX 1.17.1

## Minimal Path to Awesome

* Clone this repository
* This project uses the JSOM to interact with the property bag. Therefore in config/config.js you need to change the paths
   on the externals `sp-init`,`microsoft-ajax`,`sp-runtime`, and SharePoint to point to your tenant.
* in the command line run:
  * `npm install`
  * `gulp serve`

> This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit <https://aka.ms/spfx-devcontainer> for further instructions.

> Note that using the JSOM to updates the property bag of a site is not supported on 'NoScript' sites.    You can enable scripts on all sites using the admin center or via PowerShell:
>
> ```powershell
> Set-PnPTenantSite -Identity {SiteUrl} -DenyAddAndCustomizePages:$false
> ```

## Features

This project consists of two  web parts that can be used to manage the Property Bags for SharePoint sites and two web parts that can be used to display navigational components from those Properties.

* PropertyBagEditor
This web part allows a site owner/administrator to edit selected items in a site&#39;s Property Bag. It edits the properties of the current site. A sample display is shown below:
![PropertyBagEditorDisplay](./assets/PropertyBagEditorDisplay.PNG)

Selecting a Property and clicking the Edit button will bring up the Edit Panel:

![PropertyBagEditorEdur](./assets/PropertyBagEditorEdit.PNG)

Here you can change the value of the property and specify if the property should be included in the search Index.

The Properties that can be edited are specified in the web part&#39;s Property Pane:

![PropertyBagEditorEdur](./assets/PropertyBagEditorConfig.PNG)

The Properties set in the Property Pane of this web part are crawled properties, and should be mapped to managed properties so that can be used by the other web parts in this project.

The Site whose properties are to be edited can be passed in via a query parameter. While this web part can be added to any page, it would be most useful if added to a page in an infrastructure site collection in the tenant, and then linked to from all other sites via a link in the Site Settings page.

The following script shows how to add such a link to all sites &#39;Site Settings&#39; page using PNP PowerShell. It will add a menu item named &#39;Edit Site Metadata &#39; to the  Site Settings of each Team Site that links to the PropertyBagEditor.aspx page on the tenants infrastructure site (this site is named 'cdn' in the example below).

```powershell
$adminSiteUrl=&quot;https://tenant-admin.sharepoint.com&quot;

$customActionDescription=&quot;CUSTOM_\ ___Navigation__ \__Metadata&quot;

$pageUrl=&quot;https://tenant.sharepoint.com/sites/cdn/SitePages/PropertyBagEditor.aspx?siteUrl={0}&quot;

$credentials=get-credential

Connect-SPOnline -Url $adminSiteUrl -Credentials $credentials

$ctx = Get-SPOContext

$sites = Get-SPOTenantSite -Detailed

foreach($site in $sites){

    if ($site.Template -eq &quot;STS#0&quot;) {

        Connect-SPOnline –Url $site.Url –Credentials $credentials

        $existing = Get-SPOCustomAction -Scope &quot;Site&quot; | ? { $\_.Description -eq $customActionDescription }

        if ($existing) {

             $existing.DeleteObject();

             Execute-SPOQuery;

             Write-Host &quot;Deleteting existing action from&quot;$site.Url

        }

        Write-Host &quot;adding action to&quot; $site.Url

        Add-SPOCustomAction -Description $customActionDescription -Location &quot;Microsoft.SharePoint.SiteSettings&quot; -name &quot;Edit Site Metadata&quot;-Title &quot;Edit Site Metadata&quot;  -Group &quot;SiteAdministration&quot; -Sequence 10100 -Url ( [string]::Format($pageUrl,$site.Url)) -Scope &quot;Site&quot;

        Execute-SPOQuery

        }
}
```

* PropertyBagDisplay
The propertyBagDisplay web part can be used by an administrator to view and edit selected properties across sites in the tenant:

![PropertyBagDisplay](./assets/PropertyBagDisplayDisplay.PNG)

In the Property Pane, an administrator must specify both the Crawled Property Name and the Managed Property name (separated by a pipe character) of the properties to be included in the web part:

![PropertyBagDisplayConfig](./assets/PropertBagDisplayConfig.PNG)

The administrator can also include a list of site templates to narrow down the list of sites to be included in the web part. When specifying site templates to include you can include just the Site Template Name (STS) and all sites within that template name will be included, or you can specify the Site Template Name and ID, separated by a &#39;#&quot; character (STS#1) to have only sites with that template name and ID included.

The web part displays the site template, Title and URL, plus the selected Managed Properties for all sites in the tenant with the selected site template. The Managed Properties are only displayed if they have been set as searchable, and a full crawl has been run.  After selecting a Site, a user can click the edit button to edit the Crawled properties (i.e. the raw property bag values) for the selected site:

![PropertyBagDisplayEdit](./assets/PropertyBagDisplayEdit.PNG)

On the edit panel one can specify a new value for each property as well as whether that property is to be included in the search index. Additionally one can specify that a full crawl of the site should be run once the properties are saved.

* PropertyBagFilteredSiteList
This web part displays a list of all sites that meet the criteria specified in the property pane by the administrator:

![PropertyBagFilteredSiteListDisplay](./assets/PropertyBagFilteredSiteListDisplay.PNG)

Additionally, it lets the user narrow down the list of sites displayed by applying metadata filters that are set up by the administrator in the Property Pane( Business Unit and Continent in the example above):

![PropertyBagFilteredSiteListConfig](./assets/PropertyBagFilteredSiteListConfigy.PNG)

In the PropertyPane above, the 'Site Templates to Include' and 'Metadata Filters' are used to filter which site collections are retrieved from search. The 'User Filters' are used to allow the user to easily filter the results returned from search using the command bar on the top of the display.

* PropertyBagGlobalNav
This Web part builds a navigation menu based on the Managed Properties set up in the PropertyPane:

![propertyBagGlobalNavDisplay](./assets/propertyBagGlobalNavDisplay.PNG)

In the PropertyPane, an administrator just needs to specify which Managed Properties are to be used to build the Navigation menu:

![PropertyBagGlobalNavConfig](./assets/PropertyBagGlobalNavConfig.PNG)

If desired, the admin can also specify which site templates should be included in the menu, as wall as any additional filters. Additional Filters can be specified in the format 'ManagedPropertyName=value';

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-property-bag-editor" />
