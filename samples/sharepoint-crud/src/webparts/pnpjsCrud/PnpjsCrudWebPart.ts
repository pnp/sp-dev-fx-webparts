import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";

import styles from './PnpjsCrudWebPart.module.scss';
import * as strings from 'PnpjsCrudWebPartStrings';
import { sp, Item, ItemAddResult, ItemUpdateResult } from '@pnp/sp';

export interface IPnpjsCrudWebPartProps {
  listName: string;
}

interface IListItem {
  Title?: string;
  Id: number;
}

export default class PnpjsCrudWebPart extends BaseClientSideWebPart<IPnpjsCrudWebPartProps> {

  protected onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error?: any) => void): void => {
      sp.setup({
        sp: {
          headers: {
            "Accept": "application/json; odata=nometadata"
          }
        }
      });
      resolve();
    });
  }

  public render(): void {
    this.domElement.innerHTML = `
  <div class="${styles.pnpjsCrud}">
    <div class="${styles.container}">
      <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
        <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
          <span class="ms-font-xl ms-fontColor-white">
            Sample SharePoint CRUD operations using the SP PnP JS library
          </span>
        </div>
      </div>
      <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
        <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
          <button class="${styles.button} create-Button">
            <span class="${styles.label}">Create item</span>
          </button>
          <button class="${styles.button} read-Button">
            <span class="${styles.label}">Read item</span>
          </button>
        </div>
      </div>
      <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
        <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
          <button class="${styles.button} readall-Button">
            <span class="${styles.label}">Read all items</span>
          </button>
        </div>
      </div>
      <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
        <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
          <button class="${styles.button} update-Button">
            <span class="${styles.label}">Update item</span>
          </button>
          <button class="${styles.button} delete-Button">
            <span class="${styles.label}">Delete item</span>
          </button>
        </div>
      </div>
      <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
        <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
          <div class="status"></div>
          <ul class="items"><ul>
        </div>
      </div>
    </div>
  </div>
    `;

    this.updateStatus(this.listNotConfigured() ? 'Please configure list in Web Part properties' : 'Ready');
    this.setButtonsState();
    this.setButtonsEventHandlers();
  }

  private setButtonsState(): void {
    const buttons: NodeListOf<Element> = this.domElement.querySelectorAll(`button.${styles.button}`);
    const listNotConfigured: boolean = this.listNotConfigured();

    for (let i: number = 0; i < buttons.length; i++) {
      const button: Element = buttons.item(i);
      if (listNotConfigured) {
        button.setAttribute('disabled', 'disabled');
      }
      else {
        button.removeAttribute('disabled');
      }
    }
  }

  private setButtonsEventHandlers(): void {
    const webPart: PnpjsCrudWebPart = this;
    this.domElement.querySelector('button.create-Button').addEventListener('click', () => { webPart.createItem(); });
    this.domElement.querySelector('button.read-Button').addEventListener('click', () => { webPart.readItem(); });
    this.domElement.querySelector('button.readall-Button').addEventListener('click', () => { webPart.readItems(); });
    this.domElement.querySelector('button.update-Button').addEventListener('click', () => { webPart.updateItem(); });
    this.domElement.querySelector('button.delete-Button').addEventListener('click', () => { webPart.deleteItem(); });
  }

  private listNotConfigured(): boolean {
    return this.properties.listName === undefined ||
      this.properties.listName === null ||
      this.properties.listName.length === 0;
  }

  private createItem(): void {
    this.updateStatus('Creating item...');
    sp.web.lists.getByTitle(this.properties.listName).items.add({
      'Title': `Item ${new Date()}`
    }).then((result: ItemAddResult): void => {
      const item: IListItem = result.data as IListItem;
      this.updateStatus(`Item '${item.Title}' (ID: ${item.Id}) successfully created`);
    }, (error: any): void => {
      this.updateStatus('Error while creating the item: ' + error);
    });
  }

  private readItem(): void {
    this.updateStatus('Loading latest items...');
    this.getLatestItemId()
      .then((itemId: number): Promise<IListItem> => {
        if (itemId === -1) {
          throw new Error('No items found in the list');
        }

        this.updateStatus(`Loading information about item ID: ${itemId}...`);
        return sp.web.lists.getByTitle(this.properties.listName)
          .items.getById(itemId).select('Title', 'Id').get();
      })
      .then((item: IListItem): void => {
        this.updateStatus(`Item ID: ${item.Id}, Title: ${item.Title}`);
      }, (error: any): void => {
        this.updateStatus('Loading latest item failed with error: ' + error);
      });
  }

  private getLatestItemId(): Promise<number> {
    return new Promise<number>((resolve: (itemId: number) => void, reject: (error: any) => void): void => {
      sp.web.lists.getByTitle(this.properties.listName)
        .items.orderBy('Id', false).top(1).select('Id').get()
        .then((items: { Id: number }[]): void => {
          if (items.length === 0) {
            resolve(-1);
          }
          else {
            resolve(items[0].Id);
          }
        }, (error: any): void => {
          reject(error);
        });
    });
  }

  private readItems(): void {
    this.updateStatus('Loading all items...');
    sp.web.lists.getByTitle(this.properties.listName)
      .items.select('Title', 'Id').get()
      .then((items: IListItem[]): void => {
        this.updateStatus(`Successfully loaded ${items.length} items`, items);
      }, (error: any): void => {
        this.updateStatus('Loading all items failed with error: ' + error);
      });
  }

  private updateItem(): void {
    this.updateStatus('Loading latest items...');
    let latestItemId: number = undefined;
    let etag: string = undefined;

    this.getLatestItemId()
      .then((itemId: number): Promise<Item> => {
        if (itemId === -1) {
          throw new Error('No items found in the list');
        }

        latestItemId = itemId;
        this.updateStatus(`Loading information about item ID: ${itemId}...`);
        return sp.web.lists.getByTitle(this.properties.listName)
          .items.getById(itemId).get(undefined, {
            headers: {
              'Accept': 'application/json;odata=minimalmetadata'
            }
          });
      })
      .then((item: Item): Promise<IListItem> => {
        etag = item["odata.etag"];
        return Promise.resolve((item as any) as IListItem);
      })
      .then((item: IListItem): Promise<ItemUpdateResult> => {
        return sp.web.lists.getByTitle(this.properties.listName)
          .items.getById(item.Id).update({
            'Title': `Item ${new Date()}`
          }, etag);
      })
      .then((result: ItemUpdateResult): void => {
        this.updateStatus(`Item with ID: ${latestItemId} successfully updated`);
      }, (error: any): void => {
        this.updateStatus('Loading latest item failed with error: ' + error);
      });
  }

  private deleteItem(): void {
    if (!window.confirm('Are you sure you want to delete the latest item?')) {
      return;
    }

    this.updateStatus('Loading latest items...');
    let latestItemId: number = undefined;
    let etag: string = undefined;
    this.getLatestItemId()
      .then((itemId: number): Promise<Item> => {
        if (itemId === -1) {
          throw new Error('No items found in the list');
        }

        latestItemId = itemId;
        this.updateStatus(`Loading information about item ID: ${latestItemId}...`);
        return sp.web.lists.getByTitle(this.properties.listName)
          .items.getById(latestItemId).select('Id').get(undefined, {
            headers: {
              'Accept': 'application/json;odata=minimalmetadata'
            }
          });
      })
      .then((item: Item): Promise<IListItem> => {
        etag = item["odata.etag"];
        return Promise.resolve((item as any) as IListItem);
      })
      .then((item: IListItem): Promise<void> => {
        this.updateStatus(`Deleting item with ID: ${latestItemId}...`);
        return sp.web.lists.getByTitle(this.properties.listName)
          .items.getById(item.Id).delete(etag);
      })
      .then((): void => {
        this.updateStatus(`Item with ID: ${latestItemId} successfully deleted`);
      }, (error: any): void => {
        this.updateStatus(`Error deleting item: ${error}`);
      });
  }

  private updateStatus(status: string, items: IListItem[] = []): void {
    this.domElement.querySelector('.status').innerHTML = status;
    this.updateItemsHtml(items);
  }

  private updateItemsHtml(items: IListItem[]): void {
    this.domElement.querySelector('.items').innerHTML = items.map(item => `<li>${item.Title} (${item.Id})</li>`).join("");
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
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
              groupName: strings.DataGroupName,
              groupFields: [
                PropertyPaneTextField('listName', {
                  label: strings.ListNameFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
