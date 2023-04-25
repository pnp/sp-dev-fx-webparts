import { first, isEqualWith, remove } from 'lodash';
import { duration, Duration, Moment } from 'moment-timezone';
import { Guid } from '@microsoft/sp-core-library';
import { now, IManyToManyRelationship, ManyToManyRelationship, User, RequiredValidationRule, MaxLengthValidationRule, Comparer, momentAscComparer, IOneToManyRelationship, OneToManyRelationship, ManyToOneRelationship, IManyToOneRelationship, MomentRange, Color, aggregateComparer, IUserListChanges, ValidationRule, groupBy, multifilter, Entity, inverseFilter } from 'common';
import { ListItemEntity } from "common/sharepoint";
import { Cadence } from './Cadence';
import { IEvent } from './IEvent';
import { EventOccurrence } from './EventOccurrence';
import { Recurrence } from './Recurrence';
import { Refiner } from './Refiner';
import { RefinerValue } from './RefinerValue';
import { EventModerationStatus } from "./EventModerationStatus";
import { Count_Until_Recurrence_Required_ValidationRule, Date_MonthlyByDate_Recurrence_Required_ValidationRule, Date_YearlyByDate_Recurrence_Required_ValidationRule, Days_Weekly_Recurrence_Required_ValidationRule, EndDate_Until_Recurrence_AfterStartDate_ValidationRule, EndDate_Until_Recurrence_Required_ValidationRule, EveryN_Daily_Recurrence_Required_ValidationRule, EveryN_MonthlyByDate_Recurrence_Required_ValidationRule, EveryN_MonthlyByDay_Recurrence_Required_ValidationRule, EveryN_Weekly_Recurrence_Required_ValidationRule } from './Validations';

interface IState {
    description: string;
    location: string;
    contacts: User[];
    start: Moment;
    end: Moment;
    isAllDay: boolean;
    isRecurring: boolean;
    recurrence: Recurrence;
    recurrenceUID: Guid;
    recurrenceExceptionInstanceDate: Moment;
    recurrenceInstanceCancelled: boolean;
    seriesMaster: Event;
    isConfidential: boolean;
    restrictedToAccounts: User[];
    moderationStatus: EventModerationStatus;
    moderator: User | undefined;
    moderationTimestamp: Moment | undefined;
    moderationMessage: string;
}

export class Event extends ListItemEntity<IState> implements IEvent {
    public static readonly TitleValidations = [
        new RequiredValidationRule<Event>(e => e.title),
        new MaxLengthValidationRule<Event>(e => e.title, 255)
    ];
    public static readonly LocationValidations = [
        new MaxLengthValidationRule<Event>(e => e.location, 255)
    ];
    public static readonly StartDateValidations = [
        new RequiredValidationRule<Event>(e => e.startDate)
    ];
    public static readonly EndDateValidations = [
        new RequiredValidationRule<Event>(e => e.endDate)
    ];
    public static readonly EveryN_Daily_Recurrence_Validations = [
        new EveryN_Daily_Recurrence_Required_ValidationRule()
    ];
    public static readonly EveryN_Weekly_Recurrence_Validations = [
        new EveryN_Weekly_Recurrence_Required_ValidationRule()
    ];
    public static readonly Days_Weekly_Recurrence_Validations = [
        new Days_Weekly_Recurrence_Required_ValidationRule()
    ];
    public static readonly Date_MonthlyByDate_Recurrence_Validations = [
        new Date_MonthlyByDate_Recurrence_Required_ValidationRule()
    ];
    public static readonly EveryN_MonthlyByDate_Recurrence_Validations = [
        new EveryN_MonthlyByDate_Recurrence_Required_ValidationRule()
    ];
    public static readonly EveryN_MonthlyByDay_Recurrence_Validations = [
        new EveryN_MonthlyByDay_Recurrence_Required_ValidationRule()
    ];
    public static readonly Date_YearlyByDate_Recurrence_Validations = [
        new Date_YearlyByDate_Recurrence_Required_ValidationRule()
    ];
    public static readonly EndDate_Until_Recurrence_Validations = [
        new EndDate_Until_Recurrence_Required_ValidationRule(),
        new EndDate_Until_Recurrence_AfterStartDate_ValidationRule()
    ];
    public static readonly Count_Until_Recurrence_Validations = [
        new Count_Until_Recurrence_Required_ValidationRule()
    ];

    public static ApprovedFilter = ({ isApproved }: Event): boolean => isApproved;
    public static PendingFilter = ({ isPendingApproval }: Event): boolean => isPendingApproval;
    public static RejectedFilter = ({ isRejected }: Event): boolean => isRejected;

    public static readonly StartAscComparer: Comparer<Event> = (a, b) => momentAscComparer(a.start, b.start);
    public static readonly RefinerValueOrderAscComparer = aggregateComparer(RefinerValue.RefinerOrderAscComparer, RefinerValue.OrderAscComparer);

    constructor(author?: User, editor?: User, created?: Moment, modified?: Moment, id?: number, uniqueId?: Guid, etag?: number) {
        super(author, editor, created, modified, id, uniqueId, etag);

        this.state.description = "";
        this.state.location = "";
        this.state.contacts = [];
        this.state.start = now().startOf('hour').add(1, 'hour');
        this.state.end = this.state.start.clone().add(1, 'hour');
        this.state.isAllDay = false;
        this.state.isRecurring = false;
        this.state.recurrence = undefined;
        this.state.recurrenceUID = undefined;
        this.state.recurrenceExceptionInstanceDate = undefined;
        this.state.recurrenceInstanceCancelled = false;
        this.state.seriesMaster = undefined;
        this.state.isConfidential = false;
        this.state.restrictedToAccounts = [];
        this.state.moderationStatus = EventModerationStatus.Pending;
        this.state.moderator = undefined;
        this.state.moderationTimestamp = undefined;
        this.state.moderationMessage = "";

        this.refinerValues = ManyToManyRelationship.create<Event, RefinerValue>(this, 'events', { comparer: Event.RefinerValueOrderAscComparer });
        this.includeInBoundedContext(this.refinerValues);

        this.exceptions = OneToManyRelationship.create<Event, Event>(this, 'seriesMaster');
        this.includeInBoundedContext(this.exceptions);

        this.seriesMaster = ManyToOneRelationship.create<Event, Event>(this, 'exceptions', 'seriesMaster');
        this.includeInBoundedContext(this.seriesMaster);
    }

    public readonly seriesMaster: IManyToOneRelationship<Event>;
    public readonly exceptions: IOneToManyRelationship<Event>;

    public readonly refinerValues: IManyToManyRelationship<RefinerValue>;

    public valuesByRefiner(): Map<Refiner, RefinerValue[]> {
        return groupBy(this.refinerValues.get(), value => value.refiner.get());
    }

    public get tag(): string | undefined {
        return this.refinerValues.find(v => v.refiner.get()?.enableTags)?.tag;
    }

    public get color(): Color | undefined {
        return this.refinerValues.find(v => v.refiner.get()?.enableColors)?.color;
    }

    public hasChanges(specificProperty?: string | number | symbol): boolean {
        if (specificProperty)
            return super.hasChanges(specificProperty);
        else
            return super.hasChanges() || this.refinerValues.hasChanges();
    }

    public delete() {
        super.delete()
        this.exceptions.forEach(e => e.delete());
    }

    public hasRecurrenceChanges(): boolean {
        if (!this.isNew && this.hasSnapshot) {
            const current = {
                isRecurring: this.isRecurring,
                recurrence: this.recurrence,
                start: this.start,
                end: this.end,
                isAllDay: this.isAllDay
            };

            this.peekSnapshot();
            const snapshot = {
                isRecurring: this.isRecurring,
                recurrence: this.recurrence,
                start: this.start,
                end: this.end,
                isAllDay: this.isAllDay
            };
            this.endPeek();

            return snapshot.isRecurring && !isEqualWith(current, snapshot, this.stateIsEqualCustomizer);
        } else {
            return false;
        }
    }

    public immortalize() {
        if (this.hasSnapshot && this.isAllDay) {
            this.start.startOf('day');
            this.end.endOf('day').startOf('minute');
        }

        super.immortalize();
    }

    public get isSeriesMaster(): boolean { return this.state.isRecurring && !this.seriesMaster.get(); }

    public get isSeriesException(): boolean { return !!this.seriesMaster.get(); }

    public get allowGhosting(): boolean {
        // exceptions are ghostable to enable editing of a new occurrence and to discard it if there are no changes
        return this.isSeriesException;
    }

    public get description(): string { return this.state.description; }
    public set description(val: string) { this.state.description = val; }

    public get location(): string { return this.state.location; }
    public set location(val: string) { this.state.location = val; }

    public get contacts(): User[] { return this.state.contacts; }
    public set contacts(val: User[]) { this.state.contacts = val; }

    public get start(): Moment { return this.state.start; }
    public set start(val: Moment) { this.state.start = val; }

    public get end(): Moment { return this.state.end; }
    public set end(val: Moment) { this.state.end = val; }

    public get startDate(): Moment { return this.start?.clone().startOf('day'); }
    public set startDate(date: Moment) {
        const { startTime, duration } = this;

        const newStart = date?.clone().startOf('day').add(startTime);
        const newEnd = newStart?.clone().add(duration);

        this.start = newStart;
        this.end = newEnd;
    }

    public get endDate(): Moment { return this.end?.clone().startOf('day'); }
    public set endDate(date: Moment) {
        const { start, endTime } = this;

        const newEnd = date?.clone().startOf('day').add(endTime);
        const newStart = newEnd?.isSameOrBefore(start, 'minutes')
            ? newEnd?.clone().subtract(1, 'hour')
            : start;

        this.start = newStart;
        this.end = newEnd;
    }

    public get startTime(): Duration { return duration(this.start?.diff(this.startDate)); }
    public set startTime(time: Duration) {
        const { start, duration } = this;

        const newStart = start?.clone().startOf('day').add(time);
        const newEnd = newStart?.clone().add(duration);

        this.start = newStart;
        this.end = newEnd;
    }

    public get endTime(): Duration { return duration(this.end?.diff(this.endDate)); }
    public set endTime(time: Duration) {
        const { start, end, isRecurring } = this;

        const newEnd = end?.clone().startOf('day').add(time);

        if (newEnd?.isSameOrBefore(start, 'minute'))
            newEnd.add(1, 'day');

        if (isRecurring && newEnd && !newEnd.isSame(start, 'day')) {
            const startTime = start?.diff(start?.clone().startOf('day'));
            const endTime = newEnd.diff(newEnd.clone().startOf('day'));
            if (endTime > startTime) {
                newEnd.subtract(1, 'day');
            }
        }

        this.end = newEnd;
    }

    public get duration(): Duration { return duration(this.end?.diff(this.start)); }

    public get isAllDay(): boolean { return this.state.isAllDay; }
    public set isAllDay(val: boolean) { this.state.isAllDay = val; }

    public get isRecurring(): boolean { return this._seriesMasterOrThisState.isRecurring; }
    public set isRecurring(val: boolean) {
        if (val && this.hasSnapshot && this.snapshotValue<boolean>('isRecurring') === false)
            this.endDate = this.startDate;

        if (!this.isSeriesException) this.state.isRecurring = val;

        this.recurrence ||= new Recurrence();

        if (val && (!this.recurrenceUID || Guid.empty.equals(this.recurrenceUID)))
            this.recurrenceUID = Guid.newGuid();
    }

    public get recurrence(): Recurrence { return this._seriesMasterOrThisState.recurrence; }
    public set recurrence(val: Recurrence) { if (!this.isSeriesException) this.state.recurrence = val; }

    public get recurrenceUID(): Guid { return this._seriesMasterOrThisState.recurrenceUID; }
    public set recurrenceUID(val: Guid) { if (!this.isSeriesException) this.state.recurrenceUID = val; }

    public get recurrenceExceptionInstanceDate(): Moment { return this.state.recurrenceExceptionInstanceDate; }
    public set recurrenceExceptionInstanceDate(val: Moment) { this.state.recurrenceExceptionInstanceDate = val; }

    public get recurrenceInstanceCancelled(): boolean { return this.state.recurrenceInstanceCancelled; }
    public set recurrenceInstanceCancelled(val: boolean) { this.state.recurrenceInstanceCancelled = val; }

    public get isConfidential(): boolean { return this._seriesMasterOrThisState.isConfidential; }
    public set isConfidential(val: boolean) { if (!this.isSeriesException) this.state.isConfidential = val; }

    public get restrictedToAccounts(): User[] { return this._seriesMasterOrThisState.restrictedToAccounts; }
    public set restrictedToAccounts(val: User[]) { if (!this.isSeriesException) this.state.restrictedToAccounts = val; }

    public get moderationStatus(): EventModerationStatus { return this._seriesMasterOrThisState.moderationStatus; }
    public set moderationStatus(val: EventModerationStatus) { if (!this.isSeriesException) this.state.moderationStatus = val; }

    public get isPendingApproval(): boolean { return this.moderationStatus === EventModerationStatus.Pending; }
    public get isApproved(): boolean { return this.moderationStatus === EventModerationStatus.Approved; }
    public get isRejected(): boolean { return this.moderationStatus === EventModerationStatus.Rejected; }

    public get moderator(): User | undefined { return this._seriesMasterOrThisState.moderator; }
    public set moderator(val: User | undefined) { if (!this.isSeriesException) this.state.moderator = val; }

    public get moderationTimestamp(): Moment | undefined { return this._seriesMasterOrThisState.moderationTimestamp; }
    public set moderationTimestamp(val: Moment | undefined) { if (!this.isSeriesException) this.state.moderationTimestamp = val; }

    public get moderationMessage(): string { return this._seriesMasterOrThisState.moderationMessage; }
    public set moderationMessage(val: string) { if (!this.isSeriesException) this.state.moderationMessage = val; }

    public get creator(): User { return (this.isSeriesException ? this.seriesMaster.get() : this).author; }

    private get _seriesMasterOrThisState(): IState {
        return (this.isSeriesException ? this.seriesMaster.get() : this).state;
    }

    public getWrappedEvent(): Event {
        return this;
    }

    public getSeriesMaster(): Event {
        return this.isSeriesException ? this.seriesMaster.get() : this;
    }

    public getExceptionOrEvent(): Event {
        return this;
    }

    public restrictedToAccountsUserChanges(): IUserListChanges {
        return this.usersDifference('restrictedToAccounts');
    }

    public expandOccurrences(range?: MomentRange): EventOccurrence[] {
        if (this.isSeriesMaster) {
            const cadence = new Cadence(this.start, this.recurrence);
            const dates = Array.from(cadence.generate(range));
            const exceptionsInRange = multifilter(this.exceptions.get(), inverseFilter(Entity.NewAndGhostableFilter), e => MomentRange.overlaps(range, e));

            return dates
                .map(date => {
                    const exception = this.exceptions.find(e => e.recurrenceExceptionInstanceDate.isSame(date, 'minute'));

                    if (exception) {
                        remove(exceptionsInRange, e => e === exception);
                    }

                    if (exception && !exception.isDeleted) {
                        if (exception.recurrenceInstanceCancelled) {
                            return undefined;
                        } else if (!MomentRange.overlaps(range, exception)) {
                            return undefined;
                        } else {
                            return new EventOccurrence(exception);
                        }
                    } else {
                        date.startOf('day');
                        const start = date.clone().add(this.startTime);
                        const end = start.clone().add(this.duration);
                        return new EventOccurrence(this, start, end);
                    }
                })
                .filter(Boolean)
                .concat(exceptionsInRange.map(e => new EventOccurrence(e)));
        } else {
            return (!range || MomentRange.overlaps(this, range)) ? [new EventOccurrence(this)] : [];
        }
    }

    public findOrCreateExceptionForDate(date: Moment): Event {
        const occurrence = first(this.expandOccurrences({ start: date, end: date }));
        return occurrence ? this.createSeriesException(occurrence.start, occurrence.end) : undefined;
    }

    public createSeriesException(start: Moment, end: Moment): Event {
        if (this.isSeriesMaster) {
            const event = new Event();
            event.title = this.title;
            event.start = start;
            event.end = end;
            event.location = this.location;
            event.description = this.description;
            event.contacts = [...this.contacts];
            event.isAllDay = this.isAllDay;
            event.refinerValues.set([...this.refinerValues.get()]);
            event.seriesMaster.set(this);
            event.recurrenceExceptionInstanceDate = start.clone();
            return event;
        } else {
            throw new Error('Cannot create a series exception because this event is not the series master');
        }
    }

    protected validationRules(): ValidationRule<Event>[] {
        return [
            ...Event.TitleValidations,
            ...Event.LocationValidations,
            ...Event.StartDateValidations,
            ...Event.EndDateValidations,
            ...Event.EveryN_Daily_Recurrence_Validations,
            ...Event.EveryN_Weekly_Recurrence_Validations,
            ...Event.Days_Weekly_Recurrence_Validations,
            ...Event.Date_MonthlyByDate_Recurrence_Validations,
            ...Event.EveryN_MonthlyByDate_Recurrence_Validations,
            ...Event.EveryN_MonthlyByDay_Recurrence_Validations,
            ...Event.Date_YearlyByDate_Recurrence_Validations,
            ...Event.EndDate_Until_Recurrence_Validations,
            ...Event.Count_Until_Recurrence_Validations
        ];
    }
}

export type EventMap = Map<number, Event>;
export type ReadonlyEventMap = ReadonlyMap<number, Event>;