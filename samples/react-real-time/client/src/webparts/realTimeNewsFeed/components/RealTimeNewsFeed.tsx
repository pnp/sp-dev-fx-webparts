import * as React from 'react';
import styles from '../RealTimeNewsFeed.module.scss';
import { IRealTimeNewsFeedWebPartProps } from '../IRealTimeNewsFeedWebPartProps';
import { INewsItem } from '../RealTimeNewsFeedWebPart';
import {
  Spinner,
  Link,
  MessageBar,
  MessageBarType,
  FocusZone,
  FocusZoneDirection,
  Image,
  ImageFit,
  List,
  Callout,
  DirectionalHint, } from 'office-ui-fabric-react';
import MockHttpClient from '../MockHttpClient';
import { EnvironmentType } from '@microsoft/sp-client-base';
import { Web } from 'sp-pnp-js';
import * as io from 'socket.io-client';
import * as _ from 'lodash';
import * as pluralize from 'pluralize';

const update = require("react-addons-update");

export interface IRealTimeNewsFeedProps extends IRealTimeNewsFeedWebPartProps {
  environmentType: EnvironmentType;
  siteUrl: string;
  listTitle: string;
}

export interface IRealTimeNewsFeedState {
  items?: INewsItem[];
  addedItems?: string[];
  error?: boolean;
  loading?: boolean;
}

export default class RealTimeNewsFeed extends React.Component<IRealTimeNewsFeedProps, IRealTimeNewsFeedState> {

  private _listElement: HTMLElement;

  constructor(props: IRealTimeNewsFeedProps) {
    super(props);

    // Equals to getInitialState
    this.state = {
      items: [],
      addedItems: [],
      error: false,
      loading: true
    };

    // Define event handlers
    this._onItemAdded = this._onItemAdded.bind(this);
    this._getAvailableItemsAsync = this._getAvailableItemsAsync.bind(this);
  }

  public componentDidMount(): void {

    // Connect to the server
    const socket = io("https://WebAppac61f1b1-ecd7-4bc0-ad7d-619b0df1f757.azurewebsites.net");

    // Add the socket io listeners
    socket.on('item:added', (data) => {
      this._onItemAdded(data.customProperties.id);
    });

    // Fetch initial data
    this._getItemsAsync();
  }

  public componentWillReceiveProps(): void {

    // Invoked when a property is updated is the Web Part property panel
    this._getItemsAsync();
  }

  public render(): JSX.Element {

      let newItemNotification: JSX.Element = null;

      if (this.state.addedItems.length > 0 ) {

         newItemNotification =
          <Callout
            className={ styles['ms-notificationCallout-callout'] + ' ms-u-fadeIn500' }
            targetElement={ this._listElement }
            isBeakVisible = { false }
            directionalHint={ DirectionalHint.bottomCenter }>
            <div className={ styles['ms-notificationCallout-inner'] }>
              <div className={ styles['ms-notificationCallout-content'] }>
                <p className={ styles['ms-notificationCallout-subText'] }>
                  <Link onClick={ this._getAvailableItemsAsync }>
                    { this.state.addedItems.length } new { pluralize("item", this.state.addedItems.length)} available </Link>
                </p>
              </div>
            </div>
          </Callout>;
      }

      const loading: JSX.Element = this.state.loading ? <Spinner label='Loading items...' /> : <div/>;

      const newsList: JSX.Element =

          <FocusZone direction={ FocusZoneDirection.vertical }>
            <div ref={ (listElementAnchor) => this._listElement = listElementAnchor } ></div>
            <List
                items={ this.state.items }
                renderCount={ 10 }
                onRenderCell={ (item, index) => (
                  <div className={ styles['ms-newsFeed-itemCell'] + ' ms-u-fadeIn500' } data-is-focusable={ true }>
                    <Image
                      className='ms-newsFeed-itemImage'
                      src= { item.PreviewImageUrl ? item.PreviewImageUrl.Url : 'http://placehold.it/50x50' }
                      width={ 50 }
                      height={ 50 }
                      imageFit={ ImageFit.cover }
                    />
                    <div className={ styles['ms-newsFeed-itemContent'] }>
                      <div className={ styles['ms-newsFeed-itemName ms-font-xl']} >{ item.Title }</div>
                      <div className={ styles['ms-newsFeed-itemIndex'] }>{ `Item ${ index }` }</div>
                      <div className={ styles['ms-newsFeed-itemDesc ms-font-s']}>{ item.Description }</div>
                    </div>
                  </div>
                ) }
              />
          </FocusZone>;

      const error: JSX.Element = this.state.error ?
              <MessageBar messageBarType={ MessageBarType.error }>{ this.state.error }</MessageBar> : <div/>;

      return (
        <div>
          {error}
          {newItemNotification}
          <div className={styles.center}>
            {loading}
          </div>
          {newsList}
        </div>
      );
  }

  /* Event Handlers */
  private _onItemAdded(id: string): void {

    // Check if the id is not present in current displayed items
    if(!_(this.state.items).find((e) => {return e.Id === parseInt(id);})) {

      let updatedItems = this.state.addedItems;
      updatedItems.push(id);

      this.setState({
        addedItems: updatedItems
      });
    }
  }

  /* Async functions */
  private _getItemsAsync(): void {

    // Local environment
    if (this.props.environmentType === EnvironmentType.Local) {
        this._getMockedNewsItems().then((response) => {
            this.setState({
              items: response,
              error: null,
              loading: false
            });
        });
    } else {

      // SharePoint environment (Classic or Modern Page experience)
       this._getNewsItems()
        .then((response) => {
            this.setState({
              items: response,
              error: null,
              loading: false
            });
        }).catch((errorMsg) => {
          this.setState({
              items: [],
              error: errorMsg,
              loading: false
          });
        });
    }
  }

  private _getAvailableItemsAsync(): void {

    // Local environment
    if (this.props.environmentType !== EnvironmentType.Local) {

      this.setState({
        addedItems: [],
        loading: true
      });

      const { addedItems } = this.state;
      let filters: string[] = [];

      // Build the request to get all new items by their ids.
      _.map(addedItems, (itemId) => {

        filters.push("(Id eq " + itemId + ")");
      });

      const query = _.join(filters, " or ");

      this._getNewsItems(query).then((items) => {

        // Add items to the state
        let updatedItems = update(this.state.items, {$unshift: items.reverse()});

        this.setState({
          items: updatedItems,
          loading: false
        });

      }).catch((errorMsg) => {

        this.setState({
            error: errorMsg,
            loading: false
        });
      });
    }
  }

  private _getMockedNewsItems(): Promise<INewsItem[]> {
    return MockHttpClient.get(this.props.siteUrl)
        .then((data: INewsItem[]) => {
             return data;
         }) as Promise<INewsItem[]>;
  }

  private _getNewsItems(filterQuery: string = ""): Promise<INewsItem[]> {

    const p = new Promise<INewsItem[]>((resolve, reject) => {

      let web = new Web(this.props.siteUrl);

      web.lists.getByTitle(this.props.listTitle).items.filter(filterQuery).orderBy("Created", false).get().then((items)=> {

        resolve(items as INewsItem[]);

      }).catch((errorMsg) => {

        reject(errorMsg);

      });

    });

    return p;
  }
}
