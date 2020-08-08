import * as tslib_1 from "tslib";
import * as React from 'react';
import { css } from '@microsoft/office-ui-fabric-react-bundle';
import styles from './MobilePreviewDimensionInput.module.scss';
import strings from '../MobilePreview.resx';
var MobilePreviewDimensionInput = /** @class */ (function (_super) {
    tslib_1.__extends(MobilePreviewDimensionInput, _super);
    function MobilePreviewDimensionInput(props) {
        return _super.call(this, props) || this;
    }
    MobilePreviewDimensionInput.prototype.render = function () {
        var xContainerClassName = css(styles.mobilePreviewTextfieldXY, styles.xField);
        var yContainerClassName = css(styles.mobilePreviewTextfieldXY, styles.yField);
        return (React.createElement("div", null,
            React.createElement("div", { className: xContainerClassName },
                React.createElement("label", { className: styles.xyLabels }, strings.Width + ":"),
                React.createElement("input", { "aria-label": strings.Width, className: styles.xyTextfields, onChange: this.props.onChangedX, value: this.props.currentDevice.width.toString() })),
            React.createElement("div", { className: yContainerClassName },
                React.createElement("label", { className: styles.xyLabels }, strings.Height + ":"),
                React.createElement("input", { "aria-label": strings.Height, className: styles.xyTextfields, onChange: this.props.onChangedY, value: this.props.currentDevice.height.toString() }))));
    };
    return MobilePreviewDimensionInput;
}(React.Component));
export default MobilePreviewDimensionInput;
//# sourceMappingURL=MobilePreviewDimensionInput.js.map