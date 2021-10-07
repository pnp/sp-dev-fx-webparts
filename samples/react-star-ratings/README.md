# react-star-ratings

## Summary

This web part demonstrates *Star Ratings* capablities to SharePoint News. The "Ratings" site collection feature provides *Likes* and *Star Ratings*, but SharePoint News provides only provides *Likes*. This web part can get or set ratings of the current page.

![react-star-ratings](./assets/react-star-ratings.png)

## Compatibility

![SPFx 1.12.1](https://img.shields.io/badge/SPFx-1.12.1-green.svg)
![Node.js LTS v14 | LTS v12 | LTS v10](https://img.shields.io/badge/Node.js-LTS%20v14%20%7C%20LTS%20v12%20%7C%20LTS%20v10-green.svg) 
![SharePoint Online](https://img.shields.io/badge/SharePoint-Online-yellow.svg)
![Teams N/A: Untested with Microsoft Teams](https://img.shields.io/badge/Teams-N%2FA-lightgrey.svg "Untested with Microsoft Teams") 
![Workbench Hosted](https://img.shields.io/badge/Workbench-Hosted-green.svg)

## Prerequisites

1. Enable the "Ratings" feature of the site collection. The feature GUID is `915c240e-a6cc-49b8-8b2c-0bff8b553ed3`.

```
Enable-PnPFeature -Identity 915c240e-a6cc-49b8-8b2c-0bff8b553ed3
```

2. Update "Rating settings".

    - Click **\[⚙\]** - **\[Site contents\]**.
    - Click **\[Site Pages\]** - **\[︙\]** - **\[Settings\]**.
    - Click **\[Rating settings\]**.
    - Update values.
        - Rating Settings: **Yes**
        - Which voting/rating experience you would like to enable for this list?: **Star Ratings**

## Solution

Solution|Author(s)
--------|---------
react-star-ratings | Takashi Shinohara (@karamem0)

## Version history

Version|Date|Comments
-------|----|--------
1.0|October 7, 2021|Initial release

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**
