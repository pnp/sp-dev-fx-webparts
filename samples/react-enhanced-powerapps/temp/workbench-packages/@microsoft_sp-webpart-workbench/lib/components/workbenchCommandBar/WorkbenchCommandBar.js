import * as tslib_1 from "tslib";
import * as React from 'react';
import { CommandBar } from '@microsoft/office-ui-fabric-react-bundle';
import strings from './WorkbenchCommandBar.resx';
var WorkbenchCommandBar = /** @class */ (function (_super) {
    tslib_1.__extends(WorkbenchCommandBar, _super);
    function WorkbenchCommandBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WorkbenchCommandBar.prototype.render = function () {
        var items = this.props.isEditing ? [
            {
                key: 'save',
                name: strings.Save,
                icon: 'Save',
                ariaLabel: strings.Save,
                title: strings.SaveAltText,
                onClick: this.props.savePage,
                'data-automation-id': 'workbench-command-bar-save'
            },
            {
                key: 'discard',
                name: strings.Discard,
                icon: 'RevToggleKey',
                ariaLabel: strings.Discard,
                title: strings.DiscardAltText,
                onClick: this.props.clearPage,
                'data-automation-id': 'workbench-command-bar-discard'
            },
            {
                key: 'wpData',
                name: strings.WebPartData,
                icon: 'TriangleUp12',
                ariaLabel: strings.WebPartData,
                title: strings.WebPartDataAltText,
                onClick: this.props.onClickSerializeCanvasView,
                'data-automation-id': 'workbench-command-bar-serialize'
            }
        ] : [];
        var farItems = this.props.isEditing ? [
            {
                key: 'mobilePreview',
                name: strings.Mobile,
                icon: 'CellPhone',
                ariaLabel: strings.Mobile,
                title: strings.MobleAltText,
                onClick: this.props.onClickMobileView,
                'data-automation-id': 'workbench-command-bar-mobile-cellphone'
            },
            {
                key: 'tabletPreview',
                name: strings.Tablet,
                icon: 'Tablet',
                ariaLabel: strings.Tablet,
                title: strings.TabletAltText,
                onClick: this.props.onClickTabletView,
                'data-automation-id': 'workbench-command-bar-mobile-tablet'
            },
            {
                key: 'preview',
                name: strings.Preview,
                icon: 'View',
                ariaLabel: strings.Preview,
                title: strings.PreviewAltText,
                onClick: this.props.toggleEdit,
                'data-automation-id': 'workbench-command-bar-preview',
                'data-sp-a11y-id': 'previewButton'
            }
        ] : [
            {
                key: 'edit',
                name: strings.Edit,
                icon: 'Edit',
                ariaLabel: strings.Edit,
                title: strings.EditAltText,
                onClick: this.props.toggleEdit,
                'data-automation-id': 'workbench-command-bar-edit',
                'data-sp-a11y-id': 'editButton'
            }
        ];
        return (React.createElement(CommandBar, { "aria-live": 'polite', items: items, farItems: farItems, role: 'toolbar' }));
    };
    return WorkbenchCommandBar;
}(React.Component));
export default WorkbenchCommandBar;
//# sourceMappingURL=WorkbenchCommandBar.js.map