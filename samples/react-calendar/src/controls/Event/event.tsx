import * as React from 'react';
import styles from './Event.module.scss';
import * as strings from 'CalendarWebPartStrings';
import { IEventProps } from './IEventProps';
import { IEventState } from './IEventState';
import * as moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { PeoplePicker, PrincipalType } from "@pnp/spfx-controls-react/lib/PeoplePicker";
import {
  Panel,
  PanelType,
  TextField,
  Label
} from 'office-ui-fabric-react';
import { IEventData } from '../../services/IEventData';
import { IUserPermissions } from '../../services/IUserPermissions';
import {
  DatePicker,
  IDatePickerStrings,
  Dropdown,
  IDropdownOption,
  DefaultButton,
  PrimaryButton,
  IPersonaProps,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerSize,
  Dialog,
  DialogType,
  DialogFooter,
  Toggle
}
  from 'office-ui-fabric-react';

import { IPanelModelEnum } from './IPanelModeEnum';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import spservices from '../../services/spservices';
import { Map, ICoordinates, MapType } from "@pnp/spfx-controls-react/lib/Map";
import { EventRecurrenceInfo } from '../../controls/EventRecurrenceInfo/EventRecurrenceInfo';
import { getGUID } from '@pnp/common';
import { toLocaleShortDateString } from '../../utils/dateUtils';

const DayPickerStrings: IDatePickerStrings = {
  months: [strings.January, strings.February, strings.March, strings.April, strings.May, strings.June, strings.July, strings.August, strings.September, strings.October, strings.November, strings.December],
  shortMonths: [strings.Jan, strings.Feb, strings.Mar, strings.Apr, strings.May, strings.Jun, strings.Jul, strings.Aug, strings.Sep, strings.Oct, strings.Nov, strings.Dez],
  days: [strings.Sunday, strings.Monday, strings.Tuesday, strings.Wednesday, strings.Thursday, strings.Friday, strings.Saturday],
  shortDays: [strings.ShortDay_S, strings.ShortDay_M, strings.ShortDay_T, strings.ShortDay_W, strings.ShortDay_Thursday, strings.ShortDay_Friday, strings.ShortDay_Sunday],
  goToToday: strings.GoToDay,
  prevMonthAriaLabel: strings.PrevMonth,
  nextMonthAriaLabel: strings.NextMonth,
  prevYearAriaLabel: strings.PrevYear,
  nextYearAriaLabel: strings.NextYear,
  closeButtonAriaLabel: strings.CloseDate,
  isRequiredErrorMessage: strings.IsRequired,
  invalidInputErrorMessage: strings.InvalidDateFormat,
};

export class Event extends React.Component<IEventProps, IEventState> {
  private spService: spservices = null;
  private attendees: IPersonaProps[] = [];
  private latitude: number = 41.1931819;
  private longitude: number = -8.4897452;
  private returnedRecurrenceInfo: { recurrenceData: string, eventDate: Date, endDate: Date } = undefined;

  private categoryDropdownOption: IDropdownOption[] = [];

  public constructor(props) {
    super(props);

    /* geolocation is available */
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;

      });
    } else {
      /* geolocation IS NOT available */
      console.log('browser Geolocation is not available');
    }
    // Initialize Map coordinates

    this.state = {
      showPanel: false,
      eventData: this.props.event,
      startSelectedHour: { key: '09', text: '00' },
      startSelectedMin: { key: '00', text: '00' },
      endSelectedHour: { key: '18', text: '00' },
      endSelectedMin: { key: '00', text: '00' },
      editorState: EditorState.createEmpty(),
      selectedUsers: [],
      locationLatitude: this.latitude,
      locationLongitude: this.longitude,
      hasError: false,
      errorMessage: '',
      disableButton: true,
      isSaving: false,
      displayDialog: false,
      isloading: false,
      siteRegionalSettings: undefined,
      recurrenceSeriesEdited: false,
      showRecurrenceSeriesInfo:false,
      newRecurrenceEvent:false,
      recurrenceAction: 'display',
      userPermissions: { hasPermissionAdd: false, hasPermissionDelete: false, hasPermissionEdit: false, hasPermissionView: false },
    };
    // local copia of props
    this.onStartChangeHour = this.onStartChangeHour.bind(this);
    this.onStartChangeMin = this.onStartChangeMin.bind(this);
    this.onEndChangeHour = this.onEndChangeHour.bind(this);
    this.onEndChangeMin = this.onEndChangeMin.bind(this);
    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.onRenderFooterContent = this.onRenderFooterContent.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelectDateEnd = this.onSelectDateEnd.bind(this);
    this.onSelectDateStart = this.onSelectDateStart.bind(this);
    this.onUpdateCoordinates = this.onUpdateCoordinates.bind(this);
    this.onGetErrorMessageTitle = this.onGetErrorMessageTitle.bind(this);
    this.getPeoplePickerItems = this.getPeoplePickerItems.bind(this);
    this.hidePanel = this.hidePanel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    this.onCategoryChanged = this.onCategoryChanged.bind(this);
    this.onEditRecurrence = this.onEditRecurrence.bind(this);
    this.returnRecurrenceInfo = this.returnRecurrenceInfo.bind(this);
    this.spService = new spservices(this.props.context);
  }
  /**
   *  Hide Panel
   *
   * @private
   * @memberof Event
   */
  private hidePanel() {
    this.props.onDissmissPanel(false);
  }
  /**
   *  Save Event to a list
   * @private
   * @memberof Event
   */
  private async onSave() {

    let eventData: IEventData = this.state.eventData;
    let panelMode = this.props.panelMode;

    let startDate: string = null;
    let endDate: string = null;
    eventData.fRecurrence = false;
    // if there are new Event recurrence or Edited recurrence series
    if (this.state.recurrenceSeriesEdited || this.state.newRecurrenceEvent) {
      eventData.RecurrenceData = this.returnedRecurrenceInfo.recurrenceData;
      startDate = `${moment(this.returnedRecurrenceInfo.eventDate).format('YYYY/MM/DD')}`;
      endDate = `${moment(this.returnedRecurrenceInfo.endDate).format('YYYY/MM/DD')}`;

      if (eventData.EventType == "0" && this.state.newRecurrenceEvent) {
        eventData.EventType = "1";
        eventData.fRecurrence= true;
        eventData.UID = getGUID();
      }
      if (eventData.EventType == "1" && this.state.recurrenceSeriesEdited) {
        eventData.fRecurrence= true;
        eventData.UID = getGUID();
      }

    } else {
      if (this.state.eventData.EventType  == '1'){ // recurrence exception
        eventData.RecurrenceID = eventData.EventDate.toString();
        eventData.MasterSeriesItemID = eventData.ID.toString();
        eventData.EventType = "4";
        eventData.fRecurrence = true;
        eventData.UID = getGUID();
        panelMode = IPanelModelEnum.add;
      }
      startDate = `${moment(this.state.startDate).format('YYYY/MM/DD')}`;
      endDate = `${moment(this.state.endDate).format('YYYY/MM/DD')}`;
    }


    const startTime = `${this.state.startSelectedHour.key}:${this.state.startSelectedMin.key}`;
    const startDateTime = `${startDate} ${startTime}`;
    const start = moment(startDateTime, 'YYYY/MM/DD HH:mm').toLocaleString();
    eventData.EventDate = new Date(start);
    // End Date
    const endTime = `${this.state.endSelectedHour.key}:${this.state.endSelectedMin.key}`;
    const endDateTime = `${endDate} ${endTime}`;
    const end = moment(endDateTime, 'YYYY/MM/DD HH:mm').toLocaleString();
    eventData.EndDate = new Date(end);


    // get Geolocation

    eventData.geolocation = { Latitude: this.latitude, Longitude: this.longitude };
    const locationInfo = await this.spService.getGeoLactionName(this.latitude, this.longitude);
    eventData.location = locationInfo ? locationInfo.display_name : 'N/A';

    // get Attendees
    if (!eventData.attendes) { //vinitialize if no attendees
      eventData.attendes = [];
    }

    // Get Descript from RichText Compoment
    eventData.Description = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()));

    try {
      for (const user of this.attendees) {

        const userInfo: any = await this.spService.getUserByLoginName(user.id, this.props.siteUrl);
        eventData.attendes.push(Number(userInfo.Id));
      }

      this.setState({ isSaving: true });

      switch (panelMode) {
        case IPanelModelEnum.edit:
          await this.spService.updateEvent(eventData, this.props.siteUrl, this.props.listId);
          break;
        case IPanelModelEnum.add:
          await this.spService.addEvent(eventData, this.props.siteUrl, this.props.listId);
          break;
        default:
          break;
      }

      this.setState({ isSaving: false });
      this.props.onDissmissPanel(true);
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message, isSaving: false });
    }
  }

  /**
   *
   * @param {*} error
   * @param {*} errorInfo
   * @memberof Event
   */
  public componentDidCatch(error: any, errorInfo: any) {
    this.setState({ hasError: true, errorMessage: errorInfo.message });
  }

  /**
   *
   *
   * @private
   * @param {number} [eventId]
   * @memberof Event
   */
  private async  renderEventData(eventId?: number) {

    this.setState({ isloading: true });
    const event: IEventData = !eventId ? this.props.event : await this.spService.getEvent(this.props.siteUrl, this.props.listId, eventId);

    let editorState: EditorState;
    // Load Regional Settings
    const siteRegionalSettigns = await this.spService.getSiteRegionalSettingsTimeZone(this.props.siteUrl);
    // chaeck User list Permissions
    const userListPermissions: IUserPermissions = await this.spService.getUserPermissions(this.props.siteUrl, this.props.listId);
    // Load Categories
    this.categoryDropdownOption = await this.spService.getChoiceFieldOptions(this.props.siteUrl, this.props.listId, 'Category');
    // Edit Mode ?
    if (this.props.panelMode == IPanelModelEnum.edit && event) {

      // Get hours of event
      const startHour = moment(event.EventDate).format('HH').toString();
      const startMin = moment(event.EventDate).format('mm').toString();
      const endHour = moment(event.EndDate).format('HH').toString();
      const endMin = moment(event.EndDate).format('mm').toString();

      // Get Descript and covert to RichText Control
      const html = event.Description;
      const contentBlock = htmlToDraft(html);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        editorState = EditorState.createWithContent(contentState);
      }

      // testa  attendees
      const attendees = event.attendes;
      let selectedUsers: string[] = [];
      if (attendees && attendees.length > 0) {
        for (const userId of attendees) {
          let user: any = await this.spService.getUserById(userId, this.props.siteUrl);
          if (user) {
            selectedUsers.push(user.UserPrincipalName);
          }
        }
      }
      // Has geolocation ?
      this.latitude = event.geolocation && event.geolocation.Latitude ? event.geolocation.Latitude : this.latitude;
      this.longitude = event.geolocation && event.geolocation.Longitude ? event.geolocation.Longitude : this.longitude;

      event.geolocation.Latitude = this.latitude;
      event.geolocation.Longitude = this.longitude;
      // Update Component Data
      this.setState({
        eventData: event,
        startDate: event.EventDate,
        endDate: event.EndDate,
        startSelectedHour: { key: startHour, text: startHour },
        startSelectedMin: { key: startMin, text: startMin },
        endSelectedHour: { key: endHour, text: endHour },
        endSelectedMin: { key: endMin, text: endMin },
        editorState: editorState,
        selectedUsers: selectedUsers,
        userPermissions: userListPermissions,
        isloading: false,
        siteRegionalSettings: siteRegionalSettigns,
        locationLatitude: this.latitude,
        locationLongitude: this.longitude,
      });
    } else {
      editorState = EditorState.createEmpty();
      this.setState({
        startDate: this.props.startDate ? this.props.startDate : new Date(),
        endDate: this.props.endDate ? this.props.endDate : new Date(),
        editorState: editorState,
        userPermissions: userListPermissions,
        isloading: false,
        siteRegionalSettings: siteRegionalSettigns,
        eventData: { ...event, EventType: "0" },
      });
    }
  }


  /**
   *
   *
   * @memberof Event
   */
  public async componentDidMount() {


    await this.renderEventData();
  }



  /**
   * @private
   * @memberof Event
   */
  private onStartChangeHour = (ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    this.setState({ startSelectedHour: item });
  }

  /**
   * @private
   * @memberof Event
   */
  private onEndChangeHour = (ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {

    this.setState({ endSelectedHour: item });
  }

  /**
   * @private
   * @memberof Event
   */
  private onStartChangeMin = (ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {

    this.setState({ startSelectedMin: item });
  }

  /**
   * @private
   * @param {any[]} items
   * @memberof Event
   */
  private getPeoplePickerItems(items: any[]) {

    this.attendees = [];
    this.attendees = items;
  }

  /**
   *
   * @private
   * @param {*} editorState
   * @memberof Event
   */
  private onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
  }

  /**
   *
   * @private
   * @param {string} value
   * @returns {string}
   * @memberof Event
   */
  private onGetErrorMessageTitle(value: string): string {
    let returnMessage: string = '';
    if (value.length === 0) {
      returnMessage = strings.EventTitleErrorMessage;
    } else {
      this.setState({ eventData: { ...this.state.eventData, title: value }, disableButton: false, errorMessage: '' });
    }
    return returnMessage;
  }
  /**
   *
   * @private
   * @memberof Event
   */
  private onEndChangeMin(ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    this.setState({ endSelectedMin: item });
  }

  /**
   *
   * @private
   * @param {React.FormEvent<HTMLDivElement>} ev
   * @param {IDropdownOption} item
   * @memberof Event
   */
  private onCategoryChanged(ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void {

    this.setState({ eventData: { ...this.state.eventData, Category: item.text } });
  }

  /**
   *
   * @private
   * @param {React.MouseEvent<HTMLDivElement>} event
   * @memberof Event
   */
  private onDelete(ev: React.MouseEvent<HTMLDivElement>) {
    ev.preventDefault();
    this.setState({ displayDialog: true });
  }

  /**
   *
   * @private
   * @param {React.MouseEvent<HTMLDivElement>} event
   * @memberof Event
   */
  private closeDialog(ev: React.MouseEvent<HTMLDivElement>) {
    ev.preventDefault();
    this.setState({ displayDialog: false });
  }

  /**
   *
   *
   * @private
   * @param {React.MouseEvent<HTMLDivElement>} ev
   * @memberof Event
   */
  private async confirmDelete(ev: React.MouseEvent<HTMLDivElement>) {
    ev.preventDefault();
    try {
      this.setState({ isDeleting: true });

      switch (this.props.panelMode) {
        case IPanelModelEnum.edit:
          await this.spService.deleteEvent(this.state.eventData, this.props.siteUrl, this.props.listId, this.state.recurrenceSeriesEdited);
          break;
        default:
          break;
      }
      this.setState({ isDeleting: false });
      this.props.onDissmissPanel(true);
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message, isDeleting: false, displayDialog:false });
    }
  }

  /**
   * @private
   * @returns
   * @memberof Event
   */
  private onRenderFooterContent() {
    return (
      <div >
        <DefaultButton onClick={this.hidePanel} style={{ marginBottom: '15px', float: 'right' }}>
          {strings.CancelButtonLabel}
        </DefaultButton>
        {
          this.props.panelMode == IPanelModelEnum.edit && this.state.userPermissions.hasPermissionDelete && (
            <DefaultButton

              onClick={this.onDelete}
              style={{ marginBottom: '15px', marginRight: '8px', float: 'right' }}>
              {strings.DeleteButtonLabel}
            </DefaultButton>
          )
        }
        {
          (this.state.userPermissions.hasPermissionAdd || this.state.userPermissions.hasPermissionEdit) &&
          <PrimaryButton
            disabled={this.state.disableButton}
            onClick={this.onSave}
            style={{ marginBottom: '15px', marginRight: '8px', float: 'right' }}>
            {strings.SaveButtonLabel}
          </PrimaryButton>

        }
        {
          this.state.isSaving &&
          <Spinner size={SpinnerSize.medium} style={{ marginBottom: '15px', marginRight: '8px', float: 'right' }} />
        }
      </div>
    );
  }

  /**
   *
   * @private
   * @param {Date} newDate
   * @memberof Event
   */
  private onSelectDateStart(newDate: Date) {
    this.setState({ startDate: newDate });
  }

  /**
   * @private
   * @param {Date} newDate
   * @memberof Event
   */
  private onSelectDateEnd(newDate: Date) {
    this.setState({ endDate: newDate });
  }



  /**
   *
   * @private
   * @param {ICoordinates} coordinates
   * @memberof Event
   */
  private async onUpdateCoordinates(coordinates: ICoordinates) {
    this.latitude = coordinates.latitude;
    this.longitude = coordinates.longitude;
    const locationInfo = await this.spService.getGeoLactionName(this.latitude, this.longitude);
    this.setState({ eventData: { ...this.state.eventData, location: locationInfo.display_name } });
  }

  /**
   *
   *
   * @private
   * @param {React.MouseEvent<HTMLButtonElement>} ev
   * @memberof Event
   */
  private async onEditRecurrence(ev: React.MouseEvent<HTMLButtonElement>) {
    ev.preventDefault();
    // EventType = 4 Recurrence Exception
    await this.renderEventData(this.state.eventData.EventType == '4' ? Number(this.state.eventData.MasterSeriesItemID) : this.state.eventData.Id);
    this.setState({ showRecurrenceSeriesInfo: true, recurrenceSeriesEdited: true });
  }

  /**
   *
   *
   * @param {Date} startDate
   * @param {string} recurrenceData
   * @memberof Event
   */
  public async returnRecurrenceInfo(startDate: Date, recurrenceData: string) {
    this.returnedRecurrenceInfo = { recurrenceData: recurrenceData, eventDate: startDate, endDate: moment().add(20, 'years').toDate() };
    //this.setState({ editRecurrenceSeries:false})
    //console.log(this.returnedRecurrenceInfo);
  }

  /**
   *
   *
   * @returns {React.ReactElement<IEventProps>}
   * @memberof Event
   */
  public render(): React.ReactElement<IEventProps> {

    const { editorState } = this.state;
    return (
      <div>
        <Panel
          isOpen={this.props.showPanel}
          onDismiss={this.hidePanel}
          type={PanelType.medium}
          headerText={strings.EventPanelTitle}
          isFooterAtBottom={true}
          onRenderFooterContent={this.onRenderFooterContent}
        >
          <div style={{ width: '100%' }}>
            {
              this.state.hasError &&
              <MessageBar messageBarType={MessageBarType.error}>
                {this.state.errorMessage}
              </MessageBar>
            }
            {
              this.state.isloading && (
                <Spinner size={SpinnerSize.large} />
              )
            }
            {
              !this.state.isloading &&
              <div>
                {
                  (this.state.eventData && (this.state.eventData.EventType !== "0" && this.state.showRecurrenceSeriesInfo !== true)) ?
                  <div>
                      <h2 style={{ display: 'inline-block', verticalAlign: 'top' }}>{ strings.recurrenceEventLabel }</h2>
                      <DefaultButton
                        style={{ display: 'inline-block', marginLeft: '330px', verticalAlign: 'top', width: 'auto' }}
                        iconProps={{ iconName: 'RecurringEvent' }}
                        allowDisabledFocus={true}
                        onClick={this.onEditRecurrence}
                      >
                        { strings.editRecurrenceSeries }
                     </DefaultButton>

                    </div>
                    : ''
                }
                <div style={{ marginTop: 10 }} >
                  <TextField
                    label={strings.EventTitleLabel}
                    value={this.state.eventData ? this.state.eventData.title : ''}
                    onGetErrorMessage={this.onGetErrorMessageTitle}
                    deferredValidationTime={500}
                    disabled={this.state.userPermissions.hasPermissionAdd || this.state.userPermissions.hasPermissionEdit ? false : true}
                  />

                </div>
                <div>
                  <Dropdown
                    label={strings.CategoryLabel}
                    selectedKey={this.state.eventData && this.state.eventData.Category ? this.state.eventData.Category : ''}
                    onChange={this.onCategoryChanged}
                    options={this.categoryDropdownOption}
                    placeholder={strings.CategoryPlaceHolder}
                    disabled={this.state.userPermissions.hasPermissionAdd || this.state.userPermissions.hasPermissionEdit ? false : true}
                  />
                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'top', paddingRight: 10 }}>
                  <DatePicker
                    isRequired={false}
                    strings={DayPickerStrings}
                    placeholder={strings.StartDatePlaceHolder}
                    ariaLabel={strings.StartDatePlaceHolder}
                    allowTextInput={true}
                    value={this.state.startDate}
                    label={strings.StartDateLabel}
                    onSelectDate={this.onSelectDateStart}
                    formatDate={toLocaleShortDateString}
                    disabled={this.state.userPermissions.hasPermissionAdd || this.state.userPermissions.hasPermissionEdit ? false : true}
                    hidden={this.state.showRecurrenceSeriesInfo}
                  />
                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'top', paddingRight: 10 }}>
                  <Dropdown
                    selectedKey={this.state.startSelectedHour.key}
                    onChange={this.onStartChangeHour}
                    label={strings.StartHourLabel}
                    disabled={this.state.userPermissions.hasPermissionAdd || this.state.userPermissions.hasPermissionEdit ? false : true}
                    options={[
                      { key: '00', text: '00' },
                      { key: '01', text: '01' },
                      { key: '02', text: '02' },
                      { key: '03', text: '03' },
                      { key: '04', text: '04' },
                      { key: '05', text: '05' },
                      { key: '06', text: '06' },
                      { key: '07', text: '07' },
                      { key: '08', text: '08' },
                      { key: '09', text: '09' },
                      { key: '10', text: '10' },
                      { key: '11', text: '11' },
                      { key: '12', text: '12' },
                      { key: '13', text: '13' },
                      { key: '14', text: '14' },
                      { key: '15', text: '15' },
                      { key: '16', text: '16' },
                      { key: '17', text: '17' },
                      { key: '18', text: '18' },
                      { key: '19', text: '19' },
                      { key: '20', text: '20' },
                      { key: '21', text: '21' },
                      { key: '22', text: '22' },
                      { key: '23', text: '23' }
                    ]}
                  />
                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'top', }}>
                  <Dropdown
                    label={strings.StartMinLabel}
                    selectedKey={this.state.startSelectedMin.key}
                    onChange={this.onStartChangeMin}
                    disabled={this.state.userPermissions.hasPermissionAdd || this.state.userPermissions.hasPermissionEdit ? false : true}
                    options={[
                      { key: '00', text: '00' },
                      { key: '05', text: '05' },
                      { key: '10', text: '10' },
                      { key: '15', text: '15' },
                      { key: '20', text: '20' },
                      { key: '25', text: '25' },
                      { key: '30', text: '30' },
                      { key: '35', text: '35' },
                      { key: '40', text: '40' },
                      { key: '45', text: '45' },
                      { key: '50', text: '50' },
                      { key: '55', text: '55' }
                    ]}
                  />
                </div>
                <br />
                <div style={{ display: 'inline-block', verticalAlign: 'top', paddingRight: 10 }}>
                  <DatePicker
                    isRequired={false}
                    strings={DayPickerStrings}
                    placeholder={strings.EndDatePlaceHolder}
                    ariaLabel={strings.EndDatePlaceHolder}
                    allowTextInput={true}
                    value={this.state.endDate}
                    label={strings.EndDateLabel}
                    onSelectDate={this.onSelectDateEnd}
                    formatDate={toLocaleShortDateString}
                    disabled={this.state.userPermissions.hasPermissionAdd || this.state.userPermissions.hasPermissionEdit ? false : true}
                    hidden={this.state.showRecurrenceSeriesInfo}
                  />
                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'top', paddingRight: 10 }}>
                  <Dropdown
                    selectedKey={this.state.endSelectedHour.key}
                    onChange={this.onEndChangeHour}
                    label={strings.EndHourLabel}
                    disabled={this.state.userPermissions.hasPermissionAdd || this.state.userPermissions.hasPermissionEdit ? false : true}
                    options={[
                      { key: '00', text: '00' },
                      { key: '01', text: '01' },
                      { key: '02', text: '02' },
                      { key: '03', text: '03' },
                      { key: '04', text: '04' },
                      { key: '05', text: '05' },
                      { key: '06', text: '06' },
                      { key: '07', text: '07' },
                      { key: '08', text: '08' },
                      { key: '09', text: '09' },
                      { key: '10', text: '10' },
                      { key: '11', text: '11' },
                      { key: '12', text: '12' },
                      { key: '13', text: '13' },
                      { key: '14', text: '14' },
                      { key: '15', text: '15' },
                      { key: '16', text: '16' },
                      { key: '17', text: '17' },
                      { key: '18', text: '18' },
                      { key: '19', text: '19' },
                      { key: '20', text: '20' },
                      { key: '21', text: '21' },
                      { key: '22', text: '22' },
                      { key: '23', text: '23' }
                    ]}
                  />
                </div>
                <div style={{ display: 'inline-block', verticalAlign: 'top', }}>
                  <Dropdown
                    label={strings.EndMinLabel}
                    selectedKey={this.state.endSelectedMin.key}
                    onChange={this.onEndChangeMin}
                    disabled={this.state.userPermissions.hasPermissionAdd || this.state.userPermissions.hasPermissionEdit ? false : true}
                    options={[
                      { key: '00', text: '00' },
                      { key: '05', text: '05' },
                      { key: '10', text: '10' },
                      { key: '15', text: '15' },
                      { key: '20', text: '20' },
                      { key: '25', text: '25' },
                      { key: '30', text: '30' },
                      { key: '35', text: '35' },
                      { key: '40', text: '40' },
                      { key: '45', text: '45' },
                      { key: '50', text: '50' },
                      { key: '55', text: '55' },
                      { key: '59', text: '59' }
                    ]}
                  />
                </div>
                <Label>{this.state.siteRegionalSettings ? this.state.siteRegionalSettings.Description : ''}</Label>
                <br />
                {

                  this.state.eventData && (this.state.eventData.EventType == "0") ?
                    <div style={{ display: 'inline-block', verticalAlign: 'top', width: '200px' }}>
                      <Toggle
                        defaultChecked={false}
                        inlineLabel={true}
                        label={ strings.ifRecurrenceLabel }
                        onText={ strings.onLabel }
                        offText={ strings.offLabel }
                        onChange={(ev, checked: boolean) => {
                          ev.preventDefault();
                          this.setState({ showRecurrenceSeriesInfo: checked, newRecurrenceEvent: checked });
                        }}
                      />
                    </div>
                    :
                    ''
                }

                {
                  this.state.showRecurrenceSeriesInfo && (
                    <EventRecurrenceInfo
                      context={this.props.context}
                      display={true}
                      recurrenceData={this.state.eventData.RecurrenceData}
                      startDate={this.state.startDate}
                      siteUrl={this.props.siteUrl}
                      returnRecurrenceData={this.returnRecurrenceInfo}
                    >

                    </EventRecurrenceInfo>
                  )
                }

                < Label > {strings.eventDescriptionLabel }</Label>

                <div className={styles.description}>
                  <Editor
                    editorState={editorState}
                    onEditorStateChange={this.onEditorStateChange}
                    ReadOnly={this.state.userPermissions.hasPermissionAdd || this.state.userPermissions.hasPermissionEdit ? false : true}
                  />
                </div>
                <div>
                  <PeoplePicker

                    webAbsoluteUrl={this.props.siteUrl}
                    context={this.props.context}
                    titleText={strings.AttendeesLabel}
                    principalTypes={[PrincipalType.User]}
                    resolveDelay={1000}
                    showtooltip={true}
                    selectedItems={this.getPeoplePickerItems}
                    personSelectionLimit={10}
                    defaultSelectedUsers={this.state.selectedUsers}
                    disabled={this.state.userPermissions.hasPermissionAdd || this.state.userPermissions.hasPermissionEdit ? false : true}
                  />
                </div>
                <div>
                  <TextField
                    value={this.state.eventData && this.state.eventData.location ? this.state.eventData.location : ''}
                    label={strings.LocationTextLabel}
                    readOnly
                    multiline />
                </div>
                <div>
                  <Map titleText={strings.LocationLabel}
                    coordinates={{ latitude: this.state.locationLatitude, longitude: this.state.locationLongitude }}
                    enableSearch={this.state.userPermissions.hasPermissionAdd || this.state.userPermissions.hasPermissionEdit ? true : false}
                    onUpdateCoordinates={this.onUpdateCoordinates}
                  />
                </div>
              </div>
            }
          </div>
          {
            this.state.displayDialog &&
            <div>
              <Dialog
                hidden={!this.state.displayDialog}
                dialogContentProps={{
                  type: DialogType.normal,
                  title: strings.DialogConfirmDeleteTitle,
                  showCloseButton: false
                }}
                modalProps={{
                  isBlocking: true,
                  styles: { main: { maxWidth: 450 } }
                }}
              >
                <Label >{strings.ConfirmeDeleteMessage}</Label>
                {
                  this.state.isDeleting &&
                  <Spinner size={SpinnerSize.medium} ariaLabel={strings.SpinnerDeletingLabel} />
                }
                <DialogFooter>
                  <PrimaryButton onClick={this.confirmDelete} text={strings.DialogConfirmDeleteLabel} disabled={this.state.isDeleting} />
                  <DefaultButton onClick={this.closeDialog} text={strings.DialogCloseButtonLabel} />
                </DialogFooter>
              </Dialog>
            </div>

          }

        </Panel>
      </div>
    );
  }
}
