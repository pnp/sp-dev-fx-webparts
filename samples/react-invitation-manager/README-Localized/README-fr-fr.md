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
# Exemples d’API Graph de gestionnaire d’invitation Azure Active Directory

## Résumé

Exemple de composant WebPart SharePoint Framework créé à l’aide de React et montrant comment utiliser l’API Graph pour inviter des utilisateurs externes dans Azure Active Directory.

### Gestionnaire d’invitation

Exemple de composant WebPart SharePoint Framework côté client créé à l’aide de la fonction React montrant comment inviter l’utilisateur externe à l’aide de Microsoft Graph.

NB. J’attend la GA de HttpGraphClient (un bit limité en termes d’autorisation) pour l’utiliser dans ce scénario.
Regardez ceci pour aller plus loin :
* [HttpGraphClient](https://docs.microsoft.com/sharepoint/dev/spfx/web-parts/guidance/call-microsoft-graph-from-your-web-part)

![Le composant WebPart gestionnaire d’invitation affiché dans SharePoint Workbench](./assets/SPFx-Invitation-Manager.gif)

## Version SharePoint Framework utilisée 
![drop](https://img.shields.io/badge/drop-1.3.0-green.svg)

## S’applique à

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Client de développeur Office 365](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Auteur (s)
--------|---------
react-invitation-gestionnaire|Giuliano De Luca ([@giuleon](https://twitter.com/giuleon), [www.delucagiuliano.com](http://www.delucagiuliano.com))

## Historique des versions

Version|Date|Commentaires
-------|----|--------
1.0.0 |14 juillet 2017|Version initiale
1.0.1|09 octobre 2017|Mise à jour vers la version 1.3.0

## Clause d’exclusion
**CE CODE EST FOURNI *EN L’ÉTAT*, SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS TOUTE GARANTIE IMPLICITE D'ADAPTATION À UN USAGE PARTICULIER, DE QUALITÉ MARCHANDE ET DE NON-CONTREFAÇON.**

---

## Conditions préalables

- Abonnement à Office 365 avec SharePoint Online et Exchange

## Chemin d’accès minimal à extraordinaire

- clonez ce référentiel.
- dans Azure Active Directory correspondant à votre locataire Office 365, enregistrez une nouvelle application web :
  - comme l’**URL de connexion** entrez l’URL de la version hébergée de SharePoint Workbench (par exemple,). *https://contoso.sharepoint.com/\_layouts/15/workbench.aspx*
  - activer le flux implicite OAuth
  - octroyer à l’application l’autorisation **Microsoft Graph/lire et écrire des données d’annuaire**
  - copiez l’ID de l’application.
- dans le fichier **SRC/WebParts/invitationManager/AdalConfig. TS** dans la propriété **clientId** entrer l’ID d’application enregistré dans Azure
- dans la ligne de commande, exécuter
  - `npm i`
  - `gulp serve --nobrowser`
- accéder à la version hébergée de SharePoint Workbench
- Ajouter le composant WebPart **gestionnaire d’invitation**

## Fonctionnalités

L’exemple de composant WebPart dans cette solution illustre les concepts suivants au-dessus de SharePoint Framework :

- utilisation de la fonction React pour créer des composants WebPart côté client dans SharePoint Framework
- utilisation des styles Office UI Fabric React pour créer une expérience utilisateur cohérente avec SharePoint et Office
- authentification à la demande avec Azure Active Directory à l’aide de la bibliothèque ADAL JS
- communication avec Microsoft Graph à l’aide de l’API REST
- utilisation de la bibliothèque ADAL JS avec les composants WebPart SharePoint Framework créés à l’aide de la fonction React

![](https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-invitation-manager)
