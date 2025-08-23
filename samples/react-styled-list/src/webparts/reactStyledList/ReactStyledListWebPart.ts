import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneChoiceGroup
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'ReactStyledListWebPartStrings';
import ReactStyledList from './components/ReactStyledList';
import { IReactStyledListProps } from './components/IReactStyledListProps';

export interface IReactStyledListWebPartProps {
  theme: string;
  alignment: string;
}

export default class ReactStyledListWebPart extends BaseClientSideWebPart<IReactStyledListWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  public render(): void {
    const element: React.ReactElement<IReactStyledListProps> = React.createElement(
      ReactStyledList,
      {
        theme: this.properties.theme || 'dark',
        alignment: this.properties.alignment || 'horizontal',
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this._getEnvironmentMessage().then(message => {
      this._environmentMessage = message;
    });
  }



  private _getEnvironmentMessage(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          let environmentMessage: string = '';
          switch (context.app.host.name) {
            case 'Office': // running in Office
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOffice : strings.AppOfficeEnvironment;
              break;
            case 'Outlook': // running in Outlook
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentOutlook : strings.AppOutlookEnvironment;
              break;
            case 'Teams': // running in Teams
            case 'TeamsModern':
              environmentMessage = this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
              break;
            default:
              environmentMessage = strings.UnknownEnvironment;
          }

          return environmentMessage;
        });
    }

    return Promise.resolve(this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors,
      palette,
      isInverted
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText ?? null);
      this.domElement.style.setProperty('--link', semanticColors.link ?? null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered ?? null);
      this.domElement.style.setProperty('--background', semanticColors.bodyBackground ?? null);
      this.domElement.style.setProperty('--cardBg', (semanticColors as any).bodyStandoutBackground ?? semanticColors.bodyBackground ?? null);
      this.domElement.style.setProperty('--cardBorder', semanticColors.variantBorder ?? semanticColors.bodyDivider ?? (palette?.neutralLight ?? null));
      this.domElement.style.setProperty('--authorText', palette?.neutralSecondary ?? null);
      this.domElement.style.setProperty('--quoteText', palette?.neutralSecondary ?? null);
      this.domElement.style.setProperty('--pageText', palette?.neutralTertiary ?? null);
      this.domElement.style.setProperty('--hoverMutedStrong', isInverted ? (palette?.neutralPrimary ?? null) : (palette?.neutralDark ?? null));
      this.domElement.style.setProperty('--hoverMutedWeak', palette?.neutralSecondary ?? null);
      // Hover background/text colors tuned per theme
      this.domElement.style.setProperty('--cardHoverBg', isInverted ? (palette?.neutralLighter ?? null) : (palette?.white ?? null));
      this.domElement.style.setProperty('--cardHoverText', palette?.neutralPrimary ?? null);
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
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupFields: [
                PropertyPaneChoiceGroup('theme', {
                  label: 'Theme',
                  options: [
                    { key: 'dark', text: 'Dark Theme' },
                    { key: 'light', text: 'Light Theme' }
                  ]
                }),
                PropertyPaneChoiceGroup('alignment', {
                  label: 'Card Alignment',
                  options: [
                    { key: 'horizontal', text: 'Horizontal Grid' },
                    { key: 'vertical', text: 'Vertical Stack' }
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
