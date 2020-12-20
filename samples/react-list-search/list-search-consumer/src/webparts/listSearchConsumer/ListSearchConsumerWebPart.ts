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

import styles from './ListSearchConsumerWebPart.module.scss';
import * as strings from 'ListSearchConsumerWebPartStrings';
import { DynamicProperty } from '@microsoft/sp-component-base';


export interface IListSearchConsumerWebPartProps {
  webUrl: DynamicProperty<string>;
  listId: DynamicProperty<string>;
  itemId: DynamicProperty<number>;
}

export default class ListSearchConsumerWebPart extends BaseClientSideWebPart<IListSearchConsumerWebPartProps> {

  public render(): void {
    let webUrl: string = this.properties.webUrl.tryGetValue();
    let listId: string = this.properties.listId.tryGetValue();
    let itemId: number = this.properties.itemId.tryGetValue();

    this.domElement.innerHTML = `
      <div class="${styles.listSearchConsumer}">
        <div class="${styles.container}">
          <div class="${styles.row}">
            <div class="${styles.column}">
              <span class="${styles.title}">List search consumer webpart</span>
              <div class="${styles.description}">WebUrl:
                <p class="${styles.value}">${webUrl}</p>
              </div>
              <div class="${styles.description}">ListId:
                <p class="${styles.value}">${listId}</p>
              </div>
              <div class="${styles.description}">ItemId:
                <p class="${styles.value}">${itemId}</p>
              </div>
            </div>
          </div>
        </div>
      </div>`;
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
