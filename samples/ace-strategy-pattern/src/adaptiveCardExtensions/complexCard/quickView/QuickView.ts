import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'ComplexCardAdaptiveCardExtensionStrings';
import { IComment } from '../../../dal/SocialInfoHelper';
import { NewsManager } from '../../../manager/NewsManager';
import { INewsView } from '../../../manager/viewManager/INewsView';
import { NewsQuickViewManager } from '../../../manager/viewManager/NewsQuickViewManager';
import { IComplexCardAdaptiveCardExtensionProps, IComplexCardAdaptiveCardExtensionState } from '../ComplexCardAdaptiveCardExtension';

export interface IQuickViewData extends IComplexCardAdaptiveCardExtensionState {
  subTitle: string;
  title: string;
  description: string;
  newsThumbnail: string;
  joinedTeamsOptions: {title: string, value: string}[];
  channelsOptions: {title: string, value: string}[];
}

export class QuickView extends BaseAdaptiveCardView<
  IComplexCardAdaptiveCardExtensionProps,
  IComplexCardAdaptiveCardExtensionState,
  IQuickViewData
> implements INewsView {
  protected viewManager: NewsQuickViewManager;
  constructor(protected newsManager: NewsManager) {
    super();
    this.viewManager = new NewsQuickViewManager(newsManager);
  }
  public get data(): IQuickViewData {
    let news = this.state.news[this.state.selectedNewsIndex];
    let joinedTeamsOptions = this.state.joinedTeams ? this.state.joinedTeams.map((team)=>({
      title: team.displayName,
      value: team.id
    })) : [];
    let channelsOptions = this.state.selectedTeamChannels ? this.state.selectedTeamChannels.map((team)=>({
      title: team.displayName,
      value: team.id
    })) : [];
    
    return {
      ...this.state,
      subTitle: `By ${news.author} on ${(new Date(news.firstPublishedDateOWSDATE)).toLocaleDateString()}`,
      title: `${news.title} (${this.state.selectedNewsIndex + 1}/${this.state.news.length})`,
      description: news.description,
      newsThumbnail: news.pictureThumbnailURL,
      joinedTeamsOptions,
      channelsOptions
    };
  }

  public get template(): ISPFxAdaptiveCard {
    return require('./template/QuickViewTemplate.json');
  }
  public onAction(action: IActionArguments): void {
    this.viewManager.handleAction(action as any, this);
  }
}