import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactRelatedItemsWebPartStrings';
import ReactRelatedItems from './components/ReactRelatedItems';
import { IReactRelatedItemsProps } from './components/IReactRelatedItemsProps';


import { SPListItem, SPList } from '@microsoft/sp-page-context';
import { sp, OpenWebByIdResult } from "@pnp/sp";

export interface IReactRelatedItemsWebPartProps {
  fieldInternalName: string;
}

export default class ReactRelatedItemsWebPart extends BaseClientSideWebPart<IReactRelatedItemsWebPartProps> {

  private _docTitle : string;
  public get docTitle() : string {
    return this._docTitle;
  }
  public set docTitle(v : string) {
    this._docTitle = v;
  }
  
  
  private _docUrl : string;
  public get docUrl() : string {
    return this._docUrl;
  }
  public set docUrl(v : string) {
    this._docUrl = v;
  }

  public onInit(): Promise<void> {

    debugger;
const webpart=this;
    return super.onInit()
      .then(_ => {

        sp.setup({
          spfxContext: this.context
        });
        var list: SPList = this.context.pageContext.list;
        var queryParameters = new UrlQueryParameterCollection(window.location.href);
        const id: number = parseInt(queryParameters.getValue("ID"));
        return sp.web.lists.getById(list.id.toString()).items.getById(id).expand("File").get()
          .then((task) => {
            //"[{"ItemId":6209,"WebId":"346b0229-1468-4344-8701-b2b300e5dbe1","ListId":"cfe9f983-f972-406d-840d-ac981a305ad7"}]"
            let relatedItems = JSON.parse(task[webpart.properties.fieldInternalName]);
            debugger;

            let relatedItemID: number = relatedItems[0]["ItemId"];
            let relatedItemListId: string = relatedItems[0]["ListId"];
            let relatedItemWebId: string = relatedItems[0]["WebId"];
            return sp.site.openWebById(relatedItemWebId)
              .then((results: OpenWebByIdResult) => {
                debugger;
                return results.web.lists.getById(relatedItemListId).items.getById(relatedItemID).expand("File").get()
                  .then((item) => {
                    this.docTitle= item.File["Title"];
                    this.docUrl= item.File["LinkingUrl"];
                    debugger;
                  })
                  .catch((err) => {
                    console.log("error getting item");
                    debugger;
                  });

              })
              .catch((err) => {
                debugger;
                console.log(`Error openning web with id ${relatedItemWebId}`);
              });

          })
          .catch((error) => {
            console.log(`Error fetching task. Task ID is ${id}. List ID is ${list.id.toString()}`);
          });


      });
  }
  public render(): void {
    const element: React.ReactElement<IReactRelatedItemsProps > = React.createElement(
      ReactRelatedItems,
      {
        title: this.docTitle,
        url:this.docUrl,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
