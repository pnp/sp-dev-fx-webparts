import { NewsManager } from "../NewsManager";
import { INewsView } from "./INewsView";
import { ViewActionExecutor } from "./viewActions/ViewActionExecutor";

export class NewsQuickViewManager{
    protected actionExecutor: ViewActionExecutor;
    constructor(protected newsManger: NewsManager){
        this.actionExecutor = new ViewActionExecutor(this.newsManger);
    }

    public handleAction(action: {id: string, data?: any}, quickView: INewsView){
        this.actionExecutor.handleAction(action, quickView);
    }
}