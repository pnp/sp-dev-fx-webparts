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
# Exemple d’authentification de la Bibliothèque d’authentification Microsoft (MSAL JS)

## Résumé

Exemple de composant WebPart SharePoint Framework à l’aide de la [Bibliothèque d’authentification Microsoft (MSAL JS)](https://github.com/AzureAD/microsoft-authentication-library-for-js) pour appeler Microsoft Graph.

### MSAL WP

L’exemple de composant WebPart récupère un jeton d’accès avec l’étendue `User.Read` and `Mail.Read`. Une fois qu’un jeton d’accès est récupéré, il effectue un appel pour recevoir l’utilisateur actuel et ses courriers électroniques.

![Étendues d’autorisation](./assets/permission-scopes.png)

Une fois les autorisations attribuées, les informations suivantes sont affichées :

![Le composant WebPart MSAL affiché dans SharePoint Workbench](./assets/msal-wp-output.png)

## Version SharePoint Framework utilisée 
![drop](https://img.shields.io/badge/drop-GA-green.svg)

## S’applique à

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Client de développeur Office 365](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Auteur (s)
--------|---------
react-msal-msgraph|Elio Struyf (MVP, [U2U](https://www.u2u.be), [@eliostruyf](https://www.twitter.com/eliostruyf))

## Historique des versions

Version|Date|Commentaires
-------|----|--------
1.0.0 | 17 mars 2017 | Publication initiale

## Clause d’exclusion
**CE CODE EST FOURNI *EN L’ÉTAT*, SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS TOUTE GARANTIE IMPLICITE D'ADAPTATION À UN USAGE PARTICULIER, DE QUALITÉ MARCHANDE ET DE NON-CONTREFAÇON.**

---

## Conditions préalables

- Abonnement à Office 365 avec SharePoint Online et Exchange

## Chemin d’accès minimal à extraordinaire

- Clonez ce référentiel.
- Accédez et Inscrivez une nouvelle application sur [https://apps.dev.microsoft.com](https://apps.dev.microsoft.com)
    - Une fois connecté, cliquez sur **Ajouter une application**
    - Spécifiez le nom de l’application, puis cliquez sur créer.
    - Cliquez sur **Ajouter une plateforme** et choisissez **Web**.
    - Spécifiez l’URL Workbench et vérifiez que la case à cocher **Autoriser un flux implicite** est activée
    - Cliquez sur Enregistrer pour sauvegarder les modifications.

![Configuration d’URL web et flux implicite](./assets/redirect-url.png)

- Copiez l’**ID de l’application** puismodifiez-le en l'ajoutant au [fichier MsalWP.tsx en ligne 20](./src/webparts/msalWp/components/MsalWp.tsx#20)
- Exécutez `npm i`
- Exécutez `gulp serve --nobrowser`
- Testez votre composant WebPart dans le workbench local ou hébergé

## Fonctionnalités

L’exemple de composant WebPart dans cette solution illustre les concepts suivants au-dessus de SharePoint Framework :

- utilisation de la fonction React pour créer des composants WebPart côté client dans SharePoint Framework
- utilisation des styles Office UI Fabric React pour créer une expérience utilisateur cohérente avec SharePoint et Office
- authentification à la demande avec Azure Active Directory à l’aide de la bibliothèque MSAL JS
- communication avec Microsoft Graph à l’aide de l’API REST
- utilisation de la bibliothèque MSAL JS avec les composants WebPart SharePoint Framework créés à l’aide de la fonction React

![](https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-msal-msgraph)
