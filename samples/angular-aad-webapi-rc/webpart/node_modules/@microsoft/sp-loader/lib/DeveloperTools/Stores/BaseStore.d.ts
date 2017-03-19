/**
 * @file BaseStore.ts
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 */
/**
 * Contains common implementation for store
 */
export default class BaseStore {
    private _listeners;
    private _isDisposed;
    /**
     * Initializes a new instance of BaseStore
     */
    constructor();
    /**
     * Add a listener to this store
     * @param the listener callback
     */
    addListener(listener: () => void): void;
    /**
     * Removes a listener from the store
     * @param the listener callback
     */
    removeListener(listener: () => void): void;
    /**
     * Removes all the registered listeners
     */
    removeAllListeners(): void;
    /**
     * Removes a listener from the store
     * @param the listener callback
     *
     * @return the count of listeners tied to this store
     */
    count(): number;
    /**
     * Invokes all listeners tied to this store
     */
    emitChange(): void;
    /**
     * Disposes all listeners
     */
    dispose(): void;
}
