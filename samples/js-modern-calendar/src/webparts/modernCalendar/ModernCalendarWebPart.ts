/* eslint-disable @typescript-eslint/no-explicit-any */
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  
} from "@microsoft/sp-property-pane";

import { Version } from "@microsoft/sp-core-library";

import * as strings from "modernCalendarStrings";
import { IModernCalendarWebPartProps } from "./IModernCalendarWebPartProps";
import CalendarTemplate from "./CalendarTemplate";

import * as jQuery from "jquery";
import * as moment from "moment";
import Swal from "sweetalert2";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

import { Calendar, EventClickArg, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';



export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}



export default class ModernCalendarWebPart extends BaseClientSideWebPart<IModernCalendarWebPartProps> {
  public constructor() {
    super();
  }

  public render(): void {
    if (this.properties.theme != null) {
      SPComponentLoader.loadCss(this.properties.theme);
    }

    if (!this.properties.other) {
      jQuery("input[aria-label=hide-col]").parent().hide();
    }

    //Check required properties before rendering list
    if (
      this.properties.listTitle == null ||
      this.properties.start==null||
      this.properties.end == null ||
      this.properties.title == null ||
      this.properties.detail == null
    ) {
      this.domElement.innerHTML = CalendarTemplate.emptyHtml(
        this.properties.description
      );
    } else {
      this.domElement.innerHTML = CalendarTemplate.templateHtml;
      this._renderListAsync();
    }
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected onPropertyPaneConfigurationStart(): void {
    //Set a default theme
    if (this.properties.theme == null) {
      this.properties.theme = CalendarTemplate.theme()[0].key.toString();
    }

    if (this.properties.site) {
      this.listDisabled = false;
    }

    if (
      this.properties.listTitle &&
      (!this.properties.start ||
        !this.properties.end ||
        !this.properties.title ||
        !this.properties.detail)
    ) {
     console.log("this.properties.listTitle: "+this.properties.listTitle);

      this._getListColumns(this.properties.listTitle, this.properties.site).then((response3) => {
        const col: IPropertyPaneDropdownOption[] = [];
        for (const _innerKey in response3.value) {
          col.push({
            key: response3.value[_innerKey]["InternalName"],
            text: response3.value[_innerKey]["Title"],
          });
        }
        this._columnOptions = col;
        this.colsDisabled = false;
        this.listDisabled = false;
        this.context.propertyPane.refresh();
        this.context.statusRenderer.clearLoadingIndicator(
          this.domElement
        );
        this.render();
      });
    }

    if (!this.properties.other) {
      jQuery("input[aria-label=hide-col]").parent().hide();
    }

    if (
      this.properties.site &&
      this.properties.listTitle &&
      this.properties.start &&
      this.properties.start &&
      this.properties.end &&
      this.properties.title &&
      this.properties.detail
    ) {
      this.context.statusRenderer.displayLoadingIndicator(
        this.domElement,
        "Configuration"
      );
      this._getSiteRootWeb().then((response0) => {
        this._getSites(response0["Url"]).then((response) => {
          const sites: IPropertyPaneDropdownOption[] = [];
          sites.push({
            key: this.context.pageContext.web.absoluteUrl,
            text: "This Site",
          });
          sites.push({ key: "other", text: "Other Site (Specify Url)" });
          for (const _key in response.value) {
            if (
              this.context.pageContext.web.absoluteUrl !=
              response.value[_key]["Url"]
            ) {
              sites.push({
                key: response.value[_key]["Url"],
                text: response.value[_key]["Title"],
              });
            }
          }
          this._siteOptions = sites;
          if (this.properties.site) {
            this._getListTitles(this.properties.site).then((response2) => {
              this._dropdownOptions = response2.value.map((list: ISPList) => {
                return {
                  key: list.Title,
                  text: list.Title,
                };
              });
              console.log("this.properties.site: "+this.properties.site );
              this._getListColumns(
                this.properties.listTitle!,
                this.properties.site
              ).then((response3) => {
                const col: IPropertyPaneDropdownOption[] = [];
                for (const _innerKey in response3.value) {
                  col.push({
                    key: response3.value[_innerKey]["InternalName"],
                    text: response3.value[_innerKey]["Title"],
                  });
                }
                this._columnOptions = col;
                this.colsDisabled = false;
                this.listDisabled = false;
                this.context.propertyPane.refresh();
                this.context.statusRenderer.clearLoadingIndicator(
                  this.domElement
                );
                this.render();
              });
            });
          }
        });
      });
    } else {
      this._getSitesAsync();
    }
  }

  protected onPropertyPaneFieldChanged(
    propertyPath: string,
    oldValue: any,
    newValue: any
  ): void {
    if (newValue == "other") {
      this.properties.other = true;
      this.properties.listTitle = null;
      jQuery("input[aria-label=hide-col]").parent().show();
    } else if (oldValue === "other" && newValue != "other") {
      this.properties.other = false;
      this.properties.siteOther = null;
      this.properties.listTitle = null;
      jQuery("input[aria-label=hide-col]").parent().hide();
    }
    this.context.statusRenderer.displayLoadingIndicator(
      this.domElement,
      "Configuration"
    );
    if ((propertyPath === "site" || propertyPath === "siteOther") && newValue) {
      this.colsDisabled = true;
      this.listDisabled = true;
      let siteUrl = newValue;
      if (this.properties.other && this.properties.siteOther) {
        siteUrl = this.properties.siteOther;
      } else {
        jQuery("input[aria-label=hide-col]").parent().hide();
      }
      if (
        (this.properties.other && this.properties.siteOther && this.properties.siteOther.length > 25) ||
        !this.properties.other
      ) {
        this._getListTitles(siteUrl).then((response) => {
          this._dropdownOptions = response.value.map((list: ISPList) => {
            return {
              key: list.Title,
              text: list.Title,
            };
          });
        
          this.listDisabled = false;
          this.context.propertyPane.refresh();
          this.context.statusRenderer.clearLoadingIndicator(this.domElement);
          this.render();
        }).catch(() => {
          console.log("Error loading lists");
        });
      }
    } else if (propertyPath === "listTitle" && newValue) {
      // tslint:disable-next-line:no-duplicate-variable
      let siteUrl = this.properties.site;
      if (this.properties.other && this.properties.siteOther) {
        siteUrl = this.properties.siteOther;
      }
      console.log("siteUrl: "+siteUrl );
      this._getListColumns(newValue, siteUrl).then((response) => {
        const col: IPropertyPaneDropdownOption[] = [];
        for (const _key in response.value) {
          col.push({
            key: response.value[_key]["InternalName"],
            text: response.value[_key]["Title"],
          });
        }
        this._columnOptions = col;
        this.colsDisabled = false;
        this.context.propertyPane.refresh();
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.render();
      });
    } else {
      //Handle other fields here
      this.render();
    }
  }

  private colsDisabled: boolean = true;
  private listDisabled: boolean = true;

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    let otherSiteAria = "hide-col";
    if (this.properties.other) {
      otherSiteAria = "";
    }
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
                PropertyPaneDropdown("theme", {
                  label: "Theme",
                  options: CalendarTemplate.theme(),
                }),
                PropertyPaneDropdown("site", {
                  label: "Site",
                  options: this._siteOptions,
                }),
                PropertyPaneTextField("siteOther", {
                  label:
                    "Other Site Url (i.e. https://contoso.sharepoint.com/path)",
                  ariaLabel: otherSiteAria,
                }),
                PropertyPaneDropdown("listTitle", {
                  label: "List Title",
                  options: this._dropdownOptions,
                  disabled: this.listDisabled,
                }),
                PropertyPaneDropdown("start", {
                  label: "Start Date Field",
                  options: this._columnOptions,
                  disabled: this.colsDisabled,
                }),
                PropertyPaneDropdown("end", {
                  label: "End Date Field",
                  options: this._columnOptions,
                  disabled: this.colsDisabled,
                }),
                PropertyPaneDropdown("title", {
                  label: "Event Title Field",
                  options: this._columnOptions,
                  disabled: this.colsDisabled,
                }),
                PropertyPaneDropdown("detail", {
                  label: "Event Details",
                  options: this._columnOptions,
                  disabled: this.colsDisabled,
                }),
              ],
            },
          ],
        },
      ],
    };
  }

  private _siteOptions: IPropertyPaneDropdownOption[] = [];
  private _dropdownOptions: IPropertyPaneDropdownOption[] = [];
  private _columnOptions: IPropertyPaneDropdownOption[] = [];



  private _getSiteRootWeb(): Promise<any> {
    return this.context.spHttpClient
      .get(
        this.context.pageContext.web.absoluteUrl +
          `/_api/Site/RootWeb?$select=Title,Url`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _getSites(rootWebUrl: string): Promise<any> {
    return this.context.spHttpClient
      .get(
        rootWebUrl + `/_api/web/webs?$select=Title,Url`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _getListTitles(site: string): Promise<any> {
    return this.context.spHttpClient
      .get(
        site + `/_api/web/lists?$filter=Hidden eq false and BaseType eq 0`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        console.log("response get List Titles ");
        return response.json();
      });
  }

  private _getListColumns(
    listNameColumns: string,
    listsite: string
  ): Promise<any> {
    return this.context.spHttpClient
      .get(
        listsite +
          `/_api/web/lists/GetByTitle('${listNameColumns}')/Fields?$filter=Hidden eq false and ReadOnlyField eq false`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        console.log("listsite");
    console.log(listsite);
        return response.json();
      });
  }

  private _getListData(listName: string, site: string): Promise<any> {
    console.log("listName: "+listName);
    return this.context.spHttpClient
      .get(
        site +
          `/_api/web/lists/GetByTitle('${listName}')/items?$select=${encodeURIComponent(
            this.properties.title
          )},${encodeURIComponent(this.properties.start)},${encodeURIComponent(
            this.properties.end
          )},${encodeURIComponent(
            this.properties.detail
          )},Created,Author/ID,Author/Title&$expand=Author/ID,Author/Title&$orderby=Id desc&$limit=500`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        console.log("response get List Data ");
        console.log(response);
        return response.json();
      });
  }

  private _renderList(items: any[]): void {
    const calItems:EventSourceInput = items.map((list: any) => {
      const start = list[this.properties.start];
      const end = list[this.properties.end];
      return {
        title: list[this.properties.title],
        start: moment.utc(start,'YYYY-MM-DD HH:mm:ss').toDate(),
        end: moment.utc(end,'YYYY-MM-DD HH:mm:ss').toDate(),
        id: list["Id"],
        detail: list[this.properties.detail],
      };
    });
    this.context.statusRenderer.clearLoadingIndicator(this.domElement);

    const calendarEl = document.getElementById('spfxcalendar');
    if(calendarEl){
const calendar = new Calendar(calendarEl, {
  eventClick: (args:EventClickArg) => {
    const calEvent = args.event;
    const eventDetail =
    moment.utc(calEvent.start).local().format('YYYY-MM-DD hh:mm A') +
    " - " +
    moment.utc(calEvent.end).local().format('YYYY-MM-DD hh:mm A') +
      "<br>" +
      args.event.extendedProps.detail;
    //swal2.default(calEvent.title, eventDetail, "info");
    Swal.fire({
      title: calEvent.title,
      html: eventDetail, 
      icon: 'info',

    });
    
  },
  plugins: [ dayGridPlugin ],
  initialView: 'dayGridMonth',
  eventSources: [
    {
      events: calItems,
      
    }
  ],

  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,listWeek'
  }
});
calendar.render();
    }
    //jQuery(".spfxcalendar", this.domElement).fullCalendar(calendarOptions);
  }

  private _getSitesAsync(): void {
    this._getSiteRootWeb().then((response) => {
      this._getSites(response["Url"]).then((response1) => {
        const sites: IPropertyPaneDropdownOption[] = [];
        sites.push({
          key: this.context.pageContext.web.absoluteUrl,
          text: "This Site",
        });
        sites.push({ key: "other", text: "Other Site (Specify Url)" });
        for (const _key in response1.value) {
          sites.push({
            key: response1.value[_key]["Url"],
            text: response1.value[_key]["Title"],
          });
        }
        this._siteOptions = sites;
        this.context.propertyPane.refresh();
        let siteUrl = this.properties.site;
        if (this.properties.other && this.properties.siteOther) {
          siteUrl = this.properties.siteOther
        }
        this._getListTitles(siteUrl).then((response2) => {
          this._dropdownOptions = response2.value.map((list: ISPList) => {
            return {
              key: list.Title,
              text: list.Title,
            };
          });
          this.context.propertyPane.refresh();
          if (this.properties.listTitle) {
            console.log("this.properties.site: "+this.properties.site );
            this._getListColumns(
              this.properties.listTitle,
              this.properties.site
            ).then((response3) => {
              const col: IPropertyPaneDropdownOption[] = [];
              for (const _innerKey in response3.value) {
                col.push({
                  key: response3.value[_innerKey]["InternalName"],
                  text: response3.value[_innerKey]["Title"],
                });
              }
              this._columnOptions = col;
              this.colsDisabled = false;
              this.listDisabled = false;
              this.context.propertyPane.refresh();
              this.context.statusRenderer.clearLoadingIndicator(
                this.domElement
              );
              this.render();
            });
          }
        });
      });
    });
  }

  private _renderListAsync(): void {
    let siteUrl = this.properties.site;
    if (this.properties.other && this.properties.siteOther) {
      siteUrl = this.properties.siteOther;
    }
    console.log("siteUrl");
    console.log(siteUrl);
    this._getListData(this.properties.listTitle!, siteUrl)
      .then((response) => {
        console.log("response");
        this._renderList(response.value);
      })
      .catch((err) => {
        console.log("Error loading list data");
        console.log(err);
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.context.statusRenderer.renderError(
          this.domElement,
          "There was an error loading your list, please verify the selected list has Calendar Events or choose a new list."
        );
      });
  }
}
