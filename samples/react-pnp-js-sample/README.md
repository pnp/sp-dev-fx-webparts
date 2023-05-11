# Using @pnp/js and ReactJS

## Summary

This solution builds off of the solution [react-async-await-sp-pnp-js](./react-async-await-sp-pnp-js) submitted by Jose Quinto ([@jquintozamora](https://twitter.com/jquintozamora) , [blog.josequinto.com](https://blog.josequinto.com))

This implementation refactors to take aspects out and utilize and showcase PnPjs Version 3.

![React-pnp-js-sample](./assets/react-pnp-js-sample.png)

## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is only compatible with specific version(s) of Node.js. In order to be able to build this sample, please ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

![SPFx 1.15.2](https://img.shields.io/badge/SPFx-1.15.2-green.svg)
![Node.js v14 | v12| v16](https://img.shields.io/badge/Node.js-v12%20%7C%20v14%20%7C%20v16-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Incompatible with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

For more information about SPFx compatibility, please refer to <https://aka.ms/spfx-matrix>

## Applies to

* [SharePoint Framework](https://learn.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Microsoft 365 developer tenant](https://learn.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Contributors

<!-- CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
|[![Julie Turner](https://avatars.githubusercontent.com/u/7570936?v=4&s=100)](https://github.com/juliemturner)|[![Beau Cameron](https://avatars.githubusercontent.com/u/7944457?v=4&s=100)](https://github.com/bcameron1231)|
|:--:|:--:|
**[Julie Turner](https://github.com/juliemturner)**|**[Beau Cameron](https://github.com/bcameron1231)**|
<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->
<!-- CONTRIBUTORS-LIST:END -->


## Version history

Version|Date|Comments
-------|----|--------
1.2|Feb 14, 2023|Fixed context handling
1.1|Aug 29, 2022|Bug fix & dependency updates
1.0|Jan 13, 2022|Initial release

## Minimal Path to Awesome

1. clone this repo
1. `npm i`
1. Update online workbench URL in the `initialPage` property of the `config/serve.json` file.
1. `gulp serve`

## Features

* Establishing context for the SharePoint Factory Interface
* Creating a project config file to centralize defining the PnPjs imports and SharePoint Queryable object for reuse.
* Demo extending the SharePoint Queryables instance with the PnPLogging behavior.
* Demo extending the SharePoint Queryable instance with the Caching behavior
* Demo loading list items from a SharePoint library
* Demo creating a batched instance of the SharePoint Queryable object.
* Demo updating list items by modifying the Title property.
* Demo executing a batch and working with the results.

## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-pnp-js-sample%22) to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-pnp-js-sample) and see what the community is saying.

If you encounter any issues using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-pnp-js-sample&template=bug-report.yml&sample=react-pnp-js-sample&authors=@juliemturner%20@bcameron1231&title=react-pnp-js-sample%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-pnp-js-sample&template=question.yml&sample=react-pnp-js-sample&authors=@juliemturner%20@bcameron1231&title=react-pnp-js-sample%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-pnp-js-sample&template=suggestion.yml&sample=react-pnp-js-sample&authors=@juliemturner%20@bcameron1231&title=react-pnp-js-sample%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

<img src="https://m365-visitor-stats.azurewebsites.net/sp-dev-fx-webparts/samples/react-pnp-js-sample" />
