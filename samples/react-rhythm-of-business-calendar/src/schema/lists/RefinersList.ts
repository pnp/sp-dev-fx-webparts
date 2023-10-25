import { IListDefinition, FieldType, IViewDefinition, includeStandardViewFields, ITitleFieldDefinition, INumberFieldDefinition, IBooleanFieldDefinition, IFieldDefinition, ListTemplateType, RoleOperation, RoleType } from "common/sharepoint";
import { Defaults } from "../Defaults";

const Field_Name: ITitleFieldDefinition = {
    type: FieldType.Text,
    name: 'Title',
    displayName: 'Name',
    required: true,
    maxLength: 50
};

const Field_Order: INumberFieldDefinition = {
    type: FieldType.Number,
    name: 'Order',
    min: 0
};

const Field_AllowMultiselect: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: 'AllowMultiselect',
    displayName: 'Allow Multiselect',
    default: 'No'
};

const Field_Required: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: 'Required',
    default: 'No'
};

const Field_InitiallyExpanded: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: 'InitiallyExpanded',
    displayName: 'Initially Expanded',
    default: 'Yes'
};

const Field_EnableColors: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: 'EnableColors',
    displayName: 'Enable Colors',
    default: 'No'
};

const Field_EnableTags: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: 'EnableTags',
    displayName: 'Enable Tags',
    default: 'No'
};

const Field_CustomSort: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: 'CustomSort',
    displayName: 'Custom Sort',
    default: 'No'
};

const View_AllRefiners: IViewDefinition = {
    title: "All Refiners",
    rowLimit: 100,
    paged: true,
    default: true,
    fields: includeStandardViewFields(
        Field_Order,
        Field_AllowMultiselect,
        Field_Required,
        Field_InitiallyExpanded,
        Field_EnableColors,
        Field_EnableTags,
        Field_CustomSort
    ),
    query: `
        <OrderBy>
            <FieldRef Name="${Field_Order.name}" Ascending="TRUE"/>
            <FieldRef Name="${Field_Name.name}" Ascending="TRUE"/>
        </OrderBy>
    `
};

export interface IRefinersListDefinition extends IListDefinition {
    field_Name: IFieldDefinition;
    view_AllRefiners: IViewDefinition;
}

export const RefinersList: IRefinersListDefinition = {
    title: Defaults.ListTitles.Refiners,
    description: '',
    template: ListTemplateType.GenericList,
    dependencies: [],
    permissions: {
        copyRoleAssignments: false,
        userRoles: [
            { operation: RoleOperation.Add, roleType: RoleType.Administrator, userType: 'ownerGroup' },
            { operation: RoleOperation.Add, roleType: RoleType.Reader, userType: 'memberGroup' },
            { operation: RoleOperation.Add, roleType: RoleType.Reader, userType: 'visitorGroup' }
        ]
    },
    fields: [
        Field_Name,
        Field_Order,
        Field_AllowMultiselect,
        Field_Required,
        Field_InitiallyExpanded,
        Field_EnableColors,
        Field_EnableTags,
        Field_CustomSort
    ],
    views: [
        View_AllRefiners
    ],
    field_Name: Field_Name,
    view_AllRefiners: View_AllRefiners
};