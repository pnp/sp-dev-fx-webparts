//#region Imports
import * as React from "react";
import styles from "./FactoryMethod.module.scss";
import  { IFactoryMethodProps } from "./IFactoryMethodProps";
import {
  IDetailsListItemState,
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
    if (this.state.hasError) {
      // you can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    } else {
      switch(this.props.listName) {
          case "GenericList":
            // tslint:disable-next-line:max-line-length
            return <this.ListMarqueeSelection items={this.state.DetailsListItemState.items} columns={this.state.columns} />;
          case "News":
            // tslint:disable-next-line:max-line-length
            return <this.ListMarqueeSelection items={this.state.DetailsNewsListItemState.items} columns={this.state.columns}/>;
          case "Announcements":
            // tslint:disable-next-line:max-line-length
            return <this.ListMarqueeSelection items={this.state.DetailsAnnouncementsListItemState.items} columns={this.state.columns}/>;
          case "Directory":
            // tslint:disable-next-line:max-line-length
            return <this.ListMarqueeSelection items={this.state.DetailsDirectoryListItemState.items} columns={this.state.columns}/>;
          default:
            return null;
      }
    }
  }

  public componentDidCatch(error: any, info: any): void {
    // display fallback UI
    this.setState({ hasError: true });
    // you can also log the error to an error reporting service
    console.log(error);
    console.log(info);
  }



  // componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here.
  // if you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  // this method is a good place to set up any subscriptions. If you do that, don’t forget to unsubscribe in componentWillUnmount().
  // calling setState() in this method will trigger an extra rendering, but it is guaranteed to flush during the same tick.
  // this guarantees that even though the render() will be called twice in this case, the user won’t see the intermediate state.
  // use this pattern with caution because it often causes performance issues. It can, however, be necessary for cases like modals and
  // tooltips when you need to measure a DOM node before rendering something that depends on its size or position.
   public componentDidMount(): void {
    this._configureWebPart = this._configureWebPart.bind(this);
    this.readItemsAndSetStatus(this.props.listName);
  }

  //#endregion
  //#region Props changes lifecycle events (after a property changes from parent component)
  // componentWillReceiveProps() is invoked before a mounted component receives new props.
  // if you need to update the state in response to prop
  // changes (for example, to reset it), you may compare this.props and nextProps and perform state transitions
  // using this.setState() in this method.
  // note that React may call this method even if the props have not changed, so make sure to compare the current
  // and next values if you only want to handle changes.
  // this may occur when the parent component causes your component to re-render.
  // react doesn’t call componentWillReceiveProps() with initial props during mounting. It only calls this
  // method if some of component’s props may update
  // calling this.setState() generally doesn’t trigger componentWillReceiveProps()
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
      hasError: false,
      status: this.listNotConfigured(this.props)
        ? "Please configure list in Web Part properties"
        : "Ready",
      columns:[],
      DetailsListItemState:{
        items:[]
      },
      DetailsNewsListItemState:{
        items:[]
      },
      DetailsDirectoryListItemState:{
        items:[]
      },
      DetailsAnnouncementsListItemState:{
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
  private readItemsAndSetStatus(listName): void {
    this.setState({
      status: "Loading all items..."
    });

    const factory: ListItemFactory = new ListItemFactory();
    factory.getItems(this.props.spHttpClient, this.props.siteUrl, listName || this.props.listName)
    .then((items: any[]) => {

      var myItems: any = null;
      switch(this.props.listName) {
          case "GenericList":
              items = items as IListItem[];
              break;
          case "News":
              items = items as INewsListItem[];
              break;
          case "Announcements":
              items = items as IAnnouncementListItem[];
              break;
          case "Directory":
              items = items as IDirectoryListItem[];
              break;
      }

      const keyPart: string = this.props.listName === "GenericList" ? "" : this.props.listName;
        // the explicit specification of the type argument `keyof {}` is bad and
        // it should not be required.
        this.setState<keyof {}>({
          status: `Successfully loaded ${items.length} items`,
          ["Details" + keyPart + "ListItemState"] : {
            items
          },
          columns: buildColumns(items)
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