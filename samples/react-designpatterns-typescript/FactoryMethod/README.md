# Factory method design Pattern

## Summary
In class-based programming, the factory method pattern is a creational pattern that uses factory methods to deal with the problem of creating objects without having to specify the exact class of the object that will be created. This is done by creating objects by calling a factory method—either specified in an interface and implemented by child classes, or implemented in a base class and optionally overridden by derived classes—rather than by calling a constructor.

Another definition which I liked more and fits perfectly my sample  is the following, taken from: https://www.javatpoint.com/factory-method-design-pattern

>A Factory Pattern or Factory Method Pattern says that just define an interface or abstract class for creating an object but let the subclasses decide which class to instantiate. In other words, subclasses are responsible to create the instance of the class.


## Used SharePoint Framework Version 
![drop](https://img.shields.io/badge/version-GA-green.svg)

## Applies to

* [SharePoint Framework](https:/dev.office.com/sharepoint)
* [Office 365 tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment)


## Prerequisites
 
> N/A

## Solution

Solution|Author(s)
--------|---------
designpatterns-typescript\factorymethod | [@levalencia](https://www.twitter.com/levalencia)

## Version history

Version|Date|Comments
-------|----|--------
1.0|May 15, 2018|Initial release

## Disclaimer
**THIS CODE IS PROVIDED *AS IS* WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---


### Factory method pattern

##### Advantage of Factory Design Pattern

>Factory Method Pattern allows the sub-classes to choose the type of objects to create.
It promotes the loose-coupling by eliminating the need to bind application-specific classes into the code. That means the code interacts solely with the resultant interface or abstract class, so that it will work with any classes that implement that interface or that extends that abstract class.

##### When to use Factory Method Design Pattern

1. When a class doesn't know what sub-classes will be required to create
2. When a class wants that its sub-classes specify the objects to be created.
3. When the parent classes choose the creation of objects to its sub-classes.

So lets start this journey explaining how I saw this factory method pattern could be applied.

In a Sharepoint Site we can have multiple lists and all those lists could have different columns or fields, why not create a generic way to build the list item objets depending on the selected list? well in plain english, a webpart where you can select the list, and based on the selected list it will render all the columns, sure you can do this in many ways and probably with lots of switches/if statements, etc, but I wanted a more elegant solution and I believe this sample will do just that.


##### Diagram
![](http://www.luisevalencia.com/content/images/2017/11/DesignPatterns.png)

So instead of classes we have interfaces for the generic list item (IListItem), and then other interfaces that extends the base one to add more fields depending on the list, news, announcements and directory.

On the right side of the diagram we have an IFactory interface that declares the signature of the method getItems and what it should return (any), remember at the end all items will be of type IListItem because they extend that interface but in order to make it work we will have to use an array of any[].

And finally on the FactoryMethod react component we use the ListItem Factory to get the items, from the caller point of view, we dont care what it will return, its the factory method responsibility to actually create the logic inside to know which instance types it should return.

##### Project structure
![](http://www.luisevalencia.com/content/images/2017/11/estructura.png)

###### Models

The models just define the type of objects we want to return from our factory method, better for strong typing our return objects.

```typescript
export  interface IListItem {
    [key: string]: any;
    id: string;
    title: string;
    modified: Date;
    created: Date;
    modifiedby: string;
    createdby: string;
}

import {IListItem} from "./IListItem";

export interface  IAnnouncementListItem extends IListItem {
    announcementBody: string;
    expiryDate: Date;
}

import {IListItem} from "./IListItem";

export interface IDirectoryListItem extends IListItem {
        firstName: string;
        lastName: string;
        mobileNumber: string;
        internalNumber: string;
}


import {IListItem} from "./IListItem";

export interface  INewsListItem extends IListItem {
    newsheader: string;
    newsbody: string;
    expiryDate: Date;
}



```

###### Factory classes

So the Factory interface is quite simple, we just have a method to implement in the extended classes.

Its in this method below where we actually have a switch statement to get a different list with a different URL (Select columns), and then on the return we get different concrete types by mapping the json result to a different instance of the needed type.

```typescript
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { IWebPartContext } from "@microsoft/sp-webpart-base";
import { IListItem} from "./models/IListItem";
import { IFactory } from "./IFactory";
import { INewsListItem } from "./models/INewsListItem";
import { IDirectoryListItem } from "./models/IDirectoryListItem";
import { IAnnouncementListItem } from "./models/IAnnouncementListItem";

export class ListItemFactory implements IFactory {
    // private _listItems: IListItem[];
    public getItems(requester: SPHttpClient, siteUrl: string, listName: string): Promise<any[]> {
        switch(listName) {
            case "GenericList":
                let items: IListItem[];
                // tslint:disable-next-line:max-line-length
                return requester.get(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,Id,Modified,Created,Author/Title,Editor/Title&$expand=Author,Editor`,
                SPHttpClient.configurations.v1,
                {
                    headers: {
                        "Accept": "application/json;odata=nometadata",
                        "odata-version": ""
                    }
                })
                .then((response: SPHttpClientResponse): Promise<{ value: IListItem[] }> => {
                    return response.json();
                })
                .then((json: { value: IListItem[] }) => {
                    console.log(JSON.stringify(json.value));
                    return items=json.value.map((v,i)=>(
                        {
                            // key: v.id,
                            id: v.Id,
                            title: v.Title,
                            created: v.Created,
                            createdby: v.Author.Title,
                            modified: v.Modified,
                            modifiedby: v.Editor.Title
                        }
                    ));
                });
            case "News":
                let newsitems: INewsListItem[];
                // tslint:disable-next-line:max-line-length
                return requester.get(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,Id,Modified,Created,newsheader,newsbody,expiryDate,Author/Title,Editor/Title&$expand=Author,Editor`,
                SPHttpClient.configurations.v1,
                {
                    headers: {
                        "Accept": "application/json;odata=nometadata",
                        "odata-version": ""
                    }
                })
                .then((response: SPHttpClientResponse): Promise<{ value: INewsListItem[] }> => {
                    return response.json();
                })
                .then((json: { value: INewsListItem[] }) => {
                    return newsitems=json.value.map((v,i)=>(
                        { 
                            id: v.Id,
                            title: v.Title,
                            created: v.Created,
                            createdby: v.Author.Title,
                            modified: v.Modified,
                            modifiedby: v.Editor.Title,
                            newsheader: v.newsheader,
                            newsbody: v.newsbody,
                            expiryDate: v.expiryDate
                        }
                    ));
                });
            case "Announcements":
                let announcementitems: IAnnouncementListItem[];
                return requester.get(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,Id,Modified,Created,announcementBody,expiryDate,Author/Title,Editor/Title&$expand=Author,Editor`,
                SPHttpClient.configurations.v1,
                {
                    headers: {
                        "Accept": "application/json;odata=nometadata",
                        "odata-version": ""
                    }
                })
                .then((response: SPHttpClientResponse): Promise<{ value: IAnnouncementListItem[] }> => {
                    return response.json();
                })
                .then((json: { value: IAnnouncementListItem[] }) => {
                    return announcementitems=json.value.map((v,i)=>(
                        { 
                            id: v.Id,
                            title: v.Title,
                            created: v.Created,
                            createdby: v.Author.Title,
                            modified: v.Modified,
                            modifiedby: v.Editor.Title,
                            announcementBody: v.announcementBody,
                            expiryDate: v.expiryDate
                        }
                    ));
                });
            case "Directory":
                let directoryitems: IDirectoryListItem[];
                return requester.get(`${siteUrl}/_api/web/lists/getbytitle('${listName}')/items?$select=Title,Id,Modified,Created,firstName,lastName,mobileNumber,internalNumber,Author/Title,Editor/Title&$expand=Author,Editor`,
                SPHttpClient.configurations.v1,
                {
                    headers: {
                        "Accept": "application/json;odata=nometadata",
                        "odata-version": ""
                    }
                })
                .then((response: SPHttpClientResponse): Promise<{ value: IDirectoryListItem[] }> => {
                    return response.json();
                })
                .then((json: { value: IDirectoryListItem[] }) => {
                    return directoryitems=json.value.map((v,i)=>(
                        {
                            id: v.Id,
                            title: v.Title,
                            created: v.Created,
                            createdby: v.Author.Title,
                            modified: v.Modified,
                            modifiedby: v.Editor.Title,
                            firstName: v.firstName,
                            lastName: v.lastName,
                            mobileNumber: v.mobileNumber,
                            internalNumber: v.internalNumber
                        }
                    ));
                });
            default:
                break;
            }
      }
}

```

###### Props and states

Properties we pass from the main webpart to the component are defined in the props interface, things like SPHttpclient are important here,  state is where we actually store our returned information from the server, because listitems could be of different types, I created a wrapper Interface and depending on the type of list, then the state would be read from a different state property  DetailsListItemState, DetailsNewsListItemState, etc.

We will see later in the series how could achieve this with shorter code, but for this pattern its what I need so far.

```typescript
import { SPHttpClient } from "@microsoft/sp-http";
import IDataProvider  from "./dataproviders/IDataProvider";

export interface IFactoryMethodProps {
  listName: string;
  spHttpClient: SPHttpClient;
  siteUrl: string;
  dataProvider: IDataProvider;
}

import { IListItem } from "./models/IListItem";
import { INewsListItem } from "./models/INewsListItem";
import { IDirectoryListItem } from "./models/IDirectoryListItem";
import { IAnnouncementListItem } from "./models/IAnnouncementListItem";
import {
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";

export interface IFactoryMethodState {
  type: string;
  status: string;
  DetailsListItemState: IDetailsListItemState;
  DetailsNewsListItemState: IDetailsNewsListItemState;
  DetailsDirectoryListItemState : IDetailsDirectoryListItemState;
  DetailsAnnouncementListItemState : IDetailsAnnouncementListItemState;
}

export interface IDetailsListItemState {
  columns: IColumn[];
  items: IListItem[];
}

export interface IDetailsNewsListItemState {
  columns: IColumn[];
  items: INewsListItem[];
}

export interface IDetailsDirectoryListItemState {
  columns: IColumn[];
  items: IDirectoryListItem[];
}

export interface IDetailsAnnouncementListItemState {
  columns: IColumn[];
  items: IAnnouncementListItem[];
}

```

###### The component

The component has a lot of UI logic, but the real Factory method magic is only in the readItemsAndSetStatus method, where we use the Factory class to get the items and then set the corresponding state, this is pretty nice as we avoid lots of code with the setstateLine and the getitems method here.

Some code I think its really self explanatory so I dont explain it, if needed put a comment below with a question to further explain something.

If you are new to React then I really recommend to read this from the official documentation, which explains the component lifecycle, after reading this, it will clarify concepts for you: https://reactjs.org/docs/react-component.html

```Typescript
//#region Imports
//#region Imports
import * as React from "react";
import styles from "./FactoryMethod.module.scss";
import  { IFactoryMethodProps } from "./IFactoryMethodProps";
import {
  IDetailsGenericListItemState,
  IDetailsNewsListItemState,
  IDetailsDirectoryListItemState,
  IDetailsAnnouncementListItemState,
  IFactoryMethodState
} from "./IFactoryMethodState";
import { IListItem } from "./models/IListItem";
import { IAnnouncementListItem } from "./models/IAnnouncementListItem";
import { INewsListItem } from "./models/INewsListItem";
import { IDirectoryListItem } from "./models/IDirectoryListItem";
import { escape } from "@microsoft/sp-lodash-subset";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { ListItemFactory} from "./ListItemFactory";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  buildColumns,
  IColumn
} from "office-ui-fabric-react/lib/DetailsList";
import { MarqueeSelection } from "office-ui-fabric-react/lib/MarqueeSelection";
import { autobind } from "office-ui-fabric-react/lib/Utilities";
import PropTypes from "prop-types";
//#endregion


export default class FactoryMethod extends React.Component<IFactoryMethodProps, IFactoryMethodState> {
  constructor(props: IFactoryMethodProps, state: any) {
    super(props);
    this.setInitialState();
  }

  // lifecycle help here: https://staminaloops.github.io/undefinedisnotafunction/understanding-react/

  //#region Mouting events lifecycle

  // the data returned from render is neither a string nor a DOM node.
  // it's a lightweight description of what the DOM should look like.
  // inspects this.state and this.props and create the markup.
  // when your data changes, the render method is called again.
  // react diff the return value from the previous call to render with
  // the new one, and generate a minimal set of changes to be applied to the DOM.
  public render(): React.ReactElement<IFactoryMethodProps> {
    switch(this.props.listName) {
        case "GenericList":
          // tslint:disable-next-line:max-line-length
          return <this.ListMarqueeSelection items={this.state.DetailsGenericListItemState.items} columns={this.state.columns} />;
        case "News":
          // tslint:disable-next-line:max-line-length
          return <this.ListMarqueeSelection items={this.state.DetailsNewsListItemState.items} columns={this.state.columns}/>;
        case "Announcements":
          // tslint:disable-next-line:max-line-length
          return <this.ListMarqueeSelection items={this.state.DetailsAnnouncementListItemState.items} columns={this.state.columns}/>;
        case "Directory":
          // tslint:disable-next-line:max-line-length
          return <this.ListMarqueeSelection items={this.state.DetailsDirectoryListItemState.items} columns={this.state.columns}/>;
        default:
          return null;
    }
  }

   // invoked once, only on the client (not on the server), immediately AFTER the initial rendering occurs.
   public componentDidMount(): void {
    // you can access any refs to your children
    // (e.g., to access the underlying DOM representation - ReactDOM.findDOMNode).
    // the componentDidMount() method of child components is invoked before that of parent components.
    // if you want to integrate with other JavaScript frameworks,
    // set timers using setTimeout or setInterval,
    // or send AJAX requests, perform those operations in this method.
    this._configureWebPart = this._configureWebPart.bind(this);
    this.readItemsAndSetStatus("GenericList");
  }

  //#endregion

  //#region Props changes lifecycle events (after a property changes from parent component)
  public componentWillReceiveProps(nextProps: IFactoryMethodProps): void {
    if(nextProps.listName !== this.props.listName) {
      this.readItemsAndSetStatus(nextProps.listName);
    }
  }

  //#endregion

  //#region private methods
  private _configureWebPart(): void {
    this.props.configureStartCallback();
  }

  public setInitialState(): void {
    this.state = {
      status: this.listNotConfigured(this.props)
        ? "Please configure list in Web Part properties"
        : "Ready",
      columns:[],
      hasError: false,
      DetailsGenericListItemState:{
        items:[]
      },
      DetailsNewsListItemState:{
        items:[]
      },
      DetailsDirectoryListItemState:{
        items:[]
      },
      DetailsAnnouncementListItemState:{
        items:[]
      },
    };
  }

  // reusable inline component
  private ListMarqueeSelection = (itemState: {columns: IColumn[], items: IListItem[] }) => (
      <div>
          <DetailsList
            items={ itemState.items }
            columns={ itemState.columns }
            setKey="set"
            layoutMode={ DetailsListLayoutMode.fixedColumns }
            selectionPreservedOnEmptyClick={ true }
            compact={ true }>
          </DetailsList>
      </div>
  )

  // read items using factory method pattern and sets state accordingly
  private   readItemsAndSetStatus(listName: string): void {
    this.setState({
      status: "Loading all items..."
    });

    const factory: ListItemFactory = new ListItemFactory();
    factory.getItems(this.props.spHttpClient, this.props.siteUrl, listName)
    .then((items: any[]) => {
      const keyPart: string = listName === "GenericList" ? "Generic" : listName;

      var myItems = null;
      switch(listName) {
          case "GenericList":
              myItems = items as IListItem[];
              break;
          case "News":
              myItems = items as INewsListItem[];
              break;
          case "Announcements":
              myItems = items as IAnnouncementListItem[];
              break;
          case "Directory":
              myItems = items as IDirectoryListItem[];
              break;
      }

        // the explicit specification of the type argument `keyof {}` is bad and
        // it should not be required.
        this.setState<keyof {}>({
          status: `Successfully loaded ${myItems.length} items`,
          ["Details" + keyPart + "ListItemState"] : {
            items
          },
          columns: buildColumns(myItems)
        });
    });
  }

  private listNotConfigured(props: IFactoryMethodProps): boolean {
    return props.listName === undefined ||
      props.listName === null ||
      props.listName.length === 0;
  }

  //#endregion
}
```
###### The webpart

And finally the webpart code is below, with self explanatory comments for the reader to understand the events lifecycle.  


```Typescript
import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  IPropertyPaneField,
  PropertyPaneLabel
} from "@microsoft/sp-webpart-base";

import * as strings from "FactoryMethodWebPartStrings";
import FactoryMethod from "./components/FactoryMethod";
import { IFactoryMethodProps } from "./components/IFactoryMethodProps";
import { IFactoryMethodWebPartProps } from "./IFactoryMethodWebPartProps";
import * as lodash from "@microsoft/sp-lodash-subset";
import List from "./components/models/List";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import IDataProvider from "./components/dataproviders/IDataProvider";
import MockDataProvider from "./test/MockDataProvider";
import SharePointDataProvider from "./components/dataproviders/SharepointDataProvider";

export default class FactoryMethodWebPart extends BaseClientSideWebPart<IFactoryMethodWebPartProps> {
  private _dropdownOptions: IPropertyPaneDropdownOption[];
  private _selectedList: List;
  private _disableDropdown: boolean;
  private _dataProvider: IDataProvider;
  private _factorymethodContainerComponent: FactoryMethod;

  protected onInit(): Promise<void> {
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, "Todo");

    /*
    Create the appropriate data provider depending on where the web part is running.
    The DEBUG flag will ensure the mock data provider is not bundled with the web part when you package the
     solution for distribution, that is, using the --ship flag with the package-solution gulp command.
    */
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      this._dataProvider = new MockDataProvider();
    } else {
      this._dataProvider = new SharePointDataProvider();
      this._dataProvider.webPartContext = this.context;
    }

    this.openPropertyPane = this.openPropertyPane.bind(this);

    /*
    Get the list of tasks lists from the current site and populate the property pane dropdown field with the values.
    */
    this.loadLists()
      .then(() => {
        /*
         If a list is already selected, then we would have stored the list Id in the associated web part property.
         So, check to see if we do have a selected list for the web part. If we do, then we set that as the selected list
         in the property pane dropdown field.
        */
        if (this.properties.spListIndex) {
          this.setSelectedList(this.properties.spListIndex.toString());
          this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        }
      });

    return super.onInit();
  }

  // render method of the webpart, actually calls Component
  public render(): void {
    const element: React.ReactElement<IFactoryMethodProps > = React.createElement(
      FactoryMethod,
      {
        spHttpClient: this.context.spHttpClient,
        siteUrl: this.context.pageContext.web.absoluteUrl,
        listName: this._dataProvider.selectedList === undefined ? "GenericList" : this._dataProvider.selectedList.Title,
        dataProvider: this._dataProvider,
        configureStartCallback: this.openPropertyPane
      }
    );

    // reactDom.render(element, this.domElement);
    this._factorymethodContainerComponent = <FactoryMethod>ReactDom.render(element, this.domElement);

  }

  // loads lists from the site and fill the dropdown.
  private loadLists(): Promise<any> {
    return this._dataProvider.getLists()
      .then((lists: List[]) => {
        // disable dropdown field if there are no results from the server.
        this._disableDropdown = lists.length === 0;
        if (lists.length !== 0) {
          this._dropdownOptions = lists.map((list: List) => {
            return {
              key: list.Id,
              text: list.Title
            };
          });
        }
      });
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    /*
    Check the property path to see which property pane feld changed. If the property path matches the dropdown, then we set that list
    as the selected list for the web part.
    */
    if (propertyPath === "spListIndex") {
      this.setSelectedList(newValue);
    }

    /*
    Finally, tell property pane to re-render the web part.
    This is valid for reactive property pane.
    */
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
  }

  // sets the selected list based on the selection from the dropdownlist
  private setSelectedList(value: string): void {
    const selectedIndex: number = lodash.findIndex(this._dropdownOptions,
      (item: IPropertyPaneDropdownOption) => item.key === value
    );

    const selectedDropDownOption: IPropertyPaneDropdownOption = this._dropdownOptions[selectedIndex];

    if (selectedDropDownOption) {
      this._selectedList = {
        Title: selectedDropDownOption.text,
        Id: selectedDropDownOption.key.toString()
      };

      this._dataProvider.selectedList = this._selectedList;
    }
  }


  // we add fields dynamically to the property pane, in this case its only the list field which we will render
  private getGroupFields(): IPropertyPaneField<any>[] {
    const fields: IPropertyPaneField<any>[] = [];

    // we add the options from the dropdownoptions variable that was populated during init to the dropdown here.
    fields.push(PropertyPaneDropdown("spListIndex", {
      label: "Select a list",
      disabled: this._disableDropdown,
      options: this._dropdownOptions
    }));

    /*
    When we do not have any lists returned from the server, we disable the dropdown. If that is the case,
    we also add a label field displaying the appropriate message.
    */
    if (this._disableDropdown) {
      fields.push(PropertyPaneLabel(null, {
        text: "Could not find tasks lists in your site. Create one or more tasks list and then try using the web part."
      }));
    }

    return fields;
  }

  private openPropertyPane(): void {
    this.context.propertyPane.open();
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              /*
              Instead of creating the fields here, we call a method that will return the set of property fields to render.
              */
              groupFields: this.getGroupFields()
            }
          ]
        }
      ]
    };
  }
}


```


<img src="https://telemetry.sharepointpnp.com/sp-dev-fx-webparts/samples/designpatterns-typescript/factorymethod" />