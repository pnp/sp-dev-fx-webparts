import * as React from 'react';
import styles from './ReactMyEvents.module.scss';
import * as moment from 'moment';
import * as strings from 'ReactMyEventsWebPartStrings';
import { IReactMyEventsProps } from './IReactMyEventsProps';
import { FilmstripLayout } from "../../../shared/components/FilmstripLayout/index";
import CompactLayout from "../../../shared/components/CompactLayout/CompactLayout";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { IReactMyEventsState } from './IReactMyEventsState';
import { EventCard } from "../../../shared/components/EventCard/EventCard";
import { Pagination } from "../../../shared/components/Pagination";
import { CalendarService } from '../../../shared/services/CalendarService';
import { DisplayMode } from '@microsoft/sp-core-library';
import { ICalendarEvent } from '../../../shared/models/ICalendarEvent';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { DateRange } from '../../../shared/models/IDateRange';
import { css, Spinner } from "office-ui-fabric-react";
import { IReadonlyTheme } from '@microsoft/sp-component-base';
import { MessageBar, MessageBarType } from '@fluentui/react';
import { Layouts } from '../../../shared/models/ILayouts';


export default class ReactMyEvents extends React.Component<IReactMyEventsProps, IReactMyEventsState> {

  //get todday's date
  //private today = undefined;//= moment().format('YYYY-MM-DD');
  private today = moment().startOf('week').day('Monday').format('YYYY-MM-DD');
  private endDate = undefined;

  private _services: CalendarService = undefined;

  constructor(props: IReactMyEventsProps) {
    super(props);
    this._services = new CalendarService();
    this.getStartEndDate = this.getStartEndDate.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.state = {
      events: [],
      currentPage: 1,
      errorMessage: undefined,
      loading: false,
      noEventsFoundMessage: undefined
    };
  }

  /** Function to find start and end date based on selected range */
  public getStartEndDate() {
    switch (this.props.dateRange) {
      case DateRange.AllUpcoming:
        this.endDate = moment().endOf('week').day('Friday').add(1, 'years').format('YYYY-MM-DD');
        break;
      case DateRange.ThisWeek:
        this.endDate = moment().endOf('week').day('Friday').format('YYYY-MM-DD');
        break;
      case DateRange.NextTwoWeeks:
        this.endDate = moment().endOf('week').day('Friday').add(2, 'week').format('YYYY-MM-DD');
        break;
      case DateRange.Month:
        this.endDate = moment().endOf('week').day('Friday').add(1, "months").format('YYYY-MM-DD');
        break;
      case DateRange.Quarter:
        this.endDate = moment().endOf('week').day('Friday').add(1, "quarters").format('YYYY-MM-DD');
        break;
    }
  }

  public componentDidMount() {
    this.getEvents();
  }

  public componentDidUpdate(prevProps) {
    if (this.props.dateRange != prevProps.dateRange) {
      this.getEvents();
    }
  }

  public async getEvents() {
    this.getStartEndDate();
    this.setState({ loading: true });
    await this._services
      .getEvents(this.props.context, this.today, this.endDate)
      .then((data: any) => {
        if (data.length === 0) {
          this.setState({
            loading: false,
            noEventsFoundMessage: strings.NoEventsFoundFieldLabel
          });
        }
        else {
          this.setState({
            loading: false,
            events: data
          });
        }
      }).catch(error => {
        this.setState({
          loading: false,
          errorMessage: "Error while retrieving events: " + error.message
        });
      });
  }


  private _onPageUpdate = (pageNumber: number): void => {
    this.setState({
      currentPage: pageNumber
    });
  }

  private _onRenderCompactItem = (item: any, _index: number): JSX.Element => {
    return <div
      data-is-focusable={true}
      data-is-focus-item={true}
      role="listitem"
      aria-label={item.subject}
    >
      <EventCard
        key={`eventCard${_index}`}
        event={item}
        isCompact={Layouts.compact}
        layout={this.props.layout}
        themeVariant={this.props.themeVariant} />
    </div>;
  }

  private _onConfigure = () => {
    this.props.context.propertyPane.open();
  }

  private _renderFilmstripList(): JSX.Element {
    const {
      events } = this.state;
    const isEditMode: boolean = this.props.displayMode === DisplayMode.Edit;

    return (<div>
      <div>
        <div role="application">
          <FilmstripLayout
            ariaLabel={strings.FilmStripAriaLabel}
            clientWidth={this.props.clientWidth}
            themeVariant={this.props.themeVariant}>
            {events.map((event: ICalendarEvent, index: number) => {
              return (<EventCard
                key={`eventCard${index}`}
                isEditMode={isEditMode}
                event={event}
                isCompact={false}
                themeVariant={this.props.themeVariant} />
              );
            })}
          </FilmstripLayout>
        </div>
      </div>
    </div>);
  }

  private _renderCompactList(): JSX.Element {
    const {
      events,
      currentPage
    } = this.state;

    const { maxEvents } = this.props;
    let pagedEvents: ICalendarEvent[] = events;
    let usePaging: boolean = false;

    if (+maxEvents > 0 && events.length > +maxEvents) {
      // calculate the page size
      const pageStartAt: number = +maxEvents * (currentPage - 1);
      const pageEndAt: number = (+maxEvents * currentPage);

      pagedEvents = events.slice(pageStartAt, pageEndAt);
      usePaging = true;
    }

    return (
      <div className={styles.compact}>
        <CompactLayout
          items={pagedEvents}
          onRenderGridItem={(item: any, index: number) => this._onRenderCompactItem(item, index)} />

        {usePaging &&
          <Pagination
            showPageNum={true}
            currentPage={currentPage}
            itemsCountPerPage={maxEvents}
            totalItems={events.length}
            onPageUpdate={this._onPageUpdate}
          />
        }
      </div>
    );
  }

  private _renderContent(): JSX.Element {
    const isCompact = this.props.layout;
    const { errorMessage, events, loading } = this.state;

    if (loading) {
      return (<div className={styles.spinner}><Spinner label="Loading events" /></div>);
    }

    if (events && events.length) {
      if (isCompact === Layouts.compact) {
        return this._renderCompactList();
      } else {
        return this._renderFilmstripList();
      }
    }

    else if (errorMessage) {
      return (<MessageBar messageBarType={MessageBarType.error}>{errorMessage}</MessageBar>);
    }

    else if (events.length === 0) {
      return (<MessageBar
        messageBarType={MessageBarType.error}>{this.state.noEventsFoundMessage}</MessageBar>);
    }
  }

  public render(): React.ReactElement<IReactMyEventsProps> {
    const { semanticColors }: IReadonlyTheme = this.props.themeVariant;

    return (
      <div className={css(styles.reactMyEvents, styles.webPartChrome)} style={{ backgroundColor: semanticColors.bodyBackground }}>
        {this.props.dateRange != undefined ?
          <><div className={css(styles.webPartHeader, styles.headerSmMargin)}>

            <WebPartTitle displayMode={this.props.displayMode}
              title={this.props.webpartTitle}
              updateProperty={this.props.updateProperty} />
          </div><div className={styles.content}>
              {this._renderContent()}
            </div></>
          :
          <Placeholder
            iconName="Calendar"
            iconText={strings.PlaceholderTitle}
            description={strings.PlaceholderDescription}
            buttonLabel={strings.ConfigureButton}
            onConfigure={this._onConfigure} />
        }
      </div>
    );
  }
}
