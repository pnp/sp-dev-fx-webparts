import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { InventoryCardView } from './cardView/InventoryCardView';
import { InventoryListQuickView } from './quickView/InventoryListQuickView';
import { InventoryPropertyPane } from './InventoryPropertyPane';

import { IInventoryAdaptiveCardExtensionProps } from './IInventoryAdaptiveCardExtensionProps';
import { IInventoryAdaptiveCardExtensionState } from './IInventoryAdaptiveCardExtensionState';
import { IRetailDataService } from '../../services/IRetailDataService';
import { FakeRetailDataService } from '../../services/FakeRetailDataService';
import { SettingsService } from '../../services/SettingsService';
import { ISettingsService } from '../../services/ISettingsService';

const CARD_VIEW_REGISTRY_ID: string = 'Inventory_CARD_VIEW';
export const QUICK_VIEW_INVENTORY_LIST_REGISTRY_ID: string = 'Inventory_List_QUICK_VIEW';

export default class InventoryAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IInventoryAdaptiveCardExtensionProps,
  IInventoryAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: InventoryPropertyPane | undefined;

  private _retailDataService: IRetailDataService; 
  private _settingsService: ISettingsService;

  public async onInit(): Promise<void> {
    this.state = { 
      products: [],
      currentProduct: undefined,
      currentIndex: 0
    };

    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new InventoryCardView());
    this.quickViewNavigator.register(QUICK_VIEW_INVENTORY_LIST_REGISTRY_ID, () => new InventoryListQuickView());

    // Build the service instances and initialize them
    this._retailDataService = this.context.serviceScope.consume(FakeRetailDataService.serviceKey);
    this._settingsService = this.context.serviceScope.consume(SettingsService.serviceKey);

    const packageSolution: any = await require('../../../config/package-solution.json');
    console.log(`React-Retail-Dashboard.InventoryAdaptiveCardExtension: v.${packageSolution.solution.version}`);

    // Load the list of products after .5 seconds
    setTimeout(async () => {

      // Get the Teams App Id
      this.properties.teamsAppId = await this._settingsService.GetTeamsAppId();

      // Load the list of products
      const products = await this._retailDataService.ListProductsInventory();

      // Set the list of products and the current product to the first one
      this.setState({
        products: products,
        currentProduct: products[this.state.currentIndex]
      });

    }, 500);

    // Update the current product every 5 seconds
    setInterval(async () => {
      if (this.state.products) {
        // Set the current index
        const currentIndex: number = this.state.currentIndex >= (this.state.products.length - 1) ? 0 : this.state.currentIndex + 1;

        // Update the state with the new current product and index
        this.setState({
          currentProduct: this.state.products[currentIndex],
          currentIndex: currentIndex
        });
      }
    }, 5000);
    
    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'Inventory-property-pane'*/
      './InventoryPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.InventoryPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }

  protected get iconProperty(): string {
    return require('../../assets/icon.png');
  }
}
