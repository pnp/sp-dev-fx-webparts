# Dev-Radar for SharePoint Online

## Summary

One way to find devs from the same stack near you.

## Screen 

![react-dev-radar](dev-radar.png)

## Used SharePoint Framework Version 

![drop](https://img.shields.io/badge/version-1.10.0-green.svg)

## Applies to

* [SharePoint Online](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)


## Solution
The web part Use PnPjs library and Axios

Create a list Devs with fields
```
Field               Type
---------------------------
name                single line 
githubUsername      single line 
techs               single line 
avatarUrl           single line 
bio                 multiline 
latitude            single line 
longitude           single line 
```

Solution|Author(s)
--------|---------
Dev Radar  Web Part|Saulo Oliveira

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|March 01, 2020|Initial release


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp build`
  - `gulp bundle --ship`
  - `gulp package-solution --ship`
  - `Add to AppCatalog and deploy`

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-dev-radar" />
