import * as Lint from 'tslint';
export declare module TestHelper {
    let RULES_DIRECTORY: string;
    let FORMATTER_DIRECTORY: string;
    let FILE_ENCODING: string;
    interface FailurePosition {
        character: number;
        line: number;
        position?: number;
    }
    interface ExpectedFailure {
        ruleName: string;
        name: string;
        failure: string;
        endPosition?: FailurePosition;
        startPosition: FailurePosition;
    }
    function assertNoViolation(ruleName: string, inputFileOrScript: string): void;
    function assertNoViolationWithOptions(ruleName: string, options: any[], inputFileOrScript: string): void;
    function assertViolationsWithOptions(ruleName: string, options: any[], inputFileOrScript: string, expectedFailures: ExpectedFailure[]): void;
    function assertViolations(ruleName: string, inputFileOrScript: string, expectedFailures: ExpectedFailure[]): void;
    function runRule(ruleName: string, userOptions: string[], inputFileOrScript: string): Lint.LintResult;
}
