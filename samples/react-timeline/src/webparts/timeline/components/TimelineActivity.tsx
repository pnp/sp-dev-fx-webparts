import * as React from 'react';
import styles from './Timeline.module.scss';
import * as strings from 'TimelineWebPartStrings';
import { escape } from '@microsoft/sp-lodash-subset';
import { ITimelineActivity } from "../../../models";
import { Card, ICardTokens, ICardSectionStyles, ICardSectionTokens } from '@uifabric/react-cards';
import { FontWeights } from '@uifabric/styling';
import { IIconStyles, Image, Stack, IStackTokens, Text, ITextStyles, IconButton, IIconProps } from 'office-ui-fabric-react';
import { ContextualMenuItemType } from 'office-ui-fabric-react/lib/ContextualMenu';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { TimelineEvent } from "./Popup/TimelineEvent";
import TimelineService from "../../../services/TimelineService";
import { IPanelModelEnum } from "./Popup/IPanelModeEnum";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';

import * as moment from 'moment';

export interface IActivityProps {
  activity: ITimelineActivity;
  index: number;
  context: WebPartContext;
  onDissmissPanel: (refresh: boolean) => void;
  displayPanel: boolean;
  listName: string;
  layout: string;
  showImage: boolean;
  showDescription: boolean;
  dateFormat: string;
  canEdit: boolean;
}

export interface IActivityState {
  showEventDialog: boolean;
  showDeleteDialog: boolean;
  selectedEvent: ITimelineActivity;
  panelMode?: IPanelModelEnum;
  showImage: boolean;
  showDescription: boolean;
  layout: string;
  dateFormat: string;
}

export default class TimelineActivity extends React.Component<IActivityProps, IActivityState> {
  private TimelineService: TimelineService = null;

  public constructor(props) {
    super(props);

    this.state = {
      showEventDialog: this.props.displayPanel,
      showDeleteDialog: false,
      selectedEvent: null,
      layout: this.props.layout,
      showImage: this.props.showImage,
      showDescription: this.props.showDescription,
      dateFormat: this.props.dateFormat
    };

    this.TimelineService = new TimelineService(
      this.props.context
    );

    this.onSelectEvent = this.onSelectEvent.bind(this);
    this.onDismissPanel = this.onDismissPanel.bind(this);
    this.handleSelectEvent = this.handleSelectEvent.bind(this);
    this._dismissCardDetails = this._dismissCardDetails.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.editEvent = this.editEvent.bind(this);
    this.createEvent = this.createEvent.bind(this);
  }

  private async onDismissPanel(refresh: boolean) {
    if (refresh === true) {
      this.props.onDissmissPanel(true);
    }
  }

  private onSelectEvent(event: any) {
    this.setState({ showEventDialog: true, panelMode: 1 });
  }

  private deleteEvent(TimelineDeleteEvent: ITimelineActivity) {
    this.TimelineService.deleteTimelineActivity(
      this.props.listName,
      TimelineDeleteEvent
    ).then(() => {
      this.setState({
        selectedEvent: null,
        showDeleteDialog: false
      });

      this.props.onDissmissPanel(true);
    });
  }

  private editEvent() {
    this.setState({
      showEventDialog: true,
      panelMode: 2
    });
  }

  private createEvent() {
    this.setState({
      showEventDialog: true,
      panelMode: 1
    });
  }

  public componentWillReceiveProps(nextProps: IActivityProps) {
    this.setState({
      showEventDialog: false,
      selectedEvent: null,
      layout: nextProps.layout,
      showImage: nextProps.showImage,
      showDescription: nextProps.showDescription,
      dateFormat: nextProps.dateFormat
    });
  }

  private _dismissCardDetails() {
    this.setState({ selectedEvent: null });
  }

  private handleSelectEvent(event: ITimelineActivity) {
    this.setState({
      selectedEvent: event
    });
  }

  public render(): React.ReactElement<IActivityProps> {
    const siteTextStyles: ITextStyles = {
      root: {
        color: "#025F52",
        fontWeight: FontWeights.semibold,
      },
    };

    const descriptionTextStyles: ITextStyles = {
      root: {
        color: "#333333",
        fontWeight: FontWeights.regular,
      },
    };

    const helpfulTextStyles: ITextStyles = {
      root: {
        color: "#333333",
        fontWeight: FontWeights.regular,
      },
    };

    const iconStyles: IIconStyles = {
      root: {
        fontSize: 16,
        fontWeight: FontWeights.regular,
      },
    };

    const footerCardSectionStyles: ICardSectionStyles = {
      root: {
        alignSelf: "stretch",
        borderLeft: "1px solid #F3F2F1",
      },
    };

    const sectionStackTokens: IStackTokens = { childrenGap: 20 };
    const cardTokens: ICardTokens = { childrenMargin: 12 };
    const footerCardSectionTokens: ICardSectionTokens = { padding: "0px 0px 0px 12px" };

    const { activity, index, canEdit, showImage, showDescription } = this.props;
    const addToIcon: IIconProps = { iconName: 'AddTo' };
    let activityDate: string = moment(activity.acivityDate).format(this.state.dateFormat);

    return (
      <div>
        {
          this.props.canEdit &&
          <div className={this.state.layout == "Vertical" ? `${styles.timelineAddVertical}` : `${styles.timelineAddHorizontal}`}>
            <IconButton iconProps={addToIcon} title={strings.AddEventLabel} ariaLabel={strings.AddEventLabel} className={styles.addToButton} onClick={this.createEvent} />
          </div>
        }

        <Dialog type={DialogType.normal}
          hidden={!this.state.showDeleteDialog}
          title={strings.DeleteEventLabel}
          subText={strings.DeleteEventConfirmationLabel}
          isBlocking={true}
          containerClassName={'ms-dialogMainOverride'}>
          <DialogFooter>
            <PrimaryButton onClick={() => { this.deleteEvent(this.state.selectedEvent); }} text="Yes" />
            <DefaultButton onClick={() => { this.setState({ selectedEvent: null, showDeleteDialog: false }); }} text="No" />
          </DialogFooter>
        </Dialog>

        <div className={this.state.layout == "Vertical" ? `${styles.timelineContentVertical}` : `${styles.timelineContentHorizontal}`}>
          <div className={this.state.layout == "Vertical" ? `${styles.timelineRowVertical}` : `${styles.timelineRowHorizontal}`}>
            {index % 2 == 1 &&
              <div className={this.state.layout == "Vertical" ? `${styles.timelineColumnVertical}` : `${styles.timelineColumnHorizontal} ${styles.timelineDateHorizontalTop}`}>
                <div className={styles.timelineDate}>
                  <Text styles={helpfulTextStyles}>
                    {activityDate}
                  </Text>
                </div>
              </div>
            }

            <div className={this.state.layout == "Vertical" ? `${styles.timelineColumnVertical}` : `${styles.timelineColumnHorizontal}`}>
              <Stack tokens={sectionStackTokens}>
                {this.state.showEventDialog && (
                  <TimelineEvent
                    event={this.state.selectedEvent}
                    panelMode={this.state.panelMode}
                    onDissmissPanel={this.onDismissPanel}
                    showPanel={this.state.showEventDialog}
                    context={this.props.context}
                    listName={this.props.listName}
                  />
                )}
                <div className={styles.timelineCard}>
                  <Card
                    horizontal
                    tokens={cardTokens}
                  >
                    {
                      showImage && activity.activityPictureUrl &&
                      <Card.Item fill>
                        <Image
                          src={activity.activityPictureUrl ? activity.activityPictureUrl["Url"] : ''}
                          alt={activity.activityTitle}
                          width="100px"
                          height="100px"
                        />
                      </Card.Item>
                    }
                    <Card.Section className={styles.cardSection}>
                      <Text variant="small" styles={siteTextStyles}>
                        {activity.activityLink ? (
                          <a href={activity.activityLink ? activity.activityLink["Url"] : this.props.context.pageContext.site.absoluteUrl} target="_blank">
                            {activity.activityTitle}
                          </a>
                        ) : (
                            activity.activityTitle
                          )}
                      </Text>
                      {
                        showDescription &&
                        <Text styles={descriptionTextStyles} className={styles.description}>
                          {activity.activityDescription}
                        </Text>
                      }
                    </Card.Section>
                    <Card.Section
                      styles={footerCardSectionStyles}
                      tokens={footerCardSectionTokens}
                      className={styles.contextualMenuSection}
                    >
                      {canEdit &&
                        <IconButton
                          id="ContextualMenuButtonMore"
                          text=""
                          split={false}
                          iconProps={{ iconName: "MoreVertical" }}
                          style={{ float: "right", width: "10%" }}
                          menuIconProps={{ iconName: "" }}
                          menuProps={{
                            shouldFocusOnMount: true,
                            items: [
                              {
                                key: "Edit",
                                name: strings.EditEventLabel,
                                onClick: (event) => {
                                  this.setState({ selectedEvent: activity });
                                  this.editEvent();
                                },
                              },
                              {
                                key: "divider_1",
                                itemType: ContextualMenuItemType.Divider,
                              },
                              {
                                key: "Delete",
                                name: strings.DeleteEventLabel,
                                onClick: (event) => {
                                  this.setState({
                                    selectedEvent: activity,
                                    showDeleteDialog: true
                                  });
                                },
                              },
                            ],
                          }}
                        />
                      }
                    </Card.Section>
                  </Card>
                </div>
              </Stack>
            </div>

            {index % 2 == 0 &&
              <div className={this.state.layout == "Vertical" ? `${styles.timelineColumnVertical}` : `${styles.timelineColumnHorizontal} ${styles.timelineDateHorizontal}`}>
                <div className={this.state.layout == "Vertical" ? `${styles.timelineDate} ${styles.alignLeft}` : `${styles.timelineDate}`}>
                  <Text styles={helpfulTextStyles}>
                    {activityDate}
                  </Text>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
