/**
 * Gets the rtl state of the page (returns true if in rtl.)
 */
export declare function getRTL(): boolean;
/**
 * Sets the rtl state of the page (by adjusting the dir attribute of the html element.)
 */
export declare function setRTL(isRTL: boolean): void;
/**
 * Returns the given key, but flips right/left arrows if necessary.
 */
export declare function getRTLSafeKeyCode(key: number): number;
