import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PageSectionsNavigationAnchorWebPartStrings';
import { 
  PageSectionsNavigationAnchor, 
  IPageSectionsNavigationAnchorProps 
} from './components/PageSectionsNavigationAnchor';

import { IDynamicDataPropertyDefinition, IDynamicDataCallables } from '@microsoft/sp-dynamic-data';

import { IAnchorItem } from '../../common/model';

export interface IPageSectionsNavigationAnchorWebPartProps {
  title: string;
  uniqueId: string;
}

export default class PageSectionsNavigationAnchorWebPart extends BaseClientSideWebPart<IPageSectionsNavigationAnchorWebPartProps> implements IDynamicDataCallables {

  private _anchor: IAnchorItem;

  protected onInit(): Promise<void> {

    this._anchor = {
      ...this.properties
    };

    this.context.dynamicDataSourceManager.initializeSource(this);

    if (!this.properties.uniqueId) {
      this._anchor.uniqueId = this.properties.uniqueId = `pagenavanchor-${this.context.instanceId}`;
      this.context.dynamicDataSourceManager.notifyPropertyChanged('anchor');
    }

    return super.onInit();
  }

  public render(): void {
    const element: React.ReactElement<IPageSectionsNavigationAnchorProps> = React.createElement(
      PageSectionsNavigationAnchor,
      {
        displayMode: this.displayMode,
        title: this.properties.title,
        updateProperty: this._onTitleChanged.bind(this)
      }
    );

    ReactDom.render(element, this.domElement);
    this._refreshScrollTop();
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

  private _onTitleChanged(title: string) {
    this._anchor.title = this.properties.title = title;
    this.context.dynamicDataSourceManager.notifyPropertyChanged('anchor');
  }

  private _refreshScrollTop() {
    this._anchor.scrollTop = this.domElement.scrollTop;
    this.context.dynamicDataSourceManager.notifyPropertyChanged('anchor');
  }
}
