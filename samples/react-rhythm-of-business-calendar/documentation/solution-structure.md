# Solution Structure
The prescribed folder structure helps to organize the application code in to layers with clear dependencies, that is similar to Onion Architecture.

## \src Folders

* [apps](../src/apps/) - there is typically only one 'App' component defined for the app, which specifies the services the app uses, other initialization, and manages the setup experience, upgrade experience, and rendering of the root component
* [common](../src/common/) - this is the "framework" part of the SPFx Solution Accelerator.  It contains common code, components, services, and utilities that can be reused across many different applications.  Code specific to the app you are building should go in one of the other root folders.
    * [common/components](../src/common/components/) - this folder contains reusable components. See the [Components](./components.md) page for more details.
    * [common/services](../src/common/services/) - this folder contains our services framework implementation plus various services ready to use in your apps.  See the [Services](./services.md) page for more details.
    * [common/sharepoint](../src/common/sharepoint/) - this folder contains specialized code for interacting with SharePoint: provisioning fields, lists, and views, and primitives for querying and updating data.  See the [Schema](./schema.md) page for details on provisioning.
* [components](../src/components/) - this is the folder for all React components specific to the app
* [model](../src/model/) - this folder is used for defining the entities (the domain model) and any other business logic for the app
* [schema](../src/schema/) - if the app uses fields, lists, views, and/or security groups (essentially, anything that needs provisioning in SharePoint), this is the folder for defining these items
* [services](../src/services/) - this folder is for defining app-specific services
* [webparts](../src/webparts/) - this is the standard webparts folder in all SPFx solutions.  We typically keep the code under this folder very brief and prefer to divide all the components and business logic among the other project folders described above.  The web part does not contain any business logic or initialization code, rather it simply renders the App component.

There is an implicit direction for dependencies when using this folder structure:
* webparts - depends on apps
* apps - depends on common, services, and components
* components - depends on common, services, and model
* services - depends on common, model, and schema
* schema - depends on common and model
* common - no dependencies since this should be reserved for code that can be reused across projects
* model - no dependencies
