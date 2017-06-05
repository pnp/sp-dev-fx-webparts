import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import styles from './PnpJsCrudWithBatch.module.scss';

import * as strings from 'pnpJsCrudWithBatchStrings';
import { IListItem } from './IListItem';

import * as pnp from 'sp-pnp-js';
import { Item, ItemAddResult, ItemUpdateResult } from '../../../node_modules/sp-pnp-js/lib/sharepoint/items';

import { IPnpJsCrudWithBatchWebPartProps } from './IPnpJsCrudWithBatchWebPartProps';

export default class PnpJsCrudWithBatchWebPart extends BaseClientSideWebPart<IPnpJsCrudWithBatchWebPartProps> {

  protected onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error?: any) => void): void => {
      pnp.setup({
        headers: {
          'Accept': 'application/json;odata=nometadata'
        }
      });
      resolve();
    });
  }

  public render(): void {
    this.domElement.innerHTML = `
  <div class="${styles.spPnPJsCrud}">
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
            <span class="${styles.label}">Update latest items</span>
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
    const webPart: PnpJsCrudWithBatchWebPart = this;
    this.domElement.querySelector('button.create-Button').addEventListener('click', () => { webPart.createItem(); });    
    this.domElement.querySelector('button.readall-Button').addEventListener('click', () => { webPart.readItems(); });
    this.domElement.querySelector('button.update-Button').addEventListener('click', () => { webPart.updateItem(); });
    this.domElement.querySelector('button.delete-Button').addEventListener('click', () => { webPart.deleteItem(); });
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

  private listNotConfigured(): boolean {
    return this.properties.listName === undefined ||
      this.properties.listName === null ||
      this.properties.listName.length === 0;
  }

  private createItem(): void {
    this.updateStatus('Creating item...');
    
    pnp.sp.web.lists.getByTitle(this.properties.listName).getListItemEntityTypeFullName().then(entityTypeFullName =>{
      let batch = pnp.sp.web.createBatch();
      let list = pnp.sp.web.lists.getByTitle(this.properties.listName);

      //todo - associate with a slider/dropdown/textbox to set number of items
      for(var i=0;i<5;i++){
        list.items.inBatch(batch).add({Title: "Batch add " + i}, entityTypeFullName).then(d => console.log(d));      
      }     

      batch.execute().then(d => {
        this.updateStatus(`Items successfully created via batch`);
      }).catch(error => {
        this.updateStatus(`Error occured while creating items: `+ error);
      });

    });

  }

  private getLatestItemId(): Promise<IListItem[]> {
    //todo - associate with a slider/dropdown/textbox to set number of items
    return new Promise<IListItem[]>((resolve: (items: IListItem[]) => void, reject: (error: any) => void): void => {
      pnp.sp.web.lists.getByTitle(this.properties.listName)
        .items.orderBy('Id', false).top(5).select('Id').get()
        .then((items: { Id: number }[]): void => {
          if (items.length === 0) {
            resolve(null);
          }
          else {
            resolve(items);
          }
        }, (error: any): void => {
          reject(error);
        });
    });
  }

  private readItems(): void {
    this.updateStatus('Loading all items...');

    let batch = pnp.sp.web.createBatch();
    
    pnp.sp.web.lists.getByTitle(this.properties.listName).items.select('Title', 'Id').inBatch(batch).get()
    .then((items: IListItem[]): void => {
        this.updateStatus(`Successfully loaded ${items.length} items`, items);
      }, (error: any): void => {
        this.updateStatus('Loading all items failed with error: ' + error);
      });

    batch.execute().then(function() {  
      console.log("All is done!");
    });    
  }

  private updateItem(): void {
    this.updateStatus('Updating latest items...');
    
    this.getLatestItemId().then((items:IListItem[]):void=> {
          console.log(items);
          if(items==null){
              //throw new Error('No items found in the list'); 
              this.updateStatus('No items found in the list '); 
          }
          else{
            let batch = pnp.sp.web.createBatch();
            let list = pnp.sp.web.lists.getByTitle(this.properties.listName);
            items.forEach(element => {
              list.items.getById(element.Id).inBatch(batch).update({Title: "Updated from batch"}).then(d => console.log(d));
            });

            batch.execute().then(d=> {
                var stringOfId='';
                items.forEach(element => {
                    stringOfId+=element.Id +',';
                });
                this.updateStatus(`Item with IDs: ${stringOfId} successfully updated`);
              }).catch(error => {
                this.updateStatus('Loading latest items failed with error '+ error);
            });
          }
        });
  }

  private deleteItem(): void {
    if (!window.confirm('Are you sure you want to delete the latest item?')) {
      return;
    }

    this.updateStatus('Loading latest items...');
    let latestItemId: number = undefined;
    let etag: string = undefined;

    this.getLatestItemId().then((items:IListItem[]):void=> {
        console.log(items);
        if(items==null){
            //throw new Error('No items found in the list');  
            this.updateStatus('No items found in the list ');
        }else{
          let batch = pnp.sp.web.createBatch();
            let list = pnp.sp.web.lists.getByTitle(this.properties.listName);
            items.forEach(element => {
              list.items.getById(element.Id).inBatch(batch).delete().then(d => console.log(d));
            });

            batch.execute().then(d=> {
                var stringOfId='';
                items.forEach(element => {
                    stringOfId+=element.Id +',';
                });
                this.updateStatus(`Item with IDs: ${stringOfId} successfully deleted`);
              }).catch(error => {
                this.updateStatus('Error deleting item '+ error);
            });
        }
    });    
  }

  private updateStatus(status: string, items: IListItem[] = []): void {
    this.domElement.querySelector('.status').innerHTML = status;
    this.updateItemsHtml(items);
  }

  private updateItemsHtml(items: IListItem[]): void {
    const itemsHtml: string[] = [];
    for (let i: number = 0; i < items.length; i++) {
      itemsHtml.push(`<li>${items[i].Title} (${items[i].Id})</li>`);
    }

    this.domElement.querySelector('.items').innerHTML = itemsHtml.join('');
  }
}
