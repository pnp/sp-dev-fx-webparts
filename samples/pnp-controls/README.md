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

## Used SharePoint Framework Version
![drop](https://img.shields.io/badge/drop-1.4.1-green.svg)

## Which PnP SPFx controls are being used in this sample?

The sample makes use of the following controls:
- PropertyFieldListPicker
- PropertyFieldTermPicker
- Placeholder
- ListView (which also uses the FileTypeIcon control)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)

## Solution

Solution|Author(s)
--------|---------
pnp-controls|Elio Struyf (MVP, U2U, [@eliostruyf](https://twitter.com/eliostruyf))

## Version history

Version|Date|Comments
-------|----|--------
0.0.1|September 20, 2017|Initial release
0.0.2|March 03, 2018|Update to 1.4.1

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
