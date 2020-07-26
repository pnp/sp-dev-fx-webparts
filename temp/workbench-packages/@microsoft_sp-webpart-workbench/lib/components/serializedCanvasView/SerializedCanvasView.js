import * as tslib_1 from "tslib";
import * as React from 'react';
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/components/Dialog';
import { Button, Link } from '@microsoft/office-ui-fabric-react-bundle';
import { CanvasControlType } from '@ms/sp-canvas';
import { Pivot } from 'office-ui-fabric-react/lib/components/Pivot/Pivot';
import { PivotItem } from 'office-ui-fabric-react/lib/components/Pivot/PivotItem';
import SerializedWebPart from './serializedWebPart/SerializedWebPart';
import { getReactLines } from './encodingUtilities';
import strings from './SerializedCanvasView.resx';
import styles from './SerializedCanvasView.module.scss';
var SerializedCanvasView = /** @class */ (function (_super) {
    tslib_1.__extends(SerializedCanvasView, _super);
    function SerializedCanvasView() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SerializedCanvasView.prototype.render = function () {
        var webpartDataCollection = (this.props.getSerializedData)
            ? JSON.parse(decodeURI(this.props.getSerializedData(true) || '[]'))
                .filter(function (controlData) { return controlData.controlType === CanvasControlType.WebPartZone; })
                .map(function (controlData) { return controlData.webPartData; })
            : [];
        var serializedData = (this.props.getSerializedData) ? this.props.getSerializedData(false) : '';
        return (React.createElement(Dialog, { hidden: !this.props.isVisible, onDismiss: this.props.closeCallback, dialogContentProps: {
                type: DialogType.normal,
                title: strings.WebPartData,
                className: styles.content
            }, modalProps: {
                isBlocking: false,
                className: styles.container
            } },
            React.createElement("div", null,
                React.createElement(Pivot, null,
                    React.createElement(PivotItem, { linkText: strings.ModernPages },
                        React.createElement("div", { className: styles.pivotItem },
                            React.createElement("p", { className: styles.serializedTextArea }, getReactLines(serializedData)))),
                    React.createElement(PivotItem, { linkText: strings.ClassicPages },
                        React.createElement("div", { className: styles.pivotItem }, webpartDataCollection.map(function (webpartData) {
                            return React.createElement(SerializedWebPart, { key: webpartData.instanceId, serializedWebPart: webpartData });
                        })))),
                React.createElement(Link, tslib_1.__assign({ className: styles.learnMoreLink }, {
                    href: 'https://dev.office.com/sharepoint/docs/' +
                        'spfx/web-parts/get-started/provision-sp-assets-from-package',
                    target: '_blank'
                } /* VSO:391730 Remove this workaround */), strings.WebPartDataHelpInfoLink)),
            React.createElement(DialogFooter, null,
                React.createElement(Button, { onClick: this.props.closeCallback }, strings.Close))));
    };
    return SerializedCanvasView;
}(React.Component));
export default SerializedCanvasView;
//# sourceMappingURL=SerializedCanvasView.js.map