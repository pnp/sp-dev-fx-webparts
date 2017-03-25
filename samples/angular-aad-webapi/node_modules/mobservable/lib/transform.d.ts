export declare type ITransformer<A, B> = (object: A) => B;
export declare function createTransformer<A, B>(transformer: ITransformer<A, B>, onCleanup?: (resultObject: B, sourceObject?: A) => void): ITransformer<A, B>;
