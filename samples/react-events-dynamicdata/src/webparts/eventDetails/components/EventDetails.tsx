import * as React from 'react';
import styles from './EventDetails.module.scss';
import { IEventDetailsProps } from './IEventDetailsProps';
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { IEvent } from '../../../data';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';

export class EventDetails extends React.Component<IEventDetailsProps, {}> {
  public render(): React.ReactElement<IEventDetailsProps> {
    const { needsConfiguration, event, onConfigure, displayMode, title, updateProperty } = this.props;

    return (
      <div className={styles.eventDetails}>
        <WebPartTitle displayMode={displayMode}
          title={title}
          updateProperty={updateProperty} />
        {needsConfiguration &&
          <Placeholder
            iconName='Edit'
            iconText='Configure your web part'
            description='Please configure the web part.'
            buttonLabel='Configure'
            onConfigure={onConfigure} />}
        {!needsConfiguration &&
          event &&
          (!event.name || !event.address) &&
          <Placeholder
            iconName='Edit'
            iconText='Configure your web part'
            description='The selected data source is not providing events. Change the data source'
            buttonLabel='Configure'
            onConfigure={onConfigure} />}
        {!needsConfiguration &&
          !event &&
          <Placeholder
            iconName='CustomList'
            iconText='Event details'
            description='Select an event' />}
        {!needsConfiguration &&
          event &&
          <ul>
            <li><Label>Event name</Label> {event.name}</li>
            <li><Label>City</Label> {event.city}</li>
            <li><Label>Address</Label> {event.address}</li>
            <li><Label>Organizer</Label> <Icon iconName='Mail' /> <a href={`mailto:${event.organizerEmail}`}>{event.organizerName}</a></li>
            <li><Label>Date</Label> {new Date(event.date).toLocaleDateString()}</li>
          </ul>}
      </div>
    );
  }
}
