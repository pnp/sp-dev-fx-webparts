import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';


import * as strings from 'asyncAwaitPnPJsStrings';
import AsyncAwaitPnPJs from './components/AsyncAwaitPnPJs';
import { IAsyncAwaitPnPJsProps } from './components/AsyncAwaitPnPJs';

import { spfi, SPFI, SPFx } from "@pnp/sp";

export interface IAsyncAwaitPnPJsWebPartProps {
  description: string;
}

export default class AsyncAwaitPnPJsWebPart extends BaseClientSideWebPart<IAsyncAwaitPnPJsWebPartProps> {
  private sp: SPFI;

  // // https://github.com/SharePoint/PnP-JS-Core/wiki/Using-sp-pnp-js-in-SharePoint-Framework
  public async onInit(): Promise<void> {
    await super.onInit();

    this.sp = spfi().using(SPFx(this.context));
  }

  public render(): void {
    const element: React.ReactElement<IAsyncAwaitPnPJsProps> = React.createElement(
      AsyncAwaitPnPJs,
      {
        description: this.properties.description,
        sp: this.sp
      }
    );

    ReactDom.render(element, this.domElement);
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
