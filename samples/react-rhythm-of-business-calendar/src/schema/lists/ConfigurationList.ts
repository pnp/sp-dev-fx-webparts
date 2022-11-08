import { IListDefinition, FieldType, IViewDefinition, includeStandardViewFields, INumberFieldDefinition, ListTemplateType, IChoiceFieldDefinition, IBooleanFieldDefinition, RoleOperation, RoleType } from "common/sharepoint";
import { ViewKeys } from "model";
import { Defaults } from "../Defaults";

const Field_SchemaVersion: INumberFieldDefinition = {
    type: FieldType.Number,
    name: 'SchemaVersion',
    displayName: "Schema Version",
    required: true
};

const Field_CurrentUpgradeAction: INumberFieldDefinition = {
    type: FieldType.Number,
    name: 'CurrentUpgradeAction',
    displayName: "Current Upgrade Action"
};

const Field_FiscalYearSartMonth: INumberFieldDefinition = {
    type: FieldType.Number,
    name: 'FiscalYearSartMonth',
    displayName: "Fiscal Year Sart Month",
    min: 1,
    max: 12,
    required: true,
    default: "1"
};

const Field_DefaultView: IChoiceFieldDefinition = {
    type: FieldType.Choice,
    name: 'DefaultView',
    displayName: "Default View",
    choices: Object.keys(ViewKeys),
    default: ViewKeys.monthly
};

const Field_UseRefiners: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: 'UseRefiners',
    displayName: "Use Refiners",
    default: "Yes"
};

const Field_RefinerRailInitiallyExpanded: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: 'RefinerRailInitiallyExpanded',
    displayName: "Refiner Rail Initially Expanded",
    default: "Yes"
};

const Field_QuarterViewGroupByRefinerId: INumberFieldDefinition = {
    type: FieldType.Number,
    name: 'QuarterViewGroupByRefinerId',
    displayName: 'Quarter View Group By Refiner Id'
};

const Field_UseApprovals: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: 'UseApprovals',
    displayName: "Use Approvals",
    default: "No"
};

const Field_AllowConfidentialEvents: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: 'AllowConfidentialEvents',
    displayName: "Allow Confidential Events",
    default: "No"
};

const View_AllItems: IViewDefinition = {
    title: "All Configurations",
    rowLimit: 1,
    paged: false,
    default: true,
    query: '',
    fields: includeStandardViewFields(
        Field_SchemaVersion,
        Field_CurrentUpgradeAction,
        Field_FiscalYearSartMonth,
        Field_DefaultView,
        Field_UseRefiners,
        Field_RefinerRailInitiallyExpanded,
        Field_QuarterViewGroupByRefinerId,
        Field_UseApprovals,
        Field_AllowConfidentialEvents
    )
};

export interface IConfigurationListDefinition extends IListDefinition {
    view_AllItems: IViewDefinition;
}

export const ConfigurationList: IConfigurationListDefinition = {
    title: Defaults.ListTitles.Configuration,
    description: '',
    template: ListTemplateType.GenericList,
    permissions: {
        copyRoleAssignments: false,
        userRoles: [
            { operation: RoleOperation.Add, roleType: RoleType.Administrator, userType: 'ownerGroup' },
            { operation: RoleOperation.Add, roleType: RoleType.Reader, userType: 'memberGroup' },
            { operation: RoleOperation.Add, roleType: RoleType.Reader, userType: 'visitorGroup' }
        ]
    },
    siteFields: [],
    fields: [
        Field_SchemaVersion,
        Field_CurrentUpgradeAction,
        Field_FiscalYearSartMonth,
        Field_DefaultView,
        Field_UseRefiners,
        Field_RefinerRailInitiallyExpanded,
        Field_QuarterViewGroupByRefinerId,
        Field_UseApprovals,
        Field_AllowConfidentialEvents
    ],
    views: [View_AllItems],
    view_AllItems: View_AllItems
};