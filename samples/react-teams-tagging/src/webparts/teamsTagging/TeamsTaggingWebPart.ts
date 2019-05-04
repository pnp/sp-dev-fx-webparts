import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'TeamsTaggingWebPartStrings';
import TeamsTagging from './components/TeamsTagging';
import { ITeamsTaggingProps } from './components/ITeamsTaggingProps';

export interface ITeamsTaggingWebPartProps {
  termSetId: string;
}

export default class TeamsTaggingWebPart extends BaseClientSideWebPart<ITeamsTaggingWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITeamsTaggingProps > = React.createElement(
      TeamsTagging,
      {
        termSetId: this.properties.termSetId,
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
                PropertyPaneTextField('termSetId', {
                  label: strings.TermSetIdFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
