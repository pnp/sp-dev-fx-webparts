# svg-converter-solution

## Summary

This web part allows users to read SVGs from a SharePoint library, select one of them and have the code converted into a JSON format that is ready to be used in a SharePoint List in advanced formatting. Users can both copy the JSON format to their clipboard (for futher manipulation) or select a site, a list, and a column and then directly apply the format to this column.

For usage in SharePoint, the Property Pane is used to define the Site URL and the library Name where the SVGs come from, for usage in Microsoft Teams there is a basic form to save the configuration.

![svg converter in action](../assets/webpart-sp.png)

If you want to read more about this Web Part, [this blog post series is for you](https://m365princess.com/blogs/spfx-1)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.20.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

In the property pane, you can enter a SharePoint Site URL and a library name on that SharePoint Site where SVGs can be selected from.

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| react-svg-to-json-converter | [Luise Freese](https://github.com/LuiseFreese) | @LuiseFreese |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | October 16 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp serve**

> Include any additional steps as needed.

## Features

1. Reads SVGs from a Sharepoint Document Library and displays their name in a dropdown
2. Allows users to select an SVG, the SVG code will now be visible in an output box
3. Allows users to convert this SVG code to a JSON format that is accepted by a SharePoint List column.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
