# React Content Query web part 

## Summary

There are two versions of this web part:

* [The original](./OnPrem/README.md): Built with an earlier version of SPFx and compatible with on-premises versions of SharePoint and SharePoint Online
* [The updated version](./Online/README.md): Build with SPFx 1.10.0 version, compatible with SharePoint Online only, but with added features such as Dynamic Data.

Please refer to the appropriate sub-folders for the version you wish to use.

![Web Part Preview](./Online/assets/toolpart.gif)

The **Content Query web part** is a modern version of the good old **Content by Query web part** that was introduced in SharePoint 2007. Built for Office 365, this modern version is built using the SharePoint Framework (SPFx) and uses the latest Web Stack practices.

While the original web part was based on an XSLT templating engine, this React web part is based on the well known Handlebars templating engine, which empowers users to create simple, yet powerful HTML templates for rendering the queried content. This new version also lets the user query any site collections which resides on the same domain URL, add unlimited filters, query DateTime fields to the nearest minute rather than being limited to a day, and much more.

## Applies to

* [SharePoint Framework Developer](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Authors
--------|-----------
react-content-query-web part (Online)|David Warner II ([Warner Digital](http://warner.digital), [@DavidWarnerII](https://twitter.com/davidwarnerii))
react-content-query-web part (Online)|Hugo Bernier ([Tahoe Ninjas](http://tahoeninjas.blog), [@bernierh](https://twitter.com/bernierh))
react-content-query-web part (Online)|Paolo Pialorsi ([PiaSys.com](https://piasys.com/), [@PaoloPia](https://twitter.com/PaoloPia?s=20))
react-content-query-web part|Simon-Pierre Plante

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-web parts/samples/react-content-query-web part" />