import * as React from 'react';
import { Async } from '../utilities/Async/Async';
import { EventGroup } from '../utilities/eventGroup/EventGroup';
import { IDisposable } from './IDisposable';
export declare class BaseComponent<P, S> extends React.Component<P, S> {
    /**
     * External consumers should override BaseComponent.onError to hook into error messages that occur from
     * exceptions thrown from within components.
     */
    static onError: ((errorMessage?: string, ex?: any) => void);
    private __async;
    private __events;
    private __disposables;
    private __resolves;
    /**
     * BaseComponent constructor
     * @param {P} props The props for the component.
     * @param {Object} deprecatedProps The map of deprecated prop names to new names, where the key is the old name and the
     * value is the new name. If a prop is removed rather than renamed, leave the value undefined.
     */
    constructor(props?: P, deprecatedProps?: {
        [propName: string]: string;
    });
    /** If we have disposables, dispose them automatically on unmount. */
    componentWillUnmount(): void;
    /** Gets the object's class name. */
    readonly className: string;
    /** Allows subclasses to push things to this._disposables to be auto disposed. */
    protected readonly _disposables: IDisposable[];
    /**
     * Gets the async instance associated with the component, created on demand. The async instance gives
     * subclasses a way to execute setTimeout/setInterval async calls safely, where the callbacks
     * will be cleared/ignored automatically after unmounting. The helpers within the async object also
     * preserve the this pointer so that you don't need to "bind" the callbacks.
     */
    protected readonly _async: Async;
    /**
     * Gets the event group instance assocaited with the component, created on demand. The event instance
     * provides on/off methods for listening to DOM (or regular javascript object) events. The event callbacks
     * will be automatically disconnected after unmounting. The helpers within the events object also
     * preserve the this reference so that you don't need to "bind" the callbacks.
     */
    protected readonly _events: EventGroup;
    /**
     * Helper to return a memoized ref resolver function.
     * @params refName Name of the member to assign the ref to.
     *
     * @examples
     * class Foo extends BaseComponent<...> {
     *   private _root: HTMLElement;
     *
     *   public render() {
     *     return <div ref={ this._resolveRef('_root') } />
     *   }
     * }
     */
    protected _resolveRef(refName: string): (ref: any) => any;
}
