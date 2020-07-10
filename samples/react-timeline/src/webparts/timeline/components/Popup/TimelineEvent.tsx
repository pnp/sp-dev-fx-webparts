import * as React from 'react';
import styles from './timelineEvent.module.scss';
import * as strings from 'TimelineWebPartStrings';
import { IEventProps } from './ITimeLineEventProps';
import { IEventState } from './ITimeLineEventState';
import { ITimelineActivity } from '../../../../models/ITimelineActivity';
import {
  TextField,
  Label,
  DatePicker,
  IDatePickerStrings,
  Dropdown,
  IDropdownOption,
  DefaultButton,
  PrimaryButton,
  Dialog,
  DialogType,
  DialogFooter
} from 'office-ui-fabric-react';
import * as moment from 'moment';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IPanelModelEnum } from './IPanelModeEnum';
import TimelineService from "../../../../services/TimelineService";

const DayPickerStrings: IDatePickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
  isRequiredErrorMessage: 'Start date is required.',
  invalidInputErrorMessage: 'Invalid date format.'
};

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '160px'
  },
});

export class TimelineEvent extends React.Component<IEventProps, IEventState> {
  private TimelineService: TimelineService = null;

  public constructor(props) {
    super(props);

    this.state = {
      showPanel: false,
      eventData: this.props.event,
      startSelectedHour: { key: '00', text: '00' },
      startSelectedMin: { key: '00', text: '00' },
      activityTitle: null,
      activityLink: null,
      acivityDate: new Date(),
      activityPictureUrl: null,
      activityDescription: null,
      hasError: false,
      errorMessage: '',
      disableButton: false,
      isSaving: false,
      displayDialog: false,
      isloading: false,
    };

    this.TimelineService = new TimelineService(this.props.context);
    this.onStartChangeHour = this.onStartChangeHour.bind(this);
    this.onStartChangeMin = this.onStartChangeMin.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
    this.onSave = this.onSave.bind(this);
    this.onSelectDateStart = this.onSelectDateStart.bind(this);
    this.onGetErrorMessageTitle = this.onGetErrorMessageTitle.bind(this);
    this.hidePanel = this.hidePanel.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
    this._onEventTitleChange = this._onEventTitleChange.bind(this);
    this._onActivityPictureURLChange = this._onActivityPictureURLChange.bind(this);
  }

  private hidePanel() {
    this.props.onDissmissPanel(true);
  }

  private async onSave() {
    let eventData: ITimelineActivity = this.state.eventData;
    let panelMode = this.props.panelMode;
    let startDate: string = null;
    startDate = `${moment(this.state.acivityDate).format('YYYY/MM/DD')}`;
    const startTime = `${this.state.startSelectedHour.key}:${this.state.startSelectedMin.key}`;
    const startDateTime = `${startDate} ${startTime}`;
    const start = moment(startDateTime, 'YYYY/MM/DD HH:mm').toLocaleString();
    eventData.acivityDate = new Date(start);
    eventData.activityDescription = this.state.activityDescription;
    eventData.activityLink = this.state.eventData.activityLink;

    try {
      this.setState({ isSaving: true });

      switch (panelMode) {
        case IPanelModelEnum.edit:
          await this.TimelineService.updateTimelineActivity(
            this.props.listName,
            eventData
          ).then((value: any) => { this.props.onDissmissPanel(true); });
          break;
        case IPanelModelEnum.add:
          await this.TimelineService.addTimelineActivity(this.props.listName, eventData).then((value: any) => { this.props.onDissmissPanel(true); });
          break;
        default:
          break;
      }

      this.setState({ isSaving: false });
    }
    catch (error) {
      this.setState({ hasError: true, errorMessage: error.message, isSaving: false });
    }
  }

  public componentDidCatch(error: any, errorInfo: any) {
    this.setState({ hasError: true, errorMessage: errorInfo.message });
  }

  private async renderEventData(eventId?: number) {
    this.setState({ isloading: true });
    const event: ITimelineActivity = !eventId ? this.props.event : await this.TimelineService.getTimelineActivity('Timeline', eventId);

    if (this.props.panelMode == IPanelModelEnum.edit && event) {
      // Get hours of event
      const startHour = moment(event.acivityDate).format('HH').toString();
      const startMin = moment(event.acivityDate).format("mm").toString();
      let timeLineDate: Date = moment(event.acivityDate).toDate();

      // Update Component Data
      this.setState({
        eventData: event,
        acivityDate: timeLineDate,
        startSelectedHour: { key: startHour, text: startHour },
        startSelectedMin: { key: startMin, text: startMin },
        activityDescription: event.activityDescription,
        activityTitle: event.activityTitle,
        activityLink: event.activityLink,
        activityPictureUrl: event.activityPictureUrl,
        isloading: false
      });
    }
    else {
      this.setState({
        acivityDate: new Date(),
        activityDescription: '',
        activityTitle: '',
        activityLink: '',
        activityPictureUrl: '',
        isloading: false,
        eventData: { ...event },
      });
    }
  }

  public async componentDidMount() {
    await this.renderEventData();
  }

  private onStartChangeHour = (ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    this.setState({ startSelectedHour: item });
  }

  private _onEventTitleChange = (ev: any, newText: string): void => {
    this.setState({ eventData: { ...this.state.eventData, activityTitle: newText } });
  }

  private _onActivityPictureURLChange = (ev: any, newText: string): void => {
    this.setState({ eventData: { ...this.state.eventData, activityPictureUrl: newText } });
  }

  private _onActivityLinkURLChange = (ev: any, newText: string): void => {
    this.setState({ eventData: { ...this.state.eventData, activityLink: newText } });
  }

  private onStartChangeMin = (ev: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    this.setState({ startSelectedMin: item });
  }

  private onDescriptionChange = (e): void => {
    this.setState({ activityDescription: e.target.value });
  }

  private onGetErrorMessageTitle(value: string): string {
    let returnMessage: string = '';

    if (value.length === 0) {
      returnMessage = "Error";
    }
    else {
      this.setState({ eventData: { ...this.state.eventData, activityTitle: value }, disableButton: false, errorMessage: '' });
    }
    return returnMessage;
  }

  private onDelete(ev: React.MouseEvent<HTMLDivElement>) {
    ev.preventDefault();
    this.setState({ displayDialog: true });
  }

  private closeDialog = (): void => {
    this.setState({ displayDialog: false });
  }

  private onSelectDateStart(newDate: Date) {
    this.setState({ acivityDate: newDate });
  }

  public render(): React.ReactElement<IEventProps> {
    return (
      <div>
        <Dialog
          isOpen={this.props.showPanel}
          closeButtonAriaLabel={strings.CloseLabel}
          dialogContentProps={{
            type: DialogType.normal,
            title:
              this.props.panelMode == 2
                ? strings.EditEventLabel
                : strings.AddEventLabel,
            showCloseButton: true,
          }}
          onDismiss={this.hidePanel}
          modalProps={{
            className: styles.dialogOverride
          }}
        >
          <div>
            <TextField
              label={strings.TitleLabel}
              required
              value={
                this.state.eventData
                  ? this.state.eventData.activityTitle
                  : ""
              }
              deferredValidationTime={500}
              onChange={this._onEventTitleChange}
            />
          </div>
          <Label>
            {strings.DateLabel}
          </Label>
          
          <div
            style={{
              display: "inline-block",
              verticalAlign: "top",
              paddingRight: 10,
            }}
          >
            <DatePicker
              isRequired={true}
              className={controlClass.control}
              strings={DayPickerStrings}
              allowTextInput={true}
              value={this.state.acivityDate}
              onSelectDate={this.onSelectDateStart}
              showMonthPickerAsOverlay={false}
              isMonthPickerVisible={false}
              showGoToToday={false}
            />
          </div>
          <React.Fragment>
            <div
              style={{
                display: "inline-block",
                verticalAlign: "top",
                paddingRight: 10,
              }}
            >
              <Dropdown
                selectedKey={this.state.startSelectedHour.key}
                onChange={this.onStartChangeHour}
                dropdownWidth={75}
                options={[
                  { key: "00", text: "00" },
                  { key: "01", text: "01" },
                  { key: "02", text: "02" },
                  { key: "03", text: "03" },
                  { key: "04", text: "04" },
                  { key: "05", text: "05" },
                  { key: "06", text: "06" },
                  { key: "07", text: "07" },
                  { key: "08", text: "08" },
                  { key: "09", text: "09" },
                  { key: "10", text: "10" },
                  { key: "11", text: "11" },
                  { key: "12", text: "12" },
                  { key: "13", text: "13" },
                  { key: "14", text: "14" },
                  { key: "15", text: "15" },
                  { key: "16", text: "16" },
                  { key: "17", text: "17" },
                  { key: "18", text: "18" },
                  { key: "19", text: "19" },
                  { key: "20", text: "20" },
                  { key: "21", text: "21" },
                  { key: "22", text: "22" },
                  { key: "23", text: "23" },
                ]}
              />
            </div>
            <div
              style={{
                display: "inline-block",
                verticalAlign: "top",
                paddingRight: 10,
              }}
            >
              <Dropdown
                selectedKey={this.state.startSelectedMin.key}
                onChange={this.onStartChangeMin}
                options={[
                  { key: "00", text: "00" },
                  { key: "05", text: "05" },
                  { key: "10", text: "10" },
                  { key: "15", text: "15" },
                  { key: "20", text: "20" },
                  { key: "25", text: "25" },
                  { key: "30", text: "30" },
                  { key: "35", text: "35" },
                  { key: "40", text: "40" },
                  { key: "45", text: "45" },
                  { key: "50", text: "50" },
                  { key: "55", text: "55" },
                ]}
              />
            </div>
          </React.Fragment>

          <div>
            <TextField
              label={strings.DescriptionLabel}
              value={this.state.activityDescription} onChange={this.onDescriptionChange}
              multiline
            />
          </div>
          <div>
            <TextField
              label={strings.PictureURLLabel}
              value={
                this.state.eventData
                  ? this.state.eventData.activityPictureUrl ? this.state.eventData.activityPictureUrl["Url"] : ''
                  : ""
              }
              deferredValidationTime={500}
              onChange={this._onActivityPictureURLChange}
            />
          </div>
          <div>
            <TextField
              label={strings.LinkURLLabel}
              value={
                this.state.eventData
                  ? this.state.eventData.activityLink ? this.state.eventData.activityLink["Url"] : ''
                  : ""
              }
              deferredValidationTime={500}
              onChange={this._onActivityLinkURLChange}
            />
          </div>
          <DialogFooter>
            <PrimaryButton onClick={this.onSave} text={this.props.panelMode == 2 ? strings.UpdateEventLabel : strings.AddEventLabel} />
            <DefaultButton onClick={this.hidePanel} text="Cancel" />
          </DialogFooter>
        </Dialog>
      </div>
    );
  }
}
