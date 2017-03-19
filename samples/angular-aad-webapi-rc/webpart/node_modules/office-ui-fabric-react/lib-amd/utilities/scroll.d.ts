export declare const DATA_IS_SCROLLABLE_ATTRIBUTE: string;
/** Calculates the width of a scrollbar for the browser/os. */
export declare function getScrollbarWidth(): number;
/**
 * Traverses up the DOM for the element with the data-is-scrollable=true attribute, or returns
 * document.body.
 */
export declare function findScrollableParent(startingElement: HTMLElement): HTMLElement;
