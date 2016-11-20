export interface Action<T> {
    type: string;
    payload: T;
    error?: boolean;
    meta?: any;
}
export default Action;