import * as React from 'react';
import { BaseComponent } from '../../common/BaseComponent';
export declare class BaseDecorator<P, S> extends BaseComponent<P, S> {
    protected _composedComponentInstance: React.Component<P, S>;
    private _hoisted;
    constructor();
    /**
     * Updates the ref to the component composed by the decorator, which will also take care of hoisting
     * (and unhoisting as appropriate) methods from said component.
     *
     * Pass this method as the argument to the 'ref' property of the composed component.
     */
    protected _updateComposedComponentRef(composedComponentInstance: React.Component<P, S>): void;
}
