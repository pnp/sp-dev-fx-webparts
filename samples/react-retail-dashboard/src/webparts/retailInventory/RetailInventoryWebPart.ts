import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import RetailInventory from './components/RetailInventory';
import { IRetailInventoryProps } from './components/IRetailInventoryProps';
import { FakeRetailDataService } from '../../services/FakeRetailDataService';
import { SettingsService } from '../../services/SettingsService';
import { IRetailDataService } from '../../services/IRetailDataService';
import { ISettingsService } from '../../services/ISettingsService';

export interface IRetailInventoryWebPartProps {
}

export default class RetailInventoryWebPart extends BaseClientSideWebPart<IRetailInventoryWebPartProps> {

  private _isDarkTheme: boolean = false;

  private _retailDataService: IRetailDataService; 
  private _settingsService: ISettingsService;

  public render(): void {
    const element: React.ReactElement<IRetailInventoryProps> = React.createElement(
      RetailInventory,
      {
        retailDataService: this._retailDataService,
        settingsService: this._settingsService,
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {

    // Build the service instances and initialize them
    this._retailDataService = this.context.serviceScope.consume(FakeRetailDataService.serviceKey);
    this._settingsService = this.context.serviceScope.consume(SettingsService.serviceKey);

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
      pages: []
    };
  }
}
