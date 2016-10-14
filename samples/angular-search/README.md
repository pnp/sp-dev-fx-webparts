# Search Client-Side Web Part Built with Angular

## Summary
Sample Search Web Part that illustrates how you can use Angular within the new SharePoint Framework

This app uses SharePoint's Search REST API endpoint to query listitems of a specific content type and displays the results to the end user.
Ideally instead of selecting a content type for the search you would want to select a Result Source, but currently Result Sources are not
through SharePoint's REST API.

The logic for querying the SharePoint Content Types in the properties of the webpart was in part due to Chris O'Brien and this blog post
http://www.sharepointnutsandbolts.com/2016/09/sharepoint-framework-spfx-web-part-properties-dynamic-dropdown.html?m=0

Environment Configuration:
- Enable publishing features on site collection
- Enable publishing features on site

Note: In order to use the ngOfficeFabric code I use the ModuleLoader to load newer source files than the currently
Office Fabric UI in SharePoint Online, which will cause many of the icons not to load properly on the SharePoint
Page this webpart is added to.

## Applies to

* [SharePoint Framework Developer Preview](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
angular-search|David Hartman ([Slalom](https://slalom.com))
### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* commonjs components - this allows this package to be reused from other packages.
* dist/* - a single bundle containing the components used for uploading to a cdn pointing a registered Sharepoint webpart library to.
* example/* a test page that hosts all components in this package.

### Build options

gulp nuke - TODO
gulp test - TODO
gulp watch - TODO
gulp build - TODO
gulp deploy - TODO
