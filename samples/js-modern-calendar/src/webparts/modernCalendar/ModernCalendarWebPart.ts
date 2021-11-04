import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import {
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  IPropertyPaneTextFieldProps,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  IPropertyPaneDropdownProps,
} from "@microsoft/sp-property-pane";

import { Version } from "@microsoft/sp-core-library";

import { escape } from "@microsoft/sp-lodash-subset";
import styles from "./ModernCalendar.module.scss";
import * as strings from "modernCalendarStrings";
import { IModernCalendarWebPartProps } from "./IModernCalendarWebPartProps";
import CalendarTemplate from "./CalendarTemplate";
import * as jQuery from "jquery";
import "fullcalendar";
import * as moment from "moment";
import * as swal2 from "sweetalert2";
import { SPComponentLoader } from "@microsoft/sp-loader";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";
import { Environment, EnvironmentType } from "@microsoft/sp-core-library";
import { EventObjectInput, OptionsInput } from "fullcalendar";
import { Default as View } from "fullcalendar/View";

export interface ISPLists {
  value: ISPList[];
}

export interface ISPList {
  Title: string;
  Id: string;
}

export interface EventObjects {
  value: EventObjectInput[];
}

export default class ModernCalendarWebPart extends BaseClientSideWebPart<IModernCalendarWebPartProps> {
  public constructor() {
    super();
    // Modify with your a CDN or local path
    SPComponentLoader.loadCss(
      "https://cdnjs.cloudflare.com/ajax/libs/limonte-sweetalert2/8.11.8/sweetalert2.min.css"
    );
    SPComponentLoader.loadCss(
      "https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.css"
    );
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
      this.properties.start == null ||
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
      //this._getColumnsAsync();
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
          var sites: IPropertyPaneDropdownOption[] = [];
          sites.push({
            key: this.context.pageContext.web.absoluteUrl,
            text: "This Site",
          });
          sites.push({ key: "other", text: "Other Site (Specify Url)" });
          for (var _key in response.value) {
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
              this._getListColumns(
                this.properties.listTitle,
                this.properties.site
              ).then((response3) => {
                var col: IPropertyPaneDropdownOption[] = [];
                for (var _innerKey in response3.value) {
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
      var siteUrl = newValue;
      if (this.properties.other) {
        siteUrl = this.properties.siteOther;
      } else {
        jQuery("input[aria-label=hide-col]").parent().hide();
      }
      if (
        (this.properties.other && this.properties.siteOther.length > 25) ||
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
        });
      }
    } else if (propertyPath === "listTitle" && newValue) {
      // tslint:disable-next-line:no-duplicate-variable
      var siteUrl = newValue;
      if (this.properties.other) {
        siteUrl = this.properties.siteOther;
      }
      this._getListColumns(newValue, siteUrl).then((response) => {
        var col: IPropertyPaneDropdownOption[] = [];
        for (var _key in response.value) {
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
    var otherSiteAria = "hide-col";
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

  public onInit<T>(): Promise<T> {
    //this._siteOptions.push({key:this.context.pageContext.web.absoluteUrl, text:'This Site'});
    return Promise.resolve();
  }

  private _getSiteRootWeb(): Promise<ISPLists> {
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

  private _getSites(rootWebUrl: string): Promise<ISPLists> {
    return this.context.spHttpClient
      .get(
        rootWebUrl + `/_api/web/webs?$select=Title,Url`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  private _getListTitles(site: string): Promise<ISPLists> {
    return this.context.spHttpClient
      .get(
        site + `/_api/web/lists?$filter=Hidden eq false and BaseType eq 0`,
        SPHttpClient.configurations.v1
      )
      .then((response: SPHttpClientResponse) => {
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
        return response.json();
      });
  }

  private _getListData(listName: string, site: string): Promise<any> {
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
        return response.json();
      });
  }

  private _renderList(items: any[]): void {
    var calItems: EventObjectInput[] = items.map((list: any) => {
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
    const calendarOptions: EventObjectInput = {
      title: "test",
      theme: true,
      events: calItems,
      eventClick: (_event) => {
        var eventDetail =
        moment.utc(_event["start"]).local().format('YYYY-MM-DD hh:mm A') +
        " - " +
        moment.utc(_event["end"]).local().format('YYYY-MM-DD hh:mm A') +
          "<br>" +
          _event["detail"];
        swal2.default(_event.title, eventDetail, "info");
      },
    };
    jQuery(".spfxcalendar", this.domElement).fullCalendar(calendarOptions);
  }

  private _getSitesAsync(): void {
    this._getSiteRootWeb().then((response) => {
      this._getSites(response["Url"]).then((response1) => {
        var sites: IPropertyPaneDropdownOption[] = [];
        sites.push({
          key: this.context.pageContext.web.absoluteUrl,
          text: "This Site",
        });
        sites.push({ key: "other", text: "Other Site (Specify Url)" });
        for (var _key in response1.value) {
          sites.push({
            key: response1.value[_key]["Url"],
            text: response1.value[_key]["Title"],
          });
        }
        this._siteOptions = sites;
        this.context.propertyPane.refresh();
        var siteUrl = this.properties.site;
        if (this.properties.other) {
          siteUrl = this.properties.siteOther;
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
            this._getListColumns(
              this.properties.listTitle,
              this.properties.site
            ).then((response3) => {
              var col: IPropertyPaneDropdownOption[] = [];
              for (var _innerKey in response3.value) {
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
    var siteUrl = this.properties.site;
    if (this.properties.other) {
      siteUrl = this.properties.siteOther;
    }
    this._getListData(this.properties.listTitle, siteUrl)
      .then((response) => {
        this._renderList(response.value);
      })
      .catch((err) => {
        this.context.statusRenderer.clearLoadingIndicator(this.domElement);
        this.context.statusRenderer.renderError(
          this.domElement,
          "There was an error loading your list, please verify the selected list has Calendar Events or choose a new list."
        );
      });
  }
}
