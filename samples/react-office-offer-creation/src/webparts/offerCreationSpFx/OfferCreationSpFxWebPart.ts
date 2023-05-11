import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'OfferCreationSpFxWebPartStrings';
import { OfferCreationSpFx } from './components/OfferCreationSpFx';
import { IOfferCreationSpFxProps } from './components/IOfferCreationSpFxProps';

export interface IOfferCreationSpFxWebPartProps {
  siteUrl: string;
}

export default class OfferCreationSpFxWebPart extends BaseClientSideWebPart<IOfferCreationSpFxWebPartProps> {
  private _isDarkTheme: boolean = false;
  private teamSiteDomain: string = '';

  public render(): void {  
    const element: React.ReactElement<IOfferCreationSpFxProps> = React.createElement(
      OfferCreationSpFx,
      {
        siteUrl: this.properties.siteUrl,
        serviceScope: this.context.serviceScope,
        isDarkTheme: this._isDarkTheme,
        teamSiteDomain: this.teamSiteDomain,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        userDisplayName: this.context.pageContext.user.displayName
      }
    );
    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    return this.getTeamSiteDomain().then(domain => {
      this.teamSiteDomain = domain;
      console.log(domain);
    });
  }

  private getTeamSiteDomain(): Promise<string> {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams, office.com or Outlook
      return this.context.sdks.microsoftTeams.teamsJs.app.getContext()
        .then(context => {
          return context.sharePointSite.teamSiteDomain;
        });
    }
    else { // Running in SharePoint

    }
    const uri = new URL(this.context.pageContext.site.absoluteUrl);
    return Promise.resolve(uri.host);
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

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
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('siteUrl', {
                  label: strings.SiteUrlFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
