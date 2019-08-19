import * as React from 'react';
import styles from './Calendar.module.scss';
import { ICalendarProps } from './ICalendarProps';
import { ICalendarState } from './ICalendarState';
import { escape } from '@microsoft/sp-lodash-subset';
import BigCalendar from 'react-big-calendar';
import * as moment from 'moment';
import * as strings from 'CalendarWebPartStrings';
import 'react-big-calendar/lib/css/react-big-calendar.css';
require('./calendar.css');
import { CommunicationColors ,  FluentCustomizations, FluentTheme  } from '@uifabric/fluent-theme';

import {
  Customizer,
  IPersonaSharedProps,
  Persona,
  PersonaSize,
  PersonaPresence,
  HoverCard, IHoverCard, IPlainCardProps, HoverCardType, DefaultButton,
  DocumentCard,
  DocumentCardActivity,
  DocumentCardDetails,
  DocumentCardPreview,
  DocumentCardTitle,
  IDocumentCardPreviewProps,
  IDocumentCardPreviewImage,
  DocumentCardType,
  Label,
  ImageFit,
  IDocumentCardLogoProps,
  DocumentCardLogo,
  DocumentCardImage,
  Icon,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,


} from 'office-ui-fabric-react';
import { EnvironmentType } from '@microsoft/sp-core-library';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { DisplayMode } from '@microsoft/sp-core-library';
import spservices from '../../../services/spservices';
import { stringIsNullOrEmpty } from '@pnp/common';
import { Event } from '../../../controls/Event/event';
import { IPanelModelEnum } from '../../../controls/Event/IPanelModeEnum';
import { IEventData } from './../../../services/IEventData';
import { IUserPermissions } from './../../../services/IUserPermissions';
const localizer = BigCalendar.momentLocalizer(moment);

/**
 * @export
 * @class Calendar
 * @extends {React.Component<ICalendarProps, ICalendarState>}
 */
export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
  private spService: spservices = null;
  private userListPermissions: IUserPermissions = undefined;
  public constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      eventData: [],
      selectedEvent: undefined,
      isloading: true,
      hasError: false,
      errorMessage: '',
    };

    this.onDismissPanel = this.onDismissPanel.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
    this.onSelectSlot = this.onSelectSlot.bind(this);
    this.spService = new spservices(this.props.context);
    moment.locale(this.props.context.pageContext.cultureInfo.currentUICultureName);

  }

  private onDocumentCardClick(ev: React.SyntheticEvent<HTMLElement, Event>) {
    ev.preventDefault();
    ev.stopPropagation();
  }
  /**
   * @private
   * @param {*} event
   * @memberof Calendar
   */
  private onSelectEvent(event: any) {
    this.setState({ showDialog: true, selectedEvent: event, panelMode: IPanelModelEnum.edit });
  }

  /**
   *
   * @private
   * @param {boolean} refresh
   * @memberof Calendar
   */
  private async onDismissPanel(refresh: boolean) {

    this.setState({ showDialog: false });
    if (refresh === true) {
      this.setState({ isloading: true });
      await this.loadEvents();
      this.setState({ isloading: false });
    }
  }
  /**
   * @private
   * @memberof Calendar
   */
  private async loadEvents() {
    try {
      // Teste Properties
      if (!this.props.list || !this.props.siteUrl || !this.props.eventStartDate.value || !this.props.eventEndDate.value) return;

      this.userListPermissions = await this.spService.getUserPermissions(this.props.siteUrl, this.props.list);
      const eventsData: IEventData[] = await this.spService.getEvents(escape(this.props.siteUrl), escape(this.props.list), this.props.eventStartDate.value, this.props.eventEndDate.value);
      this.setState({ eventData: eventsData, hasError: false, errorMessage: "" });
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message, isloading: false });
    }
  }
  /**
   * @memberof Calendar
   */
  public async componentDidMount() {
    this.setState({ isloading: true });
    await this.loadEvents();
    this.setState({ isloading: false });
  }

  /**
   *
   * @param {*} error
   * @param {*} errorInfo
   * @memberof Calendar
   */
  public componentDidCatch(error: any, errorInfo: any) {
    this.setState({ hasError: true, errorMessage: errorInfo.componentStack });
  }
  /**
   *
   *
   * @param {ICalendarProps} prevProps
   * @param {ICalendarState} prevState
   * @memberof Calendar
   */
  public async componentDidUpdate(prevProps: ICalendarProps, prevState: ICalendarState) {

    if (!this.props.list || !this.props.siteUrl || !this.props.eventStartDate.value || !this.props.eventEndDate.value) return;
    // Get  Properties change
    if (prevProps.list !== this.props.list || this.props.eventStartDate.value !== prevProps.eventStartDate.value || this.props.eventEndDate.value !== prevProps.eventEndDate.value) {
      this.setState({ isloading: true });
      await this.loadEvents();
      this.setState({ isloading: false });
    }
  }
  /**
   * @private
   * @param {*} { event }
   * @returns
   * @memberof Calendar
   */
  private renderEvent({ event }) {

    const previewEventIcon: IDocumentCardPreviewProps = {
      previewImages: [
        {
          // previewImageSrc: event.ownerPhoto,
          previewIconProps: { iconName: event.fRecurrence === '0' ? 'Calendar': 'RecurringEvent', styles: { root: { color: event.color } }, className: styles.previewEventIcon },
          height: 43,
        }
      ]
    };
    const EventInfo: IPersonaSharedProps = {
      imageInitials: event.ownerInitial,
      imageUrl: event.ownerPhoto,
      text: event.title
    };

    /**
     * @returns {JSX.Element}
     */
    const onRenderPlainCard = (): JSX.Element => {
      return (
        <div className={styles.plainCard}>
          <DocumentCard className={styles.Documentcard}   >
            <div>
              <DocumentCardPreview {...previewEventIcon} />
            </div>
            <DocumentCardDetails>
              <div className={styles.DocumentCardDetails}>
                <DocumentCardTitle title={event.title} shouldTruncate={true} className={styles.DocumentCardTitle} styles={{ root: { color: event.color} }} />
              </div>
              {
                moment(event.EventDate).format('YYYY/MM/DD') !== moment(event.EndDate).format('YYYY/MM/DD') ?
                  <span className={styles.DocumentCardTitleTime}>{moment(event.EventDate).format('dddd')} - {moment(event.EndDate).format('dddd')} </span>
                  :
                  <span className={styles.DocumentCardTitleTime}>{moment(event.EventDate).format('dddd')} </span>
              }
              <span className={styles.DocumentCardTitleTime}>{moment(event.EventDate).format('HH:mm')}H - {moment(event.EndDate).format('HH:mm')}H</span>
              <Icon iconName='MapPin' className={styles.locationIcon} style={{ color: event.color }} />
              <DocumentCardTitle
                title={`${event.location}`}
                shouldTruncate={true}
                showAsSecondaryTitle={true}
                className={styles.location}
              />
              <div style={{ marginTop: 20 }}>
                <DocumentCardActivity
                  activity={strings.EventOwnerLabel}
                  people={[{ name: event.ownerName, profileImageSrc: event.ownerPhoto, initialsColor:event.color}]}
                />
              </div>
            </DocumentCardDetails>
          </DocumentCard>
        </div>
      );
    };

    return (
      <div style={{ height: 22 }}>
        <HoverCard
          cardDismissDelay={1000}
          type={HoverCardType.plain}
          plainCardProps={{ onRenderPlainCard: onRenderPlainCard }}
          onCardHide={(): void => {
          }}
        >
          <Persona
            {...EventInfo}
            size={PersonaSize.size24}
            presence={PersonaPresence.none}
            coinSize={22}
            initialsColor={event.color}
          />
        </HoverCard>
      </div>
    );
  }
  /**
   *
   *
   * @private
   * @memberof Calendar
   */
  private onConfigure() {
    // Context of the web part
    this.props.context.propertyPane.open();
  }

  /**
   * @param {*} { start, end }
   * @memberof Calendar
   */
  public async onSelectSlot({ start, end }) {
    if (!this.userListPermissions.hasPermissionAdd) return;
    this.setState({ showDialog: true, startDateSlot: start, endDateSlot: end, selectedEvent: undefined, panelMode: IPanelModelEnum.add });
  }

  /**
   *
   * @param {*} event
   * @param {*} start
   * @param {*} end
   * @param {*} isSelected
   * @returns {*}
   * @memberof Calendar
   */
  public eventStyleGetter(event, start, end, isSelected): any {

    let style: any = {
      backgroundColor: 'white',
      borderRadius: '0px',
      opacity: 1,
      color: event.color,
      borderWidth: '1.1px',
      borderStyle: 'solid',
      borderColor: event.color,
      borderLeftWidth: '6px',
      display: 'block'
    };

    return {
      style: style
    };
  }

  /**
   *
   * @returns {React.ReactElement<ICalendarProps>}
   * @memberof Calendar
   */
  public render(): React.ReactElement<ICalendarProps> {

    return (
      <Customizer {...FluentCustomizations}>


      <div className={styles.calendar} style={{backgroundColor: 'white', padding: '20px'}}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />
        {
          (!this.props.list || !this.props.eventStartDate.value || !this.props.eventEndDate.value) ?
            <Placeholder iconName='Edit'
              iconText={strings.WebpartConfigIconText}
              description={strings.WebpartConfigDescription}
              buttonLabel={strings.WebPartConfigButtonLabel}
              hideButton={this.props.displayMode === DisplayMode.Read}
              onConfigure={this.onConfigure.bind(this)} />
            :
            // test if has errors
            this.state.hasError ?
              <MessageBar messageBarType={MessageBarType.error}>
                {this.state.errorMessage}
              </MessageBar>
              :
              // show Calendar
              // Test if is loading Events
              <div>
                {this.state.isloading ? <Spinner size={SpinnerSize.large} label={strings.LoadingEventsLabel} /> :
                  <div className={styles.container}>
                    <BigCalendar
                      localizer={localizer}
                      selectable
                      events={this.state.eventData}
                      startAccessor="EventDate"
                      endAccessor="EndDate"
                      eventPropGetter={this.eventStyleGetter}
                      onSelectSlot={this.onSelectSlot}
                      components={{
                        event: this.renderEvent

                      }}
                      onSelectEvent={this.onSelectEvent}
                      defaultDate={moment().startOf('day').toDate()}
                      messages={
                        {
                          'today': strings.todayLabel,
                          'previous': strings.previousLabel,
                          'next': strings.nextLabel,
                          'month': strings.monthLabel,
                          'week': strings.weekLabel,
                          'day': strings.dayLable,
                          'showMore': total => `+${total} ${strings.showMore}`
                        }
                      }
                    />
                  </div>
                }
              </div>
        }
        {
          this.state.showDialog &&
          <Event
            event={this.state.selectedEvent}
            panelMode={this.state.panelMode}
            onDissmissPanel={this.onDismissPanel}
            showPanel={this.state.showDialog}
            startDate={this.state.startDateSlot}
            endDate={this.state.endDateSlot}
            context={this.props.context}
            siteUrl={this.props.siteUrl}
            listId={this.props.list}
          />
        }
      </div>
      </Customizer>
    );
  }
}
