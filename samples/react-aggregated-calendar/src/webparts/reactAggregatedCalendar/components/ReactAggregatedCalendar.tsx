import * as React from 'react';
import * as $ from 'jquery';
import * as moment from 'moment';
import 'fullcalendar';
import styles from './ReactAggregatedCalendar.module.scss';
import { IReactAggregatedCalendarProps } from './IReactAggregatedCalendarProps';
import { EnvironmentType, Environment } from '@microsoft/sp-core-library';
import { AggregatedCalendarService } from '../service/AggregatedCalendarService';
import { AggregatedCalendarMockService } from '../service/AggregatedCalendarMockService';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import * as strings from 'ReactAggregatedCalendarWebPartStrings';
import { FullCalendarEvent } from '../model/FullCalendarEvent';
import { DirectionalHint, Callout } from 'office-ui-fabric-react/lib/Callout';
import { Label } from 'office-ui-fabric-react/lib/Label';

/**
 * Interface for maintaining ReactAggregatedCalendar webpart state
 *
 * @export
 * @interface IReactAggregatedCalendarState
 */
export interface IReactAggregatedCalendarState {
  isCalloutVisible?: boolean;
  selectedEvent: FullCalendarEvent;
  directionalHint?: DirectionalHint;
  isBeakVisible?: boolean;
  gapSpace?: number;
  beakWidth?: number;
  EventElement: HTMLElement;
}

/**
 * React Component for ReactAggregatedCalendar Webpart
 *
 * @export
 * @class ReactAggregatedCalendar
 * @extends {React.Component<IReactAggregatedCalendarProps, IReactAggregatedCalendarState>}
 */
export default class ReactAggregatedCalendar
  extends React.Component<IReactAggregatedCalendarProps, IReactAggregatedCalendarState> {

  /**
   *Creates an instance of ReactAggregatedCalendar.
   * @param {IReactAggregatedCalendarProps} props
   * @memberof ReactAggregatedCalendar
   */
  public constructor(props: IReactAggregatedCalendarProps) {
    super(props);

    this.onCalloutDismiss = this.onCalloutDismiss.bind(this);
    this.eventClickHandler = this.eventClickHandler.bind(this);

    // Initialize the State for ReactAggregatedCalendar
    this.state = {
      isCalloutVisible: false,
      selectedEvent: {
        id: 0,
        title: '',
        color: '',
        start: moment(),
        end: moment(),
        description: '',
        location: '',
        allDay: false,
        category: ''
      },
      directionalHint: DirectionalHint.bottomCenter,
      isBeakVisible: true,
      gapSpace: 10,
      beakWidth: 20,
      EventElement: null
    };
  }

  /**
   * componentDidMount
   *
   * @memberof ReactAggregatedCalendar
   */
  public componentDidMount() {
    this.renderContents();
  }

  /**
   * componentDidUpdate
   *
   * @memberof ReactAggregatedCalendar
   */
  public componentDidUpdate() {
    this.renderContents();
  }
  /**
   * Render method for the ReactAggregatedCalendar React Component
   *
   * @returns {React.ReactElement<IReactAggregatedCalendarProps>}
   * @memberof ReactAggregatedCalendar
   */
  public render(): React.ReactElement<IReactAggregatedCalendarProps> {
    const { isCalloutVisible } = this.state;
    let calendarLegend: JSX.Element[] = ([]);

    // Render the Legend for the Calendar Events
    calendarLegend = this.props.selectedCalendarLists.map((calendar) => {
      let calendarLegendColor = {
        'background-color': `${calendar.Color}`
      };
      return (
        <div className={styles.outerLegendDiv} title={calendar.CalendarTitle}>
          <div className={styles.innerLegendDiv} style={calendarLegendColor}>
          </div>
          {calendar.CalendarTitle}
        </div>
      );
    });

    // Render the FullCalendar container
    return (
      <div className={styles.reactAggregatedCalendar}>
        <h1>{this.props.header}</h1>
        <div >
          <div>
            <div>
              <div id="aggregatedCalendarComp">
              </div>
              {
                this.props.showLegend &&
                <div className={styles.legend}>
                  {calendarLegend}
                </div>
              }
            </div>
          </div>
        </div>

        {isCalloutVisible && (
          <Callout
            className="ms-CalloutExample"
            ariaLabelledBy={'callout-label-1'}
            ariaDescribedBy={'callout-description-1'}
            role={'alertdialog'}
            target={this.state.EventElement}
            onDismiss={this.onCalloutDismiss}
            gapSpace={this.state.gapSpace}
            isBeakVisible={this.state.isBeakVisible}
            beakWidth={this.state.beakWidth}
            directionalHint={this.state.directionalHint}
            setInitialFocus={true}>
            <button onClick={this.onCalloutDismiss}
              className={css(styles.msCalloutclose, styles.closeIconFocus, 'ms-fontColor-white')} >
              <i className="ms-Icon ms-Icon--Clear"></i>
            </button>
            <div className={css(styles.msCalloutheader, 'ms-fontColor-white')}>
              <p className={styles.msCallouttitle}>{this.state.selectedEvent.title}</p>
            </div>
            <div className={css(styles.msCalloutinner, styles.calloutInnerEventContent)}>
              <div className="ms-Callout-content">
                <p className={styles.msCalloutsubText} dangerouslySetInnerHTML={this.createMarkup(this.state.selectedEvent.description)} />
                <p className={styles.msCalloutsubText}>
                  <Label>{strings.StartTimeLabel}{this.state.selectedEvent.start.format(this.props.dateFormat)} </Label>
                  {
                    this.state.selectedEvent.end !== null &&
                    <Label>{strings.EndTimeLabel} {this.state.selectedEvent.end.format(this.props.dateFormat)}</Label>
                  }
                  {
                    this.state.selectedEvent.location !== '' &&
                    <Label>{strings.LocationLabel}{this.state.selectedEvent.location}</Label>
                  }
                  {
                    this.state.selectedEvent.category !== '' &&
                    <Label>{strings.CategoryLabel}{this.state.selectedEvent.category}</Label>
                  }
                </p>
              </div>
            </div>
          </Callout>
        )}
      </div>
    );
  }

  /**
   * Render the Full Calendar Plugin
   *
   * @private
   * @memberof ReactAggregatedCalendar
   */
  private renderContents() {
    let containerEl: JQuery = $('#aggregatedCalendarComp');
    let eventSourcesArray: any[] = [];
    const dataService = (Environment.type === EnvironmentType.Test
      || Environment.type === EnvironmentType.Local) ? new AggregatedCalendarMockService() :
      this.props.context.serviceScope.consume(AggregatedCalendarService.serviceKey);
    console.log(this.props.selectedCalendarLists);
    this.props.selectedCalendarLists.forEach((calendarData) => {
      const calendarRestApi: string = calendarData.SiteUrl.trim()
        + '/_api/Web/Lists/GetByTitle(\'' + calendarData.CalendarListTitle.trim() + '\')/items';

      eventSourcesArray.push({
        events: ((start: moment.Moment, end: moment.Moment, timezone, callback) => {
          const startDate = start.format('YYYY-MM-DD');
          const endDate = end.format('YYYY-MM-DD');
          dataService.getEventsForCalendar(calendarRestApi, calendarData.Color, startDate, endDate)
            .then((response: FullCalendarEvent[]) => {
              callback(response);
            });
        })
      });
    });
    containerEl.fullCalendar({
      timezone: 'local',
      header: {
        left: 'prev,next today',
        center: 'title'
      },
      defaultDate: new Date(),
      navLinks: true,
      editable: true,
      eventLimit: true,
      eventSources: eventSourcesArray,
      eventClick: this.eventClickHandler
    });
  }

  /**
   * Click Event handler when the event is clicked on the Calendar
   * Display the Callout function to display event details
   * @private
   * @param {*} eventObj
   * @param {*} jsEvent
   * @param {*} view
   * @memberof ReactAggregatedCalendar
   */
  private eventClickHandler(eventObj: any, jsEvent: any, view: any) {

    this.setState(() => {
      return {
        isCalloutVisible: !this.state.isCalloutVisible,
        selectedEvent: {
          id: eventObj.id,
          title: eventObj.title,
          color: eventObj.color,
          start: moment(eventObj.start),
          end: moment(eventObj.end),
          description: eventObj.description,
          location: eventObj.location,
          allDay: eventObj.allDay,
          category: eventObj.category
        },
        EventElement: jsEvent.toElement
      };
    });
  }

  /**
  * Hide the call out component on close
  *
  * @private
  * @memberof ReactAggregatedCalendar
  */
  private onCalloutDismiss() {
    this.setState({
      isCalloutVisible: false
    });
  }

  /**
   * Create markup for rendering HTML on react component
   *
   * @private
   * @returns
   * @memberof ReactAggregatedCalendar
   */
  private createMarkup(description: string) {
    return { __html: description };
  }

}
