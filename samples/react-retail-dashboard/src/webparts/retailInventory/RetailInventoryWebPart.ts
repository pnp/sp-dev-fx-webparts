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

    // Get the product code from the URL querystring
    // const url: URL = new URL(window.location.href);
    // const params: URLSearchParams = new URLSearchParams(url.search);
    // const productCode: string = params.has('productCode') ? params.get('productCode') : undefined;
    const productCode: string = "P03";

    const element: React.ReactElement<IRetailInventoryProps> = React.createElement(
      RetailInventory,
      {
        retailDataService: this._retailDataService,
        settingsService: this._settingsService,
        isDarkTheme: this._isDarkTheme,
        hasTeamsContext: !!this.context.sdks.microsoftTeams,
        productCode: productCode
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected async onInit(): Promise<void> {

    await this._getTeamsQueryString();

    // Build the service instances and initialize them
    this._retailDataService = this.context.serviceScope.consume(FakeRetailDataService.serviceKey);
    this._settingsService = this.context.serviceScope.consume(SettingsService.serviceKey);

    const packageSolution: any = await require('../../../config/package-solution.json');
    console.log(`React-Retail-Dashboard.RetailInventoryWebPart: v.${packageSolution.solution.version}`);
  }

  private _getTeamsQueryString(): void {
    const teamsContext = this.context.sdks?.microsoftTeams?.context;
    this.context.sdks?.microsoftTeams?.teamsJs.app.getContext().then(context => {
      console.log("context");
      console.log(context);
      console.log(context.page.subPageId);
    }).catch(error => {console.log(error);});


    // Get configuration from the Teams SDK
    if (teamsContext) {
      console.log("teamsContext");
      console.log(teamsContext);
      const subEntityId: any = teamsContext.subEntityId?.toString() ?? null; 
      console.log("subEntityId");
      console.log(subEntityId);
    }
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
