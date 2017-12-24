/**
 * Allowed Token types.
 */
export declare enum TokenType {
    /**
     * A Token that contains only text.
     */
    Text = 0,
    /**
     * A Token representing an AEDoc block tag.
     * Example: \@public, \@remarks, etc.
     */
    BlockTag = 1,
    /**
     * A Token representing an AEDoc inline tag.  Inline tags must be enclosed in
     * curly braces, which may include parameters.
     *
     * Example:
     * \{@link http://microosft.com | microsoft home \}
     * \{@inheritdoc  @ microsoft/sp-core-library:Guid.newGuid \}
     */
    InlineTag = 2,
}
/**
 * A structured object created from a doc comment string within an AEDoc comment block.
 */
export default class Token {
    /**
     * The type of the token.
     */
    private _type;
    /**
     * This is not used for Text.
     */
    private _tag;
    /**
     * For inline tags, this is the parameter.
     * For text it is the text.
     */
    private _text;
    constructor(type: TokenType, tag?: string, text?: string);
    /**
     * Determines if the type is not what we expect.
     */
    requireType(type: TokenType): void;
    readonly type: TokenType;
    readonly tag: string;
    readonly text: string;
    private _unescape(text);
}
