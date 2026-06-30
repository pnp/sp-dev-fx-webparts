import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import SpinWheel from './components/SpinWheel';
import { ISpinWheelProps } from './components/ISpinWheelProps';
import { spinWheelService } from '../../services/SpinWheelService';

export interface ISpinWheelWebPartProps {
  description: string;
}

export default class SpinWheelWebPart extends BaseClientSideWebPart<ISpinWheelWebPartProps> {
  private _isDarkTheme: boolean = false;

  protected onInit(): Promise<void> {
    return super.onInit().then(() => {
      // Initialize the spin wheel service with SharePoint context
      spinWheelService.init(this.context);
      
      // Check for Teams theme
      this._isDarkTheme = !!this.context.sdks?.microsoftTeams?.context?.theme;
    });
  }

  public render(): void {
    const element: React.ReactElement<ISpinWheelProps> = React.createElement(
      SpinWheel,
      {
        context: this.context,
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
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
            description: "Spin Wheel Settings"
          },
          groups: [
            {
              groupName: "Configuration",
              groupFields: [
                PropertyPaneTextField('description', {
                  label: "Description"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
