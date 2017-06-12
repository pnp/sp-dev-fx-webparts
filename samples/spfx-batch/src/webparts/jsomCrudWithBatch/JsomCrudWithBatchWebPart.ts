import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
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
    this.domElement.querySelector('.items').innerHTML = 
		items.map(item=> `<li>${item.Title} (${item.Id})</li>` ).join('');
  }

  public readItems(): void {
    this.updateStatus('Loading all items...');
    const spClientContext: SP.ClientContext = new SP.ClientContext(this.context.pageContext.web.absoluteUrl);
    const spList: SP.List = spClientContext.get_web().get_lists().getByTitle(this.properties.listName);

    var camlQuery = SP.CamlQuery.createAllItemsQuery();
    var spListItemCollection = spList.getItems(camlQuery);

    var listItems: IListItem[] = [];

    spClientContext.load(spList);
    spClientContext.load(spListItemCollection, 'Include(Title,Id)');
    var beforeCallback = this;
    spClientContext.executeQueryAsync(function (sender, args) {
      var listItemInfo = '';
      var listItemEnumerator = spListItemCollection.getEnumerator();
      while (listItemEnumerator.moveNext()) {
        var spListItem = listItemEnumerator.get_current();
        
        listItems.push({
          Title: spListItem.get_item('Title'),
          Id: spListItem.get_id()
        });
      }      
      beforeCallback.updateStatus(`Successfully loaded ${listItems.length} items`, listItems);
    },
      function (sender, args) {        
        beforeCallback.updateStatus(`Error occured: ` + args.get_message());
      });
  }

  private createItem(): void {
    var itemsInBatch = this.properties.itemCount;
    this.updateStatus('Creating items...');

    var itemArray = [];
    const spClientContext: SP.ClientContext = new SP.ClientContext(this.context.pageContext.web.absoluteUrl);
    const spList: SP.List = spClientContext.get_web().get_lists().getByTitle(this.properties.listName);
    var beforeCallback = this;

    for (var i = 0; i < itemsInBatch; i++) {
      var itemCreationInfo = new SP.ListItemCreationInformation();
      var spListItem = spList.addItem(itemCreationInfo);
      spListItem.set_item('Title', 'Batch add ' + i);
      spListItem.update();
      itemArray[i] = spListItem;
      spClientContext.load(itemArray[i]);
    }

    spClientContext.executeQueryAsync(function () {
      beforeCallback.updateStatus(`Items successfully created via batch`);
    }, function (args) {
      beforeCallback.updateStatus(`Error occured while creating items: ` + args.get_message() + " \n " + args.get_stackTrace());
    });
  }

  private getLatestItemId(successCallback, errorCallback): void {
    
    var itemsInBatch = this.properties.itemCount;
    const spClientContext: SP.ClientContext = new SP.ClientContext(this.context.pageContext.web.absoluteUrl);
    const spList: SP.List = spClientContext.get_web().get_lists().getByTitle(this.properties.listName);

    var spCamlQuery = SP.CamlQuery.createAllItemsQuery();
    spCamlQuery.set_viewXml('<View><Query><OrderBy><FieldRef Name="ID" Ascending="False"/></OrderBy></Query><RowLimit>'+ itemsInBatch +'</RowLimit></View>');
    var spListItemCollection = spList.getItems(spCamlQuery);

    var listItems: IListItem[] = [];

    spClientContext.load(spList);
    spClientContext.load(spListItemCollection, 'Include(Id)');
    var beforeCallback = this;
    spClientContext.executeQueryAsync(function (sender, args) {      
      var listItemEnumerator = spListItemCollection.getEnumerator();
      while (listItemEnumerator.moveNext()) {
        var spListItem = listItemEnumerator.get_current();
        listItems.push({
          Id: spListItem.get_id()
        });
      }      
      successCallback(listItems);
    },
      function (sender, args) {        
        errorCallback(args.get_message());
      });
  }

  private updateItem(): void {
    var spWebUrl = this.context.pageContext.web.absoluteUrl;
    var spListName = this.properties.listName
    this.updateStatus('Updating latest items...');
    var beforeCallback = this;

    this.getLatestItemId(function (data: IListItem[]) {      
    var itemArray = [];
    const spClientContext: SP.ClientContext = new SP.ClientContext(spWebUrl);
    const spList: SP.List = spClientContext.get_web().get_lists().getByTitle(spListName);    

    data.forEach((item,index) => {
      var spListItem = spList.getItemById(item.Id);  
        spListItem.set_item('Title', 'Updated from batch ' + item.Id.toString());  
        spListItem.update();
        itemArray[index] = spListItem;
        spClientContext.load(itemArray[index]);
    });    
    
    spClientContext.executeQueryAsync(function(){
        var stringOfId=data.map(element => element.Id).join(',');
        beforeCallback.updateStatus(`Item with IDs: ${stringOfId} successfully updated`);
      },function(args){
          beforeCallback.updateStatus(`Error occured while updating items: ` + args.get_message() + " \n " + args.get_stackTrace());
      });
    }, function (args) {      
      beforeCallback.updateStatus(`Error occured while updating items: ` + args.get_message() + " \n " + args.get_stackTrace());
    });
  }

  private deleteItem(): void {
    if (!window.confirm('Are you sure you want to delete the latest item?')) {
      return;
    }

    var spWebUrl = this.context.pageContext.web.absoluteUrl;
    var spListName = this.properties.listName
    this.updateStatus('Deleting latest items...');
    var beforeCallback = this;

    this.getLatestItemId(function (data: IListItem[]) {      
    var itemArray = [];
    const spClientContext: SP.ClientContext = new SP.ClientContext(spWebUrl);
    const spList: SP.List = spClientContext.get_web().get_lists().getByTitle(spListName);    

    data.forEach(item => {
        var spListItem = spList.getItemById(item.Id);  
        spListItem.deleteObject();    
    });
    
    spClientContext.executeQueryAsync(function(){
        var stringOfId=data.map(element => element.Id).join(',');
        beforeCallback.updateStatus(`Item with IDs: ${stringOfId} successfully updated`);        
    },function(args){
        beforeCallback.updateStatus(`Error occured while deleting items: ` + args.get_message() + " \n " + args.get_stackTrace());
    });
    }, function (args) {      
      beforeCallback.updateStatus(`Error occured while deleting items: ` + args.get_message() + " \n " + args.get_stackTrace());
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
                }),
                PropertyPaneSlider('itemCount',{  
                  label:"Number of items in batch",  
                  min:2,  
                  max:10,  
                  value:5,  
                  showValue:true,  
                  step:1                
                })  
              ]
            }
          ]
        }
      ]
    };
  }
}
