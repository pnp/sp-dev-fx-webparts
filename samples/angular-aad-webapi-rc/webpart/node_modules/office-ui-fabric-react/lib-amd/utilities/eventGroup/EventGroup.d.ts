export interface IEventRecord {
    target: any;
    eventName: string;
    parent: any;
    callback: (args?: any) => void;
    elementCallback: (...args: any[]) => void;
    objectCallback: (args?: any) => void;
    useCapture: boolean;
}
export interface IEventRecordsByName {
    [eventName: string]: IEventRecordList;
}
export interface IEventRecordList {
    [id: string]: IEventRecord[] | number;
    count: number;
}
export interface IDeclaredEventsByName {
    [eventName: string]: boolean;
}
/** An instance of EventGroup allows anything with a handle to it to trigger events on it.
 *  If the target is an HTMLElement, the event will be attached to the element and can be
 *  triggered as usual (like clicking for onclick).
 *  The event can be triggered by calling EventGroup.raise() here. If the target is an
 *  HTMLElement, the event gets raised and is handled by the browser. Otherwise, it gets
 *  handled here in EventGroup, and the handler is called in the context of the parent
 *  (which is passed in in the constructor).
 */
export declare class EventGroup {
    private static _uniqueId;
    private _parent;
    private _eventRecords;
    private _id;
    private _isDisposed;
    /** For IE8, bubbleEvent is ignored here and must be dealt with by the handler.
     *  Events raised here by default have bubbling set to false and cancelable set to true.
     *  This applies also to built-in events being raised manually here on HTMLElements,
     *  which may lead to unexpected behavior if it differs from the defaults.
     */
    static raise(target: any, eventName: string, eventArgs?: any, bubbleEvent?: boolean): any;
    static isObserved(target: any, eventName: string): boolean;
    /** Check to see if the target has declared support of the given event. */
    static isDeclared(target: any, eventName: string): boolean;
    static stopPropagation(event: any): void;
    private static _isElement(target);
    /** parent: the context in which events attached to non-HTMLElements are called */
    constructor(parent: any);
    dispose(): void;
    /** On the target, attach a set of events, where the events object is a name to function mapping. */
    onAll(target: any, events: {
        [key: string]: (args?: any) => void;
    }, useCapture?: boolean): void;
    /** On the target, attach an event whose handler will be called in the context of the parent
     * of this instance of EventGroup.
     */
    on(target: any, eventName: string, callback: (args?: any) => void, useCapture?: boolean): void;
    off(target?: any, eventName?: string, callback?: (args?: any) => void, useCapture?: boolean): void;
    /** Trigger the given event in the context of this instance of EventGroup. */
    raise(eventName: string, eventArgs?: any, bubbleEvent?: boolean): any;
    /** Declare an event as being supported by this instance of EventGroup. */
    declare(event: any): void;
}
