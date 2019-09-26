# Tutorials

Tutorials around the SharePoint Framework client-side web parts to demonstrate different capabilities and possibilities on the framework. Each tutorial has it's own dedicated readme file to explain setup instructions and demonstrated capability.

Since tutorials are build one-by-one to demonstrate the different capabilities, they are split with multiple folders demonstrating different stages of the tutorial progress.

- [Getting started with client-side web parts](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/tutorials/tutorial-getting-started)
- [Tutorial: Migrate jQuery and DataTables solution built using Script Editor Web Part to SharePoint Framework](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/tutorials/tutorial-migrate-datatables)
- [Tutorial: Migrate jQuery and FullCalendar solution built using Script Editor Web Part to SharePoint Framework](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/tutorials/tutorial-migrate-fullcalendar)
- [Consuming APIs secured with Azure Active Directory within SharePoint Framework](https://github.com/SharePoint/sp-dev-fx-webparts/tree/master/tutorials/api-scopes)


## Build and run the tutorials

To build and run this client-side project, you will need to clone and build the tutorials project.

Clone this repo by executing the following command in your console:

```
git clone https://github.com/SharePoint/sp-dev-fx-webparts.git
```

Navigate to the cloned repo folder which should be the same as the repo name:

```
cd sp-dev-fx-webparts
```

Navigate to the `tutorials` folder:

```
cd tutorials
```

Navigate to the `specific web part` folder:

```
cd 'subfolder'
```


Now run the following command to install the npm packages:

```
npm install
```

This will install the required npm packages and depedencies to build and run the client-side project.

Once the npm packages are installed, run the command to preview your web parts in SharePoint Workbench:

```
gulp serve
```

<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/docs/tutorials" />