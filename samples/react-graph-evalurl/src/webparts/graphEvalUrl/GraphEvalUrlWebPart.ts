import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'GraphEvalUrlWebPartStrings';
import GraphEvalUrl from './components/GraphEvalUrl';
import { IGraphEvalUrlProps } from './components/IGraphEvalUrlProps';

export interface IGraphEvalUrlWebPartProps {
  description: string;
}

export default class GraphEvalUrlWebPart extends BaseClientSideWebPart<IGraphEvalUrlWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGraphEvalUrlProps > = React.createElement(
      GraphEvalUrl,
      {
        description: this.properties.description,
        graphClient: this.context.graphHttpClient
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
