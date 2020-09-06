# SPFx webpart with Taxonomy picker Office UI Fabric Panel.

## Summary
Sample webpart with Single and Multi-select taxonomy pickers using Office UI Fabric panel. The webpart uses the Taxonomy API support available in the @pnp/taxonomy.


![TaxonomyPickerPanel webpart](https://github.com/vipulkelkar/sp-dev-fx-webparts/blob/TaxonomyPanelPicker/samples/react-taxonomypicker-panel/assets/TaxonomyPicker.gif)


## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/drop-1.5.1-green.svg)

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

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository

- Navigate to the file 'src/webparts/components/TermsPickerComponent.tsx'

- In the method "GetTerms", replace the <TERM_STORE_NAME> with the term store name in your tenant.

- Navigate to the file 'src/webparts/components/ReactTaxonomyPickerpanel.tsx'

- In the RENDER method of the webpart, a custom taxonomy picker component is used. Please replace the "TermSetId" property with the desired term set id in your tenant.

- in the command line run:
  - `npm install`
  - `gulp serve`

- Navigate to - <Your SP site>/_layouts/workbench.aspx and add the "react-taxonomypicker-panel"


## Features

- This webpart demonstrates the use of a custom taxonomy picker control built with Office UI Fabric React Panel and Tagpicker that enables users to select terms for a single-select or multi-select taxonomy field in a controlled manner.

- The custom taxonomy picker control is a reusable React component and can be easily placed in a SPFx webpart just by providing the TermSetId as a property to the component.

  <TermsPickerComponent IsMultiValue={false} TermSetId='<TERM-SET-ID>' LabelText='Single-select field' SelectedTerms={<State variable>}/>

- By supplying the "SelectedTerms" property, the control can also be used in scenarios where pre-filled choices are to be shown such as the Edit form of a list item etc.

- The selected terms can be supplied as an array of a custom object 

  {
    name : "<Term Name>",
    key : "<Term ID>"
  }

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-taxonomypicker-panel" />
