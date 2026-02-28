---
title: "App settings web part"
description: "This sample shows how AppSettings.ts file can be added and used within SharePoint Framewrok webparts similar to the Web.config / App.config key value app settings in .NET Framework projects. That allows better DevOps and continuous integration (CI/CD) automation. The AppSettings.ts is transpiled/compiled with your SPFx solution which differs from the way the web.config. With .Net web.config file we would be able to update independently without the need of compiling DLLs. If that behavior is required, you can store your app settings in a SharePoint list and change them from there. However, that will have performance degradation over if the setting was part of the SPFx code where the logic can get a setting value in milliseconds."
type: "sample-panel"
slug: "pnp-sp-dev-spfx-web-parts-react-app-settings"
sampleName: "pnp-sp-dev-spfx-web-parts-react-app-settings"
thumbnail: "/sp-dev-fx-webparts/images/thumbnails/pnp-sp-dev-spfx-web-parts-react-app-settings.webp"
images: ["/sp-dev-fx-webparts/images/thumbnails/pnp-sp-dev-spfx-web-parts-react-app-settings.webp"]
thumbnailAlt: "App settings web part"
lastmod: "2019-03-03T00:00:00.000Z"
tags: []
categories: []
openInGalleryUrl: "/sp-dev-fx-webparts/?sample=pnp-sp-dev-spfx-web-parts-react-app-settings"
redirect_to_gallery: false
---
![App settings web part](/sp-dev-fx-webparts/images/thumbnails/pnp-sp-dev-spfx-web-parts-react-app-settings.webp)


This sample shows how AppSettings.ts file can be added and used within SharePoint Framewrok webparts similar to the Web.config / App.config key value app settings in .NET Framework projects. That allows better DevOps and continuous integration (CI/CD) automation. The AppSettings.ts is transpiled/compiled with your SPFx solution which differs from the way the web.config. With .Net web.config file we would be able to update independently without the need of compiling DLLs. If that behavior is required, you can store your app settings in a SharePoint list and change them from there. However, that will have performance degradation over if the setting was part of the SPFx code where the logic can get a setting value in milliseconds.

**Open this sample in the gallery (popup panel)**:
[Open in gallery](/sp-dev-fx-webparts/?sample=pnp-sp-dev-spfx-web-parts-react-app-settings)

Source: https://github.com/pnp/sp-dev-fx-webparts/tree/main/samples/react-app-settings

