import * as ts from 'typescript';
/**
  * Some helper functions for formatting certain TypeScript Compiler API expressions.
  */
export default class PrettyPrinter {
    /**
      * Used for debugging only.  This dumps the TypeScript Compiler's abstract syntax tree.
      */
    static dumpTree(node: ts.Node, indent?: string): void;
    /**
     * Returns a text representation of the enum flags.
     */
    static getSymbolFlagsString(flags: ts.SymbolFlags): string;
    /**
     * Returns a text representation of the enum flags.
     */
    static getTypeFlagsString(flags: ts.TypeFlags): string;
    /**
      * Returns the first line of a potentially nested declaration.
      * For example, for a class definition this might return
      * "class Blah<T> extends BaseClass" without the curly braces.
      * For example, for a function definition, this might return
      * "test(): void;" without the curly braces.
      */
    static getDeclarationSummary(node: ts.Node): string;
    /**
     * Throws an exception.  Use this only for unexpected errors, as it may ungracefully terminate the process;
     * ApiItem.reportError() is generally a better option.
     */
    static throwUnexpectedSyntaxError(errorNode: ts.Node, message: string): void;
    /**
     * Returns a string such as this, based on the context information in the provided node:
     *   "[C:\Folder\File.ts#123]"
     */
    static formatFileAndLineNumber(node: ts.Node): string;
    private static _getSymbolFlagString(flag);
    private static _getTypeFlagString(flag);
    private static _getFlagsString<T>(flags, func);
    private static _wantSpaceAfter(syntaxKind);
    private static _wantSpaceBefore(syntaxKind);
}
