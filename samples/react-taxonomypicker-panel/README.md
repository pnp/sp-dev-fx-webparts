# SPFx web part with Taxonomy picker Office UI Fabric Panel.

## Summary
Sample web part with Single and Multi-select taxonomy pickers using Office UI Fabric panel. The web part uses the Taxonomy API support available in the @pnp/taxonomy.


![TaxonomyPickerPanel web part](https://github.com/vipulkelkar/sp-dev-fx-webparts/blob/TaxonomyPanelPicker/samples/react-taxonomypicker-panel/assets/TaxonomyPicker.gif)


## Compatibility

![SPFx 1.5.1](https://img.shields.io/badge/SPFx-1.5.1-green.svg)
![Node.js v8 | v6](https://img.shields.io/badge/Node.js-LTS%208%20%7C%20v6-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites
 
- @pnp/sp
- Office UI Fabric React

## Solution

Solution|Author(s)
--------|---------
react-taxonomypicker-panel | Vipul Kelkar  @vipulkelkar

## Version history

Version|Date|Comments
-------|----|--------
1.0|June 22, 2018|Initial release
1.1|August 20, 2018|Bug fix and version upgrade



## Minimal Path to Awesome

- Clone this repository


- Navigate to the file 'src/webparts/components/TermsPickerComponent.tsx'

- In the method "GetTerms", replace the <TERM_STORE_NAME> with the term store name in your tenant.

- Navigate to the file 'src/webparts/components/ReactTaxonomyPickerpanel.tsx'

- In the RENDER method of the web part, a custom taxonomy picker component is used. Please replace the "TermSetId" property with the desired term set id in your tenant.

- in the command line run:
  - `npm install`
  - `gulp serve`

- Navigate to - <Your SP site>/_layouts/workbench.aspx and add the "react-taxonomypicker-panel"

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

- This web part demonstrates the use of a custom taxonomy picker control built with Office UI Fabric React Panel and Tagpicker that enables users to select terms for a single-select or multi-select taxonomy field in a controlled manner.

- The custom taxonomy picker control is a reusable React component and can be easily placed in a SPFx web part just by providing the TermSetId as a property to the component.

  <TermsPickerComponent IsMultiValue={false} TermSetId='<TERM-SET-ID>' LabelText='Single-select field' SelectedTerms={<State variable>}/>

- By supplying the "SelectedTerms" property, the control can also be used in scenarios where pre-filled choices are to be shown such as the Edit form of a list item etc.

- The selected terms can be supplied as an array of a custom object 

  {
    name : "<Term Name>",
    key : "<Term ID>"
  }


## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-taxonomypicker-panel" />
