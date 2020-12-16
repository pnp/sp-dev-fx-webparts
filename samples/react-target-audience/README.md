## Target audience generic component

Sample webpart which uses a Generic React Component which enables it to have Target Audience functionality like what was available in classic webparts.
Targets SharePoint Groups only within the site.

![audience.gif](./assets/audience.gif)


## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-GA-green.svg)


## Applies to
* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
target-audience-generic-component.sppkg | Rabia Williams([@williamsrabia](https://twitter.com/williamsrabia) , [rabiawilliams.com](https://rabiawilliams.com))

## Version history

Version|Date|Comments
-------|----|--------
1.0|Jan 28, 2020|Initial release

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO

![tracking image](https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-target-audience)
