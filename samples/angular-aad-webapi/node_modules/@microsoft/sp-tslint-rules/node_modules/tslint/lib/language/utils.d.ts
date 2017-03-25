import * as ts from "typescript";
import { IDisabledInterval, RuleFailure } from "./rule/rule";
export declare function getSourceFile(fileName: string, source: string): ts.SourceFile;
export declare function createCompilerOptions(): ts.CompilerOptions;
export declare function doesIntersect(failure: RuleFailure, disabledIntervals: IDisabledInterval[]): boolean;
export declare function scanAllTokens(scanner: ts.Scanner, callback: (s: ts.Scanner) => void): void;
/**
 * @returns true if any modifier kinds passed along exist in the given modifiers array
 */
export declare function hasModifier(modifiers: ts.ModifiersArray, ...modifierKinds: ts.SyntaxKind[]): boolean;
/**
 * Determines if the appropriate bit in the parent (VariableDeclarationList) is set,
 * which indicates this is a "let" or "const".
 */
export declare function isBlockScopedVariable(node: ts.VariableDeclaration | ts.VariableStatement): boolean;
export declare function isBlockScopedBindingElement(node: ts.BindingElement): boolean;
export declare function getBindingElementVariableDeclaration(node: ts.BindingElement): ts.VariableDeclaration;
/**
 * @returns true if some ancestor of `node` satisfies `predicate`, including `node` itself.
 */
export declare function someAncestor(node: ts.Node, predicate: (n: ts.Node) => boolean): boolean;
/**
 * Bitwise check for node flags.
 */
export declare function isNodeFlagSet(node: ts.Node, flagToCheck: ts.NodeFlags): boolean;
/**
 * @returns true if decl is a nested module declaration, i.e. represents a segment of a dotted module path.
 */
export declare function isNestedModuleDeclaration(decl: ts.ModuleDeclaration): boolean;
