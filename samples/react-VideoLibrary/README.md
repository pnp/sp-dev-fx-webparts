# React Video Library

## Summary
A set of 3 SPFX webparts that use different open-source carousels (react-3d-carousel, reactjs-coverface, and react-slick)
to display videos stored on an O365 Video Channel. The idea being to display a carousel of the thumbnail images, and then 
when a user clicks on one of the thumbnails, replace the tumbnail with a video player and start the video up. 

The first webpart used react-3d-carousel. The carousel looks great, but i found no way to swap out the image and replace 
it with a video player. This carousel would be fine for displayin a picture library though,

The second webpart used react-slick. The carousel is not as fancy as react-3d-carousel, but i was able to to swap out the 
image and replace it with a video player once a user clicked it. I had trouble with the css and getting the next and previous 
buttons to show. If you run the webpart, the buttons are there, they are just not visible. 

Finally I tried reactjs-coverface. It has nice scrolling through the images withe the mousweheel, and some cool 3d effects.
It was also simple to swap the image with a video player once a user clicked it (same code as react-slick). This is the best 
of the three for my purposes.


In the future I wan to modify this webpart to link a Sharepoint list with the video channel so that users can enter addition 
metadata for th evideo and be anle to search/filter the videos using this metadata. Hopefully we'll have am Office UI Fabric
Caousellto test with soon!





![alt tag](./src/webpartimages/CoverFlow.PNG)


## Used SharePoint Framework Version
![drop](https://img.shields.io/badge/drop-drop5-red.svg)

## Applies to

* [SharePoint Framework Developer Preview](http://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview)
* [Office 365 developer tenant](http://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant)



## Prerequisites

> React, react-3d-carousel reactjs-coverface react-slick

## Solution

Solution|Author(s)
--------|---------
 react-VideoLibrary | Russell Gove

## Version history

Version|Date|Comments
-------|----|--------
0.1|December 31, 2016|Initial version


## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- in the command line run:
  - `npm install`
  - `tsd install`
  - `gulp serve`

> Include any additional steps as needed.

## Features
A set of 3 SPFX webparts that use different open-source carousels (react-3d-carousel, reactjs-coverface, and react-slick)
to display videos stored on an O365 Video Channel.

Usage:

Inastall any of the ewebparts.

The minimal configuration reqquired is to edit the setingss and point the webpart at a video chanel in your tenant.

Coverflow webpart:
![alt tag](./src/webpartimages/CoverFlow.PNG)

React-3d-carousel webpart:
![alt tag](./src/webpartimages/react-3d-carousel.PNG)

react-slick webpart:
![alt tag](./src/webpartimages/react-slick.PNG)

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/react-multilist-grid" />




