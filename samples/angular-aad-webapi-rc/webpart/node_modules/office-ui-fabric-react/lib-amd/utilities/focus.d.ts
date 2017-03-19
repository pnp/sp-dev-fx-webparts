export declare function getFirstFocusable(rootElement: HTMLElement, currentElement: HTMLElement, includeElementsInFocusZones?: boolean): HTMLElement;
export declare function getLastFocusable(rootElement: HTMLElement, currentElement: HTMLElement, includeElementsInFocusZones?: boolean): HTMLElement;
/**
 * Attempts to focus the first focusable element that is a child or child's child of the rootElement.
 * @return True if focus was set, false if it was not.
 * @param {HTMLElement} rootElement - element to start the search for a focusable child.
 */
export declare function focusFirstChild(rootElement: HTMLElement): boolean;
/** Traverse to find the previous element. */
export declare function getPreviousElement(rootElement: HTMLElement, currentElement: HTMLElement, checkNode?: boolean, suppressParentTraversal?: boolean, traverseChildren?: boolean, includeElementsInFocusZones?: boolean): HTMLElement;
/** Traverse to find the next focusable element. */
export declare function getNextElement(rootElement: HTMLElement, currentElement: HTMLElement, checkNode?: boolean, suppressParentTraversal?: boolean, suppressChildTraversal?: boolean, includeElementsInFocusZones?: boolean): HTMLElement;
export declare function isElementVisible(element: HTMLElement): boolean;
export declare function isElementTabbable(element: HTMLElement): boolean;
export declare function isElementFocusZone(element?: HTMLElement): boolean;
export declare function doesElementContainFocus(element: HTMLElement): boolean;
