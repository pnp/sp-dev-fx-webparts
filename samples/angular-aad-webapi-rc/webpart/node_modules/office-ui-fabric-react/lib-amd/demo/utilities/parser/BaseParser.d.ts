/**
 * Base for a parser - does not actually do any parsing.
 */
export declare class BaseParser {
    private _currLocation;
    private _str;
    private _strLength;
    constructor(_str: string);
    protected eat(match: string): string;
    protected eatSpacesAndNewlines(): string;
    protected eatWhile(match: string): string;
    protected eatWhileRegex(match: RegExp): string;
    protected eatWord(word: string): string;
    protected eatUntil(match: RegExp): string;
    protected peek(): string;
    protected peekAhead(by: number): string;
    protected hasNext(): boolean;
    /**
     * Advances the stream if possible.
     *
     * @protected
     * @returns {string} The token that was advanced over, or undefined if it wasn't possible to advance.
     */
    protected next(): string;
    protected reset(): void;
}
