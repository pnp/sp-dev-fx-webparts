# LOB Integration web part

> NOTE: This sample is available in the [PnP Starter Kit](https://github.com/pnp/sp-starter-kit). You can find the sample code for this web part at https://github.com/pnp/sp-starter-kit/tree/master/solution/src/webparts/lobIntegration.


This web part allows you to learn how to consume 3rd party APIs, secured with Azure Active Directory, in the context of SharePoint Framework.
It leverages two different back-end REST APIs:
- An ApiController built in Microsoft ASP.NET MVC, which is defined in a .NET solution that you can find [here](https://github.com/pnp/sp-starter-kit/blob/master/sample-lob-service/SharePointPnP.LobScenario/SharePointPnP.LobScenario.sln)
- An Azure Function, which is based on the code defined [here](https://github.com/pnp/sp-starter-kit/blob/master/sample-lob-service/LIstNorthwindCustomers)

![LOB Integration](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-lob-integration.png)

The purpose of this web part is to show how you can consume LOB (Line of Business) solutions and on-premises data within SharePoint Framework.
In order to leverage this web part, you will need to configure a couple of applications in Azure Active Directory of your target tenant:
- **SPFx-LOB-WebAPI**: for the .NET web application
  - Publish the ASP.NET MVC application on an Azure App Service
  - Register the AAD app providing the URL of the above Azure App Service
  - Choose a valid App ID Uri for the app
  - Configure that App ID Uri in the [LobIntegration.tsx](https://github.com/pnp/sp-starter-kit/blob/master/solution/src/webparts/lobIntegration/components/LobIntegration.tsx#L145) React component
  - Update the App manifest of the Azure AD app configuring the **oauth2Permissions** property with a value like the following one:

```json
  "oauth2Permissions": [
    {
      "adminConsentDescription": "Allow the application to read customers through SPFx-LOB-WebAPI on behalf of the signed-in user.",
      "adminConsentDisplayName": "Read customers from SPFx-LOB-WebAPI",
      "id": "7510eb34-4403-44d5-a745-a62d0895351c",
      "isEnabled": true,
      "type": "User",
      "userConsentDescription": "Allow the application to access SPFx-LOB-WebAPI on your behalf.",
      "userConsentDisplayName": "Access SPFx-LOB-WebAPI",
      "value": "Customers.Read"
    }
  ],
```
- **SPFx-LOB-Function**: for the Azure Function
  - Create an Azure Function and configure it with Azure AD Authentication, registering it in your target AAD tenant
  - Register the AAD app providing the URL of the above Azure Function
  - Choose a valid App ID Uri for the app
  - Configure that App ID Uri in the [LobIntegration.tsx](https://github.com/pnp/sp-starter-kit/blob/master/solution/src/webparts/lobIntegration/components/LobIntegration.tsx#L99) React component
  
Moreover, in order to make this web part working properly, you need to grant permissions to the SharePoint Service Application Principal to access them. You can do that using the PnP PowerShell command lets (or Office 365 CLI) with the following syntax:

```PowerShell
Connect-PnPOnline "https://[your-tenant].sharepoint.com/"

Grant-PnPTenantServicePrincipalPermission -Resource "SPFx-LOB-WebAPI" -Scope "Customers.Read"
Grant-PnPTenantServicePrincipalPermission -Resource "SPFx-LOB-Function" -Scope "user_impersonation"

```

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **LobIntegration** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `LobIntegration` web part can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Web API URI | webapiUri | string | yes | The URL of the web API. Should be something like https://[your-app-service].azurewebsites.net/api/customers |
| Function URI | functionUri | string | yes | The URL of the Azure Function. Should be something like https://[your-azure-function].azurewebsites.net/api/ListNorthwindCustomers |
| Service Type | serviceType | choice | yes | Defines the service to use. It can be "ASP.NET REST API" or "Azure Function" |

# Installing the web part

See getting started from [SP-Starter-Kit repository readme](https://github.com/pnp/sp-starter-kit). 

You can also download just the [SharePoint Framework solution package (spppkg) file](https://github.com/pnp/sp-starter-kit/blob/master/package/sharepoint-starter-kit.sppkg) and install that to your tenant. This web part does not have external dependencies.

# Screenshots
![Links](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-lob-integration.png)


# Source Code

https://github.com/pnp/sp-starter-kit/tree/master/solution/src/webparts/lobIntegration

# Minimal Path to Awesome

- Clone this repository
- Move to Solution folder
- in the command line run:
  - `npm install`
  - `gulp serve`

# Version history

Version|Date|Comments
-------|----|--------
1.0|May 2018|Initial release
1.1|June 2018|Updated collection descriptions
1.2|October 2018|Updated documentation

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-lob-integration" />
