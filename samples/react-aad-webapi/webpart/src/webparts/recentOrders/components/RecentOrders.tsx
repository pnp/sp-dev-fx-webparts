import * as React from 'react';
import {
  List,
  Spinner,
  Button, ButtonType
} from 'office-ui-fabric-react';

import styles from '../RecentOrders.module.scss';
import { IRecentOrdersWebPartProps } from '../IRecentOrdersWebPartProps';
import { HttpClient } from '@microsoft/sp-client-base';
const AuthenticationContext = require('adal-angular');
import adalConfig from '../AdalConfig';
import { IAdalConfig } from '../../IAdalConfig';
import '../../WebPartAuthenticationContext';
import { ListItem } from './ListItem';
import { IOrder } from './IOrder';

export interface IRecentOrdersProps extends IRecentOrdersWebPartProps {
  httpClient: HttpClient;
  webPartId: string;
  title: string;
}

export interface IRecentOrdersState {
  loading: boolean;
  error: string;
  orders: IOrder[];
  signedIn: boolean;
}

interface IStoreOrder {
  Id: number;
  OrderDate: string;
  Region: string;
  Rep: string;
  Item: string;
  Units: number;
  UnitCost: number;
  Total: number;
}

export default class RecentOrders extends React.Component<IRecentOrdersProps, IRecentOrdersState> {
  private authCtx: adal.AuthenticationContext;

  constructor(props: IRecentOrdersProps, state: IRecentOrdersState) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      orders: [],
      signedIn: false
    };

    const config: IAdalConfig = adalConfig;
    config.popUp = true;
    config.webPartId = this.props.webPartId;
    config.callback = (error: any, token: string): void => {
      this.setState((previousState: IRecentOrdersState, currentProps: IRecentOrdersProps): IRecentOrdersState => {
        previousState.error = error;
        previousState.signedIn = !(!this.authCtx.getCachedUser());
        return previousState;
      });
    };

    this.authCtx = new AuthenticationContext(config);
    AuthenticationContext.prototype._singletonInstance = undefined;
  }

  public componentDidMount(): void {
    this.authCtx.handleWindowCallback();

    if (window !== window.top) {
      return;
    }

    this.setState((previousState: IRecentOrdersState, props: IRecentOrdersProps): IRecentOrdersState => {
      previousState.error = this.authCtx.getLoginError();
      previousState.signedIn = !(!this.authCtx.getCachedUser());
      return previousState;
    });
  }

  public componentDidUpdate(prevProps: IRecentOrdersProps, prevState: IRecentOrdersState, prevContext: any): void {
    if (prevState.signedIn !== this.state.signedIn) {
      this.loadOrders();
    }
  }

  public render(): JSX.Element {
    const login: JSX.Element = this.state.signedIn ? <div /> : <Button onClick={() => { this.signIn(); } } buttonType={ButtonType.compound} description="Sign in to see recent orders">Sign in</Button>;
    const loading: JSX.Element = this.state.loading ? <div style={{ margin: '0 auto' }}><Spinner label={'Loading...'} /></div> : <div/>;
    const error: JSX.Element = this.state.error ? <div><strong>Error: </strong> {this.state.error}</div> : <div/>;
    let orders: JSX.Element = <List items={this.state.orders}
      onRenderCell={ (item: IOrder, index: number): JSX.Element => (
        <ListItem item={
          {
            primaryText: item.Item,
            secondaryText: `$ ${item.Total.toString()}`,
            tertiaryText: item.Rep,
            metaText: item.OrderDate.toDateString()
          }
        } />
      ) } />;

    if (this.state.orders.length === 0 &&
      this.state.signedIn &&
      !this.state.loading &&
      !this.state.error) {
      orders = <div style={{ textAlign: 'center' }}>No orders found</div>;
    }

    return (
      <div className={styles.recentOrders}>
        <div className={'ms-font-xl ' + styles.webPartTitle}>{this.props.title}</div>
        {login}
        {loading}
        {error}
        {orders}
      </div>
    );
  }

  public signIn(): void {
    this.authCtx.login();
  }

  private loadOrders(): void {
    this.setState((previousState: IRecentOrdersState, props: IRecentOrdersProps): IRecentOrdersState => {
      previousState.loading = true;
      return previousState;
    });

    this.getOrdersAccessToken()
      .then((accessToken: string): Promise<IOrder[]> => {
        return RecentOrders.getOrders(accessToken, this.props.httpClient);
      })
      .then((orders: IOrder[]): void => {
        this.setState((prevState: IRecentOrdersState, props: IRecentOrdersProps): IRecentOrdersState => {
          prevState.loading = false;
          prevState.orders = orders;
          return prevState;
        });
      }, (error: any): void => {
        this.setState((prevState: IRecentOrdersState, props: IRecentOrdersProps): IRecentOrdersState => {
          prevState.loading = false;
          prevState.error = error;
          return prevState;
        });
      });
  }

  private getOrdersAccessToken(): Promise<string> {
    return new Promise<string>((resolve: (accessToken: string) => void, reject: (error: any) => void): void => {
      const ordersResource: string = '00000000-0000-0000-0000-000000000000';
      const accessToken: string = this.authCtx.getCachedToken(ordersResource);
      if (accessToken) {
        resolve(accessToken);
        return;
      }

      if (this.authCtx.loginInProgress()) {
        reject('Login already in progress');
        return;
      }

      this.authCtx.acquireToken(ordersResource, (error: string, token: string) => {
        if (error) {
          reject(error);
          return;
        }

        if (token) {
          resolve(token);
        }
        else {
          reject('Couldn\'t retrieve access token');
        }
      });
    });
  }

  private static getOrders(accessToken: string, httpClient: HttpClient): Promise<IOrder[]> {
    return new Promise<IOrder[]>((resolve: (orders: IOrder[]) => void, reject: (error: any) => void): void => {
      httpClient.get(`https://your-api-app.azurewebsites.net/api/orders`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + accessToken
        }
      })
        .then((response: Response): Promise<IStoreOrder[]> => {
          return response.json();
        })
        .then((storeOrders: IStoreOrder[]): void => {
          const orders: IOrder[] = [];

          for (let i: number = 0; i < storeOrders.length; i++) {
            orders.push(RecentOrders.getOrder(storeOrders[i]));
          }

          resolve(orders);
        }, (error: any): void => {
          reject(error);
        });
    });
  }

  private static getOrder(order: IStoreOrder): IOrder {
    return {
      Id: order.Id,
      OrderDate: new Date(order.OrderDate),
      Region: order.Region,
      Rep: order.Rep,
      Item: order.Item,
      Units: order.Units,
      UnitCost: order.UnitCost,
      Total: order.Total
    };
  }
}
