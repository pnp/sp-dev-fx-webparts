import { IPropertyPaneConfiguration } from '@microsoft/sp-property-pane';
import { BaseAdaptiveCardExtension } from '@microsoft/sp-adaptive-card-extension-base';
import { CardView } from './cardView/CardView';
import { QuickView } from './quickView/QuickView';
import { ComplexCardPropertyPane } from './ComplexCardPropertyPane';
import { INews, NewsProvider } from '../../dal/NewsProvider';
import { SPFxHttpClient } from '../../dal/http/SPFxHttpClient';
import { SPPFxSPHttpClient } from '../../dal/http/SPPFxSPHttpClient';
import { NewsManager } from "../../manager/NewsManager";
import { IComment, SocialInfoHelper } from '../../dal/SocialInfoHelper';
import { ITeam, ITeamsChannel, TeamsHelper } from '../../dal/TeamsHelper';

export interface IComplexCardAdaptiveCardExtensionProps {
  title: string;
}

export interface IComplexCardAdaptiveCardExtensionState {
  news: INews[];
  selectedNewsIndex: number;
  selectedNewsComments?:IComment[];
  joinedTeams?: ITeam[];
  selectedTeamIndex?: number;
  selectedTeamChannels?: ITeamsChannel[];
  commentInputVisible?: boolean;
  showTeams?: boolean;
  showChannels?: boolean;
  selectedTeamId?: string;
  selectedChannelId?: string;
}

const CARD_VIEW_REGISTRY_ID: string = 'ComplexCard_CARD_VIEW';
export const QUICK_VIEW_REGISTRY_ID: string = 'ComplexCard_QUICK_VIEW';

export default class ComplexCardAdaptiveCardExtension extends BaseAdaptiveCardExtension<
  IComplexCardAdaptiveCardExtensionProps,
  IComplexCardAdaptiveCardExtensionState
> {
  private _deferredPropertyPane: ComplexCardPropertyPane | undefined;

  public async onInit(): Promise<void> {
    let tempGraphClient = await this.context.aadHttpClientFactory.getClient("https://graph.microsoft.com");
    let graphClient = new SPFxHttpClient(tempGraphClient);
    let spHttpClient = new SPPFxSPHttpClient(this.context.spHttpClient);
    let newsProvider = new NewsProvider(graphClient);
    let socialInfoHelper = new SocialInfoHelper(spHttpClient);
    let teamsHelper = new TeamsHelper(graphClient);
    let newsManager = new NewsManager(newsProvider, socialInfoHelper, teamsHelper);
    let news = await newsManager.getNews();
    let newsComments = await newsManager.loadComments(news[0]);
    this.cardNavigator.register(CARD_VIEW_REGISTRY_ID, () => new CardView());
    this.quickViewNavigator.register(QUICK_VIEW_REGISTRY_ID, () => new QuickView(newsManager));

    this.state = {
      news,
      selectedNewsIndex: 0,
      selectedNewsComments: newsComments
    };
    return Promise.resolve();
  }

  protected loadPropertyPaneResources(): Promise<void> {
    return import(
      /* webpackChunkName: 'ComplexCard-property-pane'*/
      './ComplexCardPropertyPane'
    )
      .then(
        (component) => {
          this._deferredPropertyPane = new component.ComplexCardPropertyPane();
        }
      );
  }

  protected renderCard(): string | undefined {
    return CARD_VIEW_REGISTRY_ID;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return this._deferredPropertyPane!.getPropertyPaneConfiguration();
  }
}
