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
Composant graphique WebPart Angular MS Graph créé avec Angular v1.x

## Résumé
Il s’agit d’un exemple de composant WebPart Angular MS Graph qui se connecte à Microsoft Graph et extrait des informations SharePoint de votre client.
Il extrait tout d’abord la collection de sites racine (actuellement limitée par Microsoft Graph),
puis affiche toutes les listes associées au site, suivies de tous les éléments dans la liste.

![Premier écran](./assets/Connect.png)

![Connecté](./assets/Connected.png)

![Collection de sites racine](./assets/Root.png)

![Listes dans le site racine](./assets/Lists.png)

![Éléments de liste d’annonces](./assets/Items.png)


> Remarque : Je n'ai actuellement que des modèles développés pour la liste des annonces. Toutes les autres listes génèrent actuellement des erreurs.

## Version SharePoint Framework utilisée 
![drop](https://img.shields.io/badge/drop-ga-green.svg)

## S’applique à

* [Version préliminaire pour développeurs de SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Client de développeur Office 365](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-developer-tenant)

## Solution

Solution|Auteur (s)
--------|---------
angular-MSGraph|David Hartman ([Slalom](https://slalom.com))

## Historique des versions

Version|Date|Commentaires
-------|----|--------
2,0 | 19 avril 2017|GA version
1.0|6 février 2017|Publication initiale

## Clause d’exclusion
**CE CODE EST FOURNI *EN L’ÉTAT*, SANS GARANTIE D'AUCUNE SORTE, EXPRESSE OU IMPLICITE, Y COMPRIS TOUTE GARANTIE IMPLICITE D'ADAPTATION À UN USAGE PARTICULIER, DE QUALITÉ MARCHANDE ET DE NON-CONTREFAÇON.**

---

## Bliss de configuration
- clonez ce référentiel.
- dans la ligne de commande, exécutez :
 - `npm i typings -g`
 - `npm i`
 - `gulp serve

## Inscription de l’application

1. Connectez-vous au [portail d’inscription des applications](https://apps.dev.microsoft.com/) en utilisant votre compte personnel, professionnel ou scolaire.

2. Choisissez **Ajouter une application**.

3. Entrez un nom pour l’application, puis choisissez **Créer une application**.

   La page d’inscription s’affiche, répertoriant les propriétés de votre application.

4. Copiez l’ID de l’application. Il s’agit de l’identificateur unique de votre application.

5. Sous **Plateformes**, choisissez **Ajouter une plateforme**.

6. Choisissez **Web**.

7. Assurez-vous que la case **Autoriser le flux implicite** est cochée, puis entrez *http://{Location of SP Workbench}* comme URI de redirection.

8. Sélectionnez **Enregistrer**.

## Configuration de l’application
1. Remplacez les valeurs d’espace réservé **aad**et **redirect_uri** par l’ID d’application et
redirigez l’URL de votre application Azure inscrit dans le fichier GraphHelper.ts sous src-> angularMsGraph-> GraphHelper.ts

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/angular-msgraph" /> 