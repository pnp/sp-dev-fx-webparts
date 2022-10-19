import { NewsManager } from "../../NewsManager";
import { INewsView } from "../INewsView";
import { IViewActionHandler } from "./IViewActionHandler";

export class NavigateAction implements IViewActionHandler {
    constructor(protected newsManager: NewsManager) {
    }
    shouldHandleAction(action: { id: string; data?: any; }): boolean {
        return action.id === "next" || action.id === "previous";
    }
    handleAction(action: { id: string; data?: any; }, quickView: INewsView): void {
        let newIndex = action.id === "next" ? (quickView.state.selectedNewsIndex + 1) % quickView.state.news.length : (quickView.state.selectedNewsIndex - 1) % quickView.state.news.length;
        quickView.setState({ selectedNewsIndex: newIndex, selectedNewsComments: [] });
        this.newsManager.loadComments(quickView.state.news[newIndex]).then((comments) => {
            quickView.setState({ selectedNewsComments: comments });
        });
    }

}