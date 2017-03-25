import * as React from 'react';
import { IFocusZone, IFocusZoneProps } from './FocusZone.Props';
import { BaseComponent } from '../../Utilities';
export declare class FocusZone extends BaseComponent<IFocusZoneProps, {}> implements IFocusZone {
    static defaultProps: IFocusZoneProps;
    refs: {
        [key: string]: React.ReactInstance;
        root: HTMLElement;
    };
    private _id;
    private _activeElement;
    private _focusAlignment;
    private _isInnerZone;
    constructor(props: any);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    /**
     * Sets focus to the first tabbable item in the zone.
     * @returns True if focus could be set to an active element, false if no operation was taken.
     */
    focus(): boolean;
    /**
     * Sets focus to a specific child element within the zone. This can be used in conjunction with
     * onBeforeFocus to created delayed focus scenarios (like animate the scroll position to the correct
     * location and then focus.)
     * @param {HTMLElement} element The child element within the zone to focus.
     * @returns True if focus could be set to an active element, false if no operation was taken.
     */
    focusElement(element: HTMLElement): boolean;
    private _onFocus(ev);
    /**
     * Handle global tab presses so that we can patch tabindexes on the fly.
     */
    private _onKeyDownCapture(ev);
    private _onMouseDown(ev);
    /**
     * Handle the keystrokes.
     */
    private _onKeyDown(ev);
    /**
     * Walk up the dom try to find a focusable element.
     */
    private _tryInvokeClickForFocusable(target);
    /**
     * Traverse to find first child zone.
     */
    private _getFirstInnerZone(rootElement?);
    private _moveFocus(isForward, getDistanceFromCenter, ev?);
    private _moveFocusDown();
    private _moveFocusUp();
    private _moveFocusLeft();
    private _moveFocusRight();
    private _setFocusAlignment(element, isHorizontal?, isVertical?);
    private _isImmediateDescendantOfZone(element?);
    private _updateTabIndexes(element?);
    private _isElementInput(element);
    private _shouldInputLoseFocus(element, isForward?);
}
