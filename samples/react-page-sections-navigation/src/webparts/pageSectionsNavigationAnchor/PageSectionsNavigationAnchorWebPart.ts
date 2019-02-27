import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';

import * as strings from 'PageSectionsNavigationStrings';
import {
  PageSectionsNavigationAnchor,
  IPageSectionsNavigationAnchorProps
} from './components/PageSectionsNavigationAnchor';

import { IDynamicDataPropertyDefinition, IDynamicDataCallables, IDynamicDataSource } from '@microsoft/sp-dynamic-data';

import { IAnchorItem } from '../../common/model';
import { NavPosition } from '../../common/types';

export interface IPageSectionsNavigationAnchorWebPartProps {
  title: string;
  uniqueId: string;
  showTitle: boolean;
}

export default class PageSectionsNavigationAnchorWebPart extends BaseClientSideWebPart<IPageSectionsNavigationAnchorWebPartProps> implements IDynamicDataCallables {

  private _anchor: IAnchorItem;
  private _pageNavDataSource: IDynamicDataSource;

  protected onInit(): Promise<void> {

    const {
      title,
      uniqueId
    } = this.properties;

    this._anchor = {
      title: title,
      uniqueId: uniqueId
    };

    this._initDataSource();
    this.context.dynamicDataProvider.registerAvailableSourcesChanged(this._initDataSource.bind(this));
    this.context.dynamicDataSourceManager.initializeSource(this);

    if (!uniqueId) {
      this._anchor.uniqueId = this.properties.uniqueId = `pagenavanchor-${this.context.instanceId}`;
      this.context.dynamicDataSourceManager.notifyPropertyChanged('anchor');
    }

    return super.onInit();
  }

  public render(): void {
    const { title, showTitle } = this.properties;
    const position: NavPosition = this._pageNavDataSource ? this._pageNavDataSource.getPropertyValue('position') : 'top';
    const element: React.ReactElement<IPageSectionsNavigationAnchorProps> = React.createElement(
      PageSectionsNavigationAnchor,
      {
        displayMode: this.displayMode,
        title: title,
        showTitle: showTitle,
        updateProperty: this._onTitleChanged.bind(this),
        anchorElRef: (el => {
          this._anchor.domElement = el; //this.domElement;
          //this._anchor.scrollTop = this.domElement.scrollTop;
          this.context.dynamicDataSourceManager.notifyPropertyChanged('anchor');
        }),
        navPosition: position
      }
    );

    ReactDom.render(element, this.domElement);

  }

  public getPropertyDefinitions(): ReadonlyArray<IDynamicDataPropertyDefinition> {
    return [{
      id: 'anchor',
      title: 'Anchor'
    }];
  }
  public getPropertyValue(propertyId: string): IAnchorItem {
    switch (propertyId) {
      case 'anchor':
        return this._anchor;
    }

    throw new Error('Bad property id');
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
            description: ''
          },
          groups: [
            {
              groupName: strings.NavAnchorGroupName,
              groupFields: [
                PropertyPaneCheckbox('showTitle', {
                  text: strings.ShowTitleFieldLabel,
                  checked: this.properties.showTitle
                })
              ]
            }
          ]
        }
      ]
    };
  }

  private _onTitleChanged(title: string) {
    this._anchor.title = this.properties.title = title;
    this.context.dynamicDataSourceManager.notifyPropertyChanged('anchor');
  }

  private _initDataSource(): void {
    const availableDataSources = this.context.dynamicDataProvider.getAvailableSources();
    let hasPageNavDataSource = false;
    for (let i = 0, len = availableDataSources.length; i < len; i++) {
      let dataSource = availableDataSources[i];
      if (dataSource.getPropertyDefinitions().filter(pd => pd.id === 'position').length) {
        this._pageNavDataSource = dataSource;
        this.context.dynamicDataProvider.registerPropertyChanged(dataSource.id, 'position', this._onPageNavPositionChanged.bind(this));
        hasPageNavDataSource = true;
        break;
      }
    }

    if (!hasPageNavDataSource && this._pageNavDataSource) {
      this._pageNavDataSource = undefined;
    }
  }

  private _onPageNavPositionChanged() {
    this.render();
  }
}
