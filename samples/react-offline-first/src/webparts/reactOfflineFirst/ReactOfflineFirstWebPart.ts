import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'ReactOfflineFirstWebPartStrings';
import ReactOfflineFirst from './components/ReactOfflineFirst';
import { IReactOfflineFirstProps } from './components/IReactOfflineFirstProps';

export interface IReactOfflineFirstWebPartProps {
  description: string;
}

export default class ReactOfflineFirstWebPart extends BaseClientSideWebPart<IReactOfflineFirstWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactOfflineFirstProps > = React.createElement(
      ReactOfflineFirst,
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
