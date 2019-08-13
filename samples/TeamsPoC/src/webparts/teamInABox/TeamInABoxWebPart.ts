import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'TeamInABoxWebPartStrings';
import { TeamInABoxContainer } from './components/TeamInABoxContainer';
import { ITeamInABoxContainerProps } from './components/TeamInABoxContainer/ITeamInABoxContainerProps';

export interface ITeamInABoxWebPartProps {
  description: string;
}

export default class TeamInABoxWebPart extends BaseClientSideWebPart<ITeamInABoxWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITeamInABoxContainerProps > = React.createElement(
      TeamInABoxContainer,
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
