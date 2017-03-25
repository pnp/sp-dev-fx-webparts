/**
 * @license
 * Copyright 2013 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import * as ts from "typescript";
import { Fix, IOptions, Replacement, RuleFailure } from "../rule/rule";
import { SyntaxWalker } from "./syntaxWalker";
export declare class RuleWalker extends SyntaxWalker {
    private sourceFile;
    private limit;
    private position;
    private options;
    private failures;
    private disabledIntervals;
    private ruleName;
    constructor(sourceFile: ts.SourceFile, options: IOptions);
    getSourceFile(): ts.SourceFile;
    getFailures(): RuleFailure[];
    getLimit(): number;
    getOptions(): any;
    hasOption(option: string): boolean;
    skip(node: ts.Node): void;
    createFailure(start: number, width: number, failure: string, fix?: Fix): RuleFailure;
    addFailure(failure: RuleFailure): void;
    createReplacement(start: number, length: number, text: string): Replacement;
    appendText(start: number, text: string): Replacement;
    deleteText(start: number, length: number): Replacement;
    private existsFailure(failure);
}
