import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloSharePointWebPart.module.scss';
import * as strings from 'HelloSharePointWebPartStrings';

import '@webcomponents/custom-elements/src/native-shim';
import 'core-js/es7/reflect';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

export interface IHelloSharePointWebPartProps {
  description: string;
}

export default class HelloSharePointWebPart extends BaseClientSideWebPart<IHelloSharePointWebPartProps> {

  public render(): void {
    platformBrowserDynamic().bootstrapModule(AppModule, { ngZone: 'noop' }).then(() => {
      this.domElement.innerHTML = `<hello-sharepoint site-url="${this.context.pageContext.web.absoluteUrl}"></hello-sharepoint>`;
    });
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
}
