<!--
---
page_type: sample
products:
- office-sp
languages:
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  createdDate: 8/30/2016 10:21:43 AM
---
-->
# SharePoint Framework Client-Side Web Part Samples & Tutorial Materials

![GitHub Repo stars](https://img.shields.io/github/stars/pnp/sp-dev-fx-webparts?style=social)
![GitHub forks](https://img.shields.io/github/forks/pnp/sp-dev-fx-webparts?style=social)
![GitHub watchers](https://img.shields.io/github/watchers/pnp/sp-dev-fx-webparts?style=social)
[![Twitter Follow](https://img.shields.io/twitter/follow/m365pnp?style=social)](https://twitter.com/m365pnp?s=20)
[![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UC_mKdhw-V6CeCM7gTo_Iy7w?style=social)](https://www.youtube.com/channel/UC_mKdhw-V6CeCM7gTo_Iy7w)
[![GitHub issues](https://img.shields.io/github/issues/pnp/sp-dev-fx-webparts)](https://github.com/pnp/sp-dev-fx-webparts/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/pnp/sp-dev-fx-webparts)](https://github.com/pnp/sp-dev-fx-webparts/pulls)

This repository contains community samples that demonstrate different usage patterns for the SharePoint Framework client-side web parts.

> We do welcome community contributions to the samples folder in this repository for demonstrating different use cases with SharePoint Framework. Notice that if you use 3rd party libraries, please make sure that library license allows distributions of it as part of your sample.

SharePoint client-side web parts are controls that appear inside a SharePoint page but run locally in the browser. They're the building blocks of pages that appear on a SharePoint site. You can build client-side web parts using modern script development tools and the SharePoint workbench (a development test surface), and you can deploy your client-side web parts to classic web part pages in Office 365 tenants. In addition to plain JavaScript projects, you can build web parts alongside common scripting frameworks, such as AngularJS and React. For example, you can use React along with components from Office UI Fabric React to quickly create experiences based on the same components used in Office 365.

## Have issues or questions?

Please use following logic on submitting your questions or issues to right location to ensure that they are noticed and addressed as soon as possible.

* You have general question or challenge with SPFx - use [sp-dev-docs repository issue list](https://github.com/SharePoint/sp-dev-docs/issues).
* You have issue on specific web part or sample - use [issue list in this repository](https://github.com/pnp/sp-dev-fx-webparts/issues).

## Additional resources

* [Overview of the SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [SharePoint Framework development tools and libraries](https://docs.microsoft.com/sharepoint/dev/spfx/tools-and-libraries)
* [Getting Started](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Using the samples

To build and start using these projects, you'll need to clone and build the projects.

Clone this repository by executing the following command in your console:

```shell
git clone https://github.com/pnp/sp-dev-fx-webparts.git
```

Navigate to the cloned repository folder which should be the same as the repository name:

```shell
cd sp-dev-fx-webparts
```

To access the samples use the following command, where you replace `sample-folder-name` with the name of the sample you want to access.

```shell
cd samples
cd sample-folder-name
```

and for the tutorials, use the following command:

```shell
cd tutorials
```

Now run the following command to install the npm packages:

```shell
npm install
```

This will install the required npm packages and dependencies to build and run the client-side project.

Once the npm packages are installed, run the following command to preview your web parts in SharePoint Workbench:

```shell
gulp serve
```

## Authors
This repository's contributors are all community members who volunteered their time to share code samples. Work is done as an open source community project, with each sample contained in their own solution.

## Contributions

These samples are direct from the feature teams, SharePoint PnP core team (http://aka.ms/m365pnp) or shared by the community. We welcome your input on issues and suggestions for new samples. We do also welcome community contributions around the client-side web parts. If you have any questions, just let us know.

Please have a look on our [Contribution Guidance](./CONTRIBUTING.md) before submitting your pull requests, so that we can get your contribution processed as fast as possible.

## Code of Conduct
This repository has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.

> Sharing is caring!
