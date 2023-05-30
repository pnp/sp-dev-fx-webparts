import {
  BaseBasicCardView,
  IBasicCardParameters,
  IExternalLinkCardAction,
  IQuickViewCardAction,
  ICardButton
} from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'AzureDevOpsTasksAdaptiveCardExtensionStrings';
import {
  IAzureDevOpsTasksAdaptiveCardExtensionProps,
  IAzureDevOpsTasksAdaptiveCardExtensionState
} from '../AzureDevOpsTasksAdaptiveCardExtension';

export class CardView extends BaseBasicCardView<IAzureDevOpsTasksAdaptiveCardExtensionProps, IAzureDevOpsTasksAdaptiveCardExtensionState> {
  public get cardButtons(): [ICardButton] | [ICardButton, ICardButton] | undefined {
    return [
      {
        title: strings.QuickViewButton,
        action: {
          type: 'ExternalLink',
          parameters: {
            target: 'https://dev.azure.com/'
          }
        }
      }
    ];
  }

  public get data(): IBasicCardParameters {
    return {
      primaryText: this.state.tasks.length > 0
        ? strings.PrimaryText1.replace(/{{tasks}}/, this.state.tasks.length.toString())
        : strings.PrimaryText2,
      title: this.properties.title
    };
  }

  public get onCardSelection(): IQuickViewCardAction | IExternalLinkCardAction | undefined {
    return {
      type: 'ExternalLink',
      parameters: {
        target: 'https://dev.azure.com/'
      }
    };
  }
}
