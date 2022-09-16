# SPFX Consume Northwind Microsoft database from Azure using a Function App 

## Summary

This Webpart consume an anonymous Function App from an HTTP Triger using the templates from the Northwind Microsoft DBs
You must create a database in azure and run the scripts

![Here](https://github.com/microsoft/sql-server-samples/blob/master/samples/databases/northwind-pubs/readme.md)

![SMAPLE](./assets/FAPP.png)

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.15.2-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| react-azurefunction-northwind | Joao Livio @jlivio |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | August 15, 2022 | Initial release |

## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - **npm install**
  - **gulp clean**
  - **gulp build serve**

## Features

- Consume a Function app from SQL Server
- No Authentication is active, only the url code for the Function, must change
- [Uses react controls (Listview)](https://pnp.github.io/sp-dev-fx-controls-react/)
- [Uses react proprety controls](https://pnp.github.io/sp-dev-fx-property-controls/)

## References

- [Go and create a database in Azure](https://github.com/Microsoft/sql-server-samples/tree/master/samples/databases/northwind-pubs)
- [Create your first Function](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp)

## Function Code

- [Code for your Function](https://github.com/jtlivio/react-azurefunction-northwind/blob/master/FunctionCode.cs)

## Suggestion

- Use a Serveless Database
- Use a Pay as You Go Model in your function
- In Production use Key Vault for your Connection String

## Secure your Function with AAD
- [Securing Azure Functions](https://docs.microsoft.com/en-us/azure/azure-functions/security-concepts?tabs=v4)
- [Configure your App Service or Azure Functions app to use Azure AD login](https://docs.microsoft.com/en-us/azure/app-service/configure-authentication-provider-aad)

## aadHttpClientFactory

- [Connect to Azure AD applications using the AadHttpClient](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/use-aadhttpclient)




