/**
 * @file
 * Spotlight Web Part with SharePoint Framework
 * Author: SPS-COM
 * Copyright (c) 2017
 */
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  IPropertyPaneDropdownOption,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  PropertyPaneSlider
} from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
import { SPHttpClient } from '@microsoft/sp-http';
import {
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';
import { PropertyFieldColorPickerMini } from 'sp-client-custom-fields/lib/PropertyFieldColorPickerMini';
import * as jQuery from 'jquery';
import * as _ from "lodash";
import styles from './EmployeeSpotlight.module.scss';
import * as strings from 'employeeSpotlightStrings';
import { IEmployeeSpotlightWebPartProps } from './IEmployeeSpotlightWebPartProps';
import { SliderHelper } from './Helper';

/**
 *  An interface to hold the key and value.
 */
export interface ResponceDetails {
  title: string;
  id: string;
}

/**
 *  An interface to hold the ResponceDetails collection.
 */
export interface ResponceCollection {
  value: ResponceDetails[];
}

/**
 * An interface to hold the SpotlightDetails.
 */
export interface SpotlightDetails {
  userDisplayName: string;
  userEmail: string;
  userProfilePic: string;
  description: string;
  designation?: string;
}

/**
 * A class that contains spotlight webpart operations and corresponding properties to hold the data.
 */
export default class EmployeeSpotlightWebPart extends BaseClientSideWebPart<IEmployeeSpotlightWebPartProps> {
  private spotlightListFieldOptions: IPropertyPaneDropdownOption[] = [];
  private spotlightListOptions: IPropertyPaneDropdownOption[] = [];
  private siteOptions: IPropertyPaneDropdownOption[] = [];
  private defaultProfileImageUrl: string = "/_layouts/15/userphoto.aspx?size=L";
  private helper: SliderHelper = new SliderHelper();
  private sliderControl: any = null;
  /**
   * Constructor of SpotlightWebpart class.
   */
  public constructor() {
    super();

    SPComponentLoader.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js', { globalExportsName: 'jQuery' });
    // Next button functionality
    jQuery(document).on("click", "." + styles.next, (event) => {
      event.preventDefault();    //prevent default action of <a>
      this.helper.moveSlides(1);
    });

    // Previous button functionality
    jQuery(document).on("click", "." + styles.prev, (event) => {
      event.preventDefault();    //prevent default action of <a>
      this.helper.moveSlides(-1);
    });

    // start and stop slider on hover
    jQuery(document).ready(() => {
      jQuery(document).on('mouseenter', '.' + styles.containers, () => {
        if (this.properties.enabledSpotlightAutoPlay)
          clearInterval(this.sliderControl);
      }).on('mouseleave', '.' + styles.containers, () => {
        var carouselSpeed: number = this.properties.spotlightSliderSpeed * 1000;
        if (carouselSpeed && this.properties.enabledSpotlightAutoPlay)
          this.sliderControl = setInterval(this.helper.startAutoPlay, carouselSpeed);
      });
    });
  }

  /**
   * A starting point for application.
   */
  public render(): void {
    this.domElement.innerHTML = `<div id="spListContainer" />`;
    this._renderSpotlightTemplateAsync();
    this._renderSpotlightDataAsync();
  }

  /**
   * Builds the spotlight details collection with necessary details.
   */
  private _renderSpotlightTemplateAsync(): void {
    if (Environment.type == EnvironmentType.SharePoint || Environment.type == EnvironmentType.ClassicSharePoint) {
      this._getSiteCollectionRootWeb().then((response) => {
        this.properties.spotlightSiteCollectionURL = response['Url'];
      });
      if (this.properties.spotlightSiteURL && this.properties.spotlightListName && this.properties.spotlightEmployeeEmailColumn && this.properties.spotlightDescriptionColumn) {
        let spotlightDataCollection: SpotlightDetails[] = [];
        this._getSpotlightListData(this.properties.spotlightSiteURL, this.properties.spotlightListName, this.properties.spotlightEmployeeExpirationDateColumn, this.properties.spotlightEmployeeEmailColumn, this.properties.spotlightDescriptionColumn)
          .then((listDataResponse) => {
            var spotlightListData = listDataResponse.value;
            if (spotlightListData) {
              debugger;
              for (var key in listDataResponse.value) {
                var email = listDataResponse.value[key][this.properties.spotlightEmployeeEmailColumn]["EMail"];
                var id = listDataResponse.value[key]["ID"];
                this._getUserImage(email)
                  .then((response) => {
                    spotlightListData.forEach((item: ResponceDetails) => {
                      let userSpotlightDetails: SpotlightDetails = { userDisplayName: "", userEmail: "", userProfilePic: "", description: "" };
                      if (item[this.properties.spotlightEmployeeEmailColumn]["EMail"] == response["Email"]) {
                        var userName = item[this.properties.spotlightEmployeeEmailColumn];
                        var description = item[this.properties.spotlightDescriptionColumn];
                        var userDescription = "";
                        try {
                          userDescription = $(description).text();
                        }
                        catch (err) {
                          userDescription = description;
                        }
                        if (userDescription.length > 140) {
                          var displayFormUrl = this.properties.spotlightSiteURL + '/Lists/' + this.properties.spotlightListName + '/DispForm.aspx?ID=' + id;
                          userDescription = userDescription.substring(0, 140) + `&nbsp; <a href="${displayFormUrl}">ReadMore...</a>`;
                        }
                        var displayName = response["DisplayName"];
                        var designationProperty = _.filter(response["UserProfileProperties"], { Key: "SPS-JobTitle" })[0];
                        var designation = designationProperty["Value"] ? designationProperty["Value"] : "";
                        // uses default image if user image not exist 
                        var profilePicture = response["PictureUrl"] != null && response["PictureUrl"] != undefined ? (<string>response["PictureUrl"]).replace("MThumb", "LThumb") : this.defaultProfileImageUrl;
                        // var profilePicture = response["PictureUrl"] != null && response["PictureUrl"] != undefined ? (<string>response["PictureUrl"]) : this.defaultProfileImageUrl;
                        profilePicture = '/_layouts/15/userphoto.aspx?accountname=' + displayName + '&size=M&url=' + profilePicture.split("?")[0];
                        userSpotlightDetails = {
                          userDisplayName: response["DisplayName"],
                          userEmail: response["Email"],
                          userProfilePic: profilePicture,
                          description: userDescription,
                          designation: designation
                        };
                        spotlightDataCollection.push(userSpotlightDetails);
                      }
                    });
                    this._addSpotlightTemplateContent(spotlightDataCollection);
                    if (this.sliderControl == null && this.properties && this.properties.enabledSpotlightAutoPlay) {
                      setTimeout(this.helper.moveSlides(), 2000);
                      this.sliderControl = setInterval(this.helper.startAutoPlay, this.properties.spotlightSliderSpeed * 1000);
                    }
                  });
              }
            }
          });
      }
    }
  }

  /**
   * Renders the webpart html with the given spotlight details collection.
   * @param spotlightDetails - a collection of spotlight details.
   */
  private _addSpotlightTemplateContent(spotlightDetails: SpotlightDetails[]): void {
    this.domElement.innerHTML = '';
    var innerContent: string = '';
    for (let i: number = 0; i < spotlightDetails.length; i++) {
      innerContent += ` 
                  <div class="${styles.mySlides}">
                    <div style="width:100%;">
                          <div style="width:36%;float:left;padding:10% 0;">
                            <img style="border-radius:50%;width: 90px;" src="${spotlightDetails[i].userProfilePic}" />
                          </div>
                          <div style="width:60%;float:left;text-align:left;">
                              <h5 style="margin-bottom:0; text-transform: uppercase;text-align:center;">${spotlightDetails[i].userDisplayName}</h5>
                              <h6 style="text-align:center;">${spotlightDetails[i].designation}</h6>
                              <p>${spotlightDetails[i].description}</p>                              
                          </div>
                      </div>
                  </div>`;
    }
    this.domElement.innerHTML +=
      `<div class="${styles.containers}" id="slideshow" style="background-color: ${this.properties.spotlightBGColor}; cursor:pointer; width: 100%!important; padding: 5px;border-radius: 15px;box-shadow: rgba(0,0,0,0.25) 0 0 20px 0;text-align:center;color:${this.properties.spotlightFontColor};">
                     ` + innerContent + `
       <a  class="${styles.prev}">&#10094;</a>
       <a  class="${styles.next}">&#10095;</a>
     </div>`;
  }

  /**
   * A generic utility function to execute the rest api call and return the corresponding result as a promise. 
   * @param url - The string containing api url.
   */
  private _callAPI(url: string): Promise<ResponceCollection> {
    return this.context.spHttpClient.get(url, SPHttpClient.configurations.v1).then((response) => {
      return response.json();
    });
  }

  /**
   * Returns a promise that returns user image url and name.
   * @param email - The string containing user email id.
   */
  private _getUserImage(email: string): Promise<ResponceCollection> {
    return this._callAPI(this.properties.spotlightSiteCollectionURL + "/_api/SP.UserProfiles.PeopleManager/GetPropertiesFor(accountName=@v)?@v='i:0%23.f|membership|" + email + "'");
  }

  /**
   * Returns a promise that returns sitecollection rootweb url.
   */
  private _getSiteCollectionRootWeb(): Promise<ResponceCollection> {
    return this._callAPI(this.context.pageContext.web.absoluteUrl + `/_api/Site/RootWeb?$select=Title,Url`);
  }

  /**
   * Returns a promise that returns all the subsite names from the given sitecollection.
   * @param spotlightSiteCollectionURL - The string containing user email id.
   */
  private _getAllSubsites(spotlightSiteCollectionURL: string): Promise<ResponceCollection> {
    return this._callAPI(spotlightSiteCollectionURL + `/_api/web/webs?$select=Title,Url`);
  }

  /**
   * Returns a promise that returns all the list names in corresponding site.
   * @param siteUrl - The string containing site url.
   */
  private _getAllLists(siteUrl: string): Promise<ResponceCollection> {
    if (siteUrl != "" && siteUrl != undefined) {
      return this._callAPI(siteUrl + `/_api/web/lists?$orderby=Id desc&$filter=Hidden eq false and BaseTemplate eq 100`);
    }
  }

  /**
   * Returns a promise that returns spotlight list field names.
   * @param siteUrl - The string containing site url.
   * @param spotlightListName - The string containing spotlight list name.
   */
  private _getSpotlightListFields(siteUrl: string, spotlightListName: string): Promise<ResponceCollection> {
    if (siteUrl != "" && spotlightListName != "" && siteUrl != undefined && spotlightListName != undefined) {
      return this._callAPI(siteUrl + `/_api/web/lists/GetByTitle('${spotlightListName}')/Fields?$orderby=Id desc&$filter=Hidden eq false and ReadOnlyField eq false`);
    }
  }

  /**
   * Loads all the subsites in the current sitecollection and initiates the corresponding dropdown values loading.
   */
  private _renderSpotlightDataAsync(): void {
    this._getSiteCollectionRootWeb()
      .then((response) => {
        this.properties.spotlightSiteCollectionURL = response['Url'];
        this._getAllSubsites(response['Url'])
          .then((sitesResponse) => {
            this.siteOptions = this._getDropDownCollection(sitesResponse, 'Url', 'Title');
            this.context.propertyPane.refresh();
            if (this.properties.spotlightSiteURL != "") {
              this._loadAllListsDropDown(this.properties.spotlightSiteURL);
            }
            if (this.properties.spotlightListName != "") {
              this._loadSpotlightListFieldsDropDown(this.properties.spotlightSiteURL, this.properties.spotlightListName);
            }
          });
      });
  }

  /**
   * Loads all the list names in the selected site for spotlight list dropdown.
   * @param siteUrl - The string containing site url.
   */
  private _loadAllListsDropDown(siteUrl: string): void {
    this._getAllLists(siteUrl)
      .then((response) => {
        this.spotlightListOptions = this._getDropDownCollection(response, 'Title', 'Title');
        this.context.propertyPane.refresh();
      });
  }

  /**
   * Loads the spotlight list fields for fields dropdown.
   * @param siteUrl - The string containing site url.
   * @param spotlightListName - The string containing spotlight list name.
   */
  private _loadSpotlightListFieldsDropDown(siteUrl: string, spotlightListName: string): void {
    this._getSpotlightListFields(siteUrl, spotlightListName)
      .then((response) => {
        this.spotlightListFieldOptions = this._getDropDownCollection(response, 'Title', 'Title');
        this.context.propertyPane.refresh();
      });
  }

  /**
   * Returns the dropdown key and values collection.
   * @param response - The collection containing keys and values.
   * @param key - The string containing key.
   * @param text - The string containing value.
   */
  private _getDropDownCollection(response: ResponceCollection, key: string, text: string): IPropertyPaneDropdownOption[] {
    var dropdownOptions: IPropertyPaneDropdownOption[] = [];
    if (key == 'Url')
      dropdownOptions.push({ key: this.context.pageContext.web.absoluteUrl, text: 'This Site' });
    for (var itemKey in response.value) {
      dropdownOptions.push({ key: response.value[itemKey][key], text: response.value[itemKey][text] });
    }
    return dropdownOptions;
  }

  /**
   * Returns a promise that returns spotlight list items.
   * @param siteUrl - The string containing site url.
   * @param spotlightListName - The string containing spotlight list name.
   */
  private _getSpotlightListData(siteUrl: string, spotlightListName: string, expiryDateColumn: string, emailColumn: string, descriptionColumn: string): Promise<ResponceCollection> {
    if (siteUrl != "" && spotlightListName != "") {
      var today: Date = new Date();
      var dd: any = today.getDate();
      var mm: any = today.getMonth() + 1; //January is 0!
      var yyyy: any = today.getFullYear();
      dd = (dd < 10) ? '0' + dd : dd;
      mm = (mm < 10) ? '0' + mm : mm;
      var dateString: string = `${yyyy}-${mm}-${dd}`;
      emailColumn = emailColumn.replace(" ", "_x0020_");
      descriptionColumn = descriptionColumn.replace(" ", "_x0020_");
      expiryDateColumn = expiryDateColumn.replace(" ", "_x0020_");
      return this._callAPI(siteUrl + `/_api/web/lists/GetByTitle('${spotlightListName}')/items?$select=ID,${descriptionColumn},${emailColumn}/EMail&$expand=${emailColumn}/Id&$orderby=Id desc&$filter=${expiryDateColumn} ge '${dateString}'`);
    }
  }

  /** 
   * Validates the Property pane fields for null checks
   * @param value - The string value of the field to be validated.
   */
  private _validateFiledValue(value: string): string {
    var validationMessage: string = '';
    if (value === null || value.trim().length === 0) {
      validationMessage = 'Please select a value';
    }
    return validationMessage;
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /**
   * Builds the Propertypane with specific configurations.
   */
  protected onPropertyPaneConfigurationStart(): void {
    // Stops execution, if the list values already exists
    if (this.spotlightListOptions.length > 0) return;
    // Calls function to append the list names to dropdown
    this._renderSpotlightTemplateAsync();
  }

  /**
   * Triggers foreach Property pane value update and loads the corresponding details.
   * @param propertyPath - The string containing property path.
   * @param oldValue - The string containing old value of property.
   * @param newValue - The string containing new value of property.
   */
  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: any, newValue: any): void {
    switch (propertyPath) {
      case "spotlightSiteURL":
        this.properties.spotlightListName = "";
        this._loadAllListsDropDown(this.properties.spotlightSiteURL);
        break;
      case "spotlightListName":
        this.properties.spotlightEmployeeEmailColumn = "";
        this.properties.spotlightDescriptionColumn = "";
        this._loadSpotlightListFieldsDropDown(this.properties.spotlightSiteURL, this.properties.spotlightListName);
        break;
      default:
        break;
    }
  }

  /**
   * Retuns the property pane configuration.
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupName: strings.propertyPaneHeading,
              groupFields: [
                PropertyPaneDropdown('spotlightSiteURL', {
                  label: strings.selectSiteLableMessage,
                  options: this.siteOptions,
                  selectedKey: this._validateFiledValue.bind(this)
                }),
                PropertyPaneDropdown('spotlightListName', {
                  label: strings.selectListLableMessage,
                  options: this.spotlightListOptions,
                  selectedKey: this._validateFiledValue.bind(this)
                }),
                PropertyPaneDropdown('spotlightEmployeeEmailColumn', {
                  label: strings.employeeEmailcolumnLableMessage,
                  options: this.spotlightListFieldOptions,
                  selectedKey: this._validateFiledValue.bind(this)
                }),
                PropertyPaneDropdown('spotlightDescriptionColumn', {
                  label: strings.descriptioncolumnLableMessage,
                  options: this.spotlightListFieldOptions,
                  selectedKey: this._validateFiledValue.bind(this)
                }),
                PropertyPaneDropdown('spotlightEmployeeExpirationDateColumn', {
                  label: strings.expirationDateColumnLableMessage,
                  options: this.spotlightListFieldOptions,
                  selectedKey: this._validateFiledValue.bind(this)
                })
              ]
            },
            {
              groupName: strings.effectsGroupName,
              groupFields: [
                PropertyFieldColorPickerMini('spotlightBGColor', {
                  label: strings.spotlightBGColorLableMessage,
                  initialColor: this.properties.spotlightBGColor,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'spotlightBGColorFieldId'
                }),
                PropertyFieldColorPickerMini('spotlightFontColor', {
                  label: strings.spotlightFontColorLableMessage,
                  initialColor: this.properties.spotlightFontColor,
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  properties: this.properties,
                  onGetErrorMessage: null,
                  deferredValidationTime: 0,
                  key: 'spotlightFontColorFieldId'
                }),
                PropertyPaneToggle('enabledSpotlightAutoPlay', {
                  label: strings.enableAutoSlideLableMessage
                }),
                PropertyPaneSlider('spotlightSliderSpeed', {
                  label: strings.carouselSpeedLableMessage,
                  min: 0,
                  max: 7,
                  value: 3,
                  showValue: true,
                  step: 0.5
                })
              ]
            }
          ]
        }
      ]
    };
  }
}