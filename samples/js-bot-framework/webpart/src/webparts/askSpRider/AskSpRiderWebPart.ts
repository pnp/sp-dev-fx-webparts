import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import styles from './AskSpRider.module.scss';
import * as strings from 'askSpRiderStrings';
import { IAskSpRiderWebPartProps } from './IAskSpRiderWebPartProps';

export default class AskSpRiderWebPart extends BaseClientSideWebPart<IAskSpRiderWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.askSpRider}">
        <div class="${styles.container}">
          <iframe src="https://webchat.botframework.com/embed/${this.properties.botname}?s=${this.properties.secretkey}" width="100%" height="400px"></iframe>
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
                PropertyPaneTextField('botname', {
                  label: strings.BotnameFieldLabel
                }),
                PropertyPaneTextField('secretkey', {
                  label: strings.SecretkeyFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
