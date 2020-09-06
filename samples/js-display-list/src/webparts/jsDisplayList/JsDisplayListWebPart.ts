import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneDropdown, IPropertyPaneDropdownOption } from "@microsoft/sp-property-pane";

import styles from './JsDisplayList.module.scss';

import * as strings from 'jsDisplayListStrings';
import { IJsDisplayListWebPartProps } from './IJsDisplayListWebPartProps';

import { Version, Environment, EnvironmentType, Log } from '@microsoft/sp-core-library';
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

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

  public render(): void {
    // debugger;
    this.context.statusRenderer.clearError(this.domElement);
    Log.verbose('js-display-List', 'Invoking render');
    this._renderListAsync();
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
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
    return this.context.spHttpClient.get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists?$filter=Hidden eq false`,
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }


  private _getListData(listName: string): Promise<ISPLists> {

    const queryString: string = '$select=Title,ID,Created,Author/ID,Author/Title&$expand=Author/ID,Author/Title';

    return this.context.spHttpClient
      .get(`${this.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${listName}')/items?${queryString}`,
      SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        if (response.status === 404) {
          Log.error('js-display-List', new Error('List not found.'));
          return [];
        }else {
          return response.json();
        }
      });
  }

  private _renderList(items: ISPList[]): void {
    let html: string = '';

    if(!items) {

      html = `<br /><p class="${styles.fontMPlus}">The selected list does not exist.</p>`;

    } else if (items.length === 0) {

      html = `<br /><p class="${styles.fontMPlus}">The selected list is empty</p>`;

    } else {
      items.forEach((item: ISPList) => {
        let title: string = '';

        if (item.Title === null) {
          title = "Missing title for item with ID= " + item.Id;
        } else {
          title = item.Title;
        }

        let created: any = item["Created"];

        html += `
          <div class="${styles.row}" }>
                <div class="${styles.column}">${title}</div>
                <div class="${styles.column}">
                  ${created.substring(0, created.length - 1).replace('T', ' ')}
                </div>
                <div class="${styles.column}">${item['Author'].Title}</div>
          </div>`;
      });
    }

    const listContainer: Element = this.domElement.querySelector('#spListContainer');
    listContainer.innerHTML = html;
  }


  private _renderListAsync(): void {

    this.domElement.innerHTML = `
        <div class='wrapper ${styles.jsDisplayList}'>
          <p class="${styles.themeDark}">
          <span class="${styles.semiBold}">
              ${this.properties.listTitle}
              </span>
              List
          </p>
          <div class="${styles.grid} ${styles.jsDisplayList}">
             <div class="${styles.row}">
                <div class="${styles.columnHeader}">Title</div>
                <div class="${styles.columnHeader}">Created</div>
                <div class="${styles.columnHeader}">Created By</div>
              </div>
              <hr />
              <div id="spListContainer"></div>
        </div>`;

    const listContainer: Element = this.domElement.querySelector('#spListContainer');

    // Local environment
    // debugger;
    if (Environment.type === EnvironmentType.Local) {
      let html: string = '<p> Local test environment [No connection to SharePoint]</p>';
      listContainer.innerHTML = html;
    } else {
      //debugger;
      this._getListData(this.properties.listTitle).then((response) => {
        this._renderList(response.value);

      }).catch((err) => {
        Log.error('js-display-List', err);
        this.context.statusRenderer.renderError(this.domElement, err);
      });
    }
  }
}
