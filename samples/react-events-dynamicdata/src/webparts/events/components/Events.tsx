import * as React from 'react';
import styles from './Events.module.scss';
import { IEventsProps, IEventsState } from '.';
import { IEventItem } from "../../../data";
import { sp } from "@pnp/sp";
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { ListView, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";

/**
 * Events component
 */
export class Events extends React.Component<IEventsProps, IEventsState> {
  constructor(props: IEventsProps) {
    super(props);

    // set default state
    this.state = {
      loading: false,
      events: [],
      error: undefined
    };
  }

  /**
   * Event handler for selecting an event in the list
   */
  private _getSelection = (event: any[]): void => {
    // since the list allows selecting only one item, pick the first selected
    // event and pass to the event handler specified through component
    // properties
    this.props.onEventSelected(event[0]);
  }

  public componentDidMount(): void {
    // indicate that the component is loading data
    this.setState({
      loading: true
    });

    this.setState({
      loading: false,
      events: [{
        name: 'Tampa Home Show',
        city: 'Tampa, FL',
        address: '333 S Franklin St',
        organizerName: 'Grady Archie',
        organizerEmail: 'GradyA@contoso.OnMicrosoft.com',
        date: '2018-05-29T00:00:00Z'
      },
      {
        name: 'Custom Electronic Design and Installation Association (CEDIA)',
        city: 'San Diego, CA',
        address: '111 W Harbor Dr',
        organizerName: 'Megan Bowen',
        organizerEmail: 'MeganB@contoso.OnMicrosoft.com',
        date: '2018-06-15T00:00:00Z'
      },
      {
        name: 'Design Automation Conference (DAC)',
        city: 'San Francisco, CA',
        address: '747 Howard St Fl 5',
        organizerName: 'Irvin Sayers',
        organizerEmail: 'IrvinSB@contoso.OnMicrosoft.com',
        date: '2018-07-05T00:00:00Z'
      }],
      error: undefined
    });

    // load information about events from the SharePoint list
    // sp.web
    //   .getList(`${this.props.siteUrl}/Lists/CompanyEvents`)
    //   .items.getAll()
    //   .then((items: IEventItem[]): void => {
    //     this.setState({
    //       loading: false,
    //       events: items.map(i => {
    //         return {
    //           date: i.PnPEventDate,
    //           name: i.Title,
    //           city: i.PnPCity,
    //           address: i.PnPAddress,
    //           organizerName: i.PnPOrganizerName,
    //           organizerEmail: i.PnPOrganizerEmail
    //         };
    //       })
    //     });
    //   }, (error: any): void => {
    //     // communicate error
    //     this.setState({
    //       loading: false,
    //       error: error
    //     });
    //   });
  }

  public render(): React.ReactElement<IEventsProps> {
    const { loading, error, events } = this.state;
    const { displayMode, title, updateProperty } = this.props;

    return (
      <div className={styles.events}>
        <WebPartTitle displayMode={displayMode}
          title={title}
          updateProperty={updateProperty} />
        {loading &&
          <Spinner size={SpinnerSize.large} label='Loading events...' />}
        {!loading &&
          error &&
          <div className={styles.error}>The following error occurred while loading events: <span className={styles.msg}>{error}</span></div>}
        {!loading &&
          !error &&
          events.length === 0 &&
          <div className={styles.info}>No events found</div>}
        {!loading &&
          events.length > 0 &&
          <ListView
            items={events}
            viewFields={[
              {
                name: 'name',
                displayName: 'Event',
                sorting: true
              },
              {
                name: 'city',
                displayName: 'Location',
                sorting: true,
                minWidth: 100
              }
            ]}
            compact={true}
            selectionMode={SelectionMode.single}
            selection={this._getSelection} />}
      </div>
    );
  }
}
