# React Tenant Properties Web Part

## Summary
This web part allows tenant administrators to manage tenant properties through a graphical interface.  
We can create, edit or delete tenant properties.

Only users with Tenant Admin Role are allowed to managed tenant properties.      
#### User without Tenant Admin Role got this message
![tenant properties](./assets/TenantProperties5.jpg)
#### List tenant properties
![tenant properties](./assets/TenantProperties1.jpg)

#### Add Tenant property
![tenant properties](./assets/TenantProperties2.jpg)

#### Edit tenant property
![tenant properties](./assets/TenantProperties3.jpg)

#### Delete tenant property
![tenant properties](./assets/TenantProperties4.jpg)


## Used SharePoint Framework Version 

![drop](https://img.shields.io/badge/version-1.7.1-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## WebPart Properties
 
Property |Type|Required| comments
--------------------|----|--------|----------
WebPart Title| Text| no|
 

## Solution
The Web Part Use MSGraph API and need to SharePoint Administrator approve de scope "Directory.ReadWrite.All" in SharePoint Admin Center.

Solution|Author(s)
--------|---------
Tenant Properties WebPart|João Mendes

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Mar 08, 2019|Initial release

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
  - `Approve API permission on SharePoint Admin Center`

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-tenant-properties" />
