---
title: Getting Started
template: article.html
---

These samples were created by the PnP community. They demonstrate different usage patterns for the SharePoint Framework client-side web parts.

The easiest way to get started with using these samples is to watch our video:
[![Preview of getting started on consuming SharePoint development community sample solutions](http://img.youtube.com/vi/EH5voQlRd-4/0.jpg)](http://www.youtube.com/watch?v=EH5voQlRd-4 "Getting Started Using SPFx Samples")

All samples are stored in a [GitHub repository](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples). Each sample is located in its own folder with a README.md file that provides details about what it demonstrates and any extra information to help you get the most out of it.

## Using the samples

To build and start using these projects, you'll need to clone and build the projects.

Clone the [SharePoint/sp-dev-fx-webparts](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/samples) repository by executing the following command in your console:

```shell
git clone https://github.com/SharePoint/sp-dev-fx-webparts.git
```

Navigate to the cloned repository folder which should be the same as the repository name:

```shell
cd sp-dev-fx-webparts
```

To access the samples use the following command, where you replace `sample-folder-name` with the name of the sample you want to access.

```shell
cd samples
cd sample-folder-name
```

and for the tutorials, use the following command:

```shell
cd tutorials
```

Now run the following command to install the npm packages:

```shell
npm install
```

This will install the required npm packages and dependencies to build and run the client-side project.

Once the npm packages are installed, run the following command to preview your web parts in SharePoint Workbench:

```shell
gulp serve
```


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/gettingstarted" />