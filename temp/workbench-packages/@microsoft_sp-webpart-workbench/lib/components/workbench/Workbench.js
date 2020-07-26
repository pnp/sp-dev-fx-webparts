/**
 * @Copyright (c) Microsoft Corporation.  All rights reserved.
 *
 * @file Workbench.tsx
 * The top level file for the Workbench. The Workbench is a tool that SharePoint
 * developers use to test their Web Parts. It is designed to make development
 * efficient by providing a production-like evironment for the developer to
 * test their Web Part and quickly make changes.
 */
import * as tslib_1 from "tslib";
import * as React from 'react';
import * as PropTypes from 'prop-types';
import { A11yManager } from '@ms/sp-a11y';
import { _SPKillSwitch, Guid, UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import { autobind, css, Icon } from '@microsoft/office-ui-fabric-react-bundle';
import { _PerformanceLogger } from '@ms/sp-telemetry';
import WorkbenchCommandBar from '../workbenchCommandBar/WorkbenchCommandBar';
import CanvasHost from '../canvasHost/CanvasHost';
import MobilePreview, { DeviceType } from '../mobilePreview/mobilePreview/MobilePreview';
import SerializedCanvasView from '../serializedCanvasView/SerializedCanvasView';
import strings from './Workbench.resx';
import styles from './Workbench.module.scss';
// Killswitch Guid to disable PerformanceLogger if it is too noisy.
var WB_PERFORMANCELOGGER_KILLSWITCH = Guid.parse('c00b3fb2-b04d-4852-9496-deb7857c4335');
var WorkBench = /** @class */ (function (_super) {
    tslib_1.__extends(WorkBench, _super);
    function WorkBench(props, context) {
        var _this = _super.call(this, props, context) || this;
        var urlParams = new UrlQueryParameterCollection(window.location.href);
        _this.state = {
            displayMobilePreview: false,
            showSerializedCanvasView: false,
            mobilePreviewDeviceType: DeviceType.Phone,
            isEditing: (urlParams.getValue('Mode') !== 'Read'),
            officeHeaderTitle: strings.Office365Title,
            hasOfficeHeader: false,
            hasCommandBar: false
        };
        _this._a11yManager = A11yManager.getInstanceById(_this.props.a11yManagerId);
        if (!_SPKillSwitch.isActivated(WB_PERFORMANCELOGGER_KILLSWITCH, '08/09/2019', 'StopPerformanceLogger')) {
            _PerformanceLogger.initializeApplication('WorkBenchApplication');
            _PerformanceLogger.addComponent(WorkBench._applicationTag);
            _PerformanceLogger.startMarkForComponent(WorkBench._applicationTag);
        }
        return _this;
    }
    WorkBench.prototype.getChildContext = function () {
        return {
            a11yManager: this._a11yManager
        };
    };
    WorkBench.prototype.render = function () {
        var mobilePreview = undefined;
        var pageStore = this.props.pageStore;
        if (this.state.displayMobilePreview) {
            mobilePreview = React.createElement(MobilePreview, { onExit: this._closeMobilePreview, deviceType: this.state.mobilePreviewDeviceType });
        }
        var serializeCallback = pageStore.getSerializeCallback();
        return (React.createElement("div", { className: css(styles.workbench, 'is-focusVisible') },
            React.createElement("div", { className: styles.header },
                React.createElement("div", { className: styles.headerMenu },
                    React.createElement(Icon, { iconName: 'Waffle' })),
                React.createElement("div", { className: styles.headerTitle },
                    React.createElement("em", null, this.state.officeHeaderTitle),
                    strings.SharePointWorkbenchTitle),
                React.createElement("div", { className: styles.headerPerson },
                    React.createElement(Icon, { iconName: 'Contact' }))),
            React.createElement("div", null,
                React.createElement("div", { id: 'workbenchCommandBar', className: styles.commandBar },
                    React.createElement(WorkbenchCommandBar, { isEditing: this.state.isEditing, onClickMobileView: this._onClickMobileView, onClickTabletView: this._onClickTabletView, toggleEdit: this._toggleEdit, clearPage: pageStore.clearPageState, savePage: pageStore.savePageState, onClickSerializeCanvasView: this._onClickSerializeCanvasView })),
                React.createElement("div", { id: 'workbenchPageContent', className: styles.pageContent },
                    React.createElement(CanvasHost, { store: pageStore, isEditing: this.state.isEditing, hasOfficeHeader: this.state.hasOfficeHeader, hasCommandBar: this.state.hasCommandBar }))),
            mobilePreview,
            React.createElement(SerializedCanvasView, { getSerializedData: function (json) { return (serializeCallback) ? serializeCallback(json) : undefined; }, isVisible: this.state.showSerializedCanvasView, closeCallback: this._closeClickSerializeCanvasView })));
    };
    // Putting _PerformanceLogger.endMarkForComponent in a callback of 'setTimeout' will ensure that the
    // Browser has gone through a render cycle, which means it actually painted pixels, before we stop the perf logger.
    WorkBench.prototype.componentDidMount = function () {
        if (!_SPKillSwitch.isActivated(WB_PERFORMANCELOGGER_KILLSWITCH, '08/09/2019', 'StopPerformanceLogger')) {
            setTimeout(function () { return _PerformanceLogger.endMarkForComponent(WorkBench._applicationTag); }, 0);
        }
    };
    WorkBench.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.state.isEditing !== prevState.isEditing) {
            if (this.state.isEditing) {
                this._a11yManager.focusById('previewButton');
                this._a11yManager.alert(strings.ScreenReaderDisplayModeSwitchToEditMode);
            }
            else {
                this._a11yManager.focusById('editButton');
                this._a11yManager.alert(strings.ScreenReaderDisplayModeSwitchToReadMode);
            }
        }
    };
    WorkBench.prototype._toggleEdit = function () {
        this.setState({
            isEditing: !this.state.isEditing
        });
    };
    WorkBench.prototype._onClickMobileView = function () {
        this.setState({
            displayMobilePreview: true,
            mobilePreviewDeviceType: DeviceType.Phone
        });
        this._setSuiteNavZIndex('0');
    };
    WorkBench.prototype._onClickSerializeCanvasView = function () {
        this.setState({
            showSerializedCanvasView: true
        });
    };
    WorkBench.prototype._closeClickSerializeCanvasView = function () {
        this.setState({
            showSerializedCanvasView: false
        });
    };
    WorkBench.prototype._onClickTabletView = function () {
        this.setState({
            displayMobilePreview: true,
            mobilePreviewDeviceType: DeviceType.Tablet
        });
        this._setSuiteNavZIndex('0');
    };
    WorkBench.prototype._closeMobilePreview = function () {
        this.setState({
            displayMobilePreview: false,
            mobilePreviewDeviceType: DeviceType.Phone
        });
        this._setSuiteNavZIndex('5');
    };
    /**
     * Sets the z-index of the suite nav.
     * Purpose of this is so that the suite nav doesn't cover up the mobile preview header.
     * Should find a better way to achieve this.
     */
    WorkBench.prototype._setSuiteNavZIndex = function (value) {
        var suiteNav = document.getElementById('SuiteNavPlaceHolder');
        if (suiteNav) {
            suiteNav.style.zIndex = value;
        }
    };
    WorkBench.childContextTypes = {
        a11yManager: PropTypes.object.isRequired
    };
    WorkBench._applicationTag = 'WorkBenchApplication.Host';
    tslib_1.__decorate([
        autobind
    ], WorkBench.prototype, "_toggleEdit", null);
    tslib_1.__decorate([
        autobind
    ], WorkBench.prototype, "_onClickMobileView", null);
    tslib_1.__decorate([
        autobind
    ], WorkBench.prototype, "_onClickSerializeCanvasView", null);
    tslib_1.__decorate([
        autobind
    ], WorkBench.prototype, "_closeClickSerializeCanvasView", null);
    tslib_1.__decorate([
        autobind
    ], WorkBench.prototype, "_onClickTabletView", null);
    tslib_1.__decorate([
        autobind
    ], WorkBench.prototype, "_closeMobilePreview", null);
    return WorkBench;
}(React.Component));
export { WorkBench };
//# sourceMappingURL=Workbench.js.map