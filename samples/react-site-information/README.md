# Site Information

> NOTE: This sample is available in the [PnP Starter Kit](https://github.com/pnp/sp-starter-kit). You can find the sample code for this web part at https://github.com/pnp/sp-starter-kit/tree/master/solution/src/webparts/siteInformation.


This web part provides you the ability to collect and present additional metadata on a web page for group associated team sites. The web part may be configured to display site title, a site contacts powered by a people picker, and a term from the term store, often used to provide classification for the site.

This web part is intended to be used once within a group associated team site to provide additional metadata. This web part provides an extensability framework in which to customize the web part code base to include additional properties and thus site metadata. Additional method demonstrations include the PnP Property Control people picker and the PnP Property Control term picker.

The term store must include the term group name, `PnPTermSets`, which incudes a Term Set, `PnP-Organizations`. Terms should be placed within this term set. The term group, term set, and default terms are added by the Starter Kit provisioning process, in particular set within the `./provisioning/terms.xml` provisioning template.

![Site Information](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-site-information.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **Site Information** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `Site Information` web part can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Site Title | siteTitle | string | no | Default: Contoso Portal - the title of the site |
| Site Contact | siteContact | IPropertyFieldGroupOrPerson[] | no | A site contact based on a people picker |
| Site Organization | siteOrganization | IPickerTerms | no | The site's organization, based on a taxonomy termset |

# Installing the web part

See getting started from [SP-Starter-Kit repository readme](https://github.com/pnp/sp-starter-kit). 

You can also download just the [SharePoint Framework solution package (spppkg) file](https://github.com/pnp/sp-starter-kit/blob/master/package/sharepoint-starter-kit.sppkg) and install that to your tenant. This web part requires access to the Microsoft Graph.

# Screenshots

![Site Information](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-site-information.png)

# Source Code

https://github.com/pnp/sp-starter-kit/tree/master/solution/src/webparts/siteInformation

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
1.1|June 2018|Link web part to proper term group and term set

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-site-information" />
