export interface IPagedListDataStream<T> {
    readonly results: readonly T[];
    readonly hasNext: boolean;
    readonly hasPrevious: boolean;
    next(): Promise<IPagedListDataStream<T>>;
    previous(): Promise<IPagedListDataStream<T>>;
}