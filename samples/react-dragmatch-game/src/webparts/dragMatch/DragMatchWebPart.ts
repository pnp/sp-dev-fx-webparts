import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import DragMatch from './components/DragMatch';
import { IDragMatchProps } from './components/IDragMatchProps';
import { gameService } from '../../services/SharePointGameService';

export interface IDragMatchWebPartProps {
  description: string;
}

export default class DragMatchWebPart extends BaseClientSideWebPart<IDragMatchWebPartProps> {
  private _isDarkTheme: boolean = false;

  protected onInit(): Promise<void> {
    return super.onInit().then(() => {
      // Initialize game service
      gameService.init(this.context);
      
      // Check for Teams context
      this._isDarkTheme = !!this.context.sdks?.microsoftTeams?.context?.theme;
    });
  }

  public render(): void {
    const element: React.ReactElement<IDragMatchProps> = React.createElement(
      DragMatch,
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
            description: "Drag Match Game Settings"
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
