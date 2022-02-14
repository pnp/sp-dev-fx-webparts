# Emoji Ratings

## Summary

This is sample web part which can be used to take emoji based reaction or feedback for particular news/article/posts.
We all know every organizations would be using SharePoint news features for company's internal communications from HR to IT updates and some time annoucements. News created in SharePoint are created as Pages in library. Idea behind this web part is to take employee/user's feedback as emoji reactions on particular news. This web part can also be used on wiki articles or blog posts to take similar reactions. Web part uses concept of 1 to 5 star based rating system(configurable), you can decide low to high based on your preference.

Ideally, we can do some automation using PnP Powershell and PowerAutomate (trigger when item is created ) to add this web part to any every news that is published.

If you wish to directly use the package in your tenant here is [link](https://github.com/siddharth-vaghasia/public-docs/blob/master/react-emoji-reaction-rating.sppkg) to download.

 
![Web part in Action](./assets/EmojiWPinAction.gif)

## Features

* Configurable header text, rating text, and images
* We can choose to show from minimum one rating to max 5 rating images and text
* Option to show total count of particular rating count as badge
* Option to show and capture comments from user when submitting feedback
* Display current user's rating selection with highlighted background
* Allow user to change rating(update rating)
* Stores ratings in SharePoint List
* Option to create list on the fly and choose list to store the ratings
* Option for admin to choose background color

## Technical Notes

* User's rating data would be stored in SP List, below are list of columns and its relevance

1. `Title`: To store user's display name (not required though)
2. `Page Name`: To store page on which rating is given by particular user, this will have absolute url of page
3. `User`: To store user who has given feedback for particular page/news where web part is added
4. `Comment`: To store comment provided by user while submitting reaction.
5. Then there are 5 columns `Rating1`, `Rating2`, `Rating3`, `Rating4`, `Rating5` which will store the rating text configured by admin in web part... Only one of this 5 columns would be populated for single item in list, which is what user has selected as part of giving reaction

* Below is how you can configure emoji's text and its image url
![Web part in Action](./assets/EmojisConfigurations.png)

I have added default emoji's images which can be used and uploaded to SharePoint library in the assets folder of this solution.


## Compatibility

![SPFx 1.11](https://img.shields.io/badge/SPFx-1.11.0-green.svg)
![Node.js v10](https://img.shields.io/badge/Node.js-v10-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg "SharePoint Server 2019 requires SPFx 1.4.1 or lower")
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Teams Incompatible](https://img.shields.io/badge/Teams-Incompatible-lightgrey.svg)
![Local Workbench Incompatible](https://img.shields.io/badge/Local%20Workbench-Incompatible-red.svg "This solution requires access to a SharePoint list")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## Prerequisites

* SharePoint Online tenant
* Permission to deploy package to Tenant or SharePoint Site collection app catalog

## Solution

Solution|Author(s)
--------|---------
react-emoji-ratings | [Siddharth Vaghasia](https://github.com/siddharth-vaghasia) ([@siddh_me](https://twitter.com/siddh_me))

## Version history

Version|Date|Comments
-------|----|--------
1.0|Sep 04, 2021|Initial release

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- in the command-line run:
  - `npm install`
  - `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development


## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-emoji-ratings&template=bug-report.yml&sample=react-emoji-ratings&authors=@siddharth-vaghasia&title=react-emoji-ratings%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-emoji-ratings&template=question.yml&sample=react-emoji-ratings&authors=@siddharth-vaghasia&title=react-emoji-ratings%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-emoji-ratings&template=question.yml&sample=react-emoji-ratings&authors=@siddharth-vaghasia&title=react-emoji-ratings%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-emoji-ratings" />
