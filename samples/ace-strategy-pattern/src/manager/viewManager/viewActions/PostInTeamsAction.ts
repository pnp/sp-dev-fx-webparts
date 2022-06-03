import { NewsManager } from "../../NewsManager";
import { INewsView } from "../INewsView";
import { IViewActionHandler } from "./IViewActionHandler";

export class PostInTeamsAction implements IViewActionHandler {
    constructor(protected newsManager: NewsManager) {
    }
    shouldHandleAction(action: { id: string; data?: any; }): boolean {
        return action.id === "loadTeams" || action.id === "showSelectChannel" || action.id === "shareInSelectedChannel";
    }
    handleAction(action: { id: string; data?: any; }, quickView: INewsView): void {
        if (action.id === "loadTeams") {
            this.newsManager.getJoinedTeams().then((teams) => {
                quickView.setState({ joinedTeams: teams, showTeams: true });
            });
        }
        if (action.id === "showSelectChannel") {
            let teamId = (action as any).data.selectTeamsDD;
            this.newsManager.getChannels(teamId).then((channels) => {
                quickView.setState({ selectedTeamChannels: channels, showChannels: true, selectedTeamId: teamId });
            });
        }
        if (action.id === "shareInSelectedChannel") {
            let channelId = (action as any).data.selectChannelDD;
            this.newsManager.shareNews(quickView.state.news[quickView.state.selectedNewsIndex], quickView.state.selectedTeamId, channelId).then(() => {
                quickView.setState({ selectedTeamId: null, selectedTeamChannels: [], showTeams: false, showChannels: false });
            });
        }
    }

}