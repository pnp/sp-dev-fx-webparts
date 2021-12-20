---
page_type: sample
products:
- office-sp
- ms-graph
languages:
- javascript
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  - Microsoft Graph
  services:
  - SharePoint
  platforms:
  - react
  createdDate: 8/1/2017 12:00:00 AM
---
# Ejemplo de autenticación de la biblioteca de autenticación de Microsoft (MSAL)

## Resumen

Elemento web de ejemplo de SharePoint Framework que usa la [Biblioteca de autenticación de Microsoft (MSAL JS)](https://github.com/AzureAD/microsoft-authentication-library-for-js) para llamar a Microsoft Graph.

### MSAL WP

El elemento web de ejemplo recuperará un token de acceso con el ámbito `User.Read` y `Mail.Read`. Una vez que se recupera el token de acceso, realizará una llamada para recibir al usuario actual y sus mensajes de correo electrónico.

![Ámbitos de permisos](./assets/permission-scopes.png)

Luego de que conceda los permisos, se mostrará la siguiente información:

![El elemento web de MSAL que se muestra en el área de trabajo de SharePoint](./assets/msal-wp-output.png)

## Version de SharePoint Framework utilizada 
![drop](https://img.shields.io/badge/drop-GA-green.svg)

## Se aplica a

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Espacio empresarial de desarrollador de Office 365](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solución

Solución | Autor(es)
--------|---------
react-msal-msgraph|Elio Struyf (MVP, [U2U](https://www.u2u.be), [@eliostruyf](https://www.twitter.com/eliostruyf))

## Historial de versiones

Versión | Fecha | Comentarios
-------|----|--------
1.0.0 | 17 de marzo de 2017 | Lanzamiento inicial

## Aviso de declinación de responsabilidades
**ESTE CÓDIGO ES PROPORCIONADO *TAL CUAL* SIN GARANTÍA DE NINGÚN TIPO, YA SEA EXPLÍCITA O IMPLÍCITA, INCLUIDAS LAS GARANTÍAS IMPLÍCITAS DE IDONEIDAD PARA UN FIN DETERMINADO, COMERCIABILIDAD O AUSENCIA DE INFRACCIÓN.**

---

## Requisitos previos

- Una suscripción a Office 365 con SharePoint Online y Exchange

## Pasos mínimos

- Clone este repositorio
- Vaya y registre una nueva aplicación en [https://apps.dev.microsoft.com](https://apps.dev.microsoft.com)
    - Una vez que haya iniciado sesión, haga clic en **agregar una aplicación**
    - Especifique un nombre para la aplicación y haga clic en crear
    - Haga clic en **agregar plataforma** y elija **web**.
    - Especifique la dirección URL del área de trabajo y asegúrese de que **permitir el flujo implícito** esté habilitado.
    - Haga clic en guardar para guardar los cambios.

![Configuración de la dirección URL web y flujo implícito](./assets/redirect-url.png)

- Copie el **Id. de la aplicación** y cambie o agréguelo al [archivo MsalWP.tsx en la línea 20](./src/webparts/msalWp/components/MsalWp.tsx#20)
- Ejecute `npm i`
- Ejecute `gulp serve --nobrowser`
- Pruebe el elemento web en el área de trabajo local o hospedado

## Características

El elemento web de ejemplo en esta solución ilustra los siguientes conceptos en SharePoint Framework:

- Cómo usar React para crear elementos web del lado cliente de SharePoint Framework.
- Cómo usar los estilos de Office UI Fabric React para crear una experiencia de usuario coherente con SharePoint y Office.
- Cómo usar la biblioteca MSAL JS para la autenticación a petición con Azure Active Directory
- Cómo comunicarse con Microsoft Graph mediante la API de REST
- Cómo usar la biblioteca MSAL JS con elementos web de SharePoint Framework creados con React.

![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-msal-msgraph)
