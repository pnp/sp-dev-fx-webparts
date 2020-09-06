import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  IPropertyPaneDropdownOption
} from '@microsoft/sp-webpart-base';

import * as strings from 'sidePanelStrings';
import SidePanel from './components/WebPart/SidePanel';
import { ISidePanelProps } from './components/WebPart/ISidePanelProps';
import { ISidePanelWebPartProps } from './ISidePanelWebPartProps';

export default class SidePanelWebPart extends BaseClientSideWebPart<ISidePanelWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISidePanelProps > = React.createElement(
      SidePanel,
      {
        panelPosition: this.properties.panelPosition
      }
    );

    ReactDom.render(element, this.domElement);
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
                PropertyPaneDropdown('panelPosition', {
                  label: strings.PanelPositionFieldLabel,
                  options: [{
                    key: 0,
                    text: 'Left'
                  }, {
                    key: 1,
                    text: 'Right'
                  }],
                  selectedKey: this.properties.panelPosition
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
