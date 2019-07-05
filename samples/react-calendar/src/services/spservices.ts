// João Mendes
// March 2019

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp, Web, PermissionKind, RegionalSettings } from '@pnp/sp';
import { graph, } from "@pnp/graph";
import * as $ from 'jquery';
import { IEventData } from './IEventData';
import * as moment from 'moment';
import { SiteUser } from "@pnp/sp/src/siteusers";
import { IUserPermissions } from './IUserPermissions';
import parseRecurrentEvent from './parseRecurrentEvent';

// Class Services
export default class spservices {


  constructor(private context: WebPartContext) {
    // Setuo Context to PnPjs and MSGraph
    sp.setup({
      spfxContext: this.context
    });

    graph.setup({
      spfxContext: this.context
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
   * @param {string} siteUrl
   * @returns {Promise<number>}
   * @memberof spservices
   */
  public async getSiteTimeZoneHours(siteUrl: string): Promise<number> {
    let numberHours: number = 0;
    let siteTimeZoneBias: number;
    let siteTimeZoneDaylightBias: number;
    let currentDateTimeOffSet: number = new Date().getTimezoneOffset() / 60;

    try {
      const siteRegionalSettings: any = await this.getSiteRegionalSettingsTimeZone(siteUrl);
      // Calculate  hour to current site
      siteTimeZoneBias = siteRegionalSettings.Information.Bias;
      siteTimeZoneDaylightBias = siteRegionalSettings.Information.DaylightBias;

      // Formula to calculate the number of  hours need to get UTC Date.
      // numberHours = (siteTimeZoneBias / 60) + (siteTimeZoneDaylightBias / 60) - currentDateTimeOffSet;
      if (siteTimeZoneBias >= 0) {
        numberHours = ((siteTimeZoneBias / 60) - currentDateTimeOffSet) + siteTimeZoneDaylightBias / 60;
      } else {
        numberHours = ((siteTimeZoneBias / 60) - currentDateTimeOffSet);
      }
    }
    catch (error) {
      return Promise.reject(error);
    }
    return numberHours;
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
      const web = new Web(siteUrl);

      const siteTimeZoneHours: number = await this.getSiteTimeZoneHours(siteUrl);

      results = await web.lists.getById(listId).items.add({
        Title: newEvent.title,
        Description: newEvent.Description,
        Geolocation: newEvent.geolocation,
        ParticipantsPickerId: { results: newEvent.attendes },
        EventDate: new Date(moment(newEvent.EventDate).add(siteTimeZoneHours, 'hours').toISOString()),
        EndDate: new Date(moment(newEvent.EndDate).add(siteTimeZoneHours, 'hours').toISOString()),
        Location: newEvent.location,
        fAllDayEvent: false,
        fRecurrence: newEvent.fRecurrence,
        Category: newEvent.Category,
        EventType: newEvent.EventType,
        UID: newEvent.UID,
        RecurrenceData: newEvent.RecurrenceData ? await this.deCodeHtmlEntities(newEvent.RecurrenceData) : "",
        MasterSeriesItemID: newEvent.MasterSeriesItemID,
        RecurrenceID: newEvent.RecurrenceID ? moment(newEvent.RecurrenceID).add(siteTimeZoneHours, 'hours').toISOString() : undefined,
      });
    } catch (error) {
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
      const siteTimeZoneHours: number = await this.getSiteTimeZoneHours(siteUrl);
      const web = new Web(siteUrl);
      //"Title","fRecurrence", "fAllDayEvent","EventDate", "EndDate", "Description","ID", "Location","Geolocation","ParticipantsPickerId"
      const event = await web.lists.getById(listId).items.usingCaching().getById(eventId)
        .select("RecurrenceID", "MasterSeriesItemID", "Id", "ID", "ParticipantsPickerId", "EventType", "Title", "Description", "EventDate", "EndDate", "Location", "Author/SipAddress", "Author/Title", "Geolocation", "fAllDayEvent", "fRecurrence", "RecurrenceData", "RecurrenceData", "Duration", "Category", "UID")
        .expand("Author")
        .get();


      returnEvent = {
        Id: event.ID,
        ID: event.ID,
        EventType: event.EventType,
        title: await this.deCodeHtmlEntities(event.Title),
        Description: event.Description ? event.Description : '',
        EventDate: new Date(moment(event.EventDate).subtract((siteTimeZoneHours), 'hour').toISOString()),
        EndDate: new Date(moment(event.EndDate).subtract(siteTimeZoneHours, 'hour').toISOString()),
        location: event.Location,
        ownerEmail: event.Author.SipAddress,
        ownerPhoto: "",
        ownerInitial: '',
        color: '',
        ownerName: event.Author.Title,
        attendes: event.ParticipantsPickerId,
        fAllDayEvent: false,
        geolocation: { Longitude: event.Geolocation ? event.Geolocation.Longitude : 0, Latitude: event.Geolocation ? event.Geolocation.Latitude : 0 },
        Category: event.Category,
        Duration: event.Duration,
        UID: event.UID,
        RecurrenceData: event.RecurrenceData ? await this.deCodeHtmlEntities(event.RecurrenceData) : "",
        fRecurrence: event.fRecurrence,
        RecurrenceID: event.RecurrenceID,
        MasterSeriesItemID: event.MasterSeriesItemID,
      };
    } catch (error) {
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

      // delete all recursive extentions before update  recurrence event
      if (updateEvent.EventType.toString() == "1") await this.deleteRecurrenceExceptions(updateEvent, siteUrl, listId);

      const siteTimeZoneHours: number = await this.getSiteTimeZoneHours(siteUrl);

      const web = new Web(siteUrl);
      //"Title","fRecurrence", "fAllDayEvent","EventDate", "EndDate", "Description","ID", "Location","Geolocation","ParticipantsPickerId"
      let newItem: any = {
        Title: updateEvent.title,
        Description: updateEvent.Description,
        Geolocation: updateEvent.geolocation,
        ParticipantsPickerId: { results: updateEvent.attendes },
        EventDate: new Date(moment(updateEvent.EventDate).add(siteTimeZoneHours, 'hours').toISOString()),
        EndDate: new Date(moment(updateEvent.EndDate).add(siteTimeZoneHours, 'hours').toISOString()),
        Location: updateEvent.location,
        fAllDayEvent: false,
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
    } catch (error) {
      return Promise.reject(error);
    }
    return results;
  }

  public async deleteRecurrenceExceptions(event: IEventData, siteUrl: string, listId: string) {
    let results = null;
    try {
      const web = new Web(siteUrl);
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
      const web = new Web(siteUrl);
      // Exception Recurrence eventtype = 4 ?  update to deleted Recurrence eventtype=3
      switch (event.EventType.toString()) {
        case '4': // Exception Recurrence Event
          results = await web.lists.getById(listId).items.getById(event.Id).update({
            Title: `Delete: ${event.title}`,
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
            // delete a single recurrence Exception.  add new entry with eventtype 3

            event.RecurrenceID = event.EventDate.toString();
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
   * @returns {Promise<SiteUser>}
   * @memberof spservices
   */
  public async getUserById(userId: number, siteUrl: string): Promise<SiteUser> {
    let results: SiteUser = null;

    if (!userId && !siteUrl) {
      return null;
    }

    try {
      const web = new Web(siteUrl);
      results = await web.siteUsers.getById(userId).get();
      //results = await web.siteUsers.getByLoginName(userId).get();
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
   * @returns {Promise<SiteUser>}
   * @memberof spservices
   */
  public async getUserByLoginName(loginName: string, siteUrl: string): Promise<SiteUser> {
    let results: SiteUser = null;

    if (!loginName && !siteUrl) {
      return null;
    }

    try {
      const web = new Web(siteUrl);
      await web.ensureUser(loginName);
      results = await web.siteUsers.getByLoginName(loginName).get();
      //results = await web.siteUsers.getByLoginName(userId).get();
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
      const web = new Web(siteUrl);
      const userEffectivePermissions = await web.lists.getById(listId).effectiveBasePermissions.get();
      // ...
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
      const web = new Web(siteUrl);
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
      const web = new Web(siteUrl);
      const results = await web.lists.getById(listId)
        .fields
        .getByInternalNameOrTitle(fieldInternalName)
        .select("Title", "InternalName", "Choices")
        .get();
      if (results && results.Choices.length > 0) {
        for (const option of results.Choices) {
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
  public async getEvents(siteUrl: string, listId: string, eventStartDate: Date, eventEndDate: Date): Promise<IEventData[]> {

    let events: IEventData[] = [];
    if (!siteUrl) {
      return [];
    }
    try {
      // Get Regional Settings TimeZone Hours to UTC
      const siteTimeZoneHours: number = await this.getSiteTimeZoneHours(siteUrl);
      // Get Category Field Choices
      const categoryDropdownOption = await this.getChoiceFieldOptions(siteUrl, listId, 'Category');
      let categoryColor: { category: string, color: string }[] = [];
      for (const cat of categoryDropdownOption) {
        categoryColor.push({ category: cat.text, color: await this.colorGenerate() });
      }

      const web = new Web(siteUrl);
      const results = await web.lists.getById(listId).usingCaching().renderListDataAsStream(
        {
          DatesInUtc: true,
          ViewXml: `<View><ViewFields><FieldRef Name='RecurrenceData'/><FieldRef Name='Duration'/><FieldRef Name='Author'/><FieldRef Name='Category'/><FieldRef Name='Description'/><FieldRef Name='ParticipantsPicker'/><FieldRef Name='Geolocation'/><FieldRef Name='ID'/><FieldRef Name='EndDate'/><FieldRef Name='EventDate'/><FieldRef Name='ID'/><FieldRef Name='Location'/><FieldRef Name='Title'/><FieldRef Name='fAllDayEvent'/><FieldRef Name='EventType'/><FieldRef Name='UID' /><FieldRef Name='fRecurrence' /></ViewFields>
          <Query>
          <Where>
            <And>
              <Geq>
                <FieldRef Name='EventDate' />
                <Value IncludeTimeValue='false' Type='DateTime'>${moment(eventStartDate).format('YYYY-MM-DD')}</Value>
              </Geq>
              <Leq>
                <FieldRef Name='EventDate' />
                <Value IncludeTimeValue='false' Type='DateTime'>${moment(eventEndDate).format('YYYY-MM-DD')}</Value>
              </Leq>
              </And>
          </Where>
          </Query>
          <RowLimit Paged=\"FALSE\">2000</RowLimit>
          </View>`
        }
      );

      if (results && results.Row.length > 0) {
        let event: any = '';
        for (event of results.Row) {
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
          for (const attendee of event.ParticipantsPicker) {
            attendees.push(parseInt(attendee.id));
          }



          events.push({
            Id: event.ID,
            ID: event.ID,
            EventType: event.EventType,
            title: await this.deCodeHtmlEntities(event.Title),
            Description: event.Description,

            EventDate: new Date(moment(event.EventDate).subtract((siteTimeZoneHours), 'hour').toISOString()),

            EndDate: new Date(moment(event.EndDate).subtract(siteTimeZoneHours, 'hour').toISOString()),
            location: event.Location,
            ownerEmail: event.Author[0].email,
            ownerPhoto: userPictureUrl ?
              `https://outlook.office365.com/owa/service.svc/s/GetPersonaPhoto?email=${event.Author[0].email}&UA=0&size=HR96x96` : '',
            ownerInitial: initials,
            color: CategoryColorValue.length > 0 ? CategoryColorValue[0].color : '#1a75ff', // blue default
            ownerName: event.Author[0].title,
            attendes: attendees,
            fAllDayEvent: false,
            geolocation: { Longitude: parseFloat(geolocation[0]), Latitude: parseFloat(geolocation[1]) },
            Category: event.Category,
            Duration: event.Duration,
            RecurrenceData: event.RecurrenceData ? await this.deCodeHtmlEntities(event.RecurrenceData) : "",
            fRecurrence: event.fRecurrence,
            RecurrenceID: event.RecurrenceID ? moment(event.RecurrenceID).subtract(siteTimeZoneHours, 'hour').toISOString() : undefined,
            MasterSeriesItemID: event.MasterSeriesItemID,
            UID: event.UID.replace("{", "").replace("}", ""),
          });
        }

        let parseEvt: parseRecurrentEvent = new parseRecurrentEvent();
        events = parseEvt.parseEvents(events, null, null);
      }
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
   * @param {string} siteUrl
   * @returns
   * @memberof spservices
   */
  public async getSiteRegionalSettingsTimeZone(siteUrl: string) {
    let regionalSettings: RegionalSettings;
    try {
      const web = new Web(siteUrl);
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
