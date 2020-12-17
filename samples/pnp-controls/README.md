---
page_type: sample
products:
- office-sp
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - react
  createdDate: 10/1/2017 12:00:00 AM
---
# SharePoint Framework PnP Controls Sample

## Summary

This is a sample project that contains a web part which makes use of the PnP SPFx Controls:

- [SharePoint Framework React Controls](https://www.npmjs.com/package/@pnp/spfx-controls-react)
- [SharePoint Framework Property Controls](https://www.npmjs.com/package/@pnp/spfx-property-controls)

![Web part outcome](./assets/webpart-outcome.gif)

## Compatibility

![SPFx 1.11](https://img.shields.io/badge/spfx-1.11.0-green.svg)

![Node.js LTS 10.x](https://img.shields.io/badge/Node.js-LTS%2010.x-green.svg)

![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-red.svg)

![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)

![Workbench Local (Partially) | Hosted](https://img.shields.io/badge/Workbench-Local%20(Partial)%20%7C%20Hosted-yellow.svg)

## Which PnP SPFx controls are being used in this sample?

The sample makes use of the following controls:
- `PropertyFieldListPicker`
- `PropertyFieldTermPicker`
- `Placeholder`
- `ListView` (which also uses the `FileTypeIcon` control)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

## Solution

Solution|Author(s)
--------|---------
pnp-controls|Elio Struyf (MVP, U2U, [@eliostruyf](https://twitter.com/eliostruyf))
pnp-controls|Swaminathan Sriram ([@SwaminathanSri3](https://twitter.com/SwaminathanSri3))

## Version history

Version|Date|Comments
-------|----|--------
1.0.1|September 20, 2017|Initial release
1.0.2|March 03, 2018|Update to 1.4.1
1.0.3|December 16, 2020|Update to 1.11.0

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

To test out this web part, you need to have a library with a managed metadata field. In my case, I made use of a field called **Country**.

![Documents](./assets/documents.png)

Once you have such a library in place, you can copy the code and run the following commands:

```bash
npm install
gulp serve --nobrowser
```

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/pnp-controls" />
