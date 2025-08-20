import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'PnpCopilotPromptsWebPartStrings';
import PnpCopilotPrompts from './components/PnpCopilotPrompts';
import { IPnpCopilotPromptsProps } from './components/IPnpCopilotPromptsProps';

export interface IPnpCopilotPromptsWebPartProps {
  sampleDataFileUrl: string;
}

export default class PnpCopilotPromptsWebPart extends BaseClientSideWebPart<IPnpCopilotPromptsWebPartProps> {
  public render(): void {
    const element: React.ReactElement<IPnpCopilotPromptsProps> = React.createElement(
      PnpCopilotPrompts,
      {
        sampleDataFileUrl: this.properties.sampleDataFileUrl,
        serviceScope: this.context.serviceScope
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
                PropertyPaneTextField('sampleDataFileUrl', {
                  label: strings.SampleDataFileUrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
