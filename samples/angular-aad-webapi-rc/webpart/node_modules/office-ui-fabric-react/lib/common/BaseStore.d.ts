import { ISubscribable } from './ISubscribable';
import { IDisposable } from './IDisposable';
export declare class BaseStore implements ISubscribable {
    private _callbacks;
    constructor();
    subscribe(onChange: () => void): IDisposable;
    protected emitChange(): void;
}
