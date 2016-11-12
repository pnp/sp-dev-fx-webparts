import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField
} from '@microsoft/sp-client-preview';

import styles from './TermSetRequester.module.scss';
import * as strings from 'termSetRequesterStrings';
import { ITermSetRequesterWebPartProps } from './ITermSetRequesterWebPartProps';

import { TaxonomyControl } from './controls/TaxonomyControl';

export default class TermSetRequesterWebPart extends BaseClientSideWebPart<ITermSetRequesterWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

  public render(): void {
    this.domElement.innerHTML = `
      <div class="${styles.termSetRequester}">
        <div class="${styles.container}">

        </div>
      </div>`;

      const container: HTMLDivElement = this.domElement.querySelector('.' + styles.container) as HTMLDivElement;
      var termStoreCtrl = new TaxonomyControl(this.context);
      termStoreCtrl.render(container);
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
