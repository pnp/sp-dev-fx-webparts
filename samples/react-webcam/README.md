# SPFx Web/Mobile Camera Demo

## Summary

This is sample web part to showcase how to open webcam and take photo in SPFx web part. This will work in desktop/laptop with webcam and mobile device also(from browser). This can be extended to stored captured photo in document library or it can be saved as user profile photo using GRAPH API.

* [Please refer this link on How to build this from Scratch](https://www.c-sharpcorner.com/article/how-to-open-webmobile-camera-and-take-photo-from-spfx-webpart/)

![Options Available](./assets/3.png?raw=true "Options Available")
![Opening webcam](./assets/4.png?raw=true "Opening webcam")
![Taking photo](./assets/5.png?raw=true "Taking photo")

## Compatibility

![SPFx 1.9.1](https://img.shields.io/badge/SPFx-1.9.1-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)


## Prerequisites

> N/A

## Solution

Solution|Author(s)
--------|---------
react-webcam | [Siddharth Vaghasia](https://github.com/siddharth-vaghasia) (@siddh_me)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Sept 05, 2019|Upgraded to Latest SPFx Version 1.9.1
1.0.0|Sept 04, 2019|Initial release

## Minimal Path to Awesome

* Clone this repository
* From the command line, change your current directory to this sample's directory (`react-webcam`, located under `samples`)
* in the command line run:
  * `npm install`
  * `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.


## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Using react framework in SPFx web part
* Using react-webcam npm package in SPFx web part
* Open web cam or mobile camera to capture photo and display in img html element

## Video

[![Operating web camera from SharePoint Framework solutions](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=YIaCEkjCTKc "Operating web camera from SharePoint Framework solutions")


## Help

We do not support samples, but this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-webcam") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-webcam) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-webcam&template=bug-report.yml&sample=react-webcam&authors=@siddharth-vaghasia&title=react-webcam%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-webcam&template=question.yml&sample=react-webcam&authors=@siddharth-vaghasia&title=react-webcam%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-webcam&template=question.yml&sample=react-webcam&authors=@siddharth-vaghasia&title=react-webcam%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**



<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-webcam" />
