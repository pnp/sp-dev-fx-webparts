import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneSlider,
  PropertyPaneDropdown,
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import SiteGame from './components/SiteGame';
import { ISiteGameProps } from './components/ISiteGameProps';
import { GameTheme } from './game/constants/GameThemes';

export interface ISiteGameWebPartProps {
  description: string;
  showEmptyLists: boolean;
  maxBots: number;
  enableEasterEggs: boolean;
  enableM365EasterEggs: boolean;
  gameTheme: GameTheme;
  enableMusic: boolean;
  enableUfoAbductions: boolean;
}

export default class SiteGameWebPart extends BaseClientSideWebPart<ISiteGameWebPartProps> {

  private _isDarkTheme: boolean = false;

  public render(): void {
    const element: React.ReactElement<ISiteGameProps> = React.createElement(
      SiteGame,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        spHttpClient: this.context.spHttpClient,
        siteAbsoluteUrl: this.context.pageContext.web.absoluteUrl,
        userDisplayName: this.context.pageContext.user.displayName,
        showEmptyLists: this.properties.showEmptyLists !== false,
        maxBots: this.properties.maxBots || 20,
        enableEasterEggs: this.properties.enableEasterEggs !== false,
        enableM365EasterEggs: this.properties.enableM365EasterEggs !== false,
        gameTheme: this.properties.gameTheme || 'village',
        enableMusic: this.properties.enableMusic === true,
        enableUfoAbductions: this.properties.enableUfoAbductions === true,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);
    this.render();
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) return;
    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;
    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }
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
          header: { description: 'Site World — Gamify your SharePoint site' },
          groups: [
            {
              groupName: 'World Theme',
              groupFields: [
                PropertyPaneDropdown('gameTheme', {
                  label: 'Game Theme',
                  options: [
                    { key: 'village', text: 'Village' },
                    { key: 'space', text: 'Space' },
                    { key: 'retro2013', text: 'SP 2013 Retro' },
                    { key: 'bigcity', text: 'Big City Life' },
                  ],
                  selectedKey: this.properties.gameTheme || 'village',
                }),
              ],
            },
            {
              groupName: 'Town Settings',
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Web Part Title',
                }),
                PropertyPaneToggle('showEmptyLists', {
                  label: 'Include empty lists as buildings',
                  onText: 'Yes',
                  offText: 'No',
                }),
                PropertyPaneSlider('maxBots', {
                  label: 'Max NPC bots (site users)',
                  min: 1,
                  max: 30,
                  step: 1,
                  showValue: true,
                  value: 20,
                }),
                PropertyPaneToggle('enableEasterEggs', {
                  label: 'Enable PnP Easter Eggs',
                  onText: 'Yes',
                  offText: 'No',
                }),
                PropertyPaneToggle('enableM365EasterEggs', {
                  label: 'Enable Microsoft 365 Easter Eggs',
                  onText: 'Yes',
                  offText: 'No',
                }),
                PropertyPaneToggle('enableUfoAbductions', {
                  label: 'Enable UFO Abductions',
                  onText: 'Yes',
                  offText: 'No',
                }),
                PropertyPaneToggle('enableMusic', {
                  label: 'Enable Game Music',
                  onText: 'On',
                  offText: 'Off',
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
