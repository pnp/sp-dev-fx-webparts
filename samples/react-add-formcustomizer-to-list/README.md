# react-add-formcustomizer-to-list

A react based SPFx utility web part which will help admins/user(s) to associate and remove association of the list form customizer extension to a particular list. 

With SPFx version 1.15.1, we can now create new type of Extension as Form customizer which allows use to associate custom forms to SharePoint List.
As of writing this webpart, this no direct way to associate this form customizer to SP list. We will have to either write PowerShell or Use REST API to associate it with the list.

This webpart serves as utility so the developers can use to associate single form customizer with multiple lists with control over option to associate New/Edit/View form seperately.

Note - This webpart only serve to associate the Form customizer, so it is required that the actual SPFx Form Customizer solution is deployed and installed to targeted Site before association.

 WebPart in Action

![Web part in action](assets/webpartinaction-form.gif "Webpart in action")

### Highlights

* Option to Select Site->List->Content Type
* Option to choose asssociate either with one or more type of forms(New/Edit/View)
* Option to remove association of form
* Associate single customizer with mutiple lists/forms

## Used SharePoint Framework Version

![1.15.0](https://img.shields.io/badge/version-1.15.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

### Package and Deploy

Note - If you don't want to build and package on your own, you can directly download package at this [location](https://github.com/siddharth-vaghasia/public-docs/blob/master/react-add-formcustomizer-to-list.sppkg) and upload to app catalog and install app on required site collection. Skip below steps and directly go to How to use section.
Clone the solution and make sure there is no error before packaging. Try first on local work bench.

Change the `pageURL` property in `/config/serve.json` - This should be a valid modern page on your site collection.

```bash
git clone the repo
npm i
gulp serve
```
- Execute the following gulp task to bundle your solution. This executes a release build of your project by using a dynamic label as the host URL for your assets. This URL is automatically updated based on your tenant CDN settings:
```bash
gulp bundle --ship
```
- Execute the following task to package your solution. This creates an updated `react-add-formcustomizer-to-list.sppkg` package on the `sharepoint/solution` folder.
```bash
gulp package-solution --ship
```
- Upload or drag and drop the newly created client-side solution package to the app catalog in your tenant.
- Based on your tenant settings, if you would not have CDN enabled in your tenant, and the `includeClientSideAssets` setting would be true in the `package-solution.json`, the loading URL for the assets would be dynamically updated and pointing directly to the `ClientSideAssets` folder located in the app catalog site collection.

### How to Use Solution

* Once app is deployed to app catalog successfully
* Install app to required site collection
* Create new modern page. Add **react-add-formcustomizer-to-list** web part to page. 
* Publish the page.

To do the association or removing the assoication , user needs to follow the below steps:

* Select the site from available sites
* Choose a list from the available options
* Choose the content type to which the form customizer needs to associate/remove association if its already associated
* User needs to grab client component id present in form customizer manifest json file (Information is added in the client component id section with image)
* Select the required check box option New Form/Edit Form/View Form
* After filling the required values, click on Associate/Remove Association button
* Once it is successful then go to respective list and check the forms 
* Users can only associate/remove association of the form customizer to lists of the sites that they have access

You can copy the actual component ID of form customizer with from its manifest.json file. 

## Solution

Solution|Author(s)
--------|---------
react-add-formcustomizer-to-list | [Siddharth Vaghasia](https://www.linkedin.com/in/siddharthvaghasia/)

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Septemeber 04, 2022|Initial release


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

For any issue or help, Buzz me on twitter:([siddh_me](https://twitter.com/siddh_me/))

> Sharing is caring!

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-add-formcustomizer-to-list" />
