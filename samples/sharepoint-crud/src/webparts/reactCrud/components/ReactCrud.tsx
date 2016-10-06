import * as React from 'react';
import { css, Button } from 'office-ui-fabric-react';
import { HttpClient } from '@microsoft/sp-client-base';

import styles from '../ReactCrud.module.scss';
import { IReactCrudWebPartProps } from '../IReactCrudWebPartProps';

export interface IReactCrudProps extends IReactCrudWebPartProps {
  httpClient: HttpClient;
  siteUrl: string;
}

export interface IReactCrudState {
  status: string;
  items: IListItem[];
}

export interface IListItem {
  Title?: string;
  Id: number;
}

export default class ReactCrud extends React.Component<IReactCrudProps, IReactCrudState> {
  private listItemEntityTypeName: string = undefined;

  constructor(props: IReactCrudProps, state: IReactCrudState) {
    super(props);

    this.state = {
      status: this.listNotConfigured(this.props) ? 'Please configure list in Web Part properties' : 'Ready',
      items: []
    };
  }

  public componentWillReceiveProps(nextProps: IReactCrudProps): void {
    this.listItemEntityTypeName = undefined;
    this.setState({
      status: this.listNotConfigured(nextProps) ? 'Please configure list in Web Part properties' : 'Ready',
      items: []
    });
  }

  public render(): JSX.Element {
    const items: JSX.Element[] = this.state.items.map((item: IListItem, i: number): JSX.Element => {
      return (
        <li>{item.Title} ({item.Id}) </li>
      );
    });

    return (
      <div className={styles.reactCrud}>
        <div className={styles.container}>
          <div className={css('ms-Grid-row ms-bgColor-themeDark ms-fontColor-white', styles.row) }>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              <span className='ms-font-xl ms-fontColor-white'>
                Sample SharePoint CRUD operations in React
              </span>
            </div>
          </div>
          <div className={css('ms-Grid-row ms-bgColor-themeDark ms-fontColor-white', styles.row) }>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              <Button disabled={this.listNotConfigured(this.props) } onClick={() => this.createItem() }>Create item</Button>
              <Button disabled={this.listNotConfigured(this.props) } onClick={() => this.readItem() }>Read item</Button>
            </div>
          </div>
          <div className={css('ms-Grid-row ms-bgColor-themeDark ms-fontColor-white', styles.row) }>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              <Button disabled={this.listNotConfigured(this.props) } onClick={() => this.readItems() }>Read all items</Button>
            </div>
          </div>
          <div className={css('ms-Grid-row ms-bgColor-themeDark ms-fontColor-white', styles.row) }>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              <Button disabled={this.listNotConfigured(this.props) } onClick={() => this.updateItem() }>Update item</Button>
              <Button disabled={this.listNotConfigured(this.props) } onClick={() => this.deleteItem() }>Delete item</Button>
            </div>
          </div>
          <div className={css('ms-Grid-row ms-bgColor-themeDark ms-fontColor-white', styles.row) }>
            <div className='ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1'>
              {this.state.status}
              <ul>
                {items}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private createItem(): void {
    this.setState({
      status: 'Creating item...',
      items: []
    });

    this.getListItemEntityTypeName()
      .then((listItemEntityTypeName: string): Promise<Response> => {
        const body: string = JSON.stringify({
          '__metadata': {
            'type': listItemEntityTypeName
          },
          'Title': `Item ${new Date()}`
        });
        return this.props.httpClient.post(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items`, {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'odata-version': ''
          },
          body: body
        });
      })
      .then((response: Response): Promise<IListItem> => {
        return response.json();
      })
      .then((item: IListItem): void => {
        this.setState({
          status: `Item '${item.Title}' (ID: ${item.Id}) successfully created`,
          items: []
        });
      }, (error: any): void => {
        this.setState({
          status: 'Error while creating the item: ' + error,
          items: []
        });
      });
  }

  private readItem(): void {
    this.setState({
      status: 'Loading latest items...',
      items: []
    });
    this.getLatestItemId()
      .then((itemId: number): Promise<Response> => {
        if (itemId === -1) {
          throw new Error('No items found in the list');
        }

        this.setState({
          status: `Loading information about item ID: ${itemId}...`,
          items: []
        });
        return this.props.httpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items(${itemId})?$select=Title,Id`, {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        });
      })
      .then((response: Response): Promise<IListItem> => {
        return response.json();
      })
      .then((item: IListItem): void => {
        this.setState({
          status: `Item ID: ${item.Id}, Title: ${item.Title}`,
          items: []
        });
      }, (error: any): void => {
        this.setState({
          status: 'Loading latest item failed with error: ' + error,
          items: []
        });
      });
  }

  private readItems(): void {
    this.setState({
      status: 'Loading all items...',
      items: []
    });
    this.props.httpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items?$select=Title,Id`, {
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'odata-version': ''
      }
    })
      .then((response: Response): Promise<{ value: IListItem[] }> => {
        return response.json();
      })
      .then((response: { value: IListItem[] }): void => {
        this.setState({
          status: `Successfully loaded ${response.value.length} items`,
          items: response.value
        });
      }, (error: any): void => {
        this.setState({
          status: 'Loading all items failed with error: ' + error,
          items: []
        });
      });
  }

  private getLatestItemId(): Promise<number> {
    return new Promise<number>((resolve: (itemId: number) => void, reject: (error: any) => void): void => {
      this.props.httpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items?$orderby=Id desc&$top=1&$select=id`, {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
        .then((response: Response): Promise<{ value: { Id: number }[] }> => {
          return response.json();
        }, (error: any): void => {
          reject(error);
        })
        .then((response: { value: { Id: number }[] }): void => {
          if (response.value.length === 0) {
            resolve(-1);
          }
          else {
            resolve(response.value[0].Id);
          }
        });
    });
  }

  private updateItem(): void {
    this.setState({
      status: 'Loading latest items...',
      items: []
    });
    let latestItemId: number = undefined;
    let etag: string = undefined;
    let listItemEntityTypeName: string = undefined;
    this.getListItemEntityTypeName()
      .then((listItemType: string): Promise<number> => {
        listItemEntityTypeName = listItemType;
        return this.getLatestItemId();
      })
      .then((itemId: number): Promise<Response> => {
        if (itemId === -1) {
          throw new Error('No items found in the list');
        }

        latestItemId = itemId;
        this.setState({
          status: `Loading information about item ID: ${latestItemId}...`,
          items: []
        });
        return this.props.httpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items(${latestItemId})?$select=Id`, {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        });
      })
      .then((response: Response): Promise<IListItem> => {
        etag = response.headers.get('ETag');
        return response.json();
      })
      .then((item: IListItem): Promise<Response> => {
        this.setState({
          status: `Updating item with ID: ${latestItemId}...`,
          items: []
        });
        const body: string = JSON.stringify({
          '__metadata': {
            'type': listItemEntityTypeName
          },
          'Title': `Item ${new Date()}`
        });
        return this.props.httpClient.post(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items(${item.Id})`, {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'odata-version': '',
            'IF-MATCH': etag,
            'X-HTTP-Method': 'MERGE'
          },
          body: body
        });
      })
      .then((response: Response): void => {
        this.setState({
          status: `Item with ID: ${latestItemId} successfully updated`,
          items: []
        });
      }, (error: any): void => {
        this.setState({
          status: `Error updating item: ${error}`,
          items: []
        });
      });
  }

  private deleteItem(): void {
    if (!window.confirm('Are you sure you want to delete the latest item?')) {
      return;
    }

    this.setState({
      status: 'Loading latest items...',
      items: []
    });
    let latestItemId: number = undefined;
    let etag: string = undefined;
    this.getLatestItemId()
      .then((itemId: number): Promise<Response> => {
        if (itemId === -1) {
          throw new Error('No items found in the list');
        }

        latestItemId = itemId;
        this.setState({
          status: `Loading information about item ID: ${latestItemId}...`,
          items: []
        });
        return this.props.httpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items(${latestItemId})?$select=Id`, {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'odata-version': ''
          }
        });
      })
      .then((response: Response): Promise<IListItem> => {
        etag = response.headers.get('ETag');
        return response.json();
      })
      .then((item: IListItem): Promise<Response> => {
        this.setState({
          status: `Deleting item with ID: ${latestItemId}...`,
          items: []
        });
        return this.props.httpClient.post(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')/items(${item.Id})`, {
          headers: {
            'Accept': 'application/json;odata=nometadata',
            'Content-type': 'application/json;odata=verbose',
            'odata-version': '',
            'IF-MATCH': etag,
            'X-HTTP-Method': 'DELETE'
          }
        });
      })
      .then((response: Response): void => {
        this.setState({
          status: `Item with ID: ${latestItemId} successfully deleted`,
          items: []
        });
      }, (error: any): void => {
        this.setState({
          status: `Error deleting item: ${error}`,
          items: []
        });
      });
  }

  private listNotConfigured(props: IReactCrudProps): boolean {
    return props.listName === undefined ||
      props.listName === null ||
      props.listName.length === 0;
  }

  private getListItemEntityTypeName(): Promise<string> {
    return new Promise<string>((resolve: (listItemEntityTypeName: string) => void, reject: (error: any) => void): void => {
      if (this.listItemEntityTypeName) {
        resolve(this.listItemEntityTypeName);
        return;
      }

      this.props.httpClient.get(`${this.props.siteUrl}/_api/web/lists/getbytitle('${this.props.listName}')?$select=ListItemEntityTypeFullName`, {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      })
        .then((response: Response): Promise<{ ListItemEntityTypeFullName: string }> => {
          return response.json();
        }, (error: any): void => {
          reject(error);
        })
        .then((response: { ListItemEntityTypeFullName: string }): void => {
          this.listItemEntityTypeName = response.ListItemEntityTypeFullName;
          resolve(this.listItemEntityTypeName);
        });
    });
  }
}
