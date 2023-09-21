import { decode } from "he";
import { ErrorHandler } from "common";
import { PagedViewLoader, IListItemResult, SPField, IUpdateListItem, ErrorDiagnosis } from "common/sharepoint";
import { ISharePointService, ILiveUpdateService, ITimeZoneService, ITimeZone } from "common/services";
import { Event, EventModerationStatus, ReadonlyEventMap } from "model";
import { IRhythmOfBusinessCalendarSchema } from "schema";
import { RefinerValueLoader } from "./RefinerValueLoader";
import { RecurrenceData } from "./RecurrenceData";

interface IEventListItemResult extends IListItemResult {
    Description: SPField.Query_TextMultiLine;
    Location: SPField.Query_Text;
    Contacts: SPField.Query_UserMulti;
    RefinerValues: SPField.Query_LookupMulti;
    EventDate: SPField.Query_DateTime;
    EndDate: SPField.Query_DateTime;
    fAllDayEvent: SPField.Query_Boolean;
    IsConfidential: SPField.Query_Boolean;
    RestrictedToAccounts: SPField.Query_UserMulti;
    ModerationStatus: SPField.Query_Choice;
    Moderator: SPField.Query_User;
    ModerationTimestamp: SPField.Query_DateTime;
    ModerationMessage: SPField.Query_TextMultiLine;
    fRecurrence: SPField.Query_Recurrence;
    EventType: SPField.Query_Integer;
    RecurrenceData: SPField.Query_TextMultiLine;
    MasterSeriesItemID: SPField.Query_Integer;
    RecurrenceID: SPField.Query_DateTime;
    UID: SPField.Query_Guid;
    Duration: SPField.Query_Integer;
}

interface IEventUpdateListItem extends IUpdateListItem {
    Description: SPField.Update_TextMultiLine;
    Location: SPField.Update_Text;
    ContactsId: SPField.Update_UserIdMulti;
    RefinerValuesId: SPField.Update_LookupIdMulti;
    EventDate: SPField.Update_DateTime;
    EndDate: SPField.Update_DateTime;
    fAllDayEvent: SPField.Update_Boolean;
    IsConfidential: SPField.Update_Boolean;
    RestrictedToAccountsId: SPField.Update_UserIdMulti;
    ModerationStatus: SPField.Update_Choice;
    ModeratorId: SPField.Update_UserId;
    ModerationTimestamp: SPField.Update_DateTime;
    ModerationMessage: SPField.Update_TextMultiLine;
    fRecurrence: SPField.Update_Recurrence;
    EventType: SPField.Update_Integer;
    RecurrenceData: SPField.Update_TextMultiLine;
    MasterSeriesItemID: SPField.Update_Integer;
    RecurrenceID: SPField.Update_DateTime;
    UID: SPField.Update_Guid;
    Duration: SPField.Update_Integer;
}

const toEvent = async (row: IEventListItemResult, event: Event, siteTimeZone: ITimeZone, refinerValueLoader: RefinerValueLoader, eventsById: ReadonlyEventMap): Promise<void> => {
    event.title = decode(row.Title);
    event.description = decode(row.Description);
    event.location = decode(row.Location);
    event.contacts = SPField.toUsers(row.Contacts);
    event.refinerValues.set(await SPField.fromLookupMultiAsync(row.RefinerValues, refinerValueLoader.getById));

    const isAllDay = SPField.fromYesNo(row, 'fAllDayEvent');
    const start = SPField.fromDateTime(row, 'EventDate', siteTimeZone);
    const end = SPField.fromDateTime(row, 'EndDate', siteTimeZone);
    if (isAllDay) {
        start.utc().tz(siteTimeZone.momentId, true);
        end.utc().tz(siteTimeZone.momentId, true);
    }
    event.start = start;
    event.end = end;
    event.isAllDay = isAllDay;

    event.isConfidential = SPField.fromYesNo(row, 'IsConfidential');
    event.restrictedToAccounts = SPField.toUsers(row.RestrictedToAccounts);
    event.moderationStatus = EventModerationStatus.fromName(row.ModerationStatus);
    event.moderator = SPField.toUser(row.Moderator);
    event.moderationTimestamp = SPField.fromDateTime(row, 'ModerationTimestamp', siteTimeZone);
    event.moderationMessage = decode(row.ModerationMessage);
    event.isRecurring = SPField.fromRecurrence(row, 'fRecurrence');
    event.recurrenceUID = SPField.fromGuid(row, 'UID');

    if (event.isRecurring) {
        const seriesMasterId = SPField.fromInteger(row, 'MasterSeriesItemID');
        if (seriesMasterId) { // this is an exception occurrence to the series
            event.seriesMaster.set(eventsById.get(seriesMasterId));
            event.recurrenceExceptionInstanceDate = SPField.fromDateTime(row, 'RecurrenceID', siteTimeZone);
            event.recurrenceInstanceCancelled = (SPField.fromInteger(row, 'EventType') === 3);
        } else { // this is the series master
            const duration = SPField.fromInteger(row, 'Duration');
            event.end = event.start.clone().add(duration, 'seconds');
            event.recurrence = RecurrenceData.deserialize(decode(row.RecurrenceData || ''));
        }
    }
};

const getEventTypeValue = (event: Event) => {
    if (!event.isRecurring) return 0; // 0 = non-recurring event
    if (!event.isSeriesException) return 1; // 1 = series master
    if (!event.recurrenceInstanceCancelled) return 4; // 4 = this one occurrence of the series is an exception (date/time change)
    return 3; // 3 = cancelled this one occurrence of a series
}

const toUpdateListItem = (event: Event, siteTimeZone: ITimeZone): IEventUpdateListItem => {
    const { isNew, isAllDay, isRecurring, isSeriesMaster, isSeriesException } = event;
    return {
        Title: event.title,
        Description: event.description,
        Location: event.location,
        ContactsId: SPField.fromUsers(event.contacts),
        RefinerValuesId: SPField.toLookupMulti(event.refinerValues.get()),
        EventDate: isAllDay ? SPField.toDateOnly(event.start) : SPField.toDateTime(event.start, siteTimeZone),
        EndDate: isAllDay ? SPField.toDateOnly(event.end) : SPField.toDateTime(event.end, siteTimeZone),
        fAllDayEvent: event.isAllDay,
        IsConfidential: event.isConfidential,
        RestrictedToAccountsId: SPField.fromUsers(event.restrictedToAccounts),
        ModerationStatus: event.moderationStatus?.name || EventModerationStatus.Pending.name,
        ModeratorId: SPField.fromUser(event.moderator),
        ModerationTimestamp: SPField.toDateTime(event.moderationTimestamp, siteTimeZone),
        ModerationMessage: event.moderationMessage,
        fRecurrence: SPField.tofRecurrence(isRecurring),
        EventType: getEventTypeValue(event),
        RecurrenceData: isSeriesMaster ? RecurrenceData.serialize(event.recurrence) : undefined,
        MasterSeriesItemID: isSeriesException ? event.seriesMaster.get()?.id : undefined,
        RecurrenceID: isSeriesException ? SPField.toDateTime(event.recurrenceExceptionInstanceDate, siteTimeZone) : undefined,
        UID: isRecurring && isNew ? event.recurrenceUID?.toString() : undefined,
        Duration: event.duration.asSeconds()
    };
};

export class EventLoader extends PagedViewLoader<Event> {
    constructor(schema: IRhythmOfBusinessCalendarSchema, timezones: ITimeZoneService, spo: ISharePointService, liveUpdate: ILiveUpdateService, private readonly _refinerValueLoader: RefinerValueLoader) {
        super({ ctor: Event, view: schema.eventsList.view_AllEvents, timezones, spo, liveUpdate, fastLoad: { useCache: true } });

        this.registerDependency(_refinerValueLoader);
    }

    protected readonly extractReferencedUsers = (event: Event) => [...event.contacts, ...event.restrictedToAccounts, event.moderator];
    protected readonly toEntity = (row: IEventListItemResult, event: Event) => toEvent(row, event, this.timezones.siteTimeZone, this._refinerValueLoader, this._entitiesById);
    protected readonly updateListItem = (event: Event) => toUpdateListItem(event, this.timezones.siteTimeZone);
    protected readonly diagnosePersistError = (error: any) => ErrorHandler.is_412_PRECONDITION_FAILED(error) ? ErrorDiagnosis.Propogate : ErrorDiagnosis.Critical;
}