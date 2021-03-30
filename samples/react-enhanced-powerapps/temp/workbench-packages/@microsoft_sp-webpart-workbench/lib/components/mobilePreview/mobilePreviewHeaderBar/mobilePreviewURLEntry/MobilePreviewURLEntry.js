import * as tslib_1 from "tslib";
import * as React from 'react';
import { autobind, Button, TextField } from '@microsoft/office-ui-fabric-react-bundle';
import styles from './MobilePreviewURLEntry.module.scss';
import strings from '../../MobilePreview.resx';
var MobilePreviewURLEntry = /** @class */ (function (_super) {
    tslib_1.__extends(MobilePreviewURLEntry, _super);
    function MobilePreviewURLEntry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobilePreviewURLEntry.prototype.render = function () {
        return (React.createElement("div", { className: styles.mobilePreviewURLbar },
            React.createElement(TextField, tslib_1.__assign({ className: styles.mobilePreviewTextfield, onChange: this._validateAndCompleteURL }, { placeholder: strings.UrlTextBoxPlaceholder } /* VSO:391730 Remove this workaround */)),
            React.createElement(Button, { className: styles.mobilePreviewURLbutton, onClick: this.props.onClickURLSubmit }, "View Preview")));
    };
    /**
     * If the URL is not valid, an error page displays as it would in the browser. As such, no additional validation is
     * conducted here aside from not allowing a blank entry.
     */
    MobilePreviewURLEntry.prototype._validateAndCompleteURL = function (event, value) {
        if (!value || value === '') {
            return;
        }
        var regex = /https?:\/\//;
        if (!regex.test(value)) {
            value = 'http://' + value;
        }
        this.props.onChangeURL(value);
    };
    tslib_1.__decorate([
        autobind
    ], MobilePreviewURLEntry.prototype, "_validateAndCompleteURL", null);
    return MobilePreviewURLEntry;
}(React.Component));
export default MobilePreviewURLEntry;
//# sourceMappingURL=MobilePreviewURLEntry.js.map