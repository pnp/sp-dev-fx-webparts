# SharePoint Framework DataTable web part sample

## Summary

This web part provides easy way to render SharePoint custom list in datatable view with all the necessary features. 

## Features

- Searching (Configurable)
- Sorting (Configurable)
- Download as a CSV and PDF,
- Pagination,
- Column Ordering,
- Dynamic colors for odd and even rows.

![Preview](assets/preview.png?raw=true "Preview")

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg) 
![Node.js LTS 10.x](https://img.shields.io/badge/Node.js-LTS%2010.x-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg) 
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams") 
![Workbench Hosted](https://img.shields.io/badge/Workbench-%20Hosted-yellow.svg)


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-datatable | Chandani Prajapati ([@Chandani_SPD](https://twitter.com/Chandani_SPD))

## Version history

Version|Date|Comments
-------|----|--------
1.0|February 19, 2021|Initial release
1.1|February 24, 2021|Added support for large lists
1.2|March 01, 2021|Fixed search issue for number field
1.3|March 31,2021| Changed UI as per SharePoint list, Set themeing as per current SharePoint site theme, Created custom pagination by using reusable controls, Added features to export CSV based on the filter if the filter is available, Added hyperlink feature for image and link column in export to pdf and also set alternative row formatting in generated pdf as per property pane configuration odd/even row color, fixed object issue (for people/hyperlink, etc) in export to CSV.
1.4|April 10, 2021|Added feature to show profile picture in user column and shows display name of user field in export to CSV and PDF.


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

### Local testing

* Clone the repository
* `cd` to web part's project folder
* In the command line run:
  * `npm install`
  * `gulp serve`

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-datatable" />
