"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var React = require('react');
var index_1 = require('../../../../index');
var FacepileExampleData_1 = require('./FacepileExampleData');
var FacepileAddFaceExample = (function (_super) {
    __extends(FacepileAddFaceExample, _super);
    function FacepileAddFaceExample() {
        _super.call(this);
        this.state = {
            numberOfFaces: 0
        };
    }
    FacepileAddFaceExample.prototype.render = function () {
        var _this = this;
        var numberOfFaces = this.state.numberOfFaces;
        var facepileProps = {
            personas: FacepileExampleData_1.facepilePersonas.slice(0, numberOfFaces),
            maxDisplayablePersonas: 5,
            overflowButtonProps: {},
            overflowButtonType: index_1.OverflowButtonType.descriptive,
            showAddButton: true,
            addButtonProps: {
                onClick: function (ev) { return _this.setState({
                    numberOfFaces: _this.state.numberOfFaces + 1
                }); }
            }
        };
        return (React.createElement(index_1.Facepile, __assign({}, facepileProps)));
    };
    return FacepileAddFaceExample;
}(React.Component));
exports.FacepileAddFaceExample = FacepileAddFaceExample;

//# sourceMappingURL=Facepile.AddFace.Example.js.map
