import * as ts from "typescript";
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    static FAILURE_STRING_ARRAY: string;
    static FAILURE_STRING_GENERIC: string;
    static FAILURE_STRING_ARRAY_SIMPLE: string;
    static FAILURE_STRING_GENERIC_SIMPLE: string;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
