export interface Action<T> {
    type: string;
    payload: T;
    error?: boolean;
    meta?: any;
}
export class ActionInit implements Action<any> {
    type = "INIT";
    payload = {};
}
