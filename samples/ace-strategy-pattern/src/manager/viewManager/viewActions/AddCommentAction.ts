import { NewsManager } from "../../NewsManager";
import { INewsView } from "../INewsView";
import { IViewActionHandler } from "./IViewActionHandler";

export class AddCommentAction implements IViewActionHandler{
    constructor(protected newsManager: NewsManager) {
    }
    shouldHandleAction(action: { id: string; data?: any; }): boolean {
        return action.id === "showAddCommentInput" || action.id === "addComment";
    }
    handleAction(action: { id: string; data?: any; }, quickView: INewsView): void {
        if(action.id === "showAddCommentInput"){
            quickView.setState({commentInputVisible: true});
        }
        if(action.id === "addComment"){
          let commentText = (action as any).data.newCommentInput;
          this.newsManager.commentNews(quickView.state.news[quickView.state.selectedNewsIndex], commentText).then(()=>{
            let comments = quickView.state.selectedNewsComments;
            comments.unshift({
                author:{
                  name: "You"
                } as any,
                text: commentText
            })
            quickView.setState({selectedNewsComments:comments, commentInputVisible: false});
          });
        }
    }

}