## angular-search

This is where you include your web part docs.

This app uses SharePoint's Search REST API endpoint to query listitems of a specific content type and displays the results to the end user.
Ideally instead of selecting a content type for the search you would want to select a Result Source, but currently Result Sources are not
through SharePoint's REST API.

The logic for querying the SharePoint Content Types in the properties of the webpart was in part due to Chris O'Brien and this blog post
http://www.sharepointnutsandbolts.com/2016/09/sharepoint-framework-spfx-web-part-properties-dynamic-dropdown.html?m=0



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
