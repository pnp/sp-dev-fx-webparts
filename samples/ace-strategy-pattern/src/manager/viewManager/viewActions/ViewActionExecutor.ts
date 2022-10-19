import { INewsView } from "../INewsView";
import { AddCommentAction } from "./AddCommentAction";
import { IViewActionHandler } from "./IViewActionHandler";
import { LikePostAction } from "./LikePostAction";
import { NavigateAction } from "./NavigateAction";
import { PostInTeamsAction } from "./PostInTeamsAction";

export class ViewActionExecutor {
    public actions: IViewActionHandler[];
    constructor(newsManager) {
        this.actions = [
            new NavigateAction(newsManager),
            new AddCommentAction(newsManager),
            new LikePostAction(newsManager),
            new PostInTeamsAction(newsManager)
        ];
    }
    public handleAction(action: { id: string; data?: any; }, quickView: INewsView): void {
        this.actions.forEach((handler) => {
            if (handler.shouldHandleAction(action)) {
                handler.handleAction(action, quickView);
            }
        });
    }
}