import { IHttpClient } from "../dal/http/IHttpClient";
import { INews, NewsProvider } from "../dal/NewsProvider";
import { IComment, SocialInfoHelper } from "../dal/SocialInfoHelper";
import { ITeam, ITeamsChannel, TeamsHelper } from "../dal/TeamsHelper";

export class NewsManager{
    constructor(protected newsProvider: NewsProvider, protected socialInfoHelper: SocialInfoHelper, protected teamsHelper: TeamsHelper){

    }
    public async getNews(): Promise<INews[]>{
        return this.newsProvider.getData();
    }
    public async likeNews(news: INews): Promise<void>{
        await this.socialInfoHelper.likeNews(news);
    }
    public async commentNews(news: INews, comment: string): Promise<void>{
        await this.socialInfoHelper.commentNews(news, comment);
    }
    public async loadComments(news:INews):Promise<IComment[]>{
        return this.socialInfoHelper.loadComments(news);
    }
    public async getJoinedTeams():Promise<ITeam[]>{
        return this.teamsHelper.getTeams();
    }
    public async getChannels(teamId:string):Promise<ITeamsChannel[]>{
        return this.teamsHelper.getTeamsChannels(teamId);
    }
    public async shareNews(news:INews, teamId:string, channelId:string):Promise<void>{
        let newsACE = {
            "schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.2",
            "body": [
              {
                "type": "TextBlock",
                "weight": "Bolder",
                "text": news.title
              },
              {
                "type": "Image",
                "size": "Stretch",
                "url": news.pictureThumbnailURL
              },
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "TextBlock",
                        "weight": "Bolder",
                        "text": `By ${news.author} on ${(new Date(news.firstPublishedDateOWSDATE)).toLocaleDateString()}`,
                        "wrap": true
                      }
                    ]
                  }
                ]
              },
              {
                "type": "TextBlock",
                "text": news.description,
                "wrap": true
              }]
            }
        await this.teamsHelper.postNewsCard(newsACE, teamId, channelId);
    }
}