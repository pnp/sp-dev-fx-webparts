import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
} from '@microsoft/sp-client-preview';

import styles from './DepProps.module.scss';
import * as strings from 'depPropsStrings';
import { IDepPropsWebPartProps } from './IDepPropsWebPartProps';

import { PropertyPaneViewSelectorField } from './controls/PropertyPaneViewSelector';

export default class DepPropsWebPart extends BaseClientSideWebPart<IDepPropsWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);

    this.onPropertyChange = this.onPropertyChange.bind(this);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.depProps}">
        <div class="${styles.container}">
          <div class="ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}">
            <div class="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <p class="ms-font-l ms-fontColor-white">Selected List Id: ${this.properties.depProps.listId}</p>
              <p class="ms-font-l ms-fontColor-white">Selected View Id: ${this.properties.depProps.viewId}</p>
            </div>
          </div>
        </div>
      </div>`;
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
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneViewSelectorField('depProps', {
                  context: this.context,
                  listId: this.properties.depProps && this.properties.depProps.listId,
                  viewId: this.properties.depProps && this.properties.depProps.viewId,
                  listLabel: strings.SelectList,
                  viewLabel: strings.SelectView,
                  onPropertyChange: this.onPropertyChange
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
