import { IListDefinition, FieldType, IViewDefinition, includeStandardViewFields, IBooleanFieldDefinition, IUserFieldDefinition, ILookupFieldDefinition, ListTemplateType, RoleOperation, RoleType } from "common/sharepoint";
import { Defaults } from "../Defaults";
import { RefinerValuesList } from "./RefinerValuesList";

const Field_RefinerValues: ILookupFieldDefinition = {
    type: FieldType.Lookup,
    name: 'RefinerValues',
    displayName: 'Refiner Values',
    required: false,
    multi: true,
    lookupListTitle: RefinerValuesList.title,
    showField: RefinerValuesList.field_Value.name
};

const Field_IncludeInApprovalEmail: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: 'IncludeInApprovalEmail',
    displayName: 'Include In Approval Email',
    default: 'Yes'
};

const Field_Users: IUserFieldDefinition = {
    type: FieldType.User,
    name: 'Users',
    userSelectionMode: "PeopleOnly",
    required: true,
    multi: true
};

const View_AllApprovers: IViewDefinition = {
    title: "All Approvers",
    rowLimit: 250,
    paged: true,
    default: true,
    fields: includeStandardViewFields(
        Field_RefinerValues,
        Field_IncludeInApprovalEmail,
        Field_Users
    )
};

export interface IApproversListDefinition extends IListDefinition {
    view_AllApprovers: IViewDefinition;
}

export const ApproversList: IApproversListDefinition = {
    title: Defaults.ListTitles.Approvers,
    description: '',
    template: ListTemplateType.GenericList,
    dependencies: [RefinerValuesList],
    permissions: {
        copyRoleAssignments: false,
        userRoles: [
            { operation: RoleOperation.Add, roleType: RoleType.Administrator, userType: 'ownerGroup' },
            { operation: RoleOperation.Add, roleType: RoleType.Reader, userType: 'memberGroup' },
            { operation: RoleOperation.Add, roleType: RoleType.Reader, userType: 'visitorGroup' }
        ]
    },
    fields: [
        Field_RefinerValues,
        Field_IncludeInApprovalEmail,
        Field_Users
    ],
    views: [
        View_AllApprovers
    ],
    view_AllApprovers: View_AllApprovers
};