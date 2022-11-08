import { ISPFxAdaptiveCard, BaseAdaptiveCardView, IActionArguments } from '@microsoft/sp-adaptive-card-extension-base';
import * as strings from 'ComplexCardAdaptiveCardExtensionStrings';
import { IComment } from '../../../dal/SocialInfoHelper';
import { NewsManager } from '../../../manager/NewsManager';
import { IComplexCardAdaptiveCardExtensionProps, IComplexCardAdaptiveCardExtensionState } from '../ComplexCardAdaptiveCardExtension';

export interface IQuickViewData extends IComplexCardAdaptiveCardExtensionState {
  subTitle: string;
  title: string;
  description: string;
  newsThumbnail: string;
  joinedTeamsOptions: {title: string, value: string}[];
  channelsOptions: {title: string, value: string}[];
}

export class QuickViewBeforeRefactoring extends BaseAdaptiveCardView<
  IComplexCardAdaptiveCardExtensionProps,
  IComplexCardAdaptiveCardExtensionState,
  IQuickViewData
> {

  constructor(protected newsManager: NewsManager) {
    super();
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
    if (action.id === "next") {
      let newIndex = (this.state.selectedNewsIndex + 1) % this.state.news.length;
      this.setState({ selectedNewsIndex: newIndex, selectedNewsComments:[] });
      this.newsManager.loadComments(this.state.news[newIndex]).then((comments) => {
        this.setState({ selectedNewsComments: comments });
      });
    }
    if (action.id === "previous") {
      let newIndex = (this.state.selectedNewsIndex - 1) % this.state.news.length;
      this.setState({ selectedNewsIndex: newIndex, selectedNewsComments:[] });
      this.newsManager.loadComments(this.state.news[newIndex]).then((comments) => {
        this.setState({ selectedNewsComments: comments });
      });
    }
    if(action.id === "showAddCommentInput"){
        this.setState({commentInputVisible: true});
    }
    if(action.id === "addComment"){
      let commentText = (action as any).data.newCommentInput;
      this.newsManager.commentNews(this.state.news[this.state.selectedNewsIndex], commentText).then(()=>{
        let comments = this.state.selectedNewsComments;
        comments.unshift({
            author:{
              name: "You"
            } as any,
            text: commentText
        })
        this.setState({selectedNewsComments:comments, commentInputVisible: false});
      });
    }
    if(action.id === "likePost"){
      this.newsManager.likeNews(this.state.news[this.state.selectedNewsIndex]).then(()=>{
      });
    }
    if(action.id === "loadTeams"){
      this.newsManager.getJoinedTeams().then((teams)=>{
        this.setState({joinedTeams:teams, showTeams: true});
      });
    }
    if(action.id === "showSelectChannel"){
      let teamId = (action as any).data.selectTeamsDD;
      this.newsManager.getChannels(teamId).then((channels)=>{
        this.setState({selectedTeamChannels: channels, showChannels: true, selectedTeamId: teamId});
      });
    }
    if(action.id === "shareInSelectedChannel"){
      let channelId = (action as any).data.selectChannelDD;
      this.newsManager.shareNews(this.state.news[this.state.selectedNewsIndex], this.state.selectedTeamId, channelId).then(()=>{
        this.setState({selectedTeamId: null,selectedTeamChannels: [], showTeams: false, showChannels: false});
      });
    }
  }
}