import * as tslib_1 from "tslib";
import * as React from 'react';
import { autobind, css, getIconClassName } from '@microsoft/office-ui-fabric-react-bundle';
import styles from './MobilePreviewRotate.module.scss';
import { DeviceOrientation } from '../mobilePreview/MobilePreview';
var MobilePreviewRotate = /** @class */ (function (_super) {
    tslib_1.__extends(MobilePreviewRotate, _super);
    function MobilePreviewRotate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MobilePreviewRotate.prototype.render = function () {
        var rotateIconClass = css(getIconClassName('Refresh'), styles.mobilePreviewRotateIcon);
        return (React.createElement("div", null,
            React.createElement("a", { role: 'button', onClick: this._onClickRotate },
                React.createElement("span", { className: rotateIconClass }))));
    };
    MobilePreviewRotate.prototype._onClickRotate = function () {
        var orientation = this.props.currentOrientation === DeviceOrientation.Portrait
            ? DeviceOrientation.Landscape
            : DeviceOrientation.Portrait;
        this.props.onRotate(orientation);
    };
    tslib_1.__decorate([
        autobind
    ], MobilePreviewRotate.prototype, "_onClickRotate", null);
    return MobilePreviewRotate;
}(React.Component));
export default MobilePreviewRotate;
//# sourceMappingURL=MobilePreviewRotate.js.map