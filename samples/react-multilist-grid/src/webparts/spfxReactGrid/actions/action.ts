// http://www.mattgreer.org/articles/typescript-react-and-redux/
export interface Action<T> {
   readonly type: string;
    readonly payload: T;
    error?: boolean;
    meta?: any;
}
interface ActionCreator<T> {
  readonly type: string;
  (payload: T): Action<T>;
}
