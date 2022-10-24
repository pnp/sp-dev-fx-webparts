import * as React from 'react';
import styles from './Broadcaster.module.scss';
import { IBroadcasterProps } from './IBroadcasterProps';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { EventData } from "../../../sharedLibs/EventData";
import { IEvent } from "@microsoft/sp-webpart-base/lib";
import { IBroadcasterState } from "./IBroadcasterState";

/**
 * Publisher (Observable) React component that broadcasts messages to Subscribers (Observers).
 */
export default class Broadcaster extends React.Component<IBroadcasterProps, IBroadcasterState> {

  constructor(props: IBroadcasterProps) {
    super(props);

    this.state = { eventNumber: 0 };
  }

  public render(): React.ReactElement<IBroadcasterProps> {
    return (
      <div className={styles.broadcaster}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1">
              <h1>Important: The event aggregator is deprecated and no longer available in the SharePoint Framework. Please use dynamic data https://learn.microsoft.com/sharepoint/dev/spfx/dynamic-data instead. See the README.md file for more details.</h1>
              <h2>Event Message: {this.state.eventNumber}</h2>
              <PrimaryButton onClick={this.broadcastData.bind(this)} id="BroadcastButton">
                Broadcast message
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Broadcast data to all the subscribers.
   */
  protected broadcastData(): void {

    let eventNumber: number = this.state.eventNumber + 1;

    this.setState((previousState: IBroadcasterState, props: IBroadcasterProps): IBroadcasterState => {
      previousState.eventNumber = eventNumber;
      return previousState;
    });

    this.props.eventAggregator.raiseEvent(
      "myCustomEvent:start",
      {
        data: { currentNumber: eventNumber },
        sourceId: "BroadcasterWebPart",
        targetId: "ReceiverWebPart"
      } as IEvent<EventData>
    );

  }
}
