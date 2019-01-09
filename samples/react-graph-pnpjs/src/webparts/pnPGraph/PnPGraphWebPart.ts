import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'PnPGraphWebPartStrings';
import PnPGraph from './components/PnPGraph';
import { IPnPGraphProps } from './components/IPnPGraphProps';

import { setup as pnpSetup } from '@pnp/common';

export interface IPnPGraphWebPartProps {
  description: string;
}

export default class PnPGraphWebPart extends BaseClientSideWebPart<IPnPGraphWebPartProps> {

  public onInit(): Promise<void> {

    pnpSetup({
      spfxContext: this.context
    });

    return Promise.resolve();
  }

  public render(): void {
    const element: React.ReactElement<IPnPGraphProps > = React.createElement(
      PnPGraph,
      {
        description: this.properties.description
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
