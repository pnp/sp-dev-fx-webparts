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
import {

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

const localizer = BigCalendar.momentLocalizer(moment);

/**
 * @export
 * @class Calendar
 * @extends {React.Component<ICalendarProps, ICalendarState>}
 */
export default class Calendar extends React.Component<ICalendarProps, ICalendarState> {
  private spService: spservices = null;
  public constructor(props) {
    super(props);

    this.state = {
      showDialog: false,
      eventData: [],
      selectedEvent: undefined,
      isloading: false,
      hasError: false,
      errorMessage: '',
    };

    this.onDismissPanel = this.onDismissPanel.bind(this);
    this.onSelectEvent = this.onSelectEvent.bind(this);
    this.onSelectSlot = this.onSelectSlot.bind(this);
    this.spService = new spservices(this.props.context);
    moment.locale(this.props.context.pageContext.cultureInfo.currentCultureName);
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
      await this.loadEvents();
    }
  }
  /**
   * @private
   * @memberof Calendar
   */
  private async loadEvents() {
    this.setState({ isloading: true });
    const eventsData: IEventData[] = await this.spService.getEvents(escape(this.props.siteUrl), escape(this.props.list));
    this.setState({ eventData: eventsData, isloading: false });
  }
  /**
   * @memberof Calendar
   */
  public async componentDidMount() {
    await this.loadEvents();
  }

  /**
   *
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
    if (!this.props.list && !this.props.siteUrl) return;
    if (this.props.list && prevProps.list !== this.props.list) {
      await this.loadEvents();
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
          previewIconProps: { iconName: 'Calendar', styles: { root: { color: event.color } }, className: styles.previewEventIcon },
          height: 43,
        }
      ]
    };

    const EventInfo: IPersonaSharedProps = {
      imageInitials: '',
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
                <DocumentCardTitle title={event.title} shouldTruncate={true} className={styles.DocumentCardTitle} styles={{ root: { color: event.color } }} />
              </div>

              {
                moment(event.start).format('YYYY/MM/DD') !== moment(event.end).format('YYYY/MM/DD') ?
                  <span className={styles.DocumentCardTitleTime}>{moment(event.start).format('dddd')} - {moment(event.end).format('dddd')} </span>
                  :
                  <span className={styles.DocumentCardTitleTime}>{moment(event.start).format('dddd')} </span>
              }

              <span className={styles.DocumentCardTitleTime}>{moment(event.start).format('HH:mm')}H - {moment(event.end).format('HH:mm')}H</span>
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
                  people={[{ name: event.ownerName, profileImageSrc: event.ownerPhoto }]}
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
            console.log('I am now hidden');
          }}
        >
          <Persona
            {...EventInfo}
            size={PersonaSize.size24}
            presence={PersonaPresence.none}
            coinSize={21}
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
      color: 'black',
      borderWidth: '1.4px',
      borderStyle: 'solid',
      borderColor: event.color,
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
      <div className={styles.calendar}>
        <WebPartTitle displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty} />
        {
          !this.props.list ?
            <Placeholder iconName='Edit'
              iconText={strings.WebpartConfigIconText}
              description={strings.WebpartConfigDescription}
              buttonLabel={strings.WebPartConfigButtonLabel}
              hideButton={this.props.displayMode === DisplayMode.Read}
              onConfigure={this.onConfigure.bind(this)} />
            :
            // Test if is loading Events
            this.state.isloading ?
              <Spinner size={SpinnerSize.large} ariaLabel={strings.LoadingEventsLabel} />
              :
              // test if has errors
              this.state.hasError ?
                <MessageBar messageBarType={MessageBarType.error}>
                  {this.state.errorMessage}
                </MessageBar>
                :
                // show Calendar
                <div className={styles.container}>
                  <BigCalendar
                    localizer={localizer}
                    selectable
                    events={this.state.eventData}
                    startAccessor="start"
                    endAccessor="end"
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
    );
  }
}
