import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp, Web, PermissionKind, RegionalSettings, ISiteUser, IRegionalSettings} from "@pnp/sp/presets/all";
import { graph, } from "@pnp/graph";
import * as $ from 'jquery';
import { IEventData } from './IEventData';
import * as moment from 'moment';
import { IUserPermissions } from './IUserPermissions';
import parseRecurrentEvent from './parseRecurrentEvent';
import { IComboBoxOption } from '@fluentui/react';
import { Constants } from "../common/Constants";
import { Text } from "@microsoft/sp-core-library";

// Class Services
export default class spservices {

  constructor(private context: WebPartContext) {
    // Setuo Context to PnPjs and MSGraph
    sp.setup({
      spfxContext: this.context as any
    });

    graph.setup({
      spfxContext: this.context as any
    });
    // Init
    this.onInit();
  }
  // OnInit Function
  private async onInit() {
  }

  /**
   *
   * @private
   * @returns {Promise<string>}
   * @memberof spservices
   */
  public async getLocalTime(date: string | Date): Promise<string> {
    try {
      const localTime = await sp.web.regionalSettings.timeZone.utcToLocalTime(date);
      return localTime;
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   * @private
   * @returns {Promise<string>}
   * @memberof spservices
   */
  public async getUtcTime(date: string | Date): Promise<string> {
    try {
      const utcTime = await sp.web.regionalSettings.timeZone.localTimeToUTC(date);
      return utcTime;
    }
    catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   *
   * @param {IEventData} newEvent
   * @param {string} siteUrl
   * @param {string} listId
   * @returns
   * @memberof spservices
   */
  public async addEvent(newEvent: IEventData, siteUrl: string, listId: string) {
    let results = null;
    try {
      const web = sp.web;

      results = await web.lists.getById(listId).items.add({
        Title: newEvent.title,
        Description: newEvent.Description,
        Geolocation: newEvent.geolocation,
        ParticipantsPickerId: { results: newEvent.attendes },
        EventDate: await this.getUtcTime(newEvent.EventDate),
        EndDate: await this.getUtcTime(newEvent.EndDate),
        Location: newEvent.location,
        fAllDayEvent: newEvent.fAllDayEvent,
        fRecurrence: newEvent.fRecurrence,
        Category: newEvent.Category,
        EventType: newEvent.EventType,
        UID: newEvent.UID,
        RecurrenceData: newEvent.RecurrenceData ? await this.deCodeHtmlEntities(newEvent.RecurrenceData) : "",
        MasterSeriesItemID: newEvent.MasterSeriesItemID,
        RecurrenceID: newEvent.RecurrenceID ? newEvent.RecurrenceID : undefined,
      });
    }
    catch (error) {
      return Promise.reject(error);
    }
    return results;
  }

  /**
   *
   *
   * @param {string} siteUrl
   * @param {string} listId
   * @param {number} eventId
   * @returns {Promise<IEventData>}
   * @memberof spservices
   */
  public async getEvent(siteUrl: string, listId: string, eventId: number): Promise<IEventData> {
    let returnEvent: IEventData = undefined;
    try {
      const web = sp.web;
      const event = await web.lists.getById(listId).items.usingCaching().getById(eventId)
        .select("RecurrenceID", "MasterSeriesItemID", "Id", "ID", "ParticipantsPickerId", "EventType", "Title", "Description", "EventDate", "EndDate", "Location", "Author/SipAddress", "Author/Title", "Geolocation", "fAllDayEvent", "fRecurrence", "RecurrenceData", "RecurrenceData", "Duration", "Category", "UID")
        .expand("Author")
        .get();

      const eventDate = await this.getLocalTime(event.EventDate);
      const endDate = await this.getLocalTime(event.EndDate);

      returnEvent = {
        Id: event.ID,
        ID: event.ID,
        EventType: event.EventType,
        title: await this.deCodeHtmlEntities(event.Title),
        Description: event.Description ? event.Description : '',
        EventDate: new Date(eventDate),
        EndDate: new Date(endDate),
        location: event.Location,
        ownerEmail: event.Author.SipAddress,
        ownerPhoto: "",
        ownerInitial: '',
        color: '',
        ownerName: event.Author.Title,
        attendes: event.ParticipantsPickerId,
        fAllDayEvent: event.fAllDayEvent,
        geolocation: { Longitude: event.Geolocation ? event.Geolocation.Longitude : 0, Latitude: event.Geolocation ? event.Geolocation.Latitude : 0 },
        Category: event.Category,
        Duration: event.Duration,
        UID: event.UID,
        RecurrenceData: event.RecurrenceData ? await this.deCodeHtmlEntities(event.RecurrenceData) : "",
        fRecurrence: event.fRecurrence,
        RecurrenceID: event.RecurrenceID,
        MasterSeriesItemID: event.MasterSeriesItemID,
      };
    } 
    catch (error) {
      return Promise.reject(error);
    }
    return returnEvent;
  }

  /**
   *
   * @param {IEventData} newEvent
   * @param {string} siteUrl
   * @param {string} listId
   * @returns
   * @memberof spservices
   */
  public async updateEvent(updateEvent: IEventData, siteUrl: string, listId: string) {
    let results = null;
    try {
      // delete all recursive extentions before update recurrence event
      if (updateEvent.EventType.toString() == "1") await this.deleteRecurrenceExceptions(updateEvent, siteUrl, listId);

      const web = sp.web;
      const eventDate = await this.getUtcTime(updateEvent.EventDate);
      const endDate = await this.getUtcTime(updateEvent.EndDate);

      let newItem: any = {
        Title: updateEvent.title,
        Description: updateEvent.Description,
        Geolocation: updateEvent.geolocation,
        ParticipantsPickerId: { results: updateEvent.attendes },
        EventDate: new Date(eventDate),
        EndDate: new Date(endDate),
        Location: updateEvent.location,
        fAllDayEvent: updateEvent.fAllDayEvent,
        fRecurrence: updateEvent.fRecurrence,
        Category: updateEvent.Category,
        RecurrenceData: updateEvent.RecurrenceData ? await this.deCodeHtmlEntities(updateEvent.RecurrenceData) : "",
        EventType: updateEvent.EventType,
      };

      if (updateEvent.UID) {
        newItem.UID = updateEvent.UID;
      }
      if (updateEvent.MasterSeriesItemID) {
        newItem.MasterSeriesItemID = updateEvent.MasterSeriesItemID;
      }

      results = await web.lists.getById(listId).items.getById(updateEvent.Id).update(newItem);
    } 
    catch (error) {
      return Promise.reject(error);
    }
    return results;
  }

  public async deleteRecurrenceExceptions(event: IEventData, siteUrl: string, listId: string) {
    let results = null;
    try {
      const web = sp.web;
      results = await web.lists.getById(listId).items
        .select('Id')
        .filter(`EventType eq '3' or EventType eq '4' and MasterSeriesItemID eq '${event.Id}' `)
        .get();
      if (results && results.length > 0) {
        for (const recurrenceException of results) {
          await web.lists.getById(listId).items.getById(recurrenceException.Id).delete();
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
    return;
  }

  /**
   *
   * @param {IEventData} event
   * @param {string} siteUrl
   * @param {string} listId
   * @returns
   * @memberof spservices
   */
  public async deleteEvent(event: IEventData, siteUrl: string, listId: string, recurrenceSeriesEdited: boolean) {
    let results = null;
    try {
      const web = sp.web;
      // Exception Recurrence eventtype = 4 ?  update to deleted Recurrence eventtype=3
      switch (event.EventType.toString()) {
        case '4': // Exception Recurrence Event
          results = await web.lists.getById(listId).items.getById(event.Id).update({
            Title: `Deleted: ${event.title}`,
            EventType: '3',
          });
          break;
        case '1': // recurrence Event
          // if  delete is a main recrrence delete all recurrences and main recurrence
          if (recurrenceSeriesEdited) {
            // delete execptions if exists before delete recurrence event
            await this.deleteRecurrenceExceptions(event, siteUrl, listId);
            await web.lists.getById(listId).items.getById(event.Id).delete();
          } else {
            //Applying the Standard funactionality of SharePoint When deleting for deleting one occurrence of recurrent event by
           // 1) adding prefix "Deleted" to event title  2) Set RecurrenceID to event Date 3) Set MasterSeriesItemID to event ID 4)Set fRecurrence to true 5) Set event type to 3
            event.title = `Deleted: ${event.title}`;
            event.RecurrenceID = event.EventDate;
            event.MasterSeriesItemID = event.ID.toString();
            event.fRecurrence = true;
            event.EventType = '3';
            await this.addEvent(event, siteUrl, listId);
          }

          break;
        case '0': // normal Event
          await web.lists.getById(listId).items.getById(event.Id).delete();
          break;
      }

    } catch (error) {
      return Promise.reject(error);
    }
    return;
  }
  /**
   *
   * @param {number} userId
   * @param {string} siteUrl
   * @returns {Promise<ISiteUser>}
   * @memberof spservices
   */
  public async getUserById(userId: number, siteUrl: string): Promise<ISiteUser> {
    let results: ISiteUser = null;

    if (!userId && !siteUrl) {
      return null;
    }

    try {
      const web = sp.web;
      results = await web.siteUsers.getById(userId).get();
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }

  /**
   *
   *
   * @param {string} loginName
   * @param {string} siteUrl
   * @returns {Promise<ISiteUser>}
   * @memberof spservices
   */
  public async getUserByLoginName(loginName: string, siteUrl: string): Promise<ISiteUser> {
    let results: ISiteUser = null;

    if (!loginName && !siteUrl) {
      return null;
    }

    try {
      const web = sp.web;
      await web.ensureUser(loginName);
      results = await web.siteUsers.getByLoginName(loginName).get();
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }
  /**
   *
   * @param {string} loginName
   * @returns
   * @memberof spservices
   */
  public async getUserProfilePictureUrl(loginName: string) {
    let results: any = null;
    try {
      results = await sp.profiles.usingCaching().getPropertiesFor(loginName);
    } catch (error) {
      results = null;
    }
    return results.PictureUrl;
  }

  /**
   *
   * @param {string} siteUrl
   * @param {string} listId
   * @returns {Promise<IUserPermissions>}
   * @memberof spservices
   */
  public async getUserPermissions(siteUrl: string, listId: string): Promise<IUserPermissions> {
    let hasPermissionAdd: boolean = false;
    let hasPermissionEdit: boolean = false;
    let hasPermissionDelete: boolean = false;
    let hasPermissionView: boolean = false;
    let userPermissions: IUserPermissions = undefined;
    try {
      const web = sp.web;
      const userEffectivePermissions = await web.lists.getById(listId).effectiveBasePermissions.get();
      
      hasPermissionAdd = sp.web.lists.getById(listId).hasPermissions(userEffectivePermissions, PermissionKind.AddListItems);
      hasPermissionDelete = sp.web.lists.getById(listId).hasPermissions(userEffectivePermissions, PermissionKind.DeleteListItems);
      hasPermissionEdit = sp.web.lists.getById(listId).hasPermissions(userEffectivePermissions, PermissionKind.EditListItems);
      hasPermissionView = sp.web.lists.getById(listId).hasPermissions(userEffectivePermissions, PermissionKind.ViewListItems);
      userPermissions = { hasPermissionAdd: hasPermissionAdd, hasPermissionEdit: hasPermissionEdit, hasPermissionDelete: hasPermissionDelete, hasPermissionView: hasPermissionView };

    } catch (error) {
      return Promise.reject(error);
    }
    return userPermissions;
  }
  /**
   *
   * @param {string} siteUrl
   * @returns
   * @memberof spservices
   */
  public async getSiteLists(siteUrl: string) {

    let results: any[] = [];

    if (!siteUrl) {
      return [];
    }

    try {
      const web = sp.web;
      results = await web.lists.select("Title", "ID").filter('BaseTemplate eq 106').get();

    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }

  /**
   *
   * @private
   * @returns
   * @memberof spservices
   */
  public async colorGenerate() {

    var hexValues = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e"];
    var newColor = "#";

    for (var i = 0; i < 6; i++) {
      var x = Math.round(Math.random() * 14);

      var y = hexValues[x];
      newColor += y;
    }
    return newColor;
  }


  /**
   *
   * @param {string} siteUrl
   * @param {string} listId
   * @param {string} fieldInternalName
   * @returns {Promise<{ key: string, text: string }[]>}
   * @memberof spservices
   */
  public async getChoiceFieldOptions(siteUrl: string, listId: string, fieldInternalName: string): Promise<{ key: string, text: string }[]> {
    let fieldOptions: { key: string, text: string }[] = [];
    try {
      const web = sp.web;
      const results = await web.lists.getById(listId)
        .fields
        .getByInternalNameOrTitle(fieldInternalName)
        .select("Title", "InternalName", "Choices")
        .get();
      if (results && results["Choices"].length > 0) {
        for (const option of results["Choices"]) {
          fieldOptions.push({
            key: option,
            text: option
          });
        }
      }
    } catch (error) {
      return Promise.reject(error);
    }
    return fieldOptions;
  }

  /**
   *
   * @param {string} siteUrl
   * @param {string} listId
   * @param {Date} eventStartDate
   * @param {Date} eventEndDate
   * @returns {Promise< IEventData[]>}
   * @memberof spservices
   */
  public async getEvents(siteUrl: string, listId: string, eventStartDate: Date, eventEndDate: Date, categories: IComboBoxOption[]): Promise<IEventData[]> {

    let events: IEventData[] = [];
    if (!siteUrl) {
      return [];
    }
    try {
      // Get Category Field Choices
      const categoryDropdownOption = await this.getChoiceFieldOptions(siteUrl, listId, 'Category');
      let categoryColor: { category: string, color: string }[] = [];
      for (const cat of categoryDropdownOption) {
        categoryColor.push({ category: cat.text, color: await this.colorGenerate() });
      }
      let camlQueryExpression = this.setUpQueryExpression(eventStartDate, eventEndDate, categories);

      const web = sp.web;
      const results = await web.lists.getById(listId).usingCaching().renderListDataAsStream(
        {
          DatesInUtc: true,
          ViewXml: camlQueryExpression
        }
      );

      if (results && results.Row.length > 0) {
        let event: any = '';
        const mapEvents = async () : Promise<boolean> => {
            for (event of results.Row) {
              const eventDate = await this.getLocalTime(event.EventDate);
              const endDate = await this.getLocalTime(event.EndDate);
              const initialsArray: string[] = event.Author[0].title.split(' ');
              const initials: string = initialsArray[0].charAt(0) + initialsArray[initialsArray.length - 1].charAt(0);
              const userPictureUrl = await this.getUserProfilePictureUrl(`i:0#.f|membership|${event.Author[0].email}`);
              const attendees: number[] = [];
              const first: number = event.Geolocation.indexOf('(') + 1;
              const last: number = event.Geolocation.indexOf(')');
              const geo = event.Geolocation.substring(first, last);
              const geolocation = geo.split(' ');
              const CategoryColorValue: any[] = categoryColor.filter((value) => {
                return value.category == event.Category;
              });
              const isAllDayEvent: boolean = event["fAllDayEvent.value"] === "1";

              for (const attendee of event.ParticipantsPicker) {
                attendees.push(parseInt(attendee.id));
              }

              events.push({
                Id: event.ID,
                ID: event.ID,
                EventType: event.EventType,
                title: await this.deCodeHtmlEntities(event.Title),
                Description: event.Description,
                EventDate: isAllDayEvent ? new Date(event.EventDate.slice(0, -1)) : new Date(eventDate),
                EndDate: isAllDayEvent ? new Date(event.EndDate.slice(0, -1)) : new Date(endDate),
                location: event.Location,
                ownerEmail: event.Author[0].email,
                ownerPhoto: userPictureUrl ?
                  `https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=${event.Author[0].email}&UA=0&size=HR96x96` : '',
                ownerInitial: initials,
                color: CategoryColorValue.length > 0 ? CategoryColorValue[0].color : '#1a75ff', // blue default
                ownerName: event.Author[0].title,
                attendes: attendees,
                fAllDayEvent: isAllDayEvent,
                geolocation: { Longitude: parseFloat(geolocation[0]), Latitude: parseFloat(geolocation[1]) },
                Category: event.Category,
                Duration: event.Duration,
                RecurrenceData: event.RecurrenceData ? await this.deCodeHtmlEntities(event.RecurrenceData) : "",
                fRecurrence: event.fRecurrence,
                RecurrenceID: event.RecurrenceID ? event.RecurrenceID : undefined,
                MasterSeriesItemID: event.MasterSeriesItemID,
                UID: event.UID.replace("{", "").replace("}", ""),
              });
            }
          return true;
        };
        //Checks to see if there are any results saved in local storage
        if(window.localStorage.getItem("eventResult")){
          //if there is a local version - compares it to the current version 
          if(window.localStorage.getItem("eventResult") === JSON.stringify(results)){
            //No update needed use current savedEvents
            events = JSON.parse(window.localStorage.getItem("calendarEventsWithLocalTime"));
          }else{
            //update local storage
            window.localStorage.setItem("eventResult", JSON.stringify(results));
            //when they are not equal then we loop through the results and maps them to IEventData
            /* tslint:disable:no-unused-expression */
            await mapEvents() ? window.localStorage.setItem("calendarEventsWithLocalTime", JSON.stringify(events)) : null;           
          }
        }else{
          //if there is no local storage of the events we create them
          window.localStorage.setItem("eventResult", JSON.stringify(results));
          //we also needs to map through the events the first time and save the mapped version to local storage
          await mapEvents() ? window.localStorage.setItem("calendarEventsWithLocalTime", JSON.stringify(events)) : null;           
        }
      }
      let parseEvt: parseRecurrentEvent = new parseRecurrentEvent();
      events = parseEvt.parseEvents(events, null, null);
       
      // Return Data
      return events;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  /**
   *
   * @private
   * @param {Date} eventStartDate
   * @param {Date} eventEndDate
   * @param {IOption[]} departments
   * @returns {string} camlQuery
   * @memberof spservices
   */
  private setUpQueryExpression(
    eventStartDate: Date,
    eventEndDate: Date,
    categories: IComboBoxOption[]
  ) {
    let camlQuery = `
    <View>
    <ViewFields>
      <FieldRef Name='RecurrenceData'/>
      <FieldRef Name='Duration'/>
      <FieldRef Name='Author'/>
      <FieldRef Name='Category'/>
      <FieldRef Name='Description'/>
      <FieldRef Name='ParticipantsPicker'/>
      <FieldRef Name='Geolocation'/>
      <FieldRef Name='ID'/>
      <FieldRef Name='EndDate'/>
      <FieldRef Name='EventDate'/>
      <FieldRef Name='Location'/>
      <FieldRef Name='Title'/>
      <FieldRef Name='fAllDayEvent'/>
      <FieldRef Name='EventType'/>
      <FieldRef Name='UID' />
      <FieldRef Name='fRecurrence' />
    </ViewFields>
      <Query>
        <Where>
          <And>
            <Geq>
              <FieldRef Name='EventDate' />
              <Value IncludeTimeValue='false' Type='DateTime'>${moment(eventStartDate).format("YYYY-MM-DD")}</Value>
            </Geq>
              {0}
                <Leq>
                  <FieldRef Name='EventDate' />
                  <Value IncludeTimeValue='false' Type='DateTime'>${moment(eventEndDate).format("YYYY-MM-DD")}</Value>
                </Leq>
                {1}
              {2}
          </And>
        </Where>
      </Query>
      <RowLimit Paged=\"FALSE\">2000</RowLimit>
      </View>`;

    let categoryCondition = `
        <Eq>
          <FieldRef Name='Category' />
          <Value Type='Choice'>{0}</Value>
        </Eq>`;

    const deptsLength: number = categories.length;
    let queryResult: string = "";

    if (deptsLength > 0) {
      if (deptsLength == 1) {
        return Text.format(camlQuery, Constants.AndConditionStart, Text.format(categoryCondition, categories[0].key), Constants.AndConditionEnd);
      } else {
        let orCondition: string = `${Constants.OrConditionStart}{0}{1}${Constants.OrConditionEnd}`;
        queryResult = Text.format(orCondition, Text.format(categoryCondition, categories[0].key), Text.format(categoryCondition, categories[1].key));

        for (let i = 2; i < categories.length; i++) {
          const category = categories[i];
          queryResult = Text.format(orCondition, Text.format(categoryCondition, category.key), queryResult);
        }
      }
      return Text.format(camlQuery, Constants.AndConditionStart, queryResult, Constants.AndConditionEnd);
    }
    return Text.format(camlQuery, "", queryResult, "");
  }

  /**
   *
   * @private
   * @param {string} siteUrl
   * @returns
   * @memberof spservices
   */
  public async getSiteRegionalSettingsTimeZone(siteUrl: string) {
    let regionalSettings: IRegionalSettings;
    try {
      const web = sp.web;
      regionalSettings = await web.regionalSettings.timeZone.usingCaching().get();

    } catch (error) {
      return Promise.reject(error);
    }
    return regionalSettings;
  }
  /**
   * @param {string} webUrl
   * @param {string} siteDesignId
   * @returns
   * @memberof spservices
   */
  public async getGeoLactionName(latitude: number, longitude: number) {
    try {
      const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`;
      const results = await $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        headers: {
          'content-type': 'application/json;charset=utf-8',
          'accept': 'application/json;odata=nometadata',
        }
      });

      if (results) {
        return results;
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }

  public async enCodeHtmlEntities(string: string) {

    const HtmlEntitiesMap = {
      "'": "&apos;",
      "<": "&lt;",
      ">": "&gt;",
      " ": "&nbsp;",
      "¡": "&iexcl;",
      "¢": "&cent;",
      "£": "&pound;",
      "¤": "&curren;",
      "¥": "&yen;",
      "¦": "&brvbar;",
      "§": "&sect;",
      "¨": "&uml;",
      "©": "&copy;",
      "ª": "&ordf;",
      "«": "&laquo;",
      "¬": "&not;",
      "®": "&reg;",
      "¯": "&macr;",
      "°": "&deg;",
      "±": "&plusmn;",
      "²": "&sup2;",
      "³": "&sup3;",
      "´": "&acute;",
      "µ": "&micro;",
      "¶": "&para;",
      "·": "&middot;",
      "¸": "&cedil;",
      "¹": "&sup1;",
      "º": "&ordm;",
      "»": "&raquo;",
      "¼": "&frac14;",
      "½": "&frac12;",
      "¾": "&frac34;",
      "¿": "&iquest;",
      "À": "&Agrave;",
      "Á": "&Aacute;",
      "Â": "&Acirc;",
      "Ã": "&Atilde;",
      "Ä": "&Auml;",
      "Å": "&Aring;",
      "Æ": "&AElig;",
      "Ç": "&Ccedil;",
      "È": "&Egrave;",
      "É": "&Eacute;",
      "Ê": "&Ecirc;",
      "Ë": "&Euml;",
      "Ì": "&Igrave;",
      "Í": "&Iacute;",
      "Î": "&Icirc;",
      "Ï": "&Iuml;",
      "Ð": "&ETH;",
      "Ñ": "&Ntilde;",
      "Ò": "&Ograve;",
      "Ó": "&Oacute;",
      "Ô": "&Ocirc;",
      "Õ": "&Otilde;",
      "Ö": "&Ouml;",
      "×": "&times;",
      "Ø": "&Oslash;",
      "Ù": "&Ugrave;",
      "Ú": "&Uacute;",
      "Û": "&Ucirc;",
      "Ü": "&Uuml;",
      "Ý": "&Yacute;",
      "Þ": "&THORN;",
      "ß": "&szlig;",
      "à": "&agrave;",
      "á": "&aacute;",
      "â": "&acirc;",
      "ã": "&atilde;",
      "ä": "&auml;",
      "å": "&aring;",
      "æ": "&aelig;",
      "ç": "&ccedil;",
      "è": "&egrave;",
      "é": "&eacute;",
      "ê": "&ecirc;",
      "ë": "&euml;",
      "ì": "&igrave;",
      "í": "&iacute;",
      "î": "&icirc;",
      "ï": "&iuml;",
      "ð": "&eth;",
      "ñ": "&ntilde;",
      "ò": "&ograve;",
      "ó": "&oacute;",
      "ô": "&ocirc;",
      "õ": "&otilde;",
      "ö": "&ouml;",
      "÷": "&divide;",
      "ø": "&oslash;",
      "ù": "&ugrave;",
      "ú": "&uacute;",
      "û": "&ucirc;",
      "ü": "&uuml;",
      "ý": "&yacute;",
      "þ": "&thorn;",
      "ÿ": "&yuml;",
      "Œ": "&OElig;",
      "œ": "&oelig;",
      "Š": "&Scaron;",
      "š": "&scaron;",
      "Ÿ": "&Yuml;",
      "ƒ": "&fnof;",
      "ˆ": "&circ;",
      "˜": "&tilde;",
      "Α": "&Alpha;",
      "Β": "&Beta;",
      "Γ": "&Gamma;",
      "Δ": "&Delta;",
      "Ε": "&Epsilon;",
      "Ζ": "&Zeta;",
      "Η": "&Eta;",
      "Θ": "&Theta;",
      "Ι": "&Iota;",
      "Κ": "&Kappa;",
      "Λ": "&Lambda;",
      "Μ": "&Mu;",
      "Ν": "&Nu;",
      "Ξ": "&Xi;",
      "Ο": "&Omicron;",
      "Π": "&Pi;",
      "Ρ": "&Rho;",
      "Σ": "&Sigma;",
      "Τ": "&Tau;",
      "Υ": "&Upsilon;",
      "Φ": "&Phi;",
      "Χ": "&Chi;",
      "Ψ": "&Psi;",
      "Ω": "&Omega;",
      "α": "&alpha;",
      "β": "&beta;",
      "γ": "&gamma;",
      "δ": "&delta;",
      "ε": "&epsilon;",
      "ζ": "&zeta;",
      "η": "&eta;",
      "θ": "&theta;",
      "ι": "&iota;",
      "κ": "&kappa;",
      "λ": "&lambda;",
      "μ": "&mu;",
      "ν": "&nu;",
      "ξ": "&xi;",
      "ο": "&omicron;",
      "π": "&pi;",
      "ρ": "&rho;",
      "ς": "&sigmaf;",
      "σ": "&sigma;",
      "τ": "&tau;",
      "υ": "&upsilon;",
      "φ": "&phi;",
      "χ": "&chi;",
      "ψ": "&psi;",
      "ω": "&omega;",
      "ϑ": "&thetasym;",
      "ϒ": "&Upsih;",
      "ϖ": "&piv;",
      "–": "&ndash;",
      "—": "&mdash;",
      "‘": "&lsquo;",
      "’": "&rsquo;",
      "‚": "&sbquo;",
      "“": "&ldquo;",
      "”": "&rdquo;",
      "„": "&bdquo;",
      "†": "&dagger;",
      "‡": "&Dagger;",
      "•": "&bull;",
      "…": "&hellip;",
      "‰": "&permil;",
      "′": "&prime;",
      "″": "&Prime;",
      "‹": "&lsaquo;",
      "›": "&rsaquo;",
      "‾": "&oline;",
      "⁄": "&frasl;",
      "€": "&euro;",
      "ℑ": "&image;",
      "℘": "&weierp;",
      "ℜ": "&real;",
      "™": "&trade;",
      "ℵ": "&alefsym;",
      "←": "&larr;",
      "↑": "&uarr;",
      "→": "&rarr;",
      "↓": "&darr;",
      "↔": "&harr;",
      "↵": "&crarr;",
      "⇐": "&lArr;",
      "⇑": "&UArr;",
      "⇒": "&rArr;",
      "⇓": "&dArr;",
      "⇔": "&hArr;",
      "∀": "&forall;",
      "∂": "&part;",
      "∃": "&exist;",
      "∅": "&empty;",
      "∇": "&nabla;",
      "∈": "&isin;",
      "∉": "&notin;",
      "∋": "&ni;",
      "∏": "&prod;",
      "∑": "&sum;",
      "−": "&minus;",
      "∗": "&lowast;",
      "√": "&radic;",
      "∝": "&prop;",
      "∞": "&infin;",
      "∠": "&ang;",
      "∧": "&and;",
      "∨": "&or;",
      "∩": "&cap;",
      "∪": "&cup;",
      "∫": "&int;",
      "∴": "&there4;",
      "∼": "&sim;",
      "≅": "&cong;",
      "≈": "&asymp;",
      "≠": "&ne;",
      "≡": "&equiv;",
      "≤": "&le;",
      "≥": "&ge;",
      "⊂": "&sub;",
      "⊃": "&sup;",
      "⊄": "&nsub;",
      "⊆": "&sube;",
      "⊇": "&supe;",
      "⊕": "&oplus;",
      "⊗": "&otimes;",
      "⊥": "&perp;",
      "⋅": "&sdot;",
      "⌈": "&lceil;",
      "⌉": "&rceil;",
      "⌊": "&lfloor;",
      "⌋": "&rfloor;",
      "⟨": "&lang;",
      "⟩": "&rang;",
      "◊": "&loz;",
      "♠": "&spades;",
      "♣": "&clubs;",
      "♥": "&hearts;",
      "♦": "&diams;"
    };

    var entityMap = HtmlEntitiesMap;
    string = string.replace(/&/g, '&amp;');
    string = string.replace(/"/g, '&quot;');
    for (var key in entityMap) {
      var entity = entityMap[key];
      var regex = new RegExp(key, 'g');
      string = string.replace(regex, entity);
    }
    return string;
  }

  public async deCodeHtmlEntities(string: string) {

    const HtmlEntitiesMap = {
      "'": "&#39;",
      "<": "&lt;",
      ">": "&gt;",
      " ": "&nbsp;",
      "¡": "&iexcl;",
      "¢": "&cent;",
      "£": "&pound;",
      "¤": "&curren;",
      "¥": "&yen;",
      "¦": "&brvbar;",
      "§": "&sect;",
      "¨": "&uml;",
      "©": "&copy;",
      "ª": "&ordf;",
      "«": "&laquo;",
      "¬": "&not;",
      "®": "&reg;",
      "¯": "&macr;",
      "°": "&deg;",
      "±": "&plusmn;",
      "²": "&sup2;",
      "³": "&sup3;",
      "´": "&acute;",
      "µ": "&micro;",
      "¶": "&para;",
      "·": "&middot;",
      "¸": "&cedil;",
      "¹": "&sup1;",
      "º": "&ordm;",
      "»": "&raquo;",
      "¼": "&frac14;",
      "½": "&frac12;",
      "¾": "&frac34;",
      "¿": "&iquest;",
      "À": "&Agrave;",
      "Á": "&Aacute;",
      "Â": "&Acirc;",
      "Ã": "&Atilde;",
      "Ä": "&Auml;",
      "Å": "&Aring;",
      "Æ": "&AElig;",
      "Ç": "&Ccedil;",
      "È": "&Egrave;",
      "É": "&Eacute;",
      "Ê": "&Ecirc;",
      "Ë": "&Euml;",
      "Ì": "&Igrave;",
      "Í": "&Iacute;",
      "Î": "&Icirc;",
      "Ï": "&Iuml;",
      "Ð": "&ETH;",
      "Ñ": "&Ntilde;",
      "Ò": "&Ograve;",
      "Ó": "&Oacute;",
      "Ô": "&Ocirc;",
      "Õ": "&Otilde;",
      "Ö": "&Ouml;",
      "×": "&times;",
      "Ø": "&Oslash;",
      "Ù": "&Ugrave;",
      "Ú": "&Uacute;",
      "Û": "&Ucirc;",
      "Ü": "&Uuml;",
      "Ý": "&Yacute;",
      "Þ": "&THORN;",
      "ß": "&szlig;",
      "à": "&agrave;",
      "á": "&aacute;",
      "â": "&acirc;",
      "ã": "&atilde;",
      "ä": "&auml;",
      "å": "&aring;",
      "æ": "&aelig;",
      "ç": "&ccedil;",
      "è": "&egrave;",
      "é": "&eacute;",
      "ê": "&ecirc;",
      "ë": "&euml;",
      "ì": "&igrave;",
      "í": "&iacute;",
      "î": "&icirc;",
      "ï": "&iuml;",
      "ð": "&eth;",
      "ñ": "&ntilde;",
      "ò": "&ograve;",
      "ó": "&oacute;",
      "ô": "&ocirc;",
      "õ": "&otilde;",
      "ö": "&ouml;",
      "÷": "&divide;",
      "ø": "&oslash;",
      "ù": "&ugrave;",
      "ú": "&uacute;",
      "û": "&ucirc;",
      "ü": "&uuml;",
      "ý": "&yacute;",
      "þ": "&thorn;",
      "ÿ": "&yuml;",
      "Œ": "&OElig;",
      "œ": "&oelig;",
      "Š": "&Scaron;",
      "š": "&scaron;",
      "Ÿ": "&Yuml;",
      "ƒ": "&fnof;",
      "ˆ": "&circ;",
      "˜": "&tilde;",
      "Α": "&Alpha;",
      "Β": "&Beta;",
      "Γ": "&Gamma;",
      "Δ": "&Delta;",
      "Ε": "&Epsilon;",
      "Ζ": "&Zeta;",
      "Η": "&Eta;",
      "Θ": "&Theta;",
      "Ι": "&Iota;",
      "Κ": "&Kappa;",
      "Λ": "&Lambda;",
      "Μ": "&Mu;",
      "Ν": "&Nu;",
      "Ξ": "&Xi;",
      "Ο": "&Omicron;",
      "Π": "&Pi;",
      "Ρ": "&Rho;",
      "Σ": "&Sigma;",
      "Τ": "&Tau;",
      "Υ": "&Upsilon;",
      "Φ": "&Phi;",
      "Χ": "&Chi;",
      "Ψ": "&Psi;",
      "Ω": "&Omega;",
      "α": "&alpha;",
      "β": "&beta;",
      "γ": "&gamma;",
      "δ": "&delta;",
      "ε": "&epsilon;",
      "ζ": "&zeta;",
      "η": "&eta;",
      "θ": "&theta;",
      "ι": "&iota;",
      "κ": "&kappa;",
      "λ": "&lambda;",
      "μ": "&mu;",
      "ν": "&nu;",
      "ξ": "&xi;",
      "ο": "&omicron;",
      "π": "&pi;",
      "ρ": "&rho;",
      "ς": "&sigmaf;",
      "σ": "&sigma;",
      "τ": "&tau;",
      "υ": "&upsilon;",
      "φ": "&phi;",
      "χ": "&chi;",
      "ψ": "&psi;",
      "ω": "&omega;",
      "ϑ": "&thetasym;",
      "ϒ": "&Upsih;",
      "ϖ": "&piv;",
      "–": "&ndash;",
      "—": "&mdash;",
      "‘": "&lsquo;",
      "’": "&rsquo;",
      "‚": "&sbquo;",
      "“": "&ldquo;",
      "”": "&rdquo;",
      "„": "&bdquo;",
      "†": "&dagger;",
      "‡": "&Dagger;",
      "•": "&bull;",
      "…": "&hellip;",
      "‰": "&permil;",
      "′": "&prime;",
      "″": "&Prime;",
      "‹": "&lsaquo;",
      "›": "&rsaquo;",
      "‾": "&oline;",
      "⁄": "&frasl;",
      "€": "&euro;",
      "ℑ": "&image;",
      "℘": "&weierp;",
      "ℜ": "&real;",
      "™": "&trade;",
      "ℵ": "&alefsym;",
      "←": "&larr;",
      "↑": "&uarr;",
      "→": "&rarr;",
      "↓": "&darr;",
      "↔": "&harr;",
      "↵": "&crarr;",
      "⇐": "&lArr;",
      "⇑": "&UArr;",
      "⇒": "&rArr;",
      "⇓": "&dArr;",
      "⇔": "&hArr;",
      "∀": "&forall;",
      "∂": "&part;",
      "∃": "&exist;",
      "∅": "&empty;",
      "∇": "&nabla;",
      "∈": "&isin;",
      "∉": "&notin;",
      "∋": "&ni;",
      "∏": "&prod;",
      "∑": "&sum;",
      "−": "&minus;",
      "∗": "&lowast;",
      "√": "&radic;",
      "∝": "&prop;",
      "∞": "&infin;",
      "∠": "&ang;",
      "∧": "&and;",
      "∨": "&or;",
      "∩": "&cap;",
      "∪": "&cup;",
      "∫": "&int;",
      "∴": "&there4;",
      "∼": "&sim;",
      "≅": "&cong;",
      "≈": "&asymp;",
      "≠": "&ne;",
      "≡": "&equiv;",
      "≤": "&le;",
      "≥": "&ge;",
      "⊂": "&sub;",
      "⊃": "&sup;",
      "⊄": "&nsub;",
      "⊆": "&sube;",
      "⊇": "&supe;",
      "⊕": "&oplus;",
      "⊗": "&otimes;",
      "⊥": "&perp;",
      "⋅": "&sdot;",
      "⌈": "&lceil;",
      "⌉": "&rceil;",
      "⌊": "&lfloor;",
      "⌋": "&rfloor;",
      "⟨": "&lang;",
      "⟩": "&rang;",
      "◊": "&loz;",
      "♠": "&spades;",
      "♣": "&clubs;",
      "♥": "&hearts;",
      "♦": "&diams;"
    };

    var entityMap = HtmlEntitiesMap;
    for (var key in entityMap) {
      var entity = entityMap[key];
      var regex = new RegExp(entity, 'g');
      string = string.replace(regex, key);
    }
    string = string.replace(/&quot;/g, '"');
    string = string.replace(/&amp;/g, '&');
    return string;
  }
}