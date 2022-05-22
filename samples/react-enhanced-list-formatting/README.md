---
page_type: sample
products:
- office-sp
languages:
- typescript
extensions:
  contentType: samples
  technologies:
  - SharePoint Framework
  platforms:
  - react
  createdDate: 5/1/2017 12:00:00 AM
---

# Enhanced List Formatting

## Summary

This web part allows you to add custom CSS on a page to enhance list formatting.

![picture of the web part in action](./assets/EnhancedListFormatting.gif)

## Compatibility

![SPFx 1.10](https://img.shields.io/badge/SPFx-1.10.0-green.svg) 
![Node.js v10 | v8](https://img.shields.io/badge/Node.js-v10%20%7C%20v8-green.svg) 
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Does not work with SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Incompatible-red.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Partially](https://img.shields.io/badge/Local%20Workbench-Partially-yellow.svg "Functionality may be limited")
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)
![Compatible with Remote Containers](https://img.shields.io/badge/Remote%20Containers-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)

## Prerequisites

To use this web part, you must be familiar with SharePoint list formatting and CSS.

## Solution

Solution|Author(s)
--------|---------
react-enhanced-list-formatting | [Hugo Bernier](https://github.com/hugoabernier) ([Tahoe Ninjas](http://tahoeninjas.blog), [@bernierh](https://twitter.com/bernierh))
react-enhanced-list-formatting | [David Warner II](https://github.com/PopWarner) ([@DavidWarnerII](https://twitter.com/davidwarnerii) / [Warner Digital](http://warner.digital))

## Version history

Version|Date|Comments
-------|----|--------
1.0|March 17, 2020|Initial release

## Minimal Path to Awesome

* Clone this repository
* in the command line run:
  * `npm install`
  * `gulp serve`

>  This sample can also be opened with [VS Code Remote Development](https://code.visualstudio.com/docs/remote/remote-overview). Visit https://aka.ms/spfx-devcontainer for further instructions.

## Features

This web part demonstrates how to use a custom property pane control to allow users to inject custom CSS into the page at runtime.

> **Important**
>
> This web part is not intended to be used to override global CSS styles. It should only be used on custom CSS class names.
>
> At the time that we built this solution, the only codeless way to add custom CSS classes in a SharePoint page is to use the **Format view** option in a list view, then insert the **List** web part on a page.
>
> If you change any global styles, you may introduce unpredictable issues in your environment. Please remove the web part if you experience any issues. 
>
> Injecting custom CSS is *not* supported by Microsoft or the creators of this sample.

<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-enhanced-list-formatting" />

To use this web part, follow these steps:

1. Create a custom list view
2. From your custom list view, select **Format current view** from the view drop-down.
![Format current view](./assets/Viewformatting.png)
3. In the **Format view** pane, add the `class` attribute in an element node, as follows:

```json
    "attributes": {
      "class": "yourcustomclassgoeshere"
    },
```

3. **Preview** and **Save** your custom format.
4. Add the list web part to a page and select the custom view you created
5. Add the **Enhanced List Formatting** web part (this web part) to the same page where you added the **List** web part.
6. After dismissing the disclaimer, use the web part's property pane to add your own CSS styles.
7. Save your page and preview it in **View** mode.

> **TIP**
>
> Try to use the out-of-the-box custom view format schema by using the `style` attribute wherever possible. Your users may want to use your custom view in areas where the web part will not be available -- for example, within Microsoft Teams.
>
> Rely on custom CSS styles to *augment* your design, not replace the custom view format.

### Suitable uses of this web part

Here are some examples of how you should use this web part responsibly:

- Add styles to your custom CSS classes that the custom view format schema does not support (e.g.: RGBA values)
- Add [pseudo-elements](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-elements) styles to your custom CSS classes (e.g.: `::first-letter`, `::after`, `::before`)
- Add [pseudo-classes](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes) styles to your custom CSS classes (e.g.: `:hover`, `:first`, `:nth-child`)
- Add [animations](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) to your custom CSS classes

### Unsuitable uses

At the risk of repeating ourselves, do not use this web part to do the following style changes:

- Changing any CSS classes that begin with `ms-`, as they indicate a Microsoft global style.
- Changing element styles, unless you use your custom CSS class as a selector to ensure that your styles only apply to your list (e.g.: `div.mycustomclass`,  `.mycustomclass > div`)

### Removing the annoying disclaimer

The sample has a disclaimer that is inspired by that annoying disclaimer you see on most in-dashboard GPS systems. If you want to remove it, you can do so by following these steps:

1. Open `EnhancedListFormattingWebPart.manifest.json'
2. Find the following section:

```json
"properties": {
      "description": "Enhanced List Formatting"
    }
```

3. Add the following JSON:

```json
"acceptedDisclaimer": true
```

4. Your `properties` JSON should now look like this:

```json
"properties": {
      "description": "Enhanced List Formatting",
      "acceptedDisclaimer": true
    }
```

5. Test that your changes work by using `gulp build` and `gulp serve` and re-add a new version of the web part to your page
6. Build a production version of the solution using `gulp dist`. See [Building the code](#Building_the_code)

### Building the code

```bash
git clone the repo
cd samples/react-enhanced-list-formatting
npm i
gulp build
```

This package produces the following:

* `lib/*` - intermediate-stage commonjs build artifacts
* `dist/*` - the bundled script, along with other resources
* `deploy/*` - all resources which should be uploaded to a CDN.

### Build options

* `gulp clean` - Cleans the solution
* `gulp test` - Runs unit tests
* `gulp serve` - Runs the solution for testing purposes
* `gulp bundle` - Bundles the solution
* `gulp package-solution` - Packages the solution
* `gulp dev` -- Builds a clean instance of the solution for development purposes
* `gulp dist` -- Builds a clean instance of the solution for distribution purposes

## Video

[![List Formatting Enhanced Web Part](./assets/video-thumbnail.jpg)](https://www.youtube.com/watch?v=B7p7_lVc8kI "List Formatting Enhanced Web Part")

## Help

We do not support samples, but we this community is always willing to help, and we want to improve these samples. We use GitHub to track issues, which makes it easy for  community members to volunteer their time and help resolve issues.

If you're having issues building the solution, please run [spfx doctor](https://pnp.github.io/cli-microsoft365/cmd/spfx/spfx-doctor/) from within the solution folder to diagnose incompatibility issues with your environment.

You can try looking at [issues related to this sample](https://github.com/pnp/sp-dev-fx-webparts/issues?q=label%3A%22sample%3A%20react-enhanced-list-formatting") to see if anybody else is having the same issues.

You can also try looking at [discussions related to this sample](https://github.com/pnp/sp-dev-fx-webparts/discussions?discussions_q=react-enhanced-list-formatting) and see what the community is saying.

If you encounter any issues while using this sample, [create a new issue](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Abug-suspected%2Csample%3A%20react-enhanced-list-formatting&template=bug-report.yml&sample=react-enhanced-list-formatting&authors=@hugoabernier&title=react-enhanced-list-formatting%20-%20).

For questions regarding this sample, [create a new question](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aquestion%2Csample%3A%20react-enhanced-list-formatting&template=question.yml&sample=react-enhanced-list-formatting&authors=@hugoabernier&title=react-enhanced-list-formatting%20-%20).

Finally, if you have an idea for improvement, [make a suggestion](https://github.com/pnp/sp-dev-fx-webparts/issues/new?assignees=&labels=Needs%3A+Triage+%3Amag%3A%2Ctype%3Aenhancement%2Csample%3A%20react-enhanced-list-formatting&template=question.yml&sample=react-enhanced-list-formatting&authors=@hugoabernier&title=react-enhanced-list-formatting%20-%20).

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/react-enhanced-list-formatting" />
