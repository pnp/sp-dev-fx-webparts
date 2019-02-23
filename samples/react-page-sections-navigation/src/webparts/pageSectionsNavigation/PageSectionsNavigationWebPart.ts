import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PageSectionsNavigationWebPartStrings';
import { PageSectionsNavigation, IPageSectionsNavigationProps } from './components/PageSectionsNavigation';
import { IDynamicDataSource } from '@microsoft/sp-dynamic-data';
import { IAnchorItem } from '../../common/model';

export interface IPageSectionsNavigationWebPartProps {
  description: string;
}

export default class PageSectionsNavigationWebPart extends BaseClientSideWebPart<IPageSectionsNavigationWebPartProps> {

  private _dataSources: IDynamicDataSource[] = [];
  //private _anchors: IAnchorItem[];


  protected onInit(): Promise<void> {

    this._onAnchorChanged = this._onAnchorChanged.bind(this);
    this._initDataSources();
    this.context.dynamicDataProvider.registerAvailableSourcesChanged(this._initDataSources.bind(this, true));

    return super.onInit();
  }

  public render(): void {

    const anchors = this._dataSources && this._dataSources.map(ds => ds.getPropertyValue('anchor') as IAnchorItem);
    const element: React.ReactElement<IPageSectionsNavigationProps> = React.createElement(
      PageSectionsNavigation,
      {
        anchors: anchors
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

  private _initDataSources(reRender?: boolean) {
    const availableDataSources = this.context.dynamicDataProvider.getAvailableSources();

    if (availableDataSources && availableDataSources.length) {
      const dataSources = this._dataSources;
      //
      // removing deleted data sources if any
      //
      const availableDataSourcesIds = availableDataSources.map(ds => ds.id);
      for (let i = 0, len = dataSources.length; i < len; i++) {
        let dataSource = dataSources[i];
        if (availableDataSourcesIds.indexOf(dataSource.id) == -1) {
          dataSources.splice(i, 1);
          try {
            this.context.dynamicDataProvider.unregisterPropertyChanged(dataSource.id, 'anchor', this._onAnchorChanged);
          }
          catch (err) {}
          i--;
          len--;
        }
      }

      //
      // adding new data sources
      //
      for (let i = 0, len = availableDataSources.length; i < len; i++) {
        let dataSource = availableDataSources[i];
        if (!dataSource.getPropertyDefinitions().filter(pd => pd.id === 'anchor').length) {
          continue; // we don't need data sources other than anchors
        }
        if (!dataSources || !dataSources.filter(ds => ds.id === dataSource.id).length) {
          dataSources.push(dataSource);
          this.context.dynamicDataProvider.registerPropertyChanged(dataSource.id, 'anchor', this._onAnchorChanged);
          //this._anchors.push(dataSource.getPropertyValue('anchor') as IAnchorItem);
        }
      }
    }

    // TODO: unregister events for deleted data sources

    //this._dataSources = availableDataSources;

    if (reRender) {
      this.render();
    }
  }

  private _onAnchorChanged() {
    this.render();
    //console.log(ds.getPropertyValue('anchor'));
  }
}
