import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Log, Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, PropertyPaneTextField, PropertyPaneDropdown, PropertyPaneToggle } from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
import * as strings from 'ReactAggregatedCalendarWebPartStrings';
import ReactAggregatedCalendar from './components/ReactAggregatedCalendar';
import { IReactAggregatedCalendarProps } from './components/IReactAggregatedCalendarProps';
import MessageComponent, { IMessageComponentProps } from '../shared/components/MessageComponent';
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { PropertyFieldCustomList, CustomListFieldType } from 'sp-client-custom-fields/lib/PropertyFieldCustomList';
import { SelectedCalendar } from './model/SelectedCalendar';
import { PropertyFieldDropDownSelect } from 'sp-client-custom-fields/lib/PropertyFieldDropDownSelect';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';

/**
 * Interface for the Aggregated Calendar Webpart Class Properties
 *
 * @export
 * @interface IReactAggregatedCalendarWebPartProps
 */
export interface IReactAggregatedCalendarWebPartProps {
  header: string;
  calendarList: SelectedCalendar[];
  dateFormat: string;
  showLegend: boolean;
}

/**
 * Aggregated Calendar Webpart Class
 *
 * @export
 * @class ReactAggregatedCalendarWebPart
 * @extends {BaseClientSideWebPart<IReactAggregatedCalendarWebPartProps>}
 */
export default class ReactAggregatedCalendarWebPart extends BaseClientSideWebPart<IReactAggregatedCalendarWebPartProps> {
  private availableViews: IDropdownOption[] = require("../shared/availableViews.json");
  private timeFormat: IDropdownOption[] = require("../shared/timeFormat.json");
  protected onInit(): Promise<void> {
    SPComponentLoader.loadCss('https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.4.0/fullcalendar.min.css');
    return super.onInit();
  }
  /**
   * Renders the React Agggregated Calendar Webpart
   *
   * @memberof ReactAggregatedCalendarWebPart
   */
  public render(): void {
    Log.verbose("render()", "Inside Render", this.context.serviceScope);
    if (this.needsConfiguration()) {
      Log.warn("render()", "Webpart not configured", this.context.serviceScope);
      this.renderMessage(strings.WebPartNotConfigured, MessageBarType.error, true);
    } else {
      Log.info("render()", "Webpart configuration not needed", this.context.serviceScope);
      const element: React.ReactElement<IReactAggregatedCalendarProps> = React.createElement(
        ReactAggregatedCalendar,
        {
          header: this.properties.header,
          selectedCalendarLists: this.properties.calendarList,
          context: this.context,
          domElement: this.domElement,
          dateFormat: this.properties.dateFormat,
          showLegend: this.properties.showLegend

        }
      );
      ReactDom.render(element, this.domElement);
    }
  }

  /**
   * Gets the data Version of the Webpart
   *
   * @readonly
   * @protected
   * @type {Version}
   * @memberof ReactAggregatedCalendarWebPart
   */
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  /**
   * Initializes the SPFx Property Pane of the Aggregated Calendar Webpart
   *
   * @protected
   * @returns {IPropertyPaneConfiguration}
   * @memberof ReactAggregatedCalendarWebPart
   */
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('header', {
                  label: strings.HeaderFieldLabel
                }),
                PropertyFieldCustomList('calendarList', {
                  label: strings.SelectCalendarLabel,
                  value: this.properties.calendarList,
                  headerText: 'Manage Calendar',
                  fields: [
                    { id: 'CalendarTitle', title: 'Calendar Title', required: true, type: CustomListFieldType.string },
                    { id: 'SiteUrl', title: 'Site Url', required: true, type: CustomListFieldType.string },
                    {
                      id: 'CalendarListTitle', title: 'Calendar List Title', required: true,
                      type: CustomListFieldType.string
                    },
                    { id: 'Color', title: 'Color', required: false, type: CustomListFieldType.color }
                  ],
                  disabled: false,
                  onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                  render: this.render.bind(this),
                  disableReactivePropertyChanges: this.disableReactivePropertyChanges,
                  properties: this.properties,
                  context: this.context,
                  key: 'calendarList'
                }),
                PropertyPaneDropdown('dateFormat', {
                  label: strings.SelectDateFormatFieldLabel,
                  selectedKey: "MMMM Do YYYY, h: mm a",
                  options: this.timeFormat
                }),
                PropertyPaneToggle('showLegend', {
                  label: strings.ShowLegendFieldLabel,
                  onText: strings.OnTextFieldLabel,
                  offText: strings.OffTextFieldLabel,
                  checked: false
                })
              ]
            }
          ]
        }
      ]
    };
  }


  /**
   * Check whether Aggregated Calendar needs configuration
   * or not
   * @private
   * @returns {boolean}
   * @memberof ReactAggregatedCalendarWebPart
   */
  private needsConfiguration(): boolean {
    Log.verbose("needsConfiguration()", "calendarList : " + this.properties.calendarList, this.context.serviceScope);
    return this.properties.calendarList === null ||
      this.properties.calendarList === undefined ||
      this.properties.calendarList.length === 0;
  }
  /**
   * Render Message method to render the message component
   *
   * @private
   * @param {string} statusMessage
   * @param {MessageBarType} statusMessageType
   * @param {boolean} display
   * @memberof ReactAggregatedCalendarWebPart
   */
  private renderMessage(statusMessage: string, statusMessageType: MessageBarType,
    display: boolean): void {
    Log.verbose("renderMessage()", "Rendering Message " + statusMessage + " of type " + statusMessageType, this.context.serviceScope);
    const messageElement: React.ReactElement<IMessageComponentProps> = React.createElement(
      MessageComponent,
      {
        Message: statusMessage,
        Type: statusMessageType,
        Display: display
      }
    );

    ReactDom.render(messageElement, this.domElement);
  }
}
