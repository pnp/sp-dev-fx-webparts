import { ISPFxAdaptiveCard, BaseAdaptiveCardView } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'InventoryAdaptiveCardExtensionStrings';
import { IInventoryAdaptiveCardExtensionProps } from '../IInventoryAdaptiveCardExtensionProps';
import { IInventoryAdaptiveCardExtensionState } from '../IInventoryAdaptiveCardExtensionState';
import { RetailProduct } from '../../../models';
import { Guid } from '@microsoft/sp-core-library';

export interface IInventoryListQuickViewData {
  title: string;
  products: RetailProduct[];
  imageRightUrl: string;
  appUrl: string;
  deeplinkId: string;
}

export class InventoryListQuickView extends BaseAdaptiveCardView<
  IInventoryAdaptiveCardExtensionProps,
  IInventoryAdaptiveCardExtensionState,
  IInventoryListQuickViewData
> {
  public get data(): IInventoryListQuickViewData {
    return {
      title: strings.Generic.InventoryListQuickViewTitle,
      products: this.state.products,
      imageRightUrl: require('../../../assets/right.png'),
      appUrl: `https://teams.microsoft.com/_#/l/entity/${this.properties.teamsAppId}/retail.inventory`,
      deeplinkId: Guid.newGuid().toString()
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/InventoryListQuickView.json');
  }
}