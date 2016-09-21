import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import styles from './JsDisplayList.module.scss';

import * as strings from 'jsDisplayListStrings';
import { IJsDisplayListWebPartProps } from './IJsDisplayListWebPartProps';

import { EnvironmentType, Log } from '@microsoft/sp-client-base';

//======================

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}

export interface ISPOption {
  Id: string;
  Title: string;
}


export default class JsDisplayListWebPart extends BaseClientSideWebPart<IJsDisplayListWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    debugger;
    this.context.statusRenderer.clearError(this.domElement);
    this.context.statusRenderer.displayLoadingIndicator(this.domElement, strings.Loading);
    Log.verbose('js-display-List', 'Invoking render');
    this._renderListAsync();
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
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

                PropertyPaneDropdown('listTitle', {
                label: 'List Title',
                options: this._dropdownOptions
                })
              ]
            }
          ]
        }
      ]
    };
  }

private _dropdownOptions: IPropertyPaneDropdownOption[] = [];

public onInit<T>(): Promise<T> {
  this._getListTitles()
    .then((response) => {

      this._dropdownOptions = response.value.map((list: ISPList) => {
        return {
          key: list.Title,
          text: list.Title
        };
      });
    });
    return Promise.resolve();
}


  private _getListTitles(): Promise<ISPLists> {
  return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`)
    .then((response: Response) => {
    return response.json();
    });
  }


 private _getListData(listName: string): Promise<ISPLists> {
    //return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/Web/Lists(guid'${listName}')/items?$select=ID,Title,Created,Author/ID,Author/Title&$expand=Author/ID,Author/Title`)
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('${listName}')/items?$select=Title,ID,Created,Author/ID,Author/Title&$expand=Author/ID,Author/Title`)

    .then((response: Response) => {
    return response.json();
    });
  }

 private _renderList(items: ISPList[]): void {
    let html: string = '';
    debugger;


        //debugger;
  items.forEach((item: ISPList) => {
    let title:string = '';

    if (item.Title === null)
    {
      title= "Missing title for item with ID= " + item.Id;
    }
    else
    {
      title= item.Title;
    }



    var created = item["Created"];

    html += `
    <div class="${styles.row} ms-Grid-row " }>
          <div class="ms-Grid-col ms-u-sm5 ms-u-md3 ms-u-lg4 ms-font-m">${title}</div>
          <div class="ms-Grid-col ms-u-sm5 ms-u-md3 ms-u-lg4 ms-font-m">${created.substring(0,created.length-1).replace('T',' ')}</div>
          <div class="ms-Grid-col ms-u-sm5 ms-u-md3 ms-u-lg4 ms-font-m">${item['Author'].Title}</div>
    </div>`;
  });

  if (items.length == 0)
  {
    html ='<br /><p class="ms-font-m-plus">The selected list is empty</p>';

  }
  const listContainer: Element = this.domElement.querySelector('#spListContainer');
  this.context.statusRenderer.clearLoadingIndicator(this.domElement);
  listContainer.innerHTML = html;
}


   private _renderListAsync(): void {

     this.domElement.innerHTML = `
        <div className='wrapper'>
          <p class="ms-font-l ms-bgColor-themeDark ms-fontColor-white"><span class="ms-fontWeight-semibold">${this.properties.listTitle}</span> List</p>
          <div class="ms-Grid ${styles.jsDisplayList}" }>
             <div class="ms-Grid-row" }>
                <div class="ms-Grid-col ms-u-sm5 ms-u-md3 ms-u-lg4 ms-bgColor-themeLight  ms-font-m-plus">Title</div>
                <div class="ms-Grid-col ms-u-sm5 ms-u-md3 ms-u-lg4 ms-bgColor-themeLight  ms-font-m-plus">Created</div>
                <div class="ms-Grid-col ms-u-sm5 ms-u-md3 ms-u-lg4  ms-bgColor-themeLight  ms-font-m-plus">Created By</div>

              </div>
              <hr />
              <div id="spListContainer" }>
          </div>
        </div>`;

        const listContainer: Element = this.domElement.querySelector('#spListContainer');

    // Local environment
      debugger;
      if (this.context.environment.type === EnvironmentType.Local) {
        let html: string = '<p> Local test environment [No connection to SharePoint]</p>';
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        listContainer.innerHTML = html;
      }
      else {
        //debugger;
        this._getListData(this.properties.listTitle).then((response) => {
        this._renderList(response.value);

        }).catch((err) => {
          Log.error('js-display-List', err);
            this.context.statusRenderer.clearLoadingIndicator(this.domElement);
            this.context.statusRenderer.renderError(this.domElement, err);
          });
      }
  }

}
