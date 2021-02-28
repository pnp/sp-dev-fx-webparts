import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';


import * as strings from 'TreeOrgChartWebPartStrings';
import TreeOrgChart, { TreeOrgChartType } from './components/TreeOrgChart';
import { ITreeOrgChartProps } from './components/ITreeOrgChartProps';
import { PropertyFieldNumber } from '@pnp/spfx-property-controls/lib/PropertyFieldNumber';
import { setup as pnpSetup } from '@pnp/common';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneDropdown, PropertyPaneTextField, PropertyPaneToggle } from '@microsoft/sp-webpart-base';
import { graph } from "@pnp/graph";

export interface ITreeOrgChartWebPartProps {
  title: string;
  currentUserTeam: boolean;
  teamLeader: string;
  maxLevels: number;
  viewType: TreeOrgChartType;
  filter: string;
  excludefilter: boolean;
  detailBehavoir: boolean;
}



export default class TreeOrgChartWebPart extends BaseClientSideWebPart<ITreeOrgChartWebPartProps> {
  public onInit(): Promise<void> {

    pnpSetup({
      spfxContext: this.context
    });
    graph.setup(this.context as any);
    //Migration old Config Settings
    if (!this.properties.viewType) {
      const treetype = this.properties.currentUserTeam ? TreeOrgChartType.MyTeam : TreeOrgChartType.CompanyHierarchy;
      this.properties.viewType = treetype;
    }


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
        viewType: this.properties.viewType,
        teamLeader: this.properties.teamLeader,
        updateTeamLeader: (loginname: string) => {
          this.properties.teamLeader = loginname;
          this.render();
        },
        maxLevels: this.properties.maxLevels,
        filter: this.properties.filter,
        excludefilter: this.properties.excludefilter,
        detailBehavoir: this.properties.detailBehavoir,
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
                PropertyPaneDropdown('viewType', {
                  label: strings.ViewType,
                  options: [
                    { key: TreeOrgChartType.MyTeam, text: strings.TreeOrgChartTypeMyTeam },
                    { key: TreeOrgChartType.CompanyHierarchy, text: strings.TreeOrgChartTypeCompany },
                    { key: TreeOrgChartType.ShowOtherTeam, text: strings.TreeOrgChartTypeShowOtherTeam },
                  ],
                  selectedKey: this.properties.viewType
                }),

                PropertyFieldNumber("maxLevels", {
                  key: "numberValue",
                  label: strings.MaxLevels,
                  description: strings.MaxLevels,
                  value: this.properties.maxLevels,
                  maxValue: 10,
                  minValue: 1,
                  disabled: false
                }),
                PropertyPaneToggle('detailBehavoir', {
                  label: strings.DetailBehavoir,
                  onText: strings.LivePersonaCard,
                  offText: strings.DelveLink
                }),
              ]
            },
            {
              groupName: strings.FilterGroupName,
              groupFields: [
                PropertyPaneToggle('excludefilter', {
                  label: strings.ExcludeFilter,
                  onText: strings.ExcludeFilterOnText,
                  offText: strings.ExcludeFilterOffText
                }),
                PropertyPaneTextField('filter', {
                  label: strings.FilterLabel,
                  description: strings.FilterDescription,
                }),
              ]
            }

          ]
        }
      ]
    };
  }
}
