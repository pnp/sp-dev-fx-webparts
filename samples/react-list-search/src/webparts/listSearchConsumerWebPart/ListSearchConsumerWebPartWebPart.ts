import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  IPropertyPaneConfiguration,
  DynamicDataSharedDepth,
  PropertyPaneDynamicFieldSet,
  PropertyPaneDynamicField
} from '@microsoft/sp-property-pane';
import {
  BaseClientSideWebPart,
  IWebPartPropertiesMetadata,
} from '@microsoft/sp-webpart-base';

import * as strings from 'ListSearchConsumerWebPartWebPartStrings';
import { DynamicProperty } from '@microsoft/sp-component-base';
import { IListSearchConsumerProps } from './components/IListSearchConsumerProps';
import ListSearchConsumer from './components/ListSearchConsumerWebPart';


export interface IListSearchConsumerWebPartProps {
  webUrl: DynamicProperty<string>;
  listId: DynamicProperty<string>;
  itemId: DynamicProperty<number>;
}


export default class ListSearchConsumerWebPart extends BaseClientSideWebPart<IListSearchConsumerWebPartProps> {

  public render(): void {

    const element: React.ReactElement<IListSearchConsumerProps> = React.createElement(
      ListSearchConsumer,
      {
        webUrl: this.properties.webUrl.tryGetValue(),
        listId: this.properties.listId.tryGetValue(),
        itemId: this.properties.itemId.tryGetValue(),
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get propertiesMetadata(): IWebPartPropertiesMetadata {
    return {
      // Specify the web part properties data type to allow the address
      // information to be serialized by the SharePoint Framework.
      'webUrl': {
        dynamicPropertyType: 'string'
      },
      'listId': {
        dynamicPropertyType: 'string'
      },
      'itemId': {
        dynamicPropertyType: 'number'
      }
    };
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
                PropertyPaneDynamicFieldSet({
                  label: 'Select web Url',
                  fields: [
                    PropertyPaneDynamicField('webUrl', {
                      label: 'Web Url'
                    }),
                    PropertyPaneDynamicField('listId', {
                      label: 'List Id'
                    }),
                    PropertyPaneDynamicField('itemId', {
                      label: 'Item Id'
                    })
                  ],
                  sharedConfiguration: {
                    depth: DynamicDataSharedDepth.Property
                  }
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
