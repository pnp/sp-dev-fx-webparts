import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart, WebPartContext } from '@microsoft/sp-webpart-base';

import * as strings from 'WebpartDetailsWebPartStrings';
import WebpartDetails from './components/WebpartDetails';
import { IWebpartDetailsProps } from './components/IWebpartDetailsProps';
import { sp } from "@pnp/sp/presets/all";
export interface IWebpartDetailsWebPartProps {
  description: string;
  context: WebPartContext;
}

export default class WebpartDetailsWebPart extends BaseClientSideWebPart <IWebpartDetailsWebPartProps> {
  protected onInit(): Promise<void> {

    return super.onInit().then(_ => {
  
      // other init code may be present
  
      sp.setup({
        spfxContext: this.context
      });
    });
  }
  public render(): void {
    const element: React.ReactElement<IWebpartDetailsProps> = React.createElement(
      WebpartDetails,
      {
        description: this.properties.description,
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
            description: ''
          },
          groups: [
            {
              groupName: "No Configuration Required",
              groupFields: [
              
              ]
            }
          ]
        }
      ]
    };
  }
}
