import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration
} from '@microsoft/sp-webpart-base';

import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

import styles from './DepProps.module.scss';
import * as strings from 'depPropsStrings';
import { IDepPropsWebPartProps } from './IDepPropsWebPartProps';

import { PropertyPaneViewSelectorField } from './controls/PropertyPaneViewSelector';

export default class DepPropsWebPart extends BaseClientSideWebPart<IDepPropsWebPartProps> {

  public constructor() {
    super();


    this.onCustomPropertyPaneFieldChanged = this.onCustomPropertyPaneFieldChanged.bind(this);
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

/**
 * Provides logic to update web part properties and initiate re-render
 * @param targetProperty property that has been changed
 * @param newValue new value of the property
 */
  public onCustomPropertyPaneFieldChanged(targetProperty: string, newValue: any) {
    const oldValue = this.properties[targetProperty];
    this.properties[targetProperty] = newValue;

    this.onPropertyPaneFieldChanged(targetProperty, oldValue, newValue);

    // NOTE: in local workbench onPropertyPaneFieldChanged method initiates re-render
    // in SharePoint environment we need to call re-render by ourselves
    if (Environment.type !== EnvironmentType.Local) {
      this.render();
    }
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
                PropertyPaneViewSelectorField('depProps', {
                  wpContext: this.context,
                  listId: this.properties.depProps && this.properties.depProps.listId,
                  viewId: this.properties.depProps && this.properties.depProps.viewId,
                  listLabel: strings.SelectList,
                  viewLabel: strings.SelectView,
                  onPropertyChange: this.onCustomPropertyPaneFieldChanged
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
