import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import TeamRandomiser from './components/TeamRandomiser';
import { ITeamRandomiserProps } from './components/ITeamRandomiserProps';
import { ITeamRandomiserWebPartProps } from './types/ITeamRandomiserWebPartProps';
import * as strings from 'TeamRandomiserWebPartStrings';

export default class TeamRandomiserWebPart extends BaseClientSideWebPart<ITeamRandomiserWebPartProps> {
  public render(): void {
    const names = (this.properties.names || '')
      .split('\n')
      .map((n: string) => n.trim())
      .filter((n: string) => n !== '');

    const element: React.ReactElement<ITeamRandomiserProps> = React.createElement(
      TeamRandomiser,
      {
        title: this.properties.title || '',
        names,
        groupSize: this.properties.groupSize || 3,
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
          header: { description: strings.PropertyPaneDescription },
          groups: [
            {
              groupName: 'Display',
              groupFields: [
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel,
                }),
              ]
            },
            {
              groupName: 'People',
              groupFields: [
                PropertyPaneTextField('names', {
                  label: strings.NamesFieldLabel,
                  description: strings.NamesFieldDescription,
                  multiline: true,
                  rows: 10,
                }),
              ]
            },
            {
              groupName: 'Groups',
              groupFields: [
                PropertyPaneSlider('groupSize', {
                  label: strings.GroupSizeFieldLabel,
                  min: 2,
                  max: 20,
                  step: 1,
                  showValue: true,
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
