# Tiles

> NOTE: This sample is available in the [PnP Starter Kit](https://github.com/pnp/sp-starter-kit). You can find the sample code for this web part at https://github.com/pnp/sp-starter-kit/tree/master/solution/src/webparts/tiles.

This web part provides you the ability to add a per instance listing of tiled links. Tiles are stored as a collection of tiles within the web part's properties, removing the need for link storage within SharePoint lists, tenant properties, or other external link storage requirements.

Icons are from Office UI Fabric.

![Tiles](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-tiles.gif)

## How to use this web part on your web pages

1. Place the page you want to add this web part to in edit mode.
2. Search for and insert the **Tiles** web part.
3. Configure the web part to update its properties.

## Configurable Properties

The `Tiles` web part can be configured with the following properties:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Useful Tools | title | string | no | The web part title, editable inline with the web part itself |
| Specify the height of the tiles | tileHeight | number | no | Default: 200, the height in pixels of each tile |
| Tile data | collectionData | collection | no | Collection of tiles |

### collectionData Collection Properties

Configurable properties for each tile row within the `collectionData` collection:

| Label | Property | Type | Required | Description |
| ---- | ---- | ---- | ---- | ---- |
| Title | title | string | yes | The text / title of the tile |
| Description | description | string | no | Optional tile description |
| URL | url | string | yes | The tile link url |
| UI Fabric icon name | icon | fabricIcon | no | Optional UI Fabric icon name |
| Target | target | dropdown | no | Optional target for this link, current or new window |

# Installing the web part

See getting started from [SP-Starter-Kit repository readme](https://github.com/pnp/sp-starter-kit). 

You can also download just the [SharePoint Framework solution package (spppkg) file](https://github.com/pnp/sp-starter-kit/blob/master/package/sharepoint-starter-kit.sppkg) and install that to your tenant. This web part requires access to the Microsoft Graph.

# Screenshots

![Tiles](https://github.com/pnp/sp-starter-kit/raw/master/assets/images/components/part-tiles.png)

# Source Code

https://github.com/pnp/sp-starter-kit/tree/master/solution/src/webparts/tiles

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
1.1|June 2018|Update SPFx Property Controls version to 1.7.0 - use Fabric Icon control

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-tiles" />
