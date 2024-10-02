import { sp } from '@pnp/sp';
import { IEmailProperties } from '@pnp/sp/sputilities';
import { IMicrosoftTeams } from '@microsoft/sp-webpart-base';
import { MSGraphClientV3, SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';
import { format } from '@fluentui/react';
import { Color, Entity, humanizeFixedList, IAsyncData, multifilter, now, User } from 'common';
import { ServiceContext, DeveloperService, DeveloperServiceProp, SharePointServiceProp, SharePointService, ISharePointService, TimeZoneServiceProp, TimeZoneService, ITimeZoneService, LiveUpdateServiceProp, LiveUpdateService, ILiveUpdateService, DirectoryService, DirectoryServiceProp, IDirectoryService, SpfxContext, TeamsJs } from 'common/services';
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
//import { ChannelsConfigurationsLoader } from './ChannelsConfigurationsLoader';

export class OnlineEventsService implements IEventsService {
    private readonly _context: SpfxContext;
    private readonly _teams: IMicrosoftTeams;
    private readonly _timezones: ITimeZoneService;
    private readonly _liveUpdate: ILiveUpdateService;
    private readonly _directory: IDirectoryService;
    private readonly _spo: ISharePointService;
    private readonly _configurations: IConfigurationService;
    private _msGraphClient: MSGraphClientV3;

    private _eventLoader: EventLoader;
    private _refinerLoader: RefinerLoader;
    private _refinerValueLoader: RefinerValueLoader;
    private _approversLoader: ApproversLoader;
    //private _channelsConfigurationsLoader: ChannelsConfigurationsLoader;

    constructor({
        [SpfxContext]: context,
        [TeamsJs]: teams,
        [DeveloperService]: dev,
        [TimeZoneService]: timezones,
        [LiveUpdateService]: liveUpdate,
        [DirectoryService]: directory,
        [SharePointService]: spo,
        [ConfigurationService]: configurations
    }: ServiceContext<DeveloperServiceProp & TimeZoneServiceProp & LiveUpdateServiceProp & DirectoryServiceProp & SharePointServiceProp & ConfigurationServiceProp>) {
        this._context = context;
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
           // this._channelsConfigurationsLoader = new ChannelsConfigurationsLoader(schema, this._timezones, this._spo, this._liveUpdate, this._refinerValueLoader);
        }
        this._msGraphClient = await this._context.msGraphClientFactory.getClient("3");
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

    // public get channelsConfigurationsAsync(): IAsyncData<readonly ChannelsConfigurations[]> {
    //     return this._channelsConfigurationsLoader.asyncData();
    // }

    public track(event: Event): void;
    public track(refiner: Refiner): void;
    public track(refinerValue: RefinerValue): void;
    public track(approvers: Approvers): void;
   // public track(channelsConfiguration: ChannelsConfigurations): void;
    public track(entity: Event | Refiner | RefinerValue | Approvers ): void {
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
        // else if (entity instanceof ChannelsConfigurations) {
        //     this._channelsConfigurationsLoader.track(entity);
        // }
    }

    public async persist(): Promise<void> {
        await this._refinerLoader.persist();
        await this._refinerValueLoader.persist();
        await this._approversLoader.persist();
       // await this._channelsConfigurationsLoader.persist();
        await this._eventLoader.persist();
        await this._handleRestrictedPermissionsEvents();
        await this._handleEventApprovals();
    }

    public addToOutlook(event: Event, timeZoneDiff?: any): void {
        const builder = new iCalendarFileBuilder();
        const ics = builder.build(event, timeZoneDiff);

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

    public getTeamsNameById = async (teamsId: string) => {      
        const resultGraph = await this._msGraphClient.api(`teams/${teamsId}`).version("v1.0").select('displayName').get();
        return resultGraph.displayName;
    }

    public getActualChannelNameById = async (teamsId: string, channelId: string) => {      
        const resultGraph = await this._msGraphClient.api(`teams/${teamsId}/channels/${channelId}`).version("v1.0").select('displayName').get();
        return resultGraph.displayName;
    }

    private getUserId = async (userEmail: string) => {
        let userObject: { displayName: string, id: any } = null;
        const accountName = `'i:0#.f|membership|${userEmail}'`;
        const url = `${this._context.pageContext.web.absoluteUrl}/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v=${encodeURIComponent(accountName)}`;
        await this._context.spHttpClient.get(url, SPHttpClient.configurations.v1)
            .then(async (response: SPHttpClientResponse) => {
            if (response.ok) {
                await response.json().then((data) => {
                console.log("data response", data);
                const selectedItem = data.UserProfileProperties.find((item: { Key: string; })=> item.Key === "msOnline-ObjectId");
                userObject = {
                    displayName: data.DisplayName,
                    id: selectedItem?selectedItem.Value:null
                  };
                });
            }
            else {
                console.error(`Failed to load user profile. Error: ${response.statusText}`);
            }
            }).catch((error: any) => {
            console.error(`Error: ${error}`);
        });  
        return userObject;         
    }

    private createUsersGroupChat = async (requesterId: string, rxUsers: any[], eventDisplayName: string) => {
        const groupUsers = [];
        let temprxUsers: any[] = [];
        if (rxUsers && rxUsers.length > 0) {
            rxUsers.filter((userItem) => {
                var i = temprxUsers.findIndex(x => (x.id === userItem.id));
                if (i <= -1) {
                    temprxUsers.push(userItem);
                }
                return null;
            });
        }
        const isRequesterIdPresent = temprxUsers.some(user => user.id === requesterId);
        if (!isRequesterIdPresent) {
            groupUsers.push({
                "@odata.type": "#microsoft.graph.aadUserConversationMember",
                "roles": ["owner"],
                "user@odata.bind": `https://graph.microsoft.com/beta/users('${requesterId}')`
            });
        }

        if(temprxUsers && temprxUsers.length > 0)
            temprxUsers.map(user => {
                groupUsers.push({
                    "@odata.type": "#microsoft.graph.aadUserConversationMember",
                    "roles": ["owner"],
                    "user@odata.bind": `https://graph.microsoft.com/beta/users('${user.id}')`
                })
            });

        const body: any = {
            "chatType": "group",
            "topic": eventDisplayName,    
            "members": groupUsers
        };
        const resultGraph = await this._msGraphClient.api(`chats`).version("beta").post(body);
        return {
            chat_Id: resultGraph.id,
            rxUser: temprxUsers
        };
    }

    private sendMessage = async (chatId: { chat_Id: string, rxUser: any }[], event: any, itemUrl: string) => {
        const { displayName, start, end, isAllDay, location, description, isRecurring, recurrence } = event;
        const dateAndTimeString = isRecurring ? humanizeRecurrencePattern(start, recurrence) : humanizeDateRange(start, end, isAllDay);
        const strippedHtmlDescription = description.replace(/<[^>]+>/g, '');
        const imageDataUrl="data:image/jpeg;base64,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";
        const adaptiveCard = {
            "type": "AdaptiveCard",
            "body": [
                isRecurring && {
                    type: 'Image',
                    url: imageDataUrl,
                    altText: 'Description of the image',
                    "size": "Small",
                    "width": "15px",
                    "height": "15px"
                },
                {
                    "type": "TextBlock",
                    "size": "Medium",
                    "weight": "Bolder",
                    "text": strings.RequestEmail.Subject
                },
                {
                    "type": "TextBlock",
                    "text": "An event requiring your approval has been submitted to the Rhythm of Business Calendar.",
                    "wrap": true
                },
                {
                    "type": "TextBlock",
                    "text": "Event Details :",
                    "wrap": true,
                    "weight": "Bolder"
                },
                {
                    "type": "FactSet",
                    "spacing": "large",
                    "facts": [
                        {
                            "title": "Event :",
                            "value": displayName
                        },
                        {
                            "title": "Location :",
                            "value": location
                        },
                        {
                            "title": "Date and Time :",
                            "value": dateAndTimeString
                        },
                        {
                            "title": "Description :",
                            "value": strippedHtmlDescription,
                            "wrap": true
                        }
                    ]
                },
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.OpenUrl",
                            "title": "Please approve or decline this event",
                            "url": itemUrl
                        }
                    ]
                }
            ].filter(Boolean),
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.5"
        };
        
        await Promise.all(
            chatId.map(async (cidInFocus: { chat_Id: string, rxUser: any[] }) => {
                const groupUsers: any[] = [];
                if(cidInFocus.rxUser.length > 0)
                    cidInFocus.rxUser.map((user, index) => {
                            groupUsers.push({
                                "id": index,                            //To get id dynamicaly
                                "mentionText": user.displayName,
                                "mentioned": {
                                    "user": {
                                        "displayName": user.displayName,
                                        "id": user.id,
                                        "userIdentityType": "aadUser"
                                    }
                                }
                            })
                    });
                const body = {
                    "body": {
                        "contentType": 'html',
                        "content": `Hi ${cidInFocus.rxUser.map((user, index) => `<at id="${index}">${user.displayName}</at>`).join(", ")}</at><attachment id="74d20c7f34aa4a7fb74e2b30004247c5"></attachment>`       //Mention approvers                 
                    },
                    "mentions": groupUsers,
                    "attachments": [
                        {
                            "id": "74d20c7f34aa4a7fb74e2b30004247c5",
                            "contentType": "application/vnd.microsoft.card.adaptive",
                            "content": JSON.stringify(adaptiveCard)
                        }
                    ]
        
                };
                await this._msGraphClient.api(`chats/${cidInFocus.chat_Id}/messages`).version("beta").post(body);
            })
        );
    }

    public sendNotification_EventApproved = async (chatId: { chat_Id: string, rxUser: any }[], event: any, itemUrl: string) => {
        const { moderator, moderationMessage } = event;
       // const dateAndTimeString = isRecurring ? humanizeRecurrencePattern(start, recurrence) : humanizeDateRange(start, end, isAllDay);
       // const strippedHtmlDescription = description.replace(/<[^>]+>/g, '');

        const { author } = event;
        const approvers = (await this._approversLoader.all()).filter(Entity.NotDeletedFilter);
        const selectedValuesByRefiner = event.valuesByRefiner();
        const approversForEvent = approvers.filter(a => Approvers.appliesTo(a, selectedValuesByRefiner));
        const approversUsers = approversForEvent.flatMap(a => a.users);

        const toAddresses = [
            ...approversUsers
        ].map(user => user.email);

        const ccAddresses = [
            author
        ].map(user => user.email);

        const rxEmailColl: string[] = [...toAddresses, ...ccAddresses];
        let rxUserIDColl: any[] = [];
        let filteredrxUserIDColl: any[] = [];
   
        const currentUser: { displayName: string, id: any } = await this.getUserId(moderator.email);
        await Promise.all(rxEmailColl.map(async (email: string) => {
            rxUserIDColl.push(await this.getUserId(email));
        }));
         if(rxUserIDColl && rxUserIDColl.length>0)
             rxUserIDColl = rxUserIDColl.filter(rxUserID => rxUserID.id !== currentUser.id);

        if (rxUserIDColl && rxUserIDColl.length > 0) {
            rxUserIDColl.filter((userItem) => {
                var i = filteredrxUserIDColl.findIndex(x => (x.id === userItem.id));
                if (i <= -1) {
                    filteredrxUserIDColl.push(userItem);
                }
                return null;
            });
        } 
        const adaptiveCard = {
            "type": "AdaptiveCard",
            "body": [    
                {
                    "type": "TextBlock",
                    "size": "Medium",
                    "weight": "Bolder",
                    "text": strings.ApprovedEmail.Subject
                },            
                {
                    "type": "TextBlock",                    
                    "text": "This event was approved by " + event.moderator.title + " on " + event.moderationTimestamp.format('DD/MM/yyyy'),                    
                    "wrap": true
                },  
                {
                    "type": "FactSet",
                    "spacing": "large",
                    "facts": [
                        {
                            "title": "Comments :",
                            "value": moderationMessage
                        },
                    ]
                },                            
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.OpenUrl",
                            "title": "See Details",
                            "float": "right",
                            "url": itemUrl
                        }
                    ]
                }
            ],
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.5"
        };
        
        await Promise.all(
            chatId.map(async (cidInFocus: { chat_Id: string, rxUser: any[] }) => { 
                const groupUsers: any[] = [];
                if(filteredrxUserIDColl && filteredrxUserIDColl.length > 0)
                    filteredrxUserIDColl.map((user, index) => {
                            groupUsers.push({
                                "id": index,
                                "mentionText": user.displayName,
                                "mentioned": {
                                    "user": {
                                        "displayName": user.displayName,
                                        "id": user.id,
                                        "userIdentityType": "aadUser"
                                    }
                                }
                            })
                    });    
                const body = {
                     "body": {
                        "contentType": 'html',
                        "content":`Hi ${filteredrxUserIDColl.map((user, index) => `<at id="${index}">${user.displayName}</at>`).join(", ")}<attachment id="74d20c7f34aa4a7fb74e2b30004247c5"></attachment>`                
                    },
                    "mentions": groupUsers,
                    "attachments": [
                        {
                            "id": "74d20c7f34aa4a7fb74e2b30004247c5",
                            "contentType": "application/vnd.microsoft.card.adaptive",
                            "content": JSON.stringify(adaptiveCard)
                        }
                    ]
                };
                try{
                    await this._msGraphClient.api(`chats/${cidInFocus.chat_Id}/messages`).version("beta").post(body);
                }catch (e) {
                    // send an email
                    console.log(e);
                }
                
            })
        );
    }

    public sendNotification_EventRejected = async (chatId: { chat_Id: string, rxUser: any }[], event: any, itemUrl: string) => {
        const { start, end, isAllDay, description, isRecurring, recurrence, moderator, moderationMessage } = event;
       // const dateAndTimeString = isRecurring ? humanizeRecurrencePattern(start, recurrence) : humanizeDateRange(start, end, isAllDay);
       // const strippedHtmlDescription = description.replace(/<[^>]+>/g, '');

        const { author } = event;
        const approvers = (await this._approversLoader.all()).filter(Entity.NotDeletedFilter);
        const selectedValuesByRefiner = event.valuesByRefiner();
        const approversForEvent = approvers.filter(a => Approvers.appliesTo(a, selectedValuesByRefiner));
        const approversUsers = approversForEvent.flatMap(a => a.users);

        const toAddresses = [
            ...approversUsers
        ].map(user => user.email);

        const ccAddresses = [
            author
        ].map(user => user.email);

        const rxEmailColl: string[] = [...toAddresses, ...ccAddresses];
        let rxUserIDColl: any[] = [];
        let filteredrxUserIDColl: any[] = [];
        const currentUser: { displayName: string, id: any } = await this.getUserId(moderator.email);
        await Promise.all(rxEmailColl.map(async (email: string) => {
            rxUserIDColl.push(await this.getUserId(email));
        }));
         if(rxUserIDColl && rxUserIDColl.length>0)
             rxUserIDColl = rxUserIDColl.filter(rxUserID => rxUserID.id !== currentUser.id);

        //
        if (rxUserIDColl && rxUserIDColl.length > 0) {
            rxUserIDColl.filter((userItem) => {
                var i = filteredrxUserIDColl.findIndex(x => (x.id === userItem.id));
                if (i <= -1) {
                    filteredrxUserIDColl.push(userItem);
                }
                return null;
            });
        }
        //
             const adaptiveCard = {
            "type": "AdaptiveCard",
            "body": [   
                {
                    "type": "TextBlock",
                    "size": "Medium",
                    "weight": "Bolder",
                    "text": strings.RejectedEmail.Subject
                },             
                {
                    "type": "TextBlock",                    
                    "text": "This event was declined by " + event.moderator.title + " on " + event.moderationTimestamp.format('DD/MM/yyyy') ,                    
                    "wrap": true
                },  
                {
                    "type": "FactSet",
                    "spacing": "large",
                    "facts": [
                        {
                            "title": "Reason :",
                            "value": moderationMessage
                        },
                    ]
                },                             
                {
                    "type": "ActionSet",
                    "actions": [
                        {
                            "type": "Action.OpenUrl",
                            "title": "See Details",
                            "url": itemUrl
                        }
                    ]
                }
            ],
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "version": "1.5"
        };
        
        await Promise.all(
            chatId.map(async (cidInFocus: { chat_Id: string, rxUser: any[] }) => {  
                const groupUsers: any[] = [];
                if(filteredrxUserIDColl && filteredrxUserIDColl.length > 0)
                    filteredrxUserIDColl.map((user, index) => {
                            groupUsers.push({
                                "id": index,
                                "mentionText": user.displayName,
                                "mentioned": {
                                    "user": {
                                        "displayName": user.displayName,
                                        "id": user.id,
                                        "userIdentityType": "aadUser"
                                    }
                                }
                            })
                    });

                const body = {
                     "body": {
                        "contentType": 'html',
                        "content":`Hi ${filteredrxUserIDColl.map((user, index) => `<at id="${index}">${user.displayName}</at>`).join(", ")}<attachment id="74d20c7f34aa4a7fb74e2b30004247c5"></attachment>`                
                    },
                    "mentions": groupUsers,
                    "attachments": [
                        {
                            "id": "74d20c7f34aa4a7fb74e2b30004247c5",
                            "contentType": "application/vnd.microsoft.card.adaptive",
                            "content": JSON.stringify(adaptiveCard)
                        }
                    ]
        
                };
                try{
                    await this._msGraphClient.api(`chats/${cidInFocus.chat_Id}/messages`).version("beta").post(body);
                }catch (e) {
                console.log(e);
            }
            })
        );
    }

    // public sendDetailinPost = async (event: Event, itemUrl: string, channelId: string, groupId: string) => {
    //     const { displayName, start, end, isAllDay, location, description, isRecurring, recurrence } = event;
    //     const dateAndTimeString = isRecurring ? humanizeRecurrencePattern(start, recurrence) : humanizeDateRange(start, end, isAllDay);
    
    //       const strippedHtmlDescription = description.replace(/<[^>]+>/g, '');
    //       const imageDataUrl="data:image/jpeg;base64,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";
    //     //if (true) {
    //         //const { channelId, groupId } = this._teams.context;     
    //             const adaptiveCard = {
    //                 "type": "AdaptiveCard",
    //                 "body": [
    //                     isRecurring && {
    //                         type: 'Image',
    //                         url: imageDataUrl,
    //                         altText: 'Description of the image',
    //                         "size": "Small",
    //                         "width": "15px",
    //                         "height": "15px"
    //                     },
    //                     {
    //                         "type": "TextBlock",
    //                         "size": "Medium",
    //                         "weight": "Bolder",
    //                         "text": displayName
    //                     },
    //                     {
    //                         "type": "TextBlock",
    //                         "text": "This event is shared from the Rhythm of Business Calendar.",
    //                         "wrap": true
    //                     },
    //                     {
    //                         "type": "TextBlock",
    //                         "text": "Event Details :",
    //                         "wrap": true,
    //                         "weight": "Bolder"
    //                     },
    //                     {
    //                         "type": "FactSet",
    //                         "spacing": "large",
    //                         "facts": [
    //                             {
    //                                 "title": "Event:",
    //                                 "value": displayName
    //                             },
    //                             {
    //                                 "title": "Location:",
    //                                 "value": location
    //                             },
    //                             {
    //                                 "title": "Date and Time:",
    //                                 "value": dateAndTimeString
    //                             },
    //                             {
    //                                 "title": "Description:",
    //                                 "value": strippedHtmlDescription,
    //                                 "wrap": true
    //                             }
    //                         ]
    //                     },
    //                     {
    //                         "type": "ActionSet",
    //                         "actions": [
    //                             {
    //                                 "type": "Action.OpenUrl",
    //                                 "title": "Click to navigate to this event",
    //                                 "url": itemUrl
    //                             }
    //                         ]
    //                     }
    //                 ].filter(Boolean),
    //                 "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
    //                 "version": "1.5"
    //             };
    //             const body = {
    //                 "body": {
    //                     "contentType": 'html',
    //                     "content": "<attachment id=\"74d20c7f34aa4a7fb74e2b30004247c5\"></attachment>"
    //                 },
    //                 // "body": {
    //                 //     "contentType": 'html',
    //                 //     "content": `Hi <at id="0">MOT</at><attachment id="74d20c7f34aa4a7fb74e2b30004247c5"></attachment>`
    //                 // },
    //                 // "mentions": [
    //                 //     {
    //                 //         "id": 0,
    //                 //         "mentionText": "MOT",
    //                 //         "mentioned": {
    //                 //             "channel": {
    //                 //                 "displayName": mot,
    //                 //                 "id": cidInFocus.rxUser.id,
    //                 //                 "userIdentityType": "aadUser"
    //                 //             }
    //                 //         }
    //                 //     }
    //                 // ],
    //                 "attachments": [
    //                     {
    //                         "id": "74d20c7f34aa4a7fb74e2b30004247c5",
    //                         "contentType": "application/vnd.microsoft.card.adaptive",
    //                         "content": JSON.stringify(adaptiveCard)
    //                     }
    //                 ]
    //             };
    //         await this._msGraphClient.api(`teams/${groupId}/channels/${channelId}/messages`).version("beta").post(body);
    //     }
    // }

    private constructUserTeamsMessage = async (event: Event, refiners: Refiner[], approvers: Approvers[]) => {
        const { author } = event;

        const selectedValuesByRefiner = event.valuesByRefiner();
        const approversForEvent = approvers.filter(a => Approvers.appliesTo(a, selectedValuesByRefiner));
        const approversUsers = approversForEvent.flatMap(a => a.users);

        if(approversUsers && approversUsers.length > 0){
            const toAddresses = [
                ...approversUsers
            ].map(user => user.email);

            const ccAddresses = [
                author
            ].map(user => user.email);

            const itemUrl = this.createEventDeepLink(event);

            const rxEmailColl: string[] = [...toAddresses, ...ccAddresses];
            let rxUserIDColl: any[] = [];
            const currentUser: { displayName: string, id: any } = await this.getUserId(author.email);
            await Promise.all(rxEmailColl.map(async (email: string) => {
                rxUserIDColl.push(await this.getUserId(email));
            }));
            if(rxUserIDColl && rxUserIDColl.length>0)
            rxUserIDColl = rxUserIDColl.filter(rxUserID => rxUserID.id !== currentUser.id);
            const chatID: { chat_Id: string, rxUser: any }[] = [];
            const eventDisplayName = "Approval for - " + event.displayName;
            chatID.push(await this.createUsersGroupChat(currentUser.id, rxUserIDColl, eventDisplayName)); 
            event.teamsGroupChatId = chatID[0].chat_Id.replace("@", "#");
            await this._eventLoader.persist();
            await this.sendMessage(chatID, event, itemUrl);
        }
    }

    private async _handleEventApprovals(): Promise<void> {
        const events = multifilter(this._eventLoader.entitiesWithChanges, Entity.NotDeletedFilter, e => e.hasSnapshot);
        const refiners = (await this._refinerLoader.all()).filter(Entity.NotDeletedFilter);
        const approvers = (await this._approversLoader.all()).filter(Entity.NotDeletedFilter);
        const isTeamsNotification = this._configurations.active.useApprovalsTeamsNotification;
        const isEmailNotification = this._configurations.active.useApprovalsEmailNotification;

        for (const event of events) {
            const { isPendingApproval, isRejected, isApproved } = event;
            const isNew = event.snapshotValue<boolean>('isNew');
            const moderationStatusChanged = event.hasChanges('moderationStatus');

            try {
                if (isNew && isPendingApproval) {
                    const email = this._constructEmail_EventApprovalRequest(event, refiners, approvers);
                    try{
                        if(isTeamsNotification){                           
                                await this.constructUserTeamsMessage(event, refiners, approvers);
                        }
                    }
                    catch (ex) {
                        console.error('Failed to send teams event approval post', ex);
                    }
                    try{
                        if(isEmailNotification){
                            await sp.utility.sendEmail(email);
                        }
                    }catch (ex) {
                        console.error('Failed to send event approval e-mail', ex);
                    }

                } else if (moderationStatusChanged && isRejected && isEmailNotification) {
                    const email = this._constructEmail_EventRejected(event, refiners, approvers);
                    await sp.utility.sendEmail(email);
                }
                else if (moderationStatusChanged && isApproved && isEmailNotification) {
                    const email = this._constructEmail_EventApproved(event, refiners, approvers);
                    await sp.utility.sendEmail(email);
                }
            } catch (ex) {
                console.error('Failed to send event approval e-mail or teams notification', ex);
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

    private _constructEmail_EventApproved(event: Event, refiners: Refiner[], approvers: Approvers[]): IEmailProperties {
        const { author, moderator, moderationMessage } = event;

        const selectedValuesByRefiner = event.valuesByRefiner();
        const approversForEvent = approvers.filter(a => Approvers.appliesTo(a, selectedValuesByRefiner));
        const approversUsers = approversForEvent.flatMap(a => a.users);

        const toAddresses = [
            author
        ].map(user => user.email);

        const ccAddresses = [
            ...approversUsers
        ].map(user => user.email);

        const itemUrl = this.createEventDeepLink(event);

        const eventDetailsHtml = this._constructEventDetailsHtml(event, refiners);

        const body =
            `<p>${format(strings.ApprovedEmail.Intro, AppName, `<a href="mailto:${moderator.email}">${moderator.title}</a>`)}</p>` +
            `<p>Comments: ${moderationMessage || strings.ApprovedEmail.CommentGiven}</p>` +
            `<br />` +
            `<p><a href="${itemUrl}">${strings.ApprovedEmail.EventLinkText}</a></p>` +
            `<h3>${strings.ApprovedEmail.EventDetailsHeading}</h3>` +
            eventDetailsHtml;

        return {
            To: toAddresses,
            CC: ccAddresses,
            Subject: strings.ApprovedEmail.Subject,
            Body: body
        };
    }

    private _constructEmail_EventRejected(event: Event, refiners: Refiner[], approvers: Approvers[]): IEmailProperties {
        const { author, moderator, moderationMessage } = event;
        const selectedValuesByRefiner = event.valuesByRefiner();
        const approversForEvent = approvers.filter(a => Approvers.appliesTo(a, selectedValuesByRefiner));
        const approversUsers = approversForEvent.flatMap(a => a.users);

        const toAddresses = [
            author
        ].map(user => user.email);

        const ccAddresses = [
            ...approversUsers
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
            CC: ccAddresses,
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