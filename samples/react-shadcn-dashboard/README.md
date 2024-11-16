# React ShadCN Dashboard

## Summary

This SharePoint Framework (SPFx) web part serves as a foundational solution for developers aiming to use ShadCN components within SPFx projects. By integrating ShadCN components with Tailwind CSS in an SPFx web part, this project enables developers to craft modern, responsive, and visually appealing SharePoint webparts. This solution provides a seamless, intuitive developer experience for building advanced UI elements in SharePoint.

![Dashboard Screenshot](./assets//Screenshot%202024-11-09%20at%2020.21.27.png)

## Compatibility

| :warning: Important                                                                                                                                                                                                                   |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Every SPFx version is optimally compatible with specific versions of Node.js. To build this sample, ensure that the version of Node on your workstation matches one of the versions listed in this section.                 |
| Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.                                                                                                                                                     |


This sample is optimized for the following environment configuration:

![SPFx 1.19.0](https://img.shields.io/badge/SPFx-1.19.0-green.svg)
![Node.js v18 | v16](https://img.shields.io/badge/Node.js-v18%20%7C%20v16-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)


## Contributors🧑‍💻

- [Sandeep P S](https://github.com/Sandeep-FED)

## Version history

| Version | Date             | Comments                                |
| ------- | ---------------- | --------------------------------------- |
| 1.0     | November 9, 2024 | Initial release with ShadCN and Tailwind CSS integration |

## Features💡

Key features demonstrated by this solution:

- Enables ShadCN component integration within SPFx projects
- Utilizes Tailwind CSS for efficient, responsive styling
- Empowers developers to create modern, modular, and user-friendly web parts in SharePoint

## Minimal Path to Awesome⚡

- Clone this repository
- Ensure that you are in the solution folder
- Run these commands:
  - `npm install`
  - `gulp serve`

## Deploy Package Solution 🚀

- Ensure that you are in the solution folder
- Run these commands:
  - `gulp build --ship`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
- Upload the package to the AppCatalog and add it to your SharePoint site.

## References

- [ShadCN Library](https://shadcn.dev) - Powerful UI components for modern web apps.
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework for rapid UI development.
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp)
- [SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Help

The community is always willing to help improve these samples. If you're having issues building the solution, run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to check compatibility.

If you encounter issues, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new). For questions or improvement ideas, the same link will guide you to the community space for assistance.

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED.**