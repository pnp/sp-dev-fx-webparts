import * as React from 'react';
import styles from './Receiver.module.scss';
import { IReceiverProps } from './IReceiverProps';
import { IEvent } from "@microsoft/sp-webpart-base/lib";
import { EventData } from "../../../sharedLibs/EventData";
import { IReceiverState } from './IReceiverState';

/**
 * Subscriber (Observer) React component that Receives broadcasted messages from Publisher (Observable).
 */
export default class Receiver extends React.Component<IReceiverProps, IReceiverState> {

  constructor(props: IReceiverProps) {
    super(props);

    this.state = { eventsList: [] };

    // subscribe for event by event name.
    // another option would be to subscribe by SourceId (IEventAggregator.subscribeBySourceId). Check the IEventAggregator definitions. 
    this.props.eventAggregator.subscribeByEventName("myCustomEvent:start", this.props.subscriberId, this.receivedEvent.bind(this));
  }

  public render(): React.ReactElement<IReceiverProps> {
    return (
      <div className={styles.receiver}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <h1>Important: The event aggregator is deprecated and no longer available in the SharePoint Framework. Please use dynamic data https://learn.microsoft.com/sharepoint/dev/spfx/dynamic-data instead. See the README.md file for more details.</h1>
              <h2>Received events:</h2>
              {
                this.state.eventsList.map((item: { index: number, data: number }) => {
                  return <div key={item.index}>Received Event Message: {item.data}</div>;
                })
              }
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Method that handles Received event from the eventAggregator.
   * Changes the state of the eventsList by adding the new event data to the array.
   * @param eventName the event name of the raised event.
   * @param eventObject the event object of the raised event.
   */
  protected receivedEvent(eventName: string, eventObject: IEvent<EventData>): void {

    // update the events list with the newly received data from the event subscriber.
    this.state.eventsList.push(
      {
        index: this.state.eventsList.length,
        data: eventObject.data.currentNumber
      }
    );

    // set new state.
    this.setState((previousState: IReceiverState, props: IReceiverProps): IReceiverState => {
      previousState.eventsList = this.state.eventsList;
      return previousState;
    });

  }
}
