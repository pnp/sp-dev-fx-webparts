# Site Provisioning Manager

## Summary
This sample shows how you can manage site provisioning by calling Azure functions.

You can also find out how you can use React Hooks to manage the state of your application and share data across all components.


![react-provisioning-manager](./assets/screenshot.gif)


## Compatibility

![SPFx 1.9.1](https://img.shields.io/badge/SPFx-1.9.1-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Solution

Solution|Author(s)
--------|---------
react-site-provisioning-manager | Ramin Ahmadi

## Version history

Version|Date|Comments
-------|----|--------
1.0|August 14, 2019|Initial release

## Features
This sample illustrates the following concepts on top of the SharePoint Framework:

* Using React Hooks.
* Using aadHttpClientFactory to call Azure functions.
* PnP/graph to call Microsoft Graph Api.

## Configure Azure Function

### Create a self signed certificate

1. Run below command using Create-SelfSignedCertificate.ps1 in powershell-scripts folder.

```
.\Create-SelfSignedCertificate.ps1 -CommonName "NAME" -StartDate 2019-08-11 -EndDate 2025-08-11 -Password (ConvertTo-SecureString -String "PASSWORD" -AsPlainText -Force)
```

> The dates are provided in US date format: YYYY-MM-dd
> Don't forget to update the PASSWORD and NAME.

### Publishing the Azure function app

Follow below steps in order to publish the functions:

1. Open Provisioning App solution with Visual Studio 2017/2019.
2. Copy the .pfx certificate you generated under the Cert folder.
3. Open ProvisioningApp.csproj in a text editor and make sure your cert name is included. If not, replace provisioningapp.pfx with your cert file name.
2. In Solution Explorer, right-click the project and select Publish.
3. In the Pick a publish target dialog, use the publish options as specified in the table below the image:

![publish-profile](./assets/functions-visual-studio-publish-profile.png)

4. Select Publish. If you haven't already signed-in to your Azure account from Visual Studio, select Sign-in.
5. In the App Service: Create new dialog, enter the hosting settings.
6. Select Create to create a function app and related resources in Azure with these settings and deploy your function project code.

## Setting up an Azure AD app for app-only access

### Create a new app registration in Azure AD

1. Open Azure Portal https://portal.azure.com.
2. Click on Azure Active Directory.
3. Click on App registrations.
4. Click on New registration.
5. Give youre registration a name.
6. Click Register.

### Add your certificate to the app registration

1. Open Azure Portal https://portal.azure.com.
2. Select Azure Active Director, App Registration and then the App your created in previous steps.
3. Click on "Certificates & secrets".
4. Click on the "Upload certificate" button.
5. Select the .CER file you generated earlier and click on "Add" to upload it.

### API permissions

1. In the app registration we created earlier, click on API Permissions.
2. Click on the "Add a permission" button.
3. Choose the following permissions:
* SharePoint -> Application permissions -> Sites -> Sites.FullControl.All
4. Click Add permissions to save
5. Click Grant admin consent for the permissions to come into effect.
![API Permissions](./assets/api-permissions.png)

### Add the user_impersonation scope

Still in your Azure AD app, do the following:

1. Click on Expose API.
2. Click on Add scope
3. Approve the suggested URL or change it, if you like.
4. Fill in the following info:
- Scope name: `user_impersonation`
- Admin consent display name: `Access YourAzureAdAppDisplayName`
- Admin consent description: `Allow the application to access YourAzureAdAppDisplayName on behalf of the signed-in user.`
3. Press Add scope to save.

### Securing the Azure function app

1. Open Azure Portal https://portal.azure.com.
2. Click App Services and find the app you created earlier.
3. Click "Platform features" tab.
4. Under Networking, click "Authentication / Authorization".
5. In the option “App Service Authentication”, select “ON”.
6. For "Action to take when request is not authenticated" option, select “Log in with Azure Active Directory”.
7. Under “Authentication Providers”, select “Azure Active Directory”.
8. Select “Management mode” as Express.
9. Select the Azure AD app we registered earlier.
10. Click OK and then Save.

### Enable CORS on Azure Function

1. Click Platform features.
2. Under API, click CORS.
3. Specify the Office 365 tenant domain url and SharePoint local workbench url.
4. Click Save.

![CORS Settings](./assets/functions-CORS-settings.PNG)

### Update App Settings

1. Go the `App Settings` page of the Azure functions.
2. Create new key/value entries under ‘App settings’ as per the following table:

Key|Value|Note
---|-----|----
CERTIFICATE| .pfx file name | you should copy .pfx file in Cert folder
PASSWORD| Password you set for the certificate file
CLIENTID| Application Registration Client ID| you can find the client id from overview tab
TENANT| e.x. contoso.onmicrosoft.com

## Installing the web part

In the package-solution.json, replace the value of `resource` (under `webApiPermissionRequests`) with the name of your Azure AD app registration.

On the command line run (when in `webparts` dir):
- `npm install`
- `gulp bundle --ship`
- `gulp package-solution --ship`
- Drop the .sppkg file under `sharepoint\solution` to your tenant app catalog.
- Approve the API permissions via the new SharePoint admin center.

## Configuring the web part on a page

Open the web part configurations and set the values:
1. Application Id/EndPoint: the client ID of the Azure AD app registration used for authentication
2. Get provisioning function URL: Go to the Azure functions in Azure portal and click on "GetProvisioningTemplate" and then "Get function Url". Copy-paste that value in this field.
3. Apply provisioning function URL: Go to the Azure functions in Azure portal and click on "ApplyProvisioningTemplate" and then "Get function Url". Copy-paste that value in this field.

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-site-provisioning-manager" />
