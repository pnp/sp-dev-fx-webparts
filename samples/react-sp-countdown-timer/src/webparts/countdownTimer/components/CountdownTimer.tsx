import * as React from 'react';
import styles from './CountdownTimer.module.scss';
import type { ICountdownTimerProps } from './ICountdownTimerProps';

import { spfi, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/fields";
import "@pnp/sp/site-users";

interface IEventItem {
  Id: number;
  Title: string;
  EventDate: string;
  Description?: string;
}

interface ICountdownTimerState {
  events: IEventItem[];
  now: Date;
  loading: boolean;
  error: string | undefined;
}

export default class CountdownTimer extends React.Component<ICountdownTimerProps, ICountdownTimerState> {
  private timerId: number;
  private sp;

  constructor(props: ICountdownTimerProps) {
    super(props);
    this.state = {
      events: [],
      now: new Date(),
      loading: true,
      error: undefined
    };

    this.sp = spfi().using(SPFx(this.props.context));
  }

  public async componentDidMount(): Promise<void> {
    await this.fetchEvents();

    this.timerId = setInterval(() => {
      this.setState({ now: new Date() });
    }, 1000);
  }


  public componentWillUnmount(): void {
    clearInterval(this.timerId);
  }

  private async fetchEvents(): Promise<void> {
    try {
      const nowIso = new Date().toISOString();
      console.log('Fetching events from list:', this.props.listName);
      const events = await this.sp.web.lists
        .getByTitle(this.props.listName)
        .items
        .select('Id', 'Title', 'EventDate', 'Description')
        .orderBy('EventDate', true)
        .filter(`EventDate gt datetime'${nowIso}'`)
        ();

      console.log('Events fetched successfully:', events);
      this.setState({
        events: events,
        loading: false,
        error: undefined
      });
    } catch (error) {
      console.error('Error fetching events:', error);
      this.setState({
        loading: false,
        error: 'Failed to load events. Please check if the list exists and you have permissions.'
      });
    }
  }

  private renderCountdown(event: IEventItem): JSX.Element {
    const eventDate = new Date(event.EventDate);
    const now = this.state.now;
    const diff = eventDate.getTime() - now.getTime();

    if (diff <= 0) {
      return <span className={styles.eventStarted}>Event started!</span>;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return (
      <span className={styles.countdown}>
        {days > 0 && <span className={styles.days}>{days}d </span>}
        <span className={styles.time}>{hours}h {minutes}m {seconds}s</span>
      </span>
    );
  }

  public render(): React.ReactElement<ICountdownTimerProps> {
    const {

      hasTeamsContext,

    } = this.props;
    const { events, loading, error } = this.state;

    return (
      <section className={`${styles.countdownTimer} ${hasTeamsContext ? styles.teams : ''}`}>

        <div className={styles.eventsContainer}>
          <h3>Upcoming Events</h3>

          {loading && <p>Loading events...</p>}

          {error && (
            <div className={styles.error}>
              <p>{error}</p>
              <button onClick={() => this.fetchEvents()}>Retry</button>
            </div>
          )}

          {!loading && !error && events.length === 0 && (
            <p>No upcoming events found.</p>
          )}

          {!loading && !error && events.length > 0 && (
            <div className={styles.eventsList}>
              {events.map(event => (
                <div key={event.Id} className={styles.eventItem}>
                  <h4>{event.Title}</h4>
                  {event.Description && <p>{event.Description}</p>}
                  <div className={styles.countdownContainer}>
                    {this.renderCountdown(event)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }
}
