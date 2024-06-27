import * as React from 'react';
import styles from './AbTest.module.scss';
import type { IAbTestProps } from './IAbTestProps';

import { ActionButton, CommandBar, DocumentCard, DocumentCardDetails, DocumentCardPreview, DocumentCardTitle, DocumentCardType, ICommandBarItemProps, ImageFit, TextField } from '@fluentui/react';
import { AILogLevel } from './IAILogEntry';
import { AddItemCalendar } from './AddItemCalendar';


export interface IAbTestState {
  carditems: string[];
  textinput?: string;
  showAddDialog: boolean;
}

export default class AbTest extends React.Component<IAbTestProps, IAbTestState> {
  constructor(props: IAbTestProps) {
    super(props);
    this.state = {
      carditems: ['item1', 'item2', 'item3'],
      showAddDialog: false
    };
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
    } = this.props;
    
    return (

      <section className={`${styles.abTest} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
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
                <TextField onChange={(e, v) => { this.setState({ textinput: v }); }} />
                <ActionButton onClick={() => {
                  this.props.trackEvent('AddItemWebPartContext');
                  if (this.state.textinput) {
                    this.state.carditems.push(this.state.textinput);
                    this.setState({ carditems: this.state.carditems, textinput: '' });

                  }
                }} text='Add Item' />
              </DocumentCardDetails>
            </DocumentCard>
          </div>
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
              this.props.trackEvent('AddItemContextualMenu');
              this.state.carditems.push('New Item' + (this.state.carditems.length + 1));
              this.setState({ carditems: this.state.carditems });
            }
          },
          {
            key: 'action1_2', text: 'Calendar event', iconProps: { iconName: 'Calendar' },
            onClick: () => { this.setState({ showAddDialog: true }); }
          },
        ],
      },
    }
  ];
}
