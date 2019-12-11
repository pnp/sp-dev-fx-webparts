import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'RecaptchaWebPartStrings';
import Recaptcha from './components/Recaptcha';
import { IRecaptchaProps } from './components/IRecaptchaProps';
import { WebPartContext } from '@microsoft/sp-webpart-base'; 


export interface IRecaptchaWebPartProps {
  sitekey: string;
}

export default class RecaptchaWebPart extends BaseClientSideWebPart<IRecaptchaWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IRecaptchaProps > = React.createElement(
      Recaptcha,
      {
        sitekey: this.properties.sitekey,  
        displayMode: this.displayMode,  
        context: this.context  
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
                PropertyPaneTextField('sitekey', {
                  label: strings.SiteKeyFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
