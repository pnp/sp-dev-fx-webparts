import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloGraphWebPart.module.scss';
import * as strings from 'HelloGraphWebPartStrings';

import '@webcomponents/custom-elements/src/native-shim';
import 'core-js/es7/reflect';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { MSGraphClient } from '@microsoft/sp-client-preview';

export interface IHelloGraphWebPartProps {
  description: string;
}

export default class HelloGraphWebPart extends BaseClientSideWebPart<IHelloGraphWebPartProps> {


  public render(): void {
    if(!this.renderedOnce) {
      let client : MSGraphClient = this.context.serviceScope.consume(MSGraphClient.serviceKey);
      platformBrowserDynamic().bootstrapModule(AppModule, { ngZone: 'noop' })
        .then(() => {
          const ElementGraphHelloWorld = customElements.get("hello-graph");
          const element = new ElementGraphHelloWorld();
          element.client = client;
          this.domElement.appendChild(element);
        });
    }
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
