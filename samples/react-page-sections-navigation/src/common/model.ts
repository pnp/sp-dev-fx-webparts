/**
 * Anchor interface to be transferred to the "master" web part
 */
export interface IAnchorItem {
    /**
     * Title
     */
    title?: string;
    /**
     * Unique Id
     */
    uniqueId?: string;
    //scrollTop?: number;
    /**
     * DOM element
     */
    domElement?: HTMLElement;
}