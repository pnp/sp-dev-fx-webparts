import { sp } from '@pnp/sp';
import { IEmailProperties } from '@pnp/sp/sputilities';
import { IMicrosoftTeams } from '@microsoft/sp-webpart-base';
import { format } from '@fluentui/react';
import { Color, Entity, humanizeFixedList, IAsyncData, multifilter, now, User } from 'common';
import { ServiceContext, DeveloperService, DeveloperServiceProp, SharePointServiceProp, SharePointService, ISharePointService, TimeZoneServiceProp, TimeZoneService, ITimeZoneService, LiveUpdateServiceProp, LiveUpdateService, ILiveUpdateService, DirectoryService, DirectoryServiceProp, IDirectoryService, TeamsJs } from 'common/services';
import { RoleType } from 'common/sharepoint';
import { Approvers, Event, EventModerationStatus, humanizeDateRange, humanizeRecurrencePattern, ReadonlyEventMap, Refiner, RefinerValue } from 'model';
import { ConfigurationService, IConfigurationService, ConfigurationServiceProp } from '../configuration';
import { IEventsService } from './EventsServiceDescriptor';
import { EventLoader } from './EventLoader';
import { iCalendarFileBuilder } from './iCalendarFileBuilder';
import { RefinerLoader } from './RefinerLoader';
import { RefinerValueLoader } from './RefinerValueLoader';
import { ApproversLoader } from './ApproversLoader';
import { Defaults } from './Defaults';

import { AppName, ApprovalEmails as strings } from 'ComponentStrings';

export class OnlineEventsService implements IEventsService {
    private readonly _teams: IMicrosoftTeams;
    private readonly _timezones: ITimeZoneService;
    private readonly _liveUpdate: ILiveUpdateService;
    private readonly _directory: IDirectoryService;
    private readonly _spo: ISharePointService;
    private readonly _configurations: IConfigurationService;

    private _eventLoader: EventLoader;
    private _refinerLoader: RefinerLoader;
    private _refinerValueLoader: RefinerValueLoader;
    private _approversLoader: ApproversLoader;

    constructor({
        [TeamsJs]: teams,
        [DeveloperService]: dev,
        [TimeZoneService]: timezones,
        [LiveUpdateService]: liveUpdate,
        [DirectoryService]: directory,
        [SharePointService]: spo,
        [ConfigurationService]: configurations
    }: ServiceContext<DeveloperServiceProp & TimeZoneServiceProp & LiveUpdateServiceProp & DirectoryServiceProp & SharePointServiceProp & ConfigurationServiceProp>) {
        this._teams = teams;
        this._timezones = timezones;
        this._liveUpdate = liveUpdate;
        this._directory = directory;
        this._spo = spo;
        this._configurations = configurations;

        dev.registerScripts(this._devScripts);
    }

    public async initialize(): Promise<void> {
        const configuration = this._configurations.active;

        if (configuration && !configuration.isNew) {
            const schema = configuration.schema;

            this._refinerLoader = new RefinerLoader(schema, this._timezones, this._spo, this._liveUpdate);
            this._refinerValueLoader = new RefinerValueLoader(schema, this._timezones, this._spo, this._liveUpdate, this._refinerLoader);
            this._eventLoader = new EventLoader(schema, this._timezones, this._spo, this._liveUpdate, this._refinerValueLoader);
            this._approversLoader = new ApproversLoader(schema, this._timezones, this._spo, this._liveUpdate, this._refinerValueLoader);
        }
    }

    public get eventsAsync(): IAsyncData<readonly Event[]> {
        return this._eventLoader.asyncData();
    }

    public async eventsById(): Promise<ReadonlyEventMap> {
        return this._eventLoader.entitiesById();
    }

    public get refinersAsync(): IAsyncData<readonly Refiner[]> {
        return this._refinerLoader.asyncData();
    }

    public get refinerValuesAsync(): IAsyncData<readonly RefinerValue[]> {
        return this._refinerValueLoader.asyncData();
    }

    public get approversAsync(): IAsyncData<readonly Approvers[]> {
        return this._approversLoader.asyncData();
    }

    public track(event: Event): void;
    public track(refiner: Refiner): void;
    public track(refinerValue: RefinerValue): void;
    public track(approvers: Approvers): void;
    public track(entity: Event | Refiner | RefinerValue | Approvers): void {
        if (entity instanceof Event) {
            this._eventLoader.track(entity);
        } else if (entity instanceof Refiner) {
            this._refinerLoader.track(entity);
            entity.values.forEach(value => this.track(value));
        } else if (entity instanceof RefinerValue) {
            this._refinerValueLoader.track(entity);
        } else if (entity instanceof Approvers) {
            this._approversLoader.track(entity);
        }
    }

    public async persist(): Promise<void> {
        await this._refinerLoader.persist();
        await this._refinerValueLoader.persist();
        await this._approversLoader.persist();
        await this._eventLoader.persist();
        await this._handleRestrictedPermissionsEvents();
        await this._handleEventApprovals();
    }

    public addToOutlook(event: Event): void {
        const builder = new iCalendarFileBuilder();
        const ics = builder.build(event);

        const filename = event.title;
        const blob = new Blob([ics], { type: "text/html" });

        const url = URL.createObjectURL(blob);

        const element = document.createElement("a");
        element.href = url;
        element.setAttribute("download", `${filename}.ics`);
        element.click();

        URL.revokeObjectURL(url);
    }

    public createEventDeepLink(event: Event): string {
        let path = '';

        const { id, seriesMaster, isNew, isSeriesException, recurrenceExceptionInstanceDate } = event;
        const eventId = (isSeriesException && isNew) ? seriesMaster.get().id : id;

        if (this._teams) {
            const { entityId, channelId, groupId, tid } = this._teams.context;
            const subEntityId = JSON.stringify({
                eventId,
                recurrenceDate: isSeriesException ? recurrenceExceptionInstanceDate.toISOString() : undefined
            });
            const appId = Defaults.TeamsAppId;

            path = `https://teams.microsoft.com/l/entity/${appId.toString()}/${entityId}` +
                `?context=${encodeURIComponent(JSON.stringify({ subEntityId, channelId }))}` +
                `&groupId=${groupId}&tenantId=${tid}&allowXTenantAccess=false`;
        } else {
            const { origin, pathname, search } = window.location;
            const searchParams = new URLSearchParams(search);

            searchParams.set('eventid', eventId.toString());

            if (isSeriesException) {
                searchParams.set('recurrencedate', recurrenceExceptionInstanceDate.toISOString());
            }

            path = `${origin}${pathname}?${searchParams.toString()}`;
        }

        return path;
    }

    private async _handleRestrictedPermissionsEvents(): Promise<void> {
        const events = this._eventLoader.entitiesWithChanges;
        const eventsList = this._configurations.active.schema.eventsList;
        const approvers = (await this._approversLoader.all()).filter(Entity.NotDeletedFilter);

        const adminRoleDefinitionId = await this._directory.roleDefinitionId(RoleType.Administrator);

        await this._spo.preflightEnsureUsers([
            ...approvers.flatMap(a => a.users),
            ...events.map(event => event.author),
            ...events.flatMap(event => event.restrictedToAccounts)
        ]);

        for (const event of events) {
            const { isConfidential, author, restrictedToAccounts } = event;
            const isConfidentialChanged = event.hasChanges('isConfidential');
            const restrictedToAccountsChanged = event.hasChanges('restrictedToAccounts');

            if (isConfidentialChanged || restrictedToAccountsChanged) {
                if (isConfidential) {
                    const selectedValuesByRefiner = event.valuesByRefiner();
                    const approversForEvent = approvers.filter(a => Approvers.appliesTo(a, selectedValuesByRefiner));
                    const approversUsers = approversForEvent.flatMap(a => a.users);
                    const permissions = new Map<number, User[]>();

                    permissions.set(adminRoleDefinitionId, [
                        author,
                        ...approversUsers,
                        ...restrictedToAccounts
                    ]);

                    await this._spo.configureEntityPermissions(event, eventsList, permissions);
                } else {
                    await this._spo.configureEntityPermissions(event, eventsList, undefined);
                }
            }
        }
    }

    private async _handleEventApprovals(): Promise<void> {
        const events = multifilter(this._eventLoader.entitiesWithChanges, Entity.NotDeletedFilter, e => e.hasSnapshot);
        const refiners = (await this._refinerLoader.all()).filter(Entity.NotDeletedFilter);
        const approvers = (await this._approversLoader.all()).filter(Entity.NotDeletedFilter);

        for (const event of events) {
            const { isPendingApproval, isRejected } = event;
            const isNew = event.snapshotValue<boolean>('isNew');
            const moderationStatusChanged = event.hasChanges('moderationStatus');

            try {
                if (isNew && isPendingApproval) {
                    const email = this._constructEmail_EventApprovalRequest(event, refiners, approvers);
                    await sp.utility.sendEmail(email);
                } else if (moderationStatusChanged && isRejected) {
                    const email = this._constructEmail_EventRejected(event, refiners);
                    await sp.utility.sendEmail(email);
                }
            } catch (ex) {
                console.error('Failed to send event approval e-mail', ex);
            }
        }
    }

    private _constructEmail_EventApprovalRequest(event: Event, refiners: Refiner[], approvers: Approvers[]): IEmailProperties {
        const { author } = event;

        const selectedValuesByRefiner = event.valuesByRefiner();
        const approversForEvent = approvers.filter(a => Approvers.appliesTo(a, selectedValuesByRefiner));
        const approversUsers = approversForEvent.flatMap(a => a.users);

        const toAddresses = [
            ...approversUsers
        ].map(user => user.email);

        const ccAddresses = [
            author
        ].map(user => user.email);

        const itemUrl = this.createEventDeepLink(event);

        const eventDetailsHtml = this._constructEventDetailsHtml(event, refiners);

        const body =
            `<p>${format(strings.RequestEmail.Intro, AppName, `<a href="mailto:${author.email}">${author.title}</a>`)}</p>` +
            `<p><a href="${itemUrl}">${strings.RequestEmail.EventLinkText}</a></p>` +
            `<h3>${strings.RequestEmail.EventDetailsHeading}</h3>` +
            eventDetailsHtml;

        return {
            To: toAddresses,
            CC: ccAddresses,
            Subject: strings.RequestEmail.Subject,
            Body: body
        };
    }

    private _constructEmail_EventRejected(event: Event, refiners: Refiner[]): IEmailProperties {
        const { author, moderator, moderationMessage } = event;

        const toAddresses = [
            author
        ].map(user => user.email);

        const itemUrl = this.createEventDeepLink(event);

        const eventDetailsHtml = this._constructEventDetailsHtml(event, refiners);

        const body =
            `<p>${format(strings.RejectedEmail.Intro, AppName, `<a href="mailto:${moderator.email}">${moderator.title}</a>`)}</p>` +
            `<p>Reason: ${moderationMessage || strings.RejectedEmail.NoReasonGiven}</p>` +
            `<br />` +
            `<p><a href="${itemUrl}">${strings.RejectedEmail.EventLinkText}</a></p>` +
            `<h3>${strings.RejectedEmail.EventDetailsHeading}</h3>` +
            eventDetailsHtml;

        return {
            To: toAddresses,
            Subject: strings.RejectedEmail.Subject,
            Body: body
        };
    }

    private _constructEventDetailsHtml(event: Event, refiners: Refiner[]): string {
        const { displayName, start, end, isAllDay, location, description, isRecurring, recurrence, isConfidential } = event;
        const dateAndTimeString = isRecurring ? humanizeRecurrencePattern(start, recurrence) : humanizeDateRange(start, end, isAllDay);
        const { EventName, Location, DateAndTime, Description, ConfidentialEvent } = strings.EventDetails;

        return (
            `<table>` +
            `   <tr><td>${EventName}:</td> <td>${displayName}</td></tr>` +
            `   <tr><td>${Location}:</td> <td>${location || '-'}</td></tr>` +
            `   <tr><td>${DateAndTime}:</td> <td>${dateAndTimeString}</td></tr>` +
            `   <tr><td>${Description}:</td> <td>${description || '-'}</td></tr>` +
            refiners.sort(Refiner.OrderAscComparer).map(refiner =>
                `<tr><td>${refiner.displayName}:</td> <td>${this._humanizeSelectedRefinerValues(refiner, event)}</td></tr>`
            ).join('') +
            (isConfidential
                ? `<tr><td colspan="2">${ConfidentialEvent}</td></tr>`
                : ''
            ) +
            `</table>`
        );
    }

    private _humanizeSelectedRefinerValues(refiner: Refiner, event: Event): string {
        const refinerValues = refiner.values.get().filter(Entity.NotDeletedFilter);
        const selectedValues = multifilter(event.refinerValues.get(), Entity.NotDeletedFilter, value => value.refiner.get() === refiner);
        return humanizeFixedList(selectedValues, refinerValues, value => value.displayName) || strings.RefinerNoValueSelected;
    }

    private readonly _devScripts = {
        events: {
            createSampleRefiners: async () => {
                console.log(`Starting 'createSampleRefiners()'`);

                {
                    const refiner = new Refiner();
                    refiner.title = "Departments";
                    refiner.enableColors = true;
                    refiner.required = true;
                    refiner.order = 0;

                    const value1 = new RefinerValue();
                    value1.title = "Sales";
                    value1.color = new Color(0, 175, 0);
                    value1.refiner.set(refiner);

                    const value2 = new RefinerValue();
                    value2.title = "Marketing";
                    value2.color = new Color(235, 0, 0);
                    value2.refiner.set(refiner);

                    const value3 = new RefinerValue();
                    value3.title = "Engineering";
                    value3.color = new Color(50, 100, 255);
                    value3.refiner.set(refiner);

                    refiner.values.forEach((v, idx) => v.order = idx);

                    this.track(refiner);
                }

                {
                    const refiner = new Refiner();
                    refiner.title = "Tiers";
                    refiner.enableTags = true;
                    refiner.required = true;
                    refiner.order = 1;

                    const value1 = new RefinerValue();
                    value1.title = "Tier 1";
                    value1.tag = "1"
                    value1.refiner.set(refiner);

                    const value2 = new RefinerValue();
                    value2.title = "Tier 2";
                    value2.tag = "2";
                    value2.refiner.set(refiner);

                    const value3 = new RefinerValue();
                    value3.title = "Tier 3";
                    value3.tag = "3";
                    value3.refiner.set(refiner);

                    const value4 = new RefinerValue();
                    value4.title = "Tier 4";
                    value4.tag = "4";
                    value4.refiner.set(refiner);

                    refiner.values.forEach((v, idx) => v.order = idx);

                    this.track(refiner);
                }

                {
                    const refiner = new Refiner();
                    refiner.title = "Sample Refiner";
                    refiner.initiallyExpanded = false;
                    refiner.allowMultiselect = true;
                    refiner.order = 2;

                    const value1 = new RefinerValue();
                    value1.title = "Value A";
                    value1.refiner.set(refiner);

                    const value2 = new RefinerValue();
                    value2.title = "Value B";
                    value2.refiner.set(refiner);

                    const value3 = new RefinerValue();
                    value3.title = "Value C";
                    value3.refiner.set(refiner);

                    refiner.values.forEach((v, idx) => v.order = idx);

                    this.track(refiner);
                }

                await this.persist();

                console.log(`Completed 'createSampleRefiners()'`);
            },
            createSampleEvents: async () => {
                console.log(`Starting 'createSampleEvents()'`);

                const refiners = await this._refinerLoader.all();

                const { currentUser } = this._directory;

                const events: Event[] = [];

                {
                    const event = new Event();
                    event.snapshot();
                    event.title = "North America East Quarterly Connect - Broadcast";
                    event.start = now().add(2, 'days').startOf('day').add(10, 'hours');
                    event.end = event.start.clone().add(2, 'hours');
                    event.location = "Online Teams Meeting";

                    for (const refiner of refiners)
                        event.refinerValues.add(refiner.values.get()[0]);

                    event.moderator = currentUser;
                    event.moderationTimestamp = now();
                    event.moderationStatus = EventModerationStatus.Approved;

                    events.push(event);
                    this.track(event);
                }

                {
                    const event = new Event();
                    event.snapshot();
                    event.title = "Priority Aligment";
                    event.start = now().add(5, 'days').startOf('day').add(8, 'hours');
                    event.end = event.start.clone().add(6, 'hours');
                    event.location = "Executive Room 6";

                    for (const refiner of refiners)
                        event.refinerValues.add(refiner.values.get()[1]);

                    event.moderator = currentUser;
                    event.moderationTimestamp = now();
                    event.moderationStatus = EventModerationStatus.Approved;

                    events.push(event);
                    this.track(event);
                }

                {
                    const event = new Event();
                    event.snapshot();
                    event.title = "Southeast Conference Week";
                    event.start = now().add(5, 'days');
                    event.end = event.start.clone().add(4, 'days');
                    event.isAllDay = true;
                    event.location = "Miami Conference Center";

                    for (const refiner of refiners)
                        event.refinerValues.add(refiner.values.get()[2]);

                    event.moderator = currentUser;
                    event.moderationTimestamp = now();
                    event.moderationStatus = EventModerationStatus.Approved;

                    events.push(event);
                    this.track(event);
                }

                await this.persist();

                events.forEach(event => event.immortalize());

                console.log(`Completed 'createSampleEvents()'`);
            }
        }
    };
}