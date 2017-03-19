/**
 * AutoScroll simply hooks up mouse events given a parent element, and scrolls the container
 * up/down depending on how close the mouse is to the top/bottom of the container.
 *
 * Once you don't want autoscroll any more, just dispose the helper and it will unhook events.
 */
export declare class AutoScroll {
    private _events;
    private _scrollableParent;
    private _scrollRect;
    private _scrollVelocity;
    private _timeoutId;
    constructor(element: HTMLElement);
    dispose(): void;
    private _onMouseMove(ev);
    private _startScroll();
    private _incrementScroll();
    private _stopScroll();
}
