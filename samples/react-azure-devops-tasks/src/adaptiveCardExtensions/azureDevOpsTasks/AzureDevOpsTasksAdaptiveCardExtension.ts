import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { AzureDevOpsTasksPropertyPane } from './AzureDevOpsTasksPropertyPane';
import AzureDevOpsClientService from './services/AzureDevOpsClientService';

export interface IAzureDevOpsTasksAdaptiveCardExtensionProps {
  title: string;
}

export interface IAzureDevOpsTasksAdaptiveCardExtensionState {
  tasks: unknown[];
}

const CARD_VIEW_REGISTRY_ID: string = 'AzureDevOpsTasks_CARD_VIEW';

export default class AzureDevOpsTasksAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IAzureDevOpsTasksAdaptiveCardExtensionProps,
  IAzureDevOpsTasksAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: AzureDevOpsTasksPropertyPane | undefined;

  public async onInit(): Promise<void> {
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());

    const client = await AzureDevOpsClientService.create(this.context);
    const profile = await client.getProfile();
    const accounts = await client.getAccounts(profile.id);
    const tasks = [];
    for (const account of accounts) {
      tasks.push(...(await client.getAssignedTasks(account.accountName)));
    }

    this.state = {
      tasks: tasks
    };
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'AzureDevOpsTasks-property-pane'*/
      './AzureDevOpsTasksPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.AzureDevOpsTasksPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane?.getPropertyPaneConfiguration();
  }
}
