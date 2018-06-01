import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import styles from './HelloPnPjsSharePointWebPart.module.scss';
import * as strings from 'HelloPnPjsSharePointWebPartStrings';

import '@webcomponents/custom-elements/src/native-shim';
import 'core-js/es7/reflect';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import { sp } from "@pnp/sp";

export interface IHelloPnPjsSharePointWebPartProps {
  description: string;
}

export default class HelloPnPjsSharePointWebPart extends BaseClientSideWebPart<IHelloPnPjsSharePointWebPartProps> {

  public render(): void {
    platformBrowserDynamic().bootstrapModule(AppModule, { ngZone: 'noop' }).then(() => {
      this.domElement.innerHTML = `<hello-pnp-js-sharepoint></hello-pnp-js-sharepoint>`;
    });
  }

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      sp.setup({
        spfxContext: this.context
      });
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
