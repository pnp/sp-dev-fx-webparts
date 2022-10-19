import {
  BaseImageCardView,
  IImageCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'ProfileCardAdaptiveCardExtensionStrings';
import { IProfileCardAdaptiveCardExtensionProps, IProfileCardAdaptiveCardExtensionState } from '../ProfileCardAdaptiveCardExtension';

export class CardView extends BaseImageCardView<IProfileCardAdaptiveCardExtensionProps, IProfileCardAdaptiveCardExtensionState> {
  public get data(): IImageCardParameters {
    return {
      primaryText: this.state.userPresence,
      imageUrl: this.state.photo
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://www.bing.com'
      }
    };
  }
}
