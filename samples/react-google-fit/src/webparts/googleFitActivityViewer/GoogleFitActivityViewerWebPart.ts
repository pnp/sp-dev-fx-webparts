import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'GoogleFitActivityViewerWebPartStrings';
import GoogleFitActivityViewer from './components/GoogleFitActivityViewer';
import { IGoogleFitActivityViewerProps } from './components/IGoogleFitActivityViewerProps';

export interface IGoogleFitActivityViewerWebPartProps {
  clientId: string;
}

export default class GoogleFitActivityViewerWebPart extends BaseClientSideWebPart<IGoogleFitActivityViewerWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IGoogleFitActivityViewerProps> = React.createElement(
      GoogleFitActivityViewer,
      {
        clientId: this.properties.clientId,
        serviceScope: this.context.serviceScope
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get disableReactivePropertyChanges(): boolean {
    return true;
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
                PropertyPaneTextField('clientId', {
                  label: strings.ClientIdFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
