export interface IDeferred<T> {
  resolve: (result: T) => void;
  reject: (err: T) => void;
  promise: Promise<T>;
}

export function defer<T>(): IDeferred<T> {
    let resolve: (result: T) => void;
    let reject: (err: T) => void;

    const promise: Promise<T> = new Promise<T>((cbResolve, cbReject): void => {
        resolve = cbResolve;
        reject = cbReject;
    });

    return {
        resolve: resolve,
        reject: reject,
        promise: promise
    };
}