import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloAngularWebPart.module.scss';
import * as strings from 'HelloAngularWebPartStrings';

import '@webcomponents/custom-elements/src/native-shim';
import 'core-js/es7/reflect';

import { AppModule } from './app/app.module';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

export interface IHelloAngularWebPartProps {
  description: string;
}

export default class HelloAngularWebPart extends BaseClientSideWebPart<IHelloAngularWebPartProps> {

  public render(): void {
    platformBrowserDynamic().bootstrapModule(AppModule, { ngZone: 'noop' }).then(() => {
      this.domElement.innerHTML = `<hello-world message="${this.properties.description}"></hello-world>`;
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
