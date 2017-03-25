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
import * as Lint from "../index";
export declare class Rule extends Lint.Rules.AbstractRule {
    static metadata: Lint.IRuleMetadata;
    apply(sourceFile: ts.SourceFile): Lint.RuleFailure[];
}
export declare class MemberOrderingWalker extends Lint.RuleWalker {
    private previousMember;
    private memberStack;
    private hasOrderOption;
    visitClassDeclaration(node: ts.ClassDeclaration): void;
    visitClassExpression(node: ts.ClassExpression): void;
    visitInterfaceDeclaration(node: ts.InterfaceDeclaration): void;
    visitMethodDeclaration(node: ts.MethodDeclaration): void;
    visitMethodSignature(node: ts.SignatureDeclaration): void;
    visitConstructorDeclaration(node: ts.ConstructorDeclaration): void;
    visitPropertyDeclaration(node: ts.PropertyDeclaration): void;
    visitPropertySignature(node: ts.PropertyDeclaration): void;
    visitTypeLiteral(_node: ts.TypeLiteralNode): void;
    visitObjectLiteralExpression(_node: ts.ObjectLiteralExpression): void;
    private resetPreviousModifiers();
    private checkModifiersAndSetPrevious(node, currentMember);
    private canAppearAfter(previousMember, currentMember);
    private newMemberList();
    private pushMember(node);
    private checkMemberOrder();
    private getHasOrderOption();
    private getOrder();
}
