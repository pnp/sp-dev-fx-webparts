import { DateTimeFieldFormatType } from "@pnp/sp/fields";
import { IListDefinition, FieldType, IViewDefinition, includeStandardViewFields, ITextFieldDefinition, IBooleanFieldDefinition, IUserFieldDefinition, ILookupFieldDefinition, IDateTimeFieldDefinition, ListTemplateType, ITitleFieldDefinition, IRecurrenceFieldDefinition, IIntegerFieldDefinition, IGuidFieldDefinition, RoleOperation, RoleType, IChoiceFieldDefinition } from "common/sharepoint";
import { EventModerationStatus } from "model";
import { Defaults } from "../Defaults";
import { RefinerValuesList } from "./RefinerValuesList";

const Field_Title: ITitleFieldDefinition = {
    type: FieldType.Text,
    name: 'Title',
    required: true
};

const Field_Description: ITextFieldDefinition = {
    type: FieldType.Text,
    name: 'Description',
    multi: true
};

const Field_Location: ITextFieldDefinition = {
    type: FieldType.Text,
    name: 'Location'
};

const Field_EventDate: IDateTimeFieldDefinition = {
    type: FieldType.DateTime,
    name: 'EventDate',
    displayName: 'Start Time',
    required: true,
    dateTimeFormat: DateTimeFieldFormatType.DateTime
};

const Field_EndDate: IDateTimeFieldDefinition = {
    type: FieldType.DateTime,
    name: 'EndDate',
    displayName: 'End Time',
    required: true,
    dateTimeFormat: DateTimeFieldFormatType.DateTime
};

const Field_fAllDayEvent: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: 'fAllDayEvent',
    displayName: 'All Day Event',
    default: 'No'
};

const Field_fRecurrence: IRecurrenceFieldDefinition = {
    type: FieldType.Recurrence,
    name: 'fRecurrence',
    displayName: 'Recurrence'
};

const Field_EventType: IIntegerFieldDefinition = {
    type: FieldType.Integer,
    name: 'EventType',
    displayName: 'Event Type'
};

const Field_UID: IGuidFieldDefinition = {
    type: FieldType.Guid,
    name: 'UID'
};

const Field_RecurrenceID: IDateTimeFieldDefinition = {
    type: FieldType.DateTime,
    name: 'RecurrenceID',
    displayName: 'Recurrence ID',
    dateTimeFormat: DateTimeFieldFormatType.DateTime
};

const Field_MasterSeriesItemID: IIntegerFieldDefinition = {
    type: FieldType.Integer,
    name: 'MasterSeriesItemID'
};

const Field_RecurrenceData: ITextFieldDefinition = {
    type: FieldType.Text,
    name: 'RecurrenceData',
    multi: true
};

const Field_Duration: IIntegerFieldDefinition = {
    type: FieldType.Integer,
    name: 'Duration'
};

const Field_RefinerValues: ILookupFieldDefinition = {
    type: FieldType.Lookup,
    name: 'RefinerValues',
    displayName: 'Refiner Values',
    required: false,
    multi: true,
    lookupListTitle: RefinerValuesList.title,
    showField: RefinerValuesList.field_Value.name
};

const Field_Contacts: IUserFieldDefinition = {
    type: FieldType.User,
    name: 'Contacts',
    userSelectionMode: "PeopleOnly",
    multi: true
};

const Field_Confidential: IBooleanFieldDefinition = {
    type: FieldType.Boolean,
    name: 'IsConfidential',
    displayName: 'Is Confidential',
    default: 'No'
};

const Field_RestrictedToAccounts: IUserFieldDefinition = {
    type: FieldType.User,
    name: 'RestrictedToAccounts',
    displayName: 'Restricted To Accounts',
    userSelectionMode: "PeopleAndGroups",
    multi: true
};

const Field_ModerationStatus: IChoiceFieldDefinition = {
    type: FieldType.Choice,
    name: 'ModerationStatus',
    displayName: 'Moderation Status',
    choices: EventModerationStatus.all.map(s => s.name),
    default: EventModerationStatus.Pending.name
};

const Field_Moderator: IUserFieldDefinition = {
    type: FieldType.User,
    name: 'Moderator',
    userSelectionMode: "PeopleOnly",
    required: false
};

const Field_ModerationTimestamp: IDateTimeFieldDefinition = {
    type: FieldType.DateTime,
    name: 'ModerationTimestamp',
    displayName: 'Moderation Timestamp',
    required: false,
    dateTimeFormat: DateTimeFieldFormatType.DateTime
};

const Field_ModerationMessage: ITextFieldDefinition = {
    type: FieldType.Text,
    name: 'ModerationMessage',
    displayName: 'Moderation Message',
    multi: true,
    required: false
};

const View_AllEvents: IViewDefinition = {
    title: "All RoB Events",
    rowLimit: 600,
    paged: true,
    default: false,
    fields: includeStandardViewFields(
        Field_Description,
        Field_Location,
        Field_EventDate,
        Field_EndDate,
        Field_fAllDayEvent,
        Field_fRecurrence,
        Field_EventType,
        Field_UID,
        Field_RecurrenceID,
        Field_MasterSeriesItemID,
        Field_RecurrenceData,
        Field_Duration,
        Field_RefinerValues,
        Field_Contacts,
        Field_Confidential,
        Field_RestrictedToAccounts,
        Field_ModerationStatus,
        Field_Moderator,
        Field_ModerationTimestamp,
        Field_ModerationMessage
    ),
    // need to sort by ID ascending in order to ensure the series master is loaded before any exceptions to the series
    query: `
        <OrderBy>
            <FieldRef Name="ID" Ascending="TRUE"/>
        </OrderBy>
    `
};

export interface IEventsListDefinition extends IListDefinition {
    view_AllEvents: IViewDefinition;
}

export const EventsList: IEventsListDefinition = {
    title: Defaults.ListTitles.Events,
    description: '',
    template: ListTemplateType.EventsList,
    dependencies: [RefinerValuesList],
    permissions: {
        copyRoleAssignments: false,
        userRoles: [
            { operation: RoleOperation.Add, roleType: RoleType.Administrator, userType: 'ownerGroup' },
            { operation: RoleOperation.Add, roleType: RoleType.Administrator, userType: 'memberGroup' },
            { operation: RoleOperation.Add, roleType: RoleType.Reader, userType: 'visitorGroup' }
        ]
    },
    fields: [
        Field_Title,
        Field_Description,
        Field_Location,
        Field_EventDate,
        Field_EndDate,
        Field_fAllDayEvent,
        Field_fRecurrence,
        Field_EventType,
        Field_UID,
        Field_RecurrenceID,
        Field_MasterSeriesItemID,
        Field_RecurrenceData,
        Field_Duration,
        Field_RefinerValues,
        Field_Contacts,
        Field_Confidential,
        Field_RestrictedToAccounts,
        Field_ModerationStatus,
        Field_Moderator,
        Field_ModerationTimestamp,
        Field_ModerationMessage
    ],
    views: [
        View_AllEvents
    ],
    view_AllEvents: View_AllEvents
};