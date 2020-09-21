// @copyright Microsoft Corporation. All rights reserved.
import * as tslib_1 from "tslib";
import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/components/Dialog';
import * as React from 'react';
import { autobind, Link, PrimaryButton } from '@microsoft/office-ui-fabric-react-bundle';
import strings from './ErrorDialog.resx';
/**
 * Error dialog for the workbench.
 */
var ErrorDialog = /** @class */ (function (_super) {
    tslib_1.__extends(ErrorDialog, _super);
    function ErrorDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            showDialog: false
        };
        return _this;
    }
    ErrorDialog.prototype.render = function () {
        return (React.createElement(Dialog, { hidden: !this.state.showDialog, dialogContentProps: {
                title: strings.Title,
                subText: strings.SubText,
                type: DialogType.largeHeader
            }, modalProps: {
                isBlocking: false
            } },
            React.createElement("span", null, strings.ClickHerePrefix),
            React.createElement(Link, { href: 'https://dev.office.com/sharepoint/docs/spfx/web-parts/get-started/build-a-hello-world-web-part' }, strings.ClickHereLink),
            React.createElement("span", null, strings.ClickHereSuffix),
            React.createElement(DialogFooter, null,
                React.createElement(PrimaryButton, { onClick: this._close, "data-automation-id": 'GulpServeWarningOkButton', text: strings.OkButtonText }))));
    };
    ErrorDialog.prototype.open = function () {
        this.setState({ showDialog: true });
    };
    ErrorDialog.prototype._close = function () {
        this.setState({ showDialog: false });
    };
    tslib_1.__decorate([
        autobind
    ], ErrorDialog.prototype, "open", null);
    tslib_1.__decorate([
        autobind
    ], ErrorDialog.prototype, "_close", null);
    return ErrorDialog;
}(React.Component));
export default ErrorDialog;
//# sourceMappingURL=ErrorDialog.js.map