import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'GraphReportsWebPartStrings';
import GraphReports from './components/GraphReports';
import { IGraphReportsProps } from './components/IGraphReportsProps';

export interface IGraphReportsWebPartProps {
  description: string;
}



export default class GraphReportsWebPart extends BaseClientSideWebPart<IGraphReportsWebPartProps> {


  public render(): void {
    const element: React.ReactElement<IGraphReportsProps > = React.createElement(
      GraphReports,
      {        
        customServiceScope: this.context.serviceScope
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
