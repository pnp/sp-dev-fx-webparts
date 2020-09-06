import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'TreeOrgChartWebPartStrings';
import TreeOrgChart from './components/TreeOrgChart';
import { ITreeOrgChartProps } from './components/ITreeOrgChartProps';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
import { setup as pnpSetup } from '@pnp/common';

export interface ITreeOrgChartWebPartProps {
  title: string;
  currentUserTeam: boolean;
  maxLevels: number;
}

export default class TreeOrgChartWebPart extends BaseClientSideWebPart<ITreeOrgChartWebPartProps> {
  public onInit(): Promise<void> {

    pnpSetup({
      spfxContext: this.context
    });

    return Promise.resolve();
  }

  public render(): void {
    const element: React.ReactElement<ITreeOrgChartProps> = React.createElement(
      TreeOrgChart,
      {
        title: this.properties.title,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.title = value;
        },
        currentUserTeam: this.properties.currentUserTeam,
        maxLevels: this.properties.maxLevels,
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
                PropertyPaneTextField('title', {
                  label: strings.TitleFieldLabel
                }),
                PropertyPaneToggle('currentUserTeam', {
                  label: strings.CurrentUserTeamFieldLabel
                }),
                PropertyFieldNumber("maxLevels", {
                  key: "numberValue",
                  label: strings.MaxLevels,
                  description: strings.MaxLevels,
                  value: this.properties.maxLevels,
                  maxValue: 10,
                  minValue: 1,
                  disabled: false
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
