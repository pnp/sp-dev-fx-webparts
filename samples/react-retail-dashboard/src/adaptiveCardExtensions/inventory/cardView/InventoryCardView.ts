import {
  BaseImageCardView,
  IImageCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'InventoryAdaptiveCardExtensionStrings';

import { IInventoryAdaptiveCardExtensionProps } from '../IInventoryAdaptiveCardExtensionProps';
import { IInventoryAdaptiveCardExtensionState } from '../IInventoryAdaptiveCardExtensionState';
import { QUICK_VIEW_INVENTORY_LIST_REGISTRY_ID } from '../InventoryAdaptiveCardExtension';

export class InventoryCardView extends BaseImageCardView<IInventoryAdaptiveCardExtensionProps, IInventoryAdaptiveCardExtensionState> {
  /**
   * Buttons will not be visible if card size is 'Medium' with Image Card View.
   * It will support up to two buttons for 'Large' card size.
   */
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return this.state.products.length > 0 ? [
      {
        title: strings.Generic.InventoryListQuickViewButton,
        action: {
          type: 'QuickView',
          parameters: {
            view: QUICK_VIEW_INVENTORY_LIST_REGISTRY_ID
          }
        }
      }
    ] : undefined;
  }

  public get data(): IImageCardParameters {
    return {
      primaryText: this.state.currentProduct ? `'${this.state.currentProduct?.description}' reference price is ${this.state.currentProduct?.price}$ and sales so far are ${this.state.currentProduct?.sales.toLocaleString('en-US')} items` : strings.Generic.Loading,
      imageUrl: this.state.currentProduct?.picture ?? require('../../../assets/loading-square.gif'),
      title: strings.Generic.InventoryCardViewTitle
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://pnp.github.io/'
      }
    };
  }
}
