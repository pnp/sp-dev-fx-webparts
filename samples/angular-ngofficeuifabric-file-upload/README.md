---
page_type: sample
products:
- office-sp
- office-365
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - AngularJS
  createdDate: 6/19/2017 12:00:00 AM
---
# SPFx Web part: File Upload using AngularJs

## Summary

File Update/Delete web part using AngularJs and ngOfficeUIFabric with the SharePoint Framework.

![File Upload using Angular](http://i.imgur.com/U5qg4II.png)

Edit web part properties to set Document library Name. Initially, It has been set to `Documents`.

## Used SharePoint Framework Version
 
![drop](https://img.shields.io/badge/version-GA-green.svg)

## Applies to

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Author(s)
--------|---------
angular-ngofficeuifabric-file-upload | [Atish Kumar Dipongkor](https://github.com/dipongkor) (MVP, Office Development)
angular-ngofficeuifabric-file-upload | [Gautam Sheth](https://github.com/gautamdsheth) (SharePoint Consultant,RapidCircle,@gautamdsheth)

## Version history

Version|Date|Comments
-------|----|--------
1.0|November 24, 2016|Initial release
2.0|May 26, 2017|GA release
2.1|July 19, 2017|Bug fix

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `tsd install`
  - `gulp serve --nobrowser`

## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework & AngularJs:

- `BaseService`: By injecting this Angular Service, GET, POST, UPDATE & DELETE requests can be made easily. It's a resuable service.
- `CustomFileChange`: It's a custom Angular directive. It binds the file with model on file change event.
- `IsoToDateString`: It's a custom Angular filter. It formats ISO date string to `{0:yyyy}-{0:MM}-{0:dd}` format.

## Support

We do not support samples, but we do use GitHub to track issues and constantly want to improve these samples.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=bug-report.yml&sample=angular-ngofficeuifabric-file-upload&authors=@waldekmastykarz&title=angular-ngofficeuifabric-file-upload%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=question.yml&sample=angular-ngofficeuifabric-file-upload&authors=@waldekmastykarz&title=angular-ngofficeuifabric-file-upload%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected&template=suggestion.yml&sample=angular-ngofficeuifabric-file-upload&authors=@waldekmastykarz&title=angular-ngofficeuifabric-file-upload%20-%20).


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/angular-ngofficeuifabric-file-upload" />
