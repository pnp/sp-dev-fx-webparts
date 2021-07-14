import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { Providers, SharePointProvider } from '@microsoft/mgt';

import * as strings from 'OneDriveFinderWebPartStrings';
import OneDriveFinder from './components/OneDriveFinder';
import { IOneDriveFinderProps } from './components/IOneDriveFinderProps';

export interface IOneDriveFinderWebPartProps {
  description: string;
}

export default class OneDriveFinderWebPart extends BaseClientSideWebPart<IOneDriveFinderWebPartProps> {
  protected onInit() {
    Providers.globalProvider = new SharePointProvider(this.context);
    return super.onInit();
  }
  public render(): void {
    const element: React.ReactElement<IOneDriveFinderProps> = React.createElement(
      OneDriveFinder,
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
