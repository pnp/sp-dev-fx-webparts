# Image Slider from Photo Gallery using Taxonomy Filter

## Summary
This webpart display the image in slider based on the filter of Taxonomy from Property panel. Images are stored in PhotoGallery and tagged with Taxonomy. This web part showcase 3 important implementation.

- How to add the Terms in the propertypage and pass the values to react component
- How to filter the list based on Taxonomy and extract the Image URL
- Implementation of Slick Slider

![preview](./assets/ImageSlider.gif)

## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-1.6.0-green.svg)

## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites
 
- PhotoGalley list names "Photos" and Managed Metadata field attached to Site collection Terms
- Upload few photos in the "Photos" library and tag it.

## Solution

Solution|Author(s)
--------|---------
react-ImageSlider-List-TaxonomyFilter | Sudhir Rawat 

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 1, 2019 |Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `gulp serve`

> Include any additional steps as needed.

## Features
This web part show the images carousel which is picking from the list based on terms filter. 
This Web Part illustrates the following concepts on top of the SharePoint Framework:


- How to add the Terms in the propertypage and pass the values to react component
- How to filter the list based on Taxonomy and extract the Image URL
- Implementation of Slick Slider

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-image-slider-list-taxonomy-filter" />
