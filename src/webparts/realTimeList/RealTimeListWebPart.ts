import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'RealTimeListWebPartStrings';
import RealTimeList from './components/RealTimeList';
import { IRealTimeListProps } from './components/IRealTimeListProps';
import pnp from "sp-pnp-js";

export interface IRealTimeListWebPartProps {
  description: string;
}

export default class RealTimeListWebPart extends BaseClientSideWebPart<IRealTimeListWebPartProps> {

  public onInit(): Promise<void> {
    return super.onInit().then(_ => {
      // establish SPFx context
      pnp.setup({
        spfxContext: this.context
      });
    });
  }

  public render(): void {
    const element: React.ReactElement<IRealTimeListProps > = React.createElement(
      RealTimeList,
      {
        description: this.properties.description
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
