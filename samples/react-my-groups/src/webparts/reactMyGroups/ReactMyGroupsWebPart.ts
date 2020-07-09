import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import { IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneChoiceGroup } from "@microsoft/sp-property-pane";
import GroupService from '../../services/GroupService';
import * as strings from 'ReactMyGroupsWebPartStrings';
import { ReactMyGroups, IReactMyGroupsProps } from './components';

export interface IReactMyGroupsWebPartProps {
  title: string;
  layout: string;
}

export default class ReactMyGroupsWebPart extends BaseClientSideWebPart<IReactMyGroupsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IReactMyGroupsProps > = React.createElement(
      ReactMyGroups,
      {
        title: this.properties.title,
        layout: this.properties.layout
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return super.onInit().then(() => {
      GroupService.setup(this.context);
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    const { layout }  = this.properties;
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
                  label: 'Title'
                }),
                PropertyPaneChoiceGroup("layout", {
                  label: 'Layout Option',
                  options: [
                    {
                      key: "Grid",
                      text: "Grid",
                      iconProps: { officeFabricIconFontName: "GridViewSmall"},
                      checked: layout === "Grid" ? true : false,

                    },
                    {
                      key: "Compact",
                      text: "Compact",
                      iconProps: { officeFabricIconFontName: "BulletedList2"},
                      checked: layout === "Compact" ? true : false
                    }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
