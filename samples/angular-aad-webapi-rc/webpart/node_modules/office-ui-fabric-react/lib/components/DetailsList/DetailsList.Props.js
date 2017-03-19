"use strict";
/**
 * Enum to describe how a particular column header behaves.... This enum is used to
 * to specify the property IColumn:columnActionsMode.
 * If IColumn:columnActionsMode is undefined, then it's equivalent to ColumnActionsMode.clickable
 */
(function (ColumnActionsMode) {
    /**
     * Renders the column header as disabled.
     */
    ColumnActionsMode[ColumnActionsMode["disabled"] = 0] = "disabled";
    /**
     * Renders the column header is clickable.
     */
    ColumnActionsMode[ColumnActionsMode["clickable"] = 1] = "clickable";
    /**
     * Renders the column header ias clickable and displays the dropdown cheveron.
     */
    ColumnActionsMode[ColumnActionsMode["hasDropdown"] = 2] = "hasDropdown";
})(exports.ColumnActionsMode || (exports.ColumnActionsMode = {}));
var ColumnActionsMode = exports.ColumnActionsMode;
(function (ConstrainMode) {
    /** If specified, lets the content grow which allows the page to manage scrolling. */
    ConstrainMode[ConstrainMode["unconstrained"] = 0] = "unconstrained";
    /**
     * If specified, constrains the list to the given layout space.
     */
    ConstrainMode[ConstrainMode["horizontalConstrained"] = 1] = "horizontalConstrained";
})(exports.ConstrainMode || (exports.ConstrainMode = {}));
var ConstrainMode = exports.ConstrainMode;
(function (DetailsListLayoutMode) {
    /**
     * Lets the user resize columns and makes not attempt to fit them.
     */
    DetailsListLayoutMode[DetailsListLayoutMode["fixedColumns"] = 0] = "fixedColumns";
    /**
     * Manages which columns are visible, tries to size them according to their min/max rules and drops
     * off columns that can't fit and have isCollapsable set.
     */
    DetailsListLayoutMode[DetailsListLayoutMode["justified"] = 1] = "justified";
})(exports.DetailsListLayoutMode || (exports.DetailsListLayoutMode = {}));
var DetailsListLayoutMode = exports.DetailsListLayoutMode;
(function (CheckboxVisibility) {
    /**
     * Visible on hover.
     */
    CheckboxVisibility[CheckboxVisibility["onHover"] = 0] = "onHover";
    /**
     * Visible always.
     */
    CheckboxVisibility[CheckboxVisibility["always"] = 1] = "always";
    /**
     * Hide checkboxes.
     */
    CheckboxVisibility[CheckboxVisibility["hidden"] = 2] = "hidden";
})(exports.CheckboxVisibility || (exports.CheckboxVisibility = {}));
var CheckboxVisibility = exports.CheckboxVisibility;

//# sourceMappingURL=DetailsList.Props.js.map
