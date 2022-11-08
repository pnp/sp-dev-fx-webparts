import { NewsManager } from "../../NewsManager";
import { INewsView } from "../INewsView";
import { IViewActionHandler } from "./IViewActionHandler";

export class LikePostAction implements IViewActionHandler{
    constructor(protected newsManager: NewsManager) {
    }
    shouldHandleAction(action: { id: string; data?: any; }): boolean {
        return action.id === "likePost";
    }
    handleAction(action: { id: string; data?: any; }, quickView: INewsView): void {
        this.newsManager.likeNews(quickView.state.news[quickView.state.selectedNewsIndex]).then(()=>{
        });
    }

}