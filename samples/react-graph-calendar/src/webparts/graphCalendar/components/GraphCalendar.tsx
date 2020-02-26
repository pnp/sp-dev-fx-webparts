import * as React from 'react';
import { createRef } from "office-ui-fabric-react/lib/Utilities";
import styles from './GraphCalendar.module.scss';
import { IGraphCalendarProps } from './IGraphCalendarProps';
import { MSGraphClient } from "@microsoft/sp-http";
import FullCalendar from '@fullcalendar/react';
import { EventInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import * as moment from 'moment-timezone';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';

interface IGraphCalendarState {
  events: EventInput[];
  height: number;
  currentActiveStartDate: Date;
  currentActiveEndDate: Date;
  isEventDetailsOpen: boolean;
  currentSelectedEvent: EventInput;
  groupId: string;
  tabType: TabType;
}

enum TabType {
  TeamsTab,
  PersonalTab
}

export default class GraphCalendar extends React.Component<IGraphCalendarProps, IGraphCalendarState> {
  private calendar = createRef<FullCalendar>();

  /**
   * Builds the Component with the provided properties
   * @param props Properties of the web part
   */
  constructor(props: IGraphCalendarProps) {
    super(props);

    // If this is running in Teams, embed the specific Teams styling
    if(this._isRunningInTeams()) {
      import("./GraphCalendar.Teams.module.scss");

      if(this.props.teamsContext.theme == "dark") {
        import("./GraphCalendar.Teams.Dark.module.scss");
      }
    }

    this.state = {
      events: [],
      height: this._calculateHeight(),
      currentActiveStartDate: null,
      currentActiveEndDate: null,
      isEventDetailsOpen: false,
      currentSelectedEvent: null,
      groupId: this._isRunningInTeams() ? this.props.teamsContext.groupId : this.props.context.pageContext.site.group ? this.props.context.pageContext.site.group.id : "",
      tabType: this._isRunningInTeams() ? (this._isPersonalTab() ? TabType.PersonalTab : TabType.TeamsTab) : TabType.TeamsTab
    };
  }

  /**
   * When the component is initially mounted
   */
  public componentDidMount(): void {
    // Gets the calendar current Active dates
    let calendarStartDate = this.calendar.value.getApi().view.activeStart;
    let calendarEndDate = this.calendar.value.getApi().view.activeEnd;

    // Loads the events
    this._loadEvents(calendarStartDate, calendarEndDate);
  }

  /**
   * Renders the web part
   */
  public render(): React.ReactElement<IGraphCalendarProps> {
    return (
      <div className={ styles.graphCalendar }>
        <FullCalendar 
          ref={this.calendar}
          defaultView="dayGridMonth" 
          plugins={[ dayGridPlugin ]}
          windowResize={this._handleResize.bind(this)}
          datesRender={this._datesRender.bind(this)}
          eventClick={this._openEventPanel.bind(this)}
          height={this.state.height}
          events={this.state.events} />
        {this.state.currentSelectedEvent &&
          <Panel
            isOpen={this.state.isEventDetailsOpen}
            type={ PanelType.smallFixedFar }
            headerText={this.state.currentSelectedEvent ? this.state.currentSelectedEvent.title : ""}
            onDismiss={this._closeEventPanel.bind(this)}
            isLightDismiss={true}
            closeButtonAriaLabel='Close'>
            <h3>Start Time</h3>
            <span>{moment(this.state.currentSelectedEvent.start).format('MMMM Do YYYY [at] h:mm:ss a')}</span>
            <h3>Start Time</h3>
            <span>{moment(this.state.currentSelectedEvent.end).format('MMMM Do YYYY [at] h:mm:ss a')}</span>
            {this.state.currentSelectedEvent.extendedProps["location"] && 
              <div>
                <h3>Location</h3>
                <span>{this.state.currentSelectedEvent.extendedProps["location"]}</span>
              </div>
            }
            {this.state.currentSelectedEvent.extendedProps["body"] && 
              <div>                
                <h3>Body</h3>
                <span>{this.state.currentSelectedEvent.extendedProps["body"]}</span>
              </div>
            }
          </Panel>
        }
      </div>
    );
  }

  /**
   * Calculates the dynamic height of the surface to render.
   * Mainly used for Teams validation so it renders "full-screen" in Teams
   */
  private _calculateHeight(): number {
    if(this._isRunningInTeams()) {
      return window.innerHeight - 30;
    } else {
      return 600;
    }
  }

  /**
   * Validates if the current web part is running in Teams
   */
  private _isRunningInTeams() {
    return this.props.teamsContext;
  }

  /**
   * Validates if the current web part is running in a Personal Tab
   */
  private _isPersonalTab() {
    let _isPersonalTab: Boolean = false;

    if(this._isRunningInTeams() && !this.props.teamsContext.teamId) {
      _isPersonalTab = true;
    }

    return _isPersonalTab;
  }

  /**
   * Handles the click event and opens the OUIF Panel
   * @param eventClickInfo The information about the selected event
   */
  private _openEventPanel(eventClickInfo: any) {
    this.setState({
      isEventDetailsOpen: true,
      currentSelectedEvent: eventClickInfo.event
    });
  }

  /**
   * Handles the click event on the dismiss from the Panel and closes the OUIF Panel
   */
  private _closeEventPanel() {
    this.setState({
      isEventDetailsOpen: true,
      currentSelectedEvent: null
    });
  }
  
  /**
   * If the view changed, reload the events based on the active view
   * @param info Information about the current active view
   */
  private _datesRender(info: any) {
    if(this.calendar.value) {

      // If the active view has changed  
      if((this.state.currentActiveStartDate && this.state.currentActiveEndDate) && this.state.currentActiveStartDate.toString() != info.view.activeStart.toString() && this.state.currentActiveEndDate.toString() != info.view.activeEnd.toString()) {
        this._loadEvents(info.view.activeStart, info.view.activeEnd);
      }
    }
  }

  /**
   * Handles the resize event when in Microsoft Teams to ensure a proper responsive behaviour
   */
  private _handleResize() {
    if(this._isRunningInTeams()) {
      this.setState({
        height: window.innerHeight - 30
      });
    }
  }

  /**
   * Loads the Events based on the current state of the Calendar
   * @param startDate The first visible date on the calendar
   * @param endDate The last visible date on the calendar
   */
  private _loadEvents(startDate: Date, endDate: Date): void {

    // If a Group was found or running in the context of a Personal tab, execute the query. If not, do nothing.
    if(this.state.groupId || this.state.tabType == TabType.PersonalTab) {

      this.props.context.msGraphClientFactory
      .getClient()
      .then((client: MSGraphClient): void => {

        let apiUrl: string = `/groups/${this.state.groupId}/events`;
        if(this._isPersonalTab()) {
          apiUrl = '/me/events';
        }

        client
          .api(apiUrl)
          .version("v1.0")
          .select('subject,start,end,location,bodyPreview,isAllDay')
          .filter(`start/dateTime ge '${startDate.toISOString()}' and end/dateTime le '${endDate.toISOString()}'`)
          .top(this.props.limit)
          .get((err, res) => {  
  
            if (err) {
              console.error(err);
              return;
            }
            
            var events: Array<EventInput> = new Array<EventInput>();

            res.value.map((item: any) => {
              // Build a Timezone enabled Date
              let currentStartDate = moment.tz(item.start.dateTime, item.start.timeZone);
              let currentEndDate = moment.tz(item.end.dateTime, item.end.timeZone);

              // Adding all retrieved events to the result array
              events.push({ 
                title: item.subject,

                // If the event is an All Day event, add 1 day without Timezone to the start date
                start: !item.isAllDay ? currentStartDate.clone().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format() : moment(currentStartDate).add(1, 'd').toISOString(),
                
                // If the event is an All Day event, add 1 day without Timezone to the end date
                end: !item.isAllDay ? currentEndDate.clone().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format() : moment(currentEndDate).add(1, 'd').toISOString(),
                allDay: item.isAllDay,
                location: item.location.displayName,
                body: item.bodyPreview
              });
            });
  
            // Sets the state with the retrieved events and current active calendar dates
            this.setState({
              events: events,
              currentActiveStartDate: startDate,
              currentActiveEndDate: endDate,
              currentSelectedEvent: null
            });
          });
      });
    }
  }
}
