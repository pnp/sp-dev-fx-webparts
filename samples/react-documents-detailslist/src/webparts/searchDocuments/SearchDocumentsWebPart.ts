import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, Environment, EnvironmentType } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField } from "@microsoft/sp-property-pane";
import Documents from '../../components/documentsList/component/Documents';
import { IDocumentsProps } from '../../components/documentsList/component/IDocumentsProps';
import IDataProvider from '../../dataproviders/IDataProvider';
import SharePointDataProvider from '../../dataproviders/SharePointDataProvider';
import MockupDataProvider from '../../dataproviders/MockupDataProvider';
import * as strings from 'SearchDocumentsWebPartStrings';


export interface ISearchDocumentsWebPartProps {
  libraryUrl: string;
}

export default class SearchDocumentsWebPart extends BaseClientSideWebPart<ISearchDocumentsWebPartProps> {

  private _dataProvider: IDataProvider;

  protected onInit(): Promise<void> {

    debugger;
    if (DEBUG && Environment.type === EnvironmentType.Local) {
      this._dataProvider = new MockupDataProvider(this.properties.libraryUrl);

    } else {
      if (this.properties.libraryUrl) {
        this._dataProvider = new SharePointDataProvider(this.context, this.properties.libraryUrl);
      }
      else {
        //the WebPart property is not filled
        //do nothing, the Documents component will display notification message
      }
    }
    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IDocumentsProps> = React.createElement(
      Documents,
      {
        title: "Search Documents",
        useSearchData: true,
        webPartDisplayMode: this.displayMode,
        dataProvider: this._dataProvider
      }
    );

    ReactDom.render(element, this.domElement);
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
                PropertyPaneTextField('libraryUrl', {
                  label: strings.LibraryUrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
