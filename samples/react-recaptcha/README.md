# SPFx Google reCaptcha Sample

## Summary

This is sample webpart which showcase how to implement Google reCaptcha v2 in SPFx. CAPTCHA is used to prevent bots from automatically submitting forms with SPAM or other unwanted content. If we are building a custom input form to get feedback, newsletter subscription or contact us form using SPFx webpart. We might have to implement SPAM protection using some CAPTCHA resolving technique. This sample can come in handy to extend it for your
business requirement if you need to implement CAPTCHA in SPFx webpart.

* Please refer this [link](https://www.c-sharpcorner.com/article/google-recaptcha-in-sharepoint-framework-webpartspfx/) to know 'How to build this from Scratch'

![Webpart in action](screens/WebpartInAction.gif?raw=true "Webpart in action")

## Used SharePoint Framework Version

![drop](https://img.shields.io/badge/version-1.9.1-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)


## Prerequisites

We would need to register our site which wants to use reCaptcha at Google. Follow below steps to get site key. 

* Browse this [link](https://www.google.com/recaptcha/admin). 
* Login with valid google account.
* Provide a valid site label name.
* Select reCAPTCHA v2, Select "I'm not a robot"
* Add domain name, if you are using local workbench enter localhost. 
* For using it in context of SharePoint, enter your tenant url https://yourorg.sharepoint.com
* Accept terms and condition
* Submit

![Google recaptcha registration](screens/1.png?raw=true "Google recaptcha registration")

On sucessfull submission, we get site key and secret key, copy site key somewhere we would be using it later. 

![Google recaptcha registration](screens/2.png?raw=true "Google recaptcha registration")

## Solution

Solution|Author(s)
--------|---------
react-recaptcha | Siddharth Vaghasia([siddh_me](https://twitter.com/siddh_me/))

## Version history

Version|Date|Comments
-------|----|--------
1.0.0|Oct 10, 2019|Implemented few changes
1.0.0|Oct 08, 2019|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`


## Features

This Web Part illustrates the following concepts on top of the SharePoint Framework:

* Using react framework in SPFx webpart
* Using [PnP Placeholder control](https://sharepoint.github.io/sp-dev-fx-controls-react/controls/Placeholder/) to configure webpart.
* Using [react-google-recaptcha](https://github.com/dozoisch/react-google-recaptcha) npm package in SPFx webpart
* Validate if captcha is resolved before submitting data.

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-recaptcha" />
