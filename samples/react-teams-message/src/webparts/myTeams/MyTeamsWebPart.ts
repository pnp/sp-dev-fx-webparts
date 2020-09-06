import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'MyTeamsWebPartStrings';
import MyTeams from './components/MyTeams';
import { IMyTeamsProps } from './components/IMyTeamsProps';

export interface IMyTeamsWebPartProps {
  WebpartTitle: string;
  ShowDescription:boolean;
  OpenPopupOnSelectingChannel:boolean;
}

export default class MyTeamsWebPart extends BaseClientSideWebPart <IMyTeamsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IMyTeamsProps> = React.createElement(
      MyTeams,
      {
        context: this.context,
        webparttitle:this.properties.WebpartTitle,
        showdescription:this.properties.ShowDescription,
        openpopuponselectingchannel:this.properties.OpenPopupOnSelectingChannel,
        displayMode: this.displayMode,
        updateProperty: (value: string) => {
          this.properties.WebpartTitle = value;
        }
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
                PropertyPaneTextField('WebpartTitle', {
                  label: "WebPart Heading"
                }),
                PropertyPaneToggle('ShowDescription', {
                  label: "Show Description"
                }),
                PropertyPaneToggle('OpenPopupOnSelectingChannel', {
                  label: "Open Popup Selecting Channel"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
