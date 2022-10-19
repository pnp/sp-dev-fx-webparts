export interface IView<T>{
    state: T;
    setState(state: Partial<T>): void;
}