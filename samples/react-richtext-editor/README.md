# Rich Text Editor - Fluent UI

## Summary

A robust rich text editor utilizing the latest Fluent React components to seamlessly align with SharePoint Online Modern UI standards. Full control over UI and backend code, making integration with external systems like SharePoint lists a breeze. Inspiration is drawn from the out-of-the-box Text web part.

![RichText Editor](./assets/screenshot.png)


## Compatibility

| :warning: Important          |
|:---------------------------|
| Every SPFx version is optimally compatible with specific versions of Node.js. In order to be able to build this sample, you need to ensure that the version of Node on your workstation matches one of the versions listed in this section. This sample will not work on a different version of Node.|
|Refer to <https://aka.ms/spfx-matrix> for more information on SPFx compatibility.   |

This sample is optimally compatible with the following environment configuration:

![SPFx 1.20.2](https://img.shields.io/badge/SPFx-1.20.0-green.svg)
![Node.js v18](https://img.shields.io/badge/Node.js-v18-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Unsupported](https://img.shields.io/badge/Local%20Workbench-Unsupported-red.svg "Local workbench is no longer available as of SPFx 1.13 and above")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)


## Contributors

- [Ejaz Hussain](https://github.com/ejazhussain)

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | February  11, 2025 | Initial release |


## Minimal Path to Awesome

Follow these steps to get started with the Rich Text Editor:

1. **Clone the repository**
    ```sh
    git clone https://github.com/pnp/sp-dev-fx-webparts.git
    ```

2. **Navigate to the project directory**
    ```sh
    cd sp-dev-fx-webparts/samples/react-richtext-editor
    ```

3. **Install the required packages**
    ```sh
    npm install
    ```

4. **Build the project**
    ```sh
    gulp build --ship
    ```

5. **Bundle the project**
    ```sh
    gulp bundle --ship
    ```

6. **Package the solution**
    ```sh
    gulp package-solution --ship
    ```

7. **Deploy the package to the app catalog**

8. **Add the web part `[O365C] RichText Editor`  to the page**


## Features

- **Fluent UI Integration**: Utilizes the latest Fluent React components to align with SharePoint Online Modern UI standards.
- **Full Control**: Provides full control over UI and backend code, making integration with external systems like SharePoint lists easy.
- **Inspiration from Text Web Part**: Draws inspiration from the out-of-the-box Text web part.
- **Customizable**: Allows customization to fit specific organizational needs and branding.
- **Secure**: Ensures secure communication and data handling within the SharePoint environment.
- **User-Friendly**: Easy to deploy and use, enhancing the overall employee experience.

