import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './JsomCrudWithBatch.module.scss';
import * as strings from 'jsomCrudWithBatchStrings';
import { IListItem } from './IListItem';
import { IJsomCrudWithBatchWebPartProps } from './IJsomCrudWithBatchWebPartProps';

require('sp-init');
require('microsoft-ajax');
require('sp-runtime');
require('sharepoint');

export default class JsomCrudWithBatchWebPart extends BaseClientSideWebPart<IJsomCrudWithBatchWebPartProps> {

  private webpartTitle: string = "";
  
  public render(): void {
    
    this.domElement.innerHTML = `
  <div class="${styles.spPnPJsCrud}">
    <div class="${styles.container}">
      <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
        <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
          <span class="ms-font-xl ms-fontColor-white">
            Sample SharePoint CRUD operations using the SP JSOM library
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

  private listNotConfigured(): boolean {
    return this.properties.listName === undefined ||
      this.properties.listName === null ||
      this.properties.listName.length === 0;
  }

  private setButtonsEventHandlers(): void {
    const webPart: JsomCrudWithBatchWebPart = this;
    this.domElement.querySelector('button.create-Button').addEventListener('click', () => { webPart.createItem(); });
    this.domElement.querySelector('button.readall-Button').addEventListener('click', () => { webPart.readItems(); });
    this.domElement.querySelector('button.update-Button').addEventListener('click', () => { webPart.updateItem(); });
    this.domElement.querySelector('button.delete-Button').addEventListener('click', () => { webPart.deleteItem(); });
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

  public readItems(): void {
    this.updateStatus('Loading all items...');
    const context: SP.ClientContext = new SP.ClientContext(this.context.pageContext.web.absoluteUrl);
    const list: SP.List = context.get_web().get_lists().getByTitle(this.properties.listName);

    var camlQuery = SP.CamlQuery.createAllItemsQuery();
    var collTermListItem = list.getItems(camlQuery);

    var listItems: IListItem[] = [];

    context.load(list);
    context.load(collTermListItem, 'Include(Title,Id)');
    var beforeCallback = this;
    context.executeQueryAsync(function name(sender, args) {
      var listItemInfo = '';
      var listItemEnumerator = collTermListItem.getEnumerator();
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        //listItemInfo = oListItem.get_item('Title') + '\n';
        listItems.push({
          Title: oListItem.get_item('Title'),
          Id: oListItem.get_id()
        });
      }
      console.log(listItems);
      beforeCallback.updateStatus(`Successfully loaded ${listItems.length} items`, listItems);
    },
      function (sender, args) {
        console.log(args.get_message());
        beforeCallback.updateStatus(`Error occured: ` + args.get_message());
      });
  }

  private createItem(): void {
    this.updateStatus('Creating item...');

    var itemArray = [];
    const context: SP.ClientContext = new SP.ClientContext(this.context.pageContext.web.absoluteUrl);
    const list: SP.List = context.get_web().get_lists().getByTitle(this.properties.listName);
    var beforeCallback = this;

    for (var i = 0; i < 5; i++) {

      var itemCreateInfo = new SP.ListItemCreationInformation();
      var oListItem = list.addItem(itemCreateInfo);
      oListItem.set_item('Title', 'Batch add ' + i);
      oListItem.update();
      itemArray[i] = oListItem;
      context.load(itemArray[i]);
    }

    context.executeQueryAsync(function () {
      beforeCallback.updateStatus(`Items successfully created via batch`);
    }, function (args) {
      beforeCallback.updateStatus(`Error occured while creating items: ` + args.get_message() + " \n " + args.get_stackTrace());
    });
  }

  private getLatestItemId(successCallback, errorCallback): void {

    //todo - associate with a slider/dropdown/textbox to set number of items
    const context: SP.ClientContext = new SP.ClientContext(this.context.pageContext.web.absoluteUrl);
    const list: SP.List = context.get_web().get_lists().getByTitle(this.properties.listName);

    var camlQuery = SP.CamlQuery.createAllItemsQuery();
    camlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="ID" Ascending="False"/></OrderBy></Where></Query><RowLimit>5</RowLimit></View>');
    var collTermListItem = list.getItems(camlQuery);

    var listItems: IListItem[] = [];

    context.load(list);
    context.load(collTermListItem, 'Include(Id)');
    var beforeCallback = this;
    context.executeQueryAsync(function name(sender, args) {
      var listItemInfo = '';
      var listItemEnumerator = collTermListItem.getEnumerator();
      while (listItemEnumerator.moveNext()) {
        var oListItem = listItemEnumerator.get_current();
        listItems.push({
          Id: oListItem.get_id()
        });
      }      
      successCallback(listItems);
    },
      function (sender, args) {        
        errorCallback(args.get_message());
      });

  }

  private updateItem(): void {
    var webUrl = this.context.pageContext.web.absoluteUrl;
    var listName = this.properties.listName
    this.updateStatus('Updating latest items...');
    var beforeCallback = this;

    this.getLatestItemId(function (data: IListItem[]) {      
    var itemArray = [];
    const context: SP.ClientContext = new SP.ClientContext(webUrl);
    const list: SP.List = context.get_web().get_lists().getByTitle(listName);    
    
    for(var i = 0; i< data.length; i++){    
        var oListItem = list.getItemById(data[i].Id);  
        oListItem.set_item('Title', 'Updated from batch ' + i);  
        oListItem.update();
        itemArray[i] = oListItem;
        context.load(itemArray[i]);
    }    
    context.executeQueryAsync(function(){
        var stringOfId='';
        data.forEach(element => {
            stringOfId+=element.Id +',';
        });
        beforeCallback.updateStatus(`Item with IDs: ${stringOfId} successfully updated`);
    },function(args){
        beforeCallback.updateStatus(`Error occured while updating items: ` + args.get_message() + " \n " + args.get_stackTrace());
    });

    }, function (data: any) {
      console.log(data);
    });
  }

  private deleteItem(): void {
    if (!window.confirm('Are you sure you want to delete the latest item?')) {
      return;
    }

    var webUrl = this.context.pageContext.web.absoluteUrl;
    var listName = this.properties.listName
    this.updateStatus('Deleting latest items...');
    var beforeCallback = this;

    this.getLatestItemId(function (data: IListItem[]) {      
    var itemArray = [];
    const context: SP.ClientContext = new SP.ClientContext(webUrl);
    const list: SP.List = context.get_web().get_lists().getByTitle(listName);    
    
    for(var i = 0; i < data.length; i++){    
        var oListItem = list.getItemById(data[i].Id);  
        oListItem.deleteObject();    
    }    
    context.executeQueryAsync(function(){
        var stringOfId='';
        data.forEach(element => {
            stringOfId+=element.Id +',';
        });
        beforeCallback.updateStatus(`Item with IDs: ${stringOfId} successfully deleted`);
    },function(args){
        beforeCallback.updateStatus(`Error occured while deleting items: ` + args.get_message() + " \n " + args.get_stackTrace());
    });

    }, function (data: any) {
      console.log(data);
    });
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
