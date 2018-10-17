import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'TeamsCreatorWebPartStrings';
import TeamsCreator from './components/TeamsCreator';
import { ITeamsCreatorProps } from './components/ITeamsCreatorProps';

export interface ITeamsCreatorWebPartProps {
  description: string;
}

export default class TeamsCreatorWebPart extends BaseClientSideWebPart<ITeamsCreatorWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITeamsCreatorProps > = React.createElement(
      TeamsCreator,
      {
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
