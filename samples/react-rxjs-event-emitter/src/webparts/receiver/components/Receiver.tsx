import * as React from 'react';
import styles from './Receiver.module.scss';
import { IReceiverProps } from './IReceiverProps';
import { IReceiverState } from './IReceiverState';

import { RxJsEventEmitter } from "../../../libraries/rxJsEventEmitter/RxJsEventEmitter";
import { EventData } from "../../../libraries/rxJsEventEmitter/EventData";

/**
 * Subscriber (Observer) React component that Receives broadcasted messages from Publisher (Observable).
 */
export default class Receiver extends React.Component<IReceiverProps, IReceiverState> {

  private readonly _eventEmitter: RxJsEventEmitter = RxJsEventEmitter.getInstance();

  constructor(props: IReceiverProps) {
    super(props);

    this.state = { eventsList: [] };

    // subscribe for event by event name.
    this._eventEmitter.on("myCustomEvent:start", this.receivedEvent.bind(this));
  }

  public render(): React.ReactElement<IReceiverProps> {
    return (
      <div className={styles.receiver}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <h2>ReactiveX Event Receiver</h2>
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
   * Method that handles Received event from the RxJsEventEmitter.
   * Changes the state of the eventsList by adding the new event data to the array.
   * @param data the event object of the raised event.
   */
  protected receivedEvent(data: EventData): void {

    // update the events list with the newly received data from the event subscriber.
    this.state.eventsList.push(
      {
        index: this.state.eventsList.length,
        data: data.currentNumber
      }
    );

    // set new state.
    this.setState((previousState: IReceiverState, props: IReceiverProps): IReceiverState => {
      previousState.eventsList = this.state.eventsList;
      return previousState;
    });

  }
}
