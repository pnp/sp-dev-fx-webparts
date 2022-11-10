import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'DalleImageGeneratorWebPartStrings';
import DalleImageGenerator from './components/DalleImageGenerator';
import { IDalleImageGeneratorProps } from './components/IDalleImageGeneratorProps';
import { DalleImageGeneratorServiceKey, IDalleImageGeneratorService } from './services/DalleImageGeneratorService';
import { getSP } from './pnpjsConfig';

export interface IDalleImageGeneratorWebPartProps {
  description: string;
}

export default class DalleImageGeneratorWebPart extends BaseClientSideWebPart<IDalleImageGeneratorWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';
  private _dalleImageGeneratorService: IDalleImageGeneratorService;

  public render(): void {
    const element: React.ReactElement<IDalleImageGeneratorProps> = React.createElement(
      DalleImageGenerator,
      {
        description: this.properties.description,
        isDarkTheme: this._isDarkTheme,
        environmentMessage: this._environmentMessage,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        siteAbsoluteUrl: this.context.pageContext.site.absoluteUrl,
        dalleImageGeneratorService: this._dalleImageGeneratorService
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();    
    return super
      .onInit()
      .then((_) => {
        getSP(this.context);
        const webpartScope = this.context.serviceScope.startNewChild();
        webpartScope.finish();
        return webpartScope;
      })
      .then((serviceScope) => {
        this._dalleImageGeneratorService = serviceScope.consume(DalleImageGeneratorServiceKey);
      });
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
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
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
