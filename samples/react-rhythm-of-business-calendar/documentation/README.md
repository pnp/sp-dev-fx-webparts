# SPFx Solution Accelerator Deep Dive
This section is a deep dive in to various aspects of the SPFx Solution Accelerator and how to use these features for building robust enterprise applications on SharePoint with SPFx.

## [Solution Structure](./solution-structure.md)
The prescribed folder structure helps to organize the application code in to layers with clear dependencies, that is similar to Onion Architecture.

[Read more](./solution-structure.md)

## [Build Tools](./build-tools.md)
We have extended the SPFx gulp tasks to support the concept of environments and to simplify the commands for building and deploying solutions.

[Read more](./build-tools.md)

## [Entities](./entities.md)
Entities are the implementation of a rich domain model for your application, inspired by the Domain-Driven Design approach to software development.

[Read more](./entities.md)

## [Services](./services.md)
The SPFx Solution accelerator includes its own services framework.  The app specifies which services it needs using descriptors (objects that describe the services), the `ServiceManager` handles creating and initializing the specified services for the specific runtime environment (modern, classic, local, or test), and a React provider using the Context API enables components to consume services.  Components indicate the specific services they need and those services are available through props or hooks.

[Read more](./services.md)

## [Schema](./schema.md)
Schema refers to the SharePoint elements that need to be provisioned and configured on the site for the app to function and be able to securely store data, such as lists, views and columns, and even custom security groups. The SPFx Solution Accelerator includes robust patterns and utilities for defining, provisioning, and upgrading the app's schema.

[Read more](./schema.md)

## [Components](./components.md)
The SPFx Solution Accelerator includes a few components we've found useful over the years for building enterprise apps that integrate with the services and domain model aspects of the accelerator, from implementing asynchronous data patterns and view-edit-save-or-discard flows, to building responsive and localized apps.

[Read more](./components.md)

<!--

## [Live Update](./live-update.md)
[Read more](./live-update.md)

## [Fast Load Caching](./fast-load-caching.md)
[Read more](./fast-load-caching.md)

## [Potential enhancements](./future-enhancements.md)
[Read more](./future-enhancements.md)

-->