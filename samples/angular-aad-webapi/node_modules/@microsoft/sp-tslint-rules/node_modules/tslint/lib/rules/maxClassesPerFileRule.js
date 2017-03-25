"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Lint = require("../index");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        _super.apply(this, arguments);
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MaxClassesPerFileWalker(sourceFile, this.getOptions()));
    };
    /* tslint:disable:object-literal-sort-keys */
    Rule.metadata = {
        ruleName: "max-classes-per-file",
        description: (_a = ["\n            A file may not contain more than the specified number of classes"], _a.raw = ["\n            A file may not contain more than the specified number of classes"], Lint.Utils.dedent(_a)),
        rationale: (_b = ["\n            Ensures that files have a single responsibility so that that classes each exist in their own files"], _b.raw = ["\n            Ensures that files have a single responsibility so that that classes each exist in their own files"], Lint.Utils.dedent(_b)),
        optionsDescription: (_c = ["\n            The one required argument is an integer indicating the maximum number of classes that can appear in a file."], _c.raw = ["\n            The one required argument is an integer indicating the maximum number of classes that can appear in a file."], Lint.Utils.dedent(_c)),
        options: {
            type: "array",
            items: [
                {
                    type: "number",
                    minimum: 1,
                },
            ],
            additionalItems: false,
            minLength: 1,
            maxLength: 2,
        },
        optionExamples: ["[true, 1]", "[true, 5]"],
        type: "maintainability",
        typescriptOnly: false,
    };
    /* tslint:enable:object-literal-sort-keys */
    Rule.FAILURE_STRING_FACTORY = function (maxCount) {
        var maxClassWord = maxCount === 1 ? "class per file is" : "classes per file are";
        return "A maximum of " + maxCount + " " + maxClassWord + " allowed";
    };
    return Rule;
    var _a, _b, _c;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var MaxClassesPerFileWalker = (function (_super) {
    __extends(MaxClassesPerFileWalker, _super);
    function MaxClassesPerFileWalker(sourceFile, options) {
        _super.call(this, sourceFile, options);
        this.classCount = 0;
        this.maxClassCount = options.ruleArguments[0];
        if (isNaN(this.maxClassCount) || this.maxClassCount < 1) {
            this.maxClassCount = 1;
        }
    }
    MaxClassesPerFileWalker.prototype.visitClassDeclaration = function (node) {
        this.increaseClassCount(node);
        _super.prototype.visitClassDeclaration.call(this, node);
    };
    MaxClassesPerFileWalker.prototype.visitClassExpression = function (node) {
        this.increaseClassCount(node);
        _super.prototype.visitClassExpression.call(this, node);
    };
    MaxClassesPerFileWalker.prototype.increaseClassCount = function (node) {
        this.classCount++;
        if (this.classCount > this.maxClassCount) {
            var msg = Rule.FAILURE_STRING_FACTORY(this.maxClassCount);
            this.addFailure(this.createFailure(node.getStart(), node.getWidth(), msg));
        }
    };
    return MaxClassesPerFileWalker;
}(Lint.RuleWalker));
