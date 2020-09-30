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
# Ejemplos de Graph API para el administrador de invitaciones de Azure Active Directory

## Resumen

Elementos web de ejemplo de SharePoint Framework creados con React que muestran la posibilidad de usar Graph API para invitar a usuarios externos a Azure Active Directory.

### Administrador de invitaciones

Ejemplo de elemento web del lado cliente de SharePoint Framework creado con React que muestra cómo invitar al usuario externo mediante Microsoft Graph.

NB. Estoy esperando la disponibilidad general de HttpGraphClient (estoy un poco limitado en lo que respecta a permisos) para usarlo en este escenario.
Consulte este documento para profundizar:
* [HttpGraphClient](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/call-microsoft-graph-from-your-web-part).

![El elemento web del administrador de invitaciones que se muestra en SharePoint Workbench](./assets/SPFx-Invitation-Manager.gif)

## Version de SharePoint Framework utilizada 
![drop](https://img.shields.io/badge/drop-1.3.0-green.svg)

## Se aplica a

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Espacio empresarial de desarrollador de Office 365](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solución

Solución|Author
--------|---------
react-invitation-manager|Giuliano De Luca ([@giuleon](https://twitter.com/giuleon), [www.delucagiuliano.com](http://www.delucagiuliano.com))

## Historial de versiones

Versión|Fecha|Comentarios
-------|----|--------
1.0.0|14 de julio de 2017|Versión inicial
1.0.1|9 de octubre de 2017|Actualizada a la versión 1.3.0

## Aviso de declinación de responsabilidades
**ESTE CÓDIGO ES PROPORCIONADO *TAL CUAL* SIN GARANTÍA DE NINGÚN TIPO, YA SEA EXPLÍCITA O IMPLÍCITA, INCLUIDAS LAS GARANTÍAS IMPLÍCITAS DE IDONEIDAD PARA UN FIN DETERMINADO, COMERCIABILIDAD O AUSENCIA DE INFRACCIÓN.**

---

## Requisitos previos

- Una suscripción a Office 365 con SharePoint Online y Exchange

## Pasos mínimos

- Clone este repositorio.
- En el Azure Active Directory correspondiente a su espacio empresarial de Office 365, registre una nueva aplicación web:
  - Especifique la URL de la versión hospedada de SharePoint Workbench como la **URL de inicio de sesión**, p. ej. *https://contoso.sharepoint.com/\_layouts/15/workbench.aspx*.
  - Habilite el flujo implícito de OAuth.
  - Conceda a la aplicación el permiso **Leer y escribir datos de directorio de Microsoft Graph/Read**.
  - Copie el Id. de aplicación.
- En el archivo **src/webparts/invitationManager/AdalConfig.ts** en la propiedad **clientId**, introduzca el Id. de la aplicación registrada en Azure.
- En la línea de comandos, ejecute lo siguiente:
  - `npm i`
  - `gulp serve --nobrowser`
- Vaya a la versión hospedada de SharePoint Workbench.
- Agregue el elemento web del **administrador de invitaciones**.

## Características

El elemento web de ejemplo en esta solución ilustra los siguientes conceptos en SharePoint Framework:

- Cómo usar React para crear elementos web del lado cliente de SharePoint Framework.
- Cómo usar los estilos de Office UI Fabric React para crear una experiencia de usuario coherente con SharePoint y Office.
- La autenticación a petición con Azure Active Directory y con la biblioteca ADAL JS.
- La comunicación con Microsoft Graph mediante la API de REST.
- Cómo usar la biblioteca ADAL JS con elementos web de SharePoint Framework creados con React.

![](https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-invitation-manager)
