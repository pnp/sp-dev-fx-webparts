import { IListDefinition, FieldType, IViewDefinition, includeStandardViewFields, ITitleFieldDefinition, INumberFieldDefinition, ITextFieldDefinition, IBooleanFieldDefinition, viewFields, ILookupFieldDefinition, IFieldDefinition, ListTemplateType, RoleOperation, RoleType } from "common/sharepoint";
import { Defaults } from "../Defaults";
import { RefinersList } from "./RefinersList";

const Field_Value: ITitleFieldDefinition = {
    type: FieldType.Text,
    name: 'Title',
    displayName: 'Value',
    required: true,
    maxLength: 50
};

const Field_Refiner: ILookupFieldDefinition = {
    type: FieldType.Lookup,
    name: 'Refiner',
    required: true,
    lookupListTitle: RefinersList.title,
    showField: RefinersList.field_Name.name
};

const Field_Order: INumberFieldDefinition = {
    type: FieldType.Number,
    name: 'Order',
    min: 0
};

const Field_Tag: ITextFieldDefinition = {
    type: FieldType.Text,
    name: 'Tag',
    maxLength: 3
};

const Field_Color: ITextFieldDefinition = {
    type: FieldType.Text,
    name: 'Color'
};

const Field_Archived: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: "Archived",
    default: 'No'
};

const View_AllRefinerValues: IViewDefinition = {
    title: "All Refiner Values",
    rowLimit: 1000,
    paged: true,
    default: false,
    fields: includeStandardViewFields(
        Field_Order,
        Field_Refiner,
        Field_Tag,
        Field_Color,
        Field_Archived
    )
};

const View_ActiveRefinerValues: IViewDefinition = {
    title: "Active Refiner Values",
    rowLimit: 500,
    paged: true,
    default: true,
    fields: viewFields(
        Field_Value,
        Field_Refiner
    ),
    query: `
        <GroupBy>
            <FieldRef Name="${Field_Refiner.name}" />
        </GroupBy>
        <OrderBy>
            <FieldRef Name="${Field_Order.name}" Ascending="TRUE"/>
            <FieldRef Name="${Field_Value.name}" Ascending="TRUE"/>
        </OrderBy>
        <Where>
            <Neq>
                <FieldRef Name='${Field_Archived.name}' />
                <Value Type='Integer'>1</Value>
            </Neq>
        </Where>
    `
};

export interface IRefinerValuesListDefinition extends IListDefinition {
    field_Value: IFieldDefinition;
    view_AllRefinerValues: IViewDefinition;
}

export const RefinerValuesList: IRefinerValuesListDefinition = {
    title: Defaults.ListTitles.RefinerValues,
    description: '',
    template: ListTemplateType.GenericList,
    dependencies: [RefinersList],
    permissions: {
        copyRoleAssignments: false,
        userRoles: [
            { operation: RoleOperation.Add, roleType: RoleType.Administrator, userType: 'ownerGroup' },
            { operation: RoleOperation.Add, roleType: RoleType.Reader, userType: 'memberGroup' },
            { operation: RoleOperation.Add, roleType: RoleType.Reader, userType: 'visitorGroup' }
        ]
    },
    fields: [
        Field_Value,
        Field_Order,
        Field_Refiner,
        Field_Tag,
        Field_Color,
        Field_Archived
    ],
    views: [
        View_AllRefinerValues,
        View_ActiveRefinerValues
    ],
    field_Value: Field_Value,
    view_AllRefinerValues: View_AllRefinerValues
};