"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var React = require('react');
var index_1 = require('../../../../index');
var Callout_Basic_Example_1 = require('../../CalloutPage/examples/Callout.Basic.Example');
var Spinner_Basic_Example_1 = require('../../SpinnerPage/examples/Spinner.Basic.Example');
var Persona_Basic_Example_1 = require('../../PersonaPage/examples/Persona.Basic.Example');
var PivotFabricExample = (function (_super) {
    __extends(PivotFabricExample, _super);
    function PivotFabricExample() {
        _super.apply(this, arguments);
    }
    PivotFabricExample.prototype.render = function () {
        return (React.createElement("div", null, 
            React.createElement(index_1.Pivot, {linkFormat: index_1.PivotLinkFormat.links, linkSize: index_1.PivotLinkSize.normal}, 
                React.createElement(index_1.PivotItem, {linkText: 'Callout'}, 
                    React.createElement(index_1.Label, null, "Callout Example"), 
                    React.createElement(Callout_Basic_Example_1.CalloutBasicExample, null)), 
                React.createElement(index_1.PivotItem, {linkText: 'Spinner'}, 
                    React.createElement(index_1.Label, null, "Spinner Example"), 
                    React.createElement(Spinner_Basic_Example_1.SpinnerBasicExample, null)), 
                React.createElement(index_1.PivotItem, {linkText: 'Persona'}, 
                    React.createElement(index_1.Label, null, "Persona Example"), 
                    React.createElement(Persona_Basic_Example_1.PersonaBasicExample, null)))
        ));
    };
    return PivotFabricExample;
}(React.Component));
exports.PivotFabricExample = PivotFabricExample;

//# sourceMappingURL=Pivot.Fabric.Example.js.map
