import { INewsView } from "../INewsView";

export interface IViewActionHandler {
    shouldHandleAction(action: { id: string, data?: any }): boolean;
    handleAction(action: { id: string, data?: any }, quickView: INewsView): void;
}