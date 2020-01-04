import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ConfigureTabWebPartStrings';
import ConfigureTab from './components/ConfigureTab';
import { IConfigureTabProps } from './components/IConfigureTabProps';

export interface IConfigureTabWebPartProps {
  contentPageUrl: string;
}

export default class ConfigureTabWebPart extends BaseClientSideWebPart<IConfigureTabWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IConfigureTabProps > = React.createElement(
      ConfigureTab,
      {
        contentPageUrl: this.properties.contentPageUrl
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
                PropertyPaneTextField('contentPageUrl', {
                  label: strings.ContentPageUrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
