# Singleton Design Pattern

## Summary
A singleton is a pattern that guarantees there is a single instance of an object in the system. A singleton can maintain a state which is shared across the entire system. Singletons abstract their internal workings from the rest of the system

## Compatibility

![SPFx 1.4.1](https://img.shields.io/badge/SPFx-1.4.1-green.svg)
![Node.js v6 | v8](https://img.shields.io/badge/Node.js-LTS%206.x%20%7C%20v8-green.svg)
![Compatible with SharePoint Online](https://img.shields.io/badge/SharePoint%20Online-Compatible-green.svg)
![Compatible SharePoint 2019](https://img.shields.io/badge/SharePoint%20Server%202019-Compatible-green.svg)
![Does not work with SharePoint 2016 (Feature Pack 2)](https://img.shields.io/badge/SharePoint%20Server%202016%20(Feature%20Pack%202)-Incompatible-red.svg "SharePoint Server 2016 Feature Pack 2 requires SPFx 1.1")
![Local Workbench Compatible](https://img.shields.io/badge/Local%20Workbench-Compatible-green.svg)
![Hosted Workbench Compatible](https://img.shields.io/badge/Hosted%20Workbench-Compatible-green.svg)


## Applies to

* [SharePoint Framework](https://docs.microsoft.com/sharepoint/dev/spfx/sharepoint-framework-overview)
* [Office 365 tenant](https://docs.microsoft.com/sharepoint/dev/spfx/set-up-your-development-environment)


## Prerequisites
 
> N/A

## Solution

Solution|Author(s)
--------|---------
designpatterns-typescript\singleton | [@levalencia](https://www.twitter.com/levalencia)

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 15, 2018|Initial release


### Singleton pattern

Singletons are common in business applications. They help model real-life business processes that involve shared resources.

Even when I started my career in 2002 and started developing with VB.NET and then C#, at that time design patterns were popular and probably the most widely used was the Singleton Pattern, why, is this so important, because if not used correctly it can lead to Memory leaks, bad use of memory because instantiating objects too many times that are not needed.  

So Software Designers, Architects and Developers should have  at the very least this design pattern very well wood understood in their own arsenal and use it on a daily basis.

Some people might say, well but its only 4kb of memory, and 100 users, well I have seen by experience how even small applications which are poorly developed get this memory leaks and by a simple refactoring with a few Singletons here and there, the problem goes away.

### Scenario:

Any application at some point will need to read configuration variables from somewhere, imagine a SPFx web part which is a complex SPA with many screens and forms where you need to rely on a configuration SharePoint List, where you store information like: Number of Items per page, Max Number of Connections, Timeouts, Max Number of devices allowd, and things like that.

In this scenario it makes sense to build a class that will allow you easy retrieval of those values without you having to write code to retrieve the values in all screens or forms on the SPA.

It is a poor practice to repeat configuration access code everywhere in the system. If the physical location of configuration ever changes one would have to update many different files and lines of code. To solve this, developers implement a singleton for managing configuration.

For this sample only one file need to be added and the .tsx file modified to use the Singleton Pattern.

### ConfigurationManager.ts

```typescript
class ConfigurationManager {
    private static instance: ConfigurationManager;
    public constructor() {
        // do something construct...
    }
    static getInstance(): ConfigurationManager {
        if (!ConfigurationManager.instance) {
            ConfigurationManager.instance = new ConfigurationManager();
            // ... any one time initialization goes here ...
        }
        return ConfigurationManager.instance;
    }

    // excercise for the reader to get data from an external data source.
    numberOfItemsPerPage(): number {
        return 10;
    }

    maxNumberOfConnections(): number {
        return 10;
    }

    restTimeout(): number {
        return 1000;
    }
}

export default ConfigurationManager;
```

And finally the component TSX where we use the singleton pattern from the Constructor.

```typescript
import * as React from "react";
import styles from "./Singleton.module.scss";
import { ISingletonProps } from "./ISingletonProps";
import { escape } from "@microsoft/sp-lodash-subset";
import ConfigurationManager from "./ConfigurationManager";

export default class Singleton extends React.Component<ISingletonProps, {}> {
  private numberOfItemsPerPage: number;
  private maxNumberOfConnections: number;
  private restTimeout: number;

  constructor(props: ISingletonProps, state: any) {
    super(props);
    let config:ConfigurationManager  =  ConfigurationManager.getInstance();
    this.numberOfItemsPerPage = config.numberOfItemsPerPage();
    this.maxNumberOfConnections = config.numberOfItemsPerPage();
    this.restTimeout = config.restTimeout();
  }



  public render(): React.ReactElement<ISingletonProps> {
    return (
      <div className={ styles.singleton }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.subTitle }>Customize SharePoint experiences using Web Parts.</p>
              <p className={ styles.description }>{escape(this.props.description)}</p>
              <a href="https://aka.ms/spfx" className={ styles.button }>
                <span className={ styles.label }>Learn more</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
```

As you can see this clearly shows how to use the singleton pattern in a real life situation and I hope its clear to the reader and start using in your own projects

## Disclaimer

**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**


<img src="https://pnptelemetry.azurewebsites.net/sp-dev-fx-webparts/samples/designpatterns-typescript/singleton" />
