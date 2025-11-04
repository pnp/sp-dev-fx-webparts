import * as React from 'react';
import styles from './AbTest.module.scss';
import type { IAbTestProps } from './IAbTestProps';

import { ActionButton, CommandBar, DocumentCard, DocumentCardDetails, DocumentCardPreview, DocumentCardTitle, DocumentCardType, ICommandBarItemProps, ImageFit, MessageBar, MessageBarType, TextField, Link } from '@fluentui/react';
import { AILogLevel } from './IAILogEntry';
import { AddItemCalendar } from './AddItemCalendar';


export interface ITrackedEvent {
  eventName: string;
  timestamp: Date;
  properties?: { [key: string]: string };
}

export interface IAbTestState {
  carditems: string[];
  textinput?: string;
  showAddDialog: boolean;
  trackedEvents: ITrackedEvent[];
  showSuccessMessage: boolean;
}

export default class AbTest extends React.Component<IAbTestProps, IAbTestState> {
  constructor(props: IAbTestProps) {
    super(props);
    this.state = {
      carditems: ['item1', 'item2', 'item3'],
      showAddDialog: false,
      trackedEvents: [],
      showSuccessMessage: false
    };
  }

  private trackEventWithFeedback = (eventName: string, properties?: { [key: string]: string }): void => {
    // Track the event to Application Insights
    this.props.trackEvent(eventName, properties);

    // Add to local tracked events list
    const newEvent: ITrackedEvent = {
      eventName,
      timestamp: new Date(),
      properties
    };

    this.setState({
      trackedEvents: [newEvent, ...this.state.trackedEvents].slice(0, 10), // Keep last 10 events
      showSuccessMessage: true
    });

    // Hide success message after 3 seconds
    setTimeout(() => {
      this.setState({ showSuccessMessage: false });
    }, 3000);
  }

  public override componentDidMount(): void {
    this.props.log({
      level: AILogLevel.Info,
      message: 'Component mounted',
      properties: { componentDidMount: 'true' }
    });
  }

  public render(): React.ReactElement<IAbTestProps> {
    const {
      hasTeamsContext,
      isAppInsightsConfigured
    } = this.props;

    return (

      <section className={`${styles.abTest} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          {!isAppInsightsConfigured && (
            <MessageBar messageBarType={MessageBarType.warning} isMultiline={true}>
              <strong>Application Insights Not Configured</strong>
              <br />
              This web part demonstrates AB Testing with Application Insights event tracking. To start collecting telemetry data:
              <br />
              1. Edit this web part and find the &quot;Application Insights Configuration&quot; section
              <br />
              2. Paste your Azure Application Insights connection string
              <br />
              <Link href="https://portal.azure.com" target="_blank">Open Azure Portal</Link> to get your connection string.
            </MessageBar>
          )}
          {isAppInsightsConfigured && this.state.showSuccessMessage && (
            <MessageBar messageBarType={MessageBarType.success}>
              Event tracked successfully! Data has been sent to Application Insights.
            </MessageBar>
          )}
          <CommandBar
            items={this._items}
          />
{this.state.showAddDialog && <AddItemCalendar />}
          <div>
            {this.state.carditems.map((item, index) => {
              return (<DocumentCard key={index}
                type={DocumentCardType.compact}
              >
                <DocumentCardPreview
                  previewImages={[{ previewImageSrc: `https://picsum.photos/id/${index}/100/100`, width: 100, height: 100, imageFit: ImageFit.cover, }]} />
                <DocumentCardDetails>
                  <DocumentCardTitle title={item} shouldTruncate />
                </DocumentCardDetails>
              </DocumentCard>
              );
            })}
            <DocumentCard key={'New Item'}
              type={DocumentCardType.compact}
            >

              <DocumentCardDetails>
                Add New item:
                <TextField onChange={(e, v) => { this.setState({ textinput: v }); }} value={this.state.textinput || ''} />
                <ActionButton onClick={() => {
                  if (this.state.textinput) {
                    this.trackEventWithFeedback('AddItemWebPartContext', { itemName: this.state.textinput });
                    this.state.carditems.push(this.state.textinput);
                    this.setState({ carditems: this.state.carditems, textinput: '' });
                  }
                }} text='Add Item' />
              </DocumentCardDetails>
            </DocumentCard>
          </div>

          {isAppInsightsConfigured && this.state.trackedEvents.length > 0 && (
            <div style={{ marginTop: '20px' }}>
              <h3>Recent Events Tracked to Application Insights</h3>
              <MessageBar messageBarType={MessageBarType.info}>
                The following events have been sent to Application Insights. View them in the Azure Portal under Custom Events.
              </MessageBar>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {this.state.trackedEvents.map((event, idx) => (
                  <li key={idx} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                    <strong>{event.eventName}</strong> - {event.timestamp.toLocaleTimeString()}
                    {event.properties && (
                      <div style={{ fontSize: '12px', color: '#666' }}>
                        Properties: {JSON.stringify(event.properties)}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    );
  }

  public override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {

    this.props.log({
      level: AILogLevel.Error,
      message: error.message,
      exception: error,
      properties: { componentDidCatch: errorInfo.componentStack }
    });
    alert('An error occurred'+ error);
  }
  private _items: ICommandBarItemProps[] = [
    {
      key: 'action1',
      text: 'New',
      iconProps: { iconName: 'Add' },
      subMenuProps: {
        items: [
          {
            key: 'action1_1', text: 'Add Item', iconProps: { iconName: 'Mail' },
            onClick: () => {
              const newItemName = 'New Item' + (this.state.carditems.length + 1);
              this.trackEventWithFeedback('AddItemContextualMenu', { itemName: newItemName });
              this.state.carditems.push(newItemName);
              this.setState({ carditems: this.state.carditems });
            }
          },
          {
            key: 'action1_2', text: 'Calendar event', iconProps: { iconName: 'Calendar' },
            onClick: () => {
              this.trackEventWithFeedback('OpenCalendarDialog');
              this.setState({ showAddDialog: true });
            }
          },
        ],
      },
    }
  ];
}
