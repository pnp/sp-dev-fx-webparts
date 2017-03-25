/**
 * @license
 * Copyright 2014 Palantir Technologies, Inc.
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
import { SkippableTokenAwareRuleWalker } from "./language/walker/skippableTokenAwareRuleWalker";
import { IEnableDisablePosition } from "./ruleLoader";
export declare class EnableDisableRulesWalker extends SkippableTokenAwareRuleWalker {
    enableDisableRuleMap: {
        [rulename: string]: IEnableDisablePosition[];
    };
    visitSourceFile(node: ts.SourceFile): void;
    private getStartOfLinePosition(node, position, lineOffset?);
    private handlePossibleTslintSwitch(commentText, startingPosition, node, scanner);
}
