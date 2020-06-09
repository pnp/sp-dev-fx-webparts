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
  - AngularJS
  createdDate: 2/16/2017 12:00:00 AM
---
## Elemento web de Microsoft Graph de angular creado con Angular v1.x

## Resumen
Este es un elemento web de Microsoft Graph de ejemplo que se conecta a Microsoft Graph y extrae información de SharePoint del espacio empresarial.
Primero, extraerá la colección de sitios raíz (lo que actualmente es una limitación de Microsoft Graph),
y luego mostrará todas las listas asociadas con el sitio seguidos de todos los elementos de la lista.

![Primera pantalla](./assets/Connect.png)

![Sesión iniciada](./assets/Connected.png)

![Colección de sitios raíz](./assets/Root.png)

![Listas en el sitio raíz](./assets/Lists.png)

![Elementos de la lista de anuncios](./assets/Items.png)


> Nota: Actualmente, solo tengo desarrollados modelos para la lista de anuncios. Cualquier otra lista generará errores.

## Version de SharePoint Framework utilizada 
![drop](https://img.shields.io/badge/drop-ga-green.svg)

## Se aplica a

* [SharePoint Framework Developer Preview](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Espacio empresarial de desarrollador de Office 365](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solución

Solución | Autor(es)
--------|---------
angular-msgraph|David Hartman ([Slalom](https://slalom.com))

## Historial de versiones

Versión | Fecha |Comentarios
-------|----|--------
2.0|19 de abril de 2017 | Versión GA
1.0| 6 de febrero de 2017| Lanzamiento inicial

## Aviso de declinación de responsabilidades
**ESTE CÓDIGO SE PROPORCIONA*TAL CUAL* SIN GARANTÍA DE NINGÚN TIPO, YA SEA EXPRESA O IMPLÍCITA, INCLUYENDO CUALQUIER GARANTÍA IMPLÍCITA DE IDONEIDAD PARA UN PROPÓSITO PARTICULAR, COMERCIABILIDAD O NO INFRACCIÓN.**

---

## Configuración perfecta
- Clone este repositorio
- En la línea de comandos, ejecute:
 - `npm i typings -g`
 - `npm i`
 - `gulp serve

## Registrar la aplicación

1. Inicie sesión en el [Portal de registro de aplicaciones](https://apps.dev.microsoft.com/) mediante su cuenta personal, profesional o educativa.

2. Elija **Agregar una aplicación**.

3. Escriba un nombre para la aplicación y elija **Crear aplicación**.

   Se muestra la página de registro, indicando las propiedades de la aplicación.

4. Copie el Id. de aplicación. Este es el identificador único de la aplicación.

5. En **Plataformas**, elija **Agregar plataforma**.

6. Elija **Web**.

7. Asegúrese de que la casilla **Permitir flujo implícito** está seleccionada y escriba *http://{Ubicación del área de trabajo SP}* como URI de redireccionamiento.

8. Elija **Guardar**.

## Configurar la aplicación
1. Reemplace los valores de los marcadores de posición **aad** y **redirect_uri** con el Id.
de la aplicación y la dirección URL de redireccionamiento de la aplicación de Azure registrada en el archivo GraphHelper.ts en src -> angularMsGraph -> GraphHelper.ts

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/angular-msgraph" /> 