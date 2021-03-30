import * as React from 'react';
import * as strings from 'QuestionnaireMeetingAppWebPartStrings';
import styles from './QuestionnaireMeetingApp.module.scss';
import { IQuestionnaireMeetingAppProps } from './IQuestionnaireMeetingAppProps';
import { IQuestionnaireMeetingAppState } from './IQuestionnaireMeetingAppState';
import { IQuestionnaireItem } from "../../../models/IQuestionnaireItem";
import SPOService from '../../../services/SPOService';
import { PrimaryButton } from 'office-ui-fabric-react';
import { AskQuestion } from './Popup/AskQuestion';
import { ActivityItem, IActivityItemProps, Link, mergeStyleSets } from 'office-ui-fabric-react';
import * as moment from 'moment';

const classNames = mergeStyleSets({
  exampleRoot: {
    marginTop: '20px',
  },
  nameText: {
    fontWeight: 'bold',
  },
});

export default class QuestionnaireMeetingApp extends React.Component<IQuestionnaireMeetingAppProps, IQuestionnaireMeetingAppState> {
  private SPOService: SPOService = null;

  public constructor(props) {
    super(props);

    this.state = {
      infoLoaded: false,
      meetingQuestionnaire: [],
      showPopup: false
    };

    this.SPOService = new SPOService();
    this.onDismissPanel = this.onDismissPanel.bind(this);
  }

  public async componentDidMount() {
    const meetingQuestionnaireInfo: IQuestionnaireItem[] = await this.SPOService.getQuestionnaire(this.props.listName, this.props.context.sdks.microsoftTeams.context.meetingId);

    this.setState({
      infoLoaded: true,
      meetingQuestionnaire: meetingQuestionnaireInfo
    });
  }

  private async onDismissPanel(refresh: boolean) {
    this.setState({ showPopup: false, infoLoaded: false });
    if (refresh === true) {
      const meetingQuestionnaireInfo: IQuestionnaireItem[] = await this.SPOService.getQuestionnaire(this.props.listName, this.props.context.sdks.microsoftTeams.context.meetingId);
      this.setState({
        infoLoaded: true,
        meetingQuestionnaire: meetingQuestionnaireInfo
      });
    }
  }

  public render(): React.ReactElement<IQuestionnaireMeetingAppProps> {
    return (
      <div className={styles.questionnaireMeetingApp}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <PrimaryButton className={styles.button} onClick={() => { this.setState({ showPopup: true }); }} text={strings.AddQuestion} />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.column}>
              <div>
                {
                  this.state.meetingQuestionnaire.map(item => {
                    const activityItem: (IActivityItemProps & { key: string | number }) = {
                      key: item.ID,
                      activityDescription: [
                        <Link
                          key={item.ID}
                          className={classNames.nameText}
                        >
                          {item.Author.Title}
                        </Link>,
                        <span key={2}> {strings.Posted} </span>,
                        <span key={3} className={classNames.nameText}>
                          {item.Title}
                        </span>,
                      ],
                      activityPersonas: [{ imageUrl: `/_layouts/15/userphoto.aspx?size=S&username=${item.Author.EMail}` }],
                      comments: item.Description,
                      timeStamp: moment(item.Modified).format("LLL"),
                    };

                    return (
                      <ActivityItem {...activityItem} key={activityItem.key} className={classNames.exampleRoot} />
                    );
                  })
                }
              </div>

              <div>
                {
                  this.state.showPopup &&
                  <AskQuestion
                    onDissmissPanel={this.onDismissPanel}
                    showPopup={this.state.showPopup}
                    context={this.props.context}
                    listName={this.props.listName}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
