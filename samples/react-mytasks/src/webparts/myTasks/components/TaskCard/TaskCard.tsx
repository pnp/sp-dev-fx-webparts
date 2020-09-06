import * as moment from 'moment';
import * as React from 'react';
import styles from './TaskCard.module.scss';
import * as strings from 'MyTasksWebPartStrings';
import {
  DocumentCard,
  DocumentCardTitle,
  Facepile,
  Icon,
  IconButton,
  IFacepilePersona,
  Link,
  MessageBar,
  MessageBarType,
  OverflowButtonType,
  PersonaSize,
  Separator,
  Spinner,
  SpinnerSize,
  Text
} from 'office-ui-fabric-react';
import { EditTask } from './../EditTask/EditTask';
import { FontSizes } from '@uifabric/fluent-theme/lib/fluent/FluentType';
import { graph } from '@pnp/graph';
import { IAssignments } from '../../../../services/IAssignments';
import { IIdentitySet } from './../../../../services/IIdentitySet';
import { IPlannerPlan } from './../../../../services/IPlannerPlan';
import { IPlannerPlanDetails } from './../../../../services/IPlannerPlanDetails';
import { ITask } from './../../../../services/ITask';
import { ITaskCardProps } from './ITaskCardProps';
import { ITaskCardState } from './ITaskCardState';
import { ITaskDetails } from '../../../../services/ITaskDetails';
import { IUser } from './../../../../services/IUser';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Text as stringText } from '@microsoft/sp-core-library';
import { refreshOptions } from './ERefreshOptions';
export enum ETaskStatus {
  Completed,
  NotStarted,
  Started
}

const categoriesColors: Object = {
  category1: '#e000f1',
  category2: '#f44b1d',
  category3: '#e39e27',
  category4: '#aee01e',
  category5: '#46A08E',
  category6: '#62cef0'
};

const plannerUrl: string = `https://tasks.office.com/{0}/en-us/Home/PlanViews/{1}`;

export default class TaskCard extends React.Component<ITaskCardProps, ITaskCardState> {
  private _plannerPlanDetails: IPlannerPlanDetails = undefined;
  private domain: string = this.props.spservice.currentUser.split('@')[1];

  constructor(props: ITaskCardProps) {
    super(props);

    this.state = {
      isloading: true,
      plannerInfo: null,
      hasError: false,
      errorMessage: '',
      taskDetails: null,
      assignments: [],
      task: this.props.task,
      isloadingAssigments: false,
      showEditDialog: false
    };
  }

  /**
   * Gets assignments
   * @param assignments
   * @returns assignments
   */
  private async _getAssignments(assignments: IAssignments): Promise<IFacepilePersona[]> {
    let personas: IFacepilePersona[] = [];
    let assignmentsKeys: string[] = [];
    assignmentsKeys = Object.keys(assignments);
    for (const userId of assignmentsKeys) {
      try {
        const user = await this.props.spservice.getUser(userId);
        const userPhoto = await this.props.spservice.getUserPhoto(user.userPrincipalName);
        personas.push({
          style: { paddingRight: 5, cursor: 'default' },
          personaName: user.displayName,
          imageUrl: userPhoto
        });
      } catch (error) {
        throw new Error(error);
      }
    }
    return personas;
  }

  /**
   * Gets user completed task
   * @param completedBy
   * @returns user completed task
   */
  private async _getUserCompletedTask(completedBy: IIdentitySet): Promise<IFacepilePersona[]> {
    let personas: IFacepilePersona[] = [];
    const user: IUser = completedBy.user;

    try {
      const userInfo = await this.props.spservice.getUser(user.id);
      const userPhoto = await this.props.spservice.getUserPhoto(userInfo.userPrincipalName);
      personas.push({
        style: { paddingRight: 5, cursor: 'default' },
        personaName: userInfo.displayName,
        imageUrl: userPhoto
      });
    } catch (error) {
      throw new Error(error);
    }
    return personas;
  }
  /**
   * Loads task
   */
  private async _loadTask() {
    try {
      let assignments: string[] = [];
      const task: ITask = await this.props.spservice.getTaskById(this.props.task.id);
      const taskDetails: ITaskDetails = await this.props.spservice.getTaskDetails(this.props.task.id);
      const plannerPlan: IPlannerPlan = await this.props.spservice.getPlan(task.planId);
      this._plannerPlanDetails = await this.props.spservice.getPlanDetails(task.planId);

      let personas: IFacepilePersona[] = [];

      this.setState({
        isloading: false,
        isloadingAssigments: true,
        plannerInfo: plannerPlan,
        taskDetails: taskDetails,
        task: task,
        assignments: personas
      });

      if (this.state.task.percentComplete < 100) {
        // Get Assignments
        personas = await this._getAssignments(this.state.task.assignments);
      } else {
        personas = await this._getUserCompletedTask(this.state.task.completedBy);
      }

      this.setState({
        isloadingAssigments: false,
        assignments: personas
      });
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message });
    }
  }
  /**
   * Components did mount
   * @returns did mount
   */
  public async componentDidMount(): Promise<void> {
    await this._loadTask();
  }

  /**
   * Determines whether dismiss dialog on
   */
  private _onDismissDialog = async (refresh: refreshOptions): Promise<void> => {
    if (refresh === refreshOptions.card) {
      this.setState({ showEditDialog: false });
      await this._loadTask();
    }
    if (refresh === refreshOptions.list) {
      this.setState({ showEditDialog: false });
      this.props.refreshList(true);
    }
    if (refresh === refreshOptions.none) {
      this.setState({ showEditDialog: false });
    }
  };
  /**
   * Components did update
   * @param prevProps
   * @param prevState
   * @returns did update
   */
  public async componentDidUpdate(prevProps: ITaskCardProps, prevState: ITaskCardState): Promise<void> {}

  /**
   * Determines whether task status click on
   */
  private onTaskStatusClick = async (ev: React.MouseEvent<HTMLButtonElement>) => {
    try {
      ev.preventDefault();
      ev.stopPropagation();
      const taskStatus: string = ev.currentTarget.getAttribute('data-status');
      const taskId: string = ev.currentTarget.getAttribute('data-taskId');
      const taskEtag: string = ev.currentTarget.getAttribute('data-taskEtag');
      if (Number(taskStatus) !== 0) {
        await this.props.spservice.updateTaskAsCompleted(taskId, taskEtag);
        await this._loadTask();
      } else {
        await this.props.spservice.updateTaskNotStarted(taskId, taskEtag);
        await this._loadTask();
      }
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message });
    }
  };

  /**
   * Renders task card
   * @returns render
   */
  public render(): React.ReactElement<ITaskCardProps> {
    let iconStatus: string = 'StatusCircleCheckmark';
    let documentCardClass: string = styles.documentCard;
    let taskTitleClass: string = '';
    let percentCompleted: string = '';
    let percentCompletedLabel: string = '';

    let statusIconStyle: string = styles.statusIconStyleInProgressNotStarted;
    let buttonIconStatus: string = styles.buttonIconStatusInProgressNotStarted;
    let dueDate: boolean = false;
    let nrCheckListItemsCompleted: number = 0;
    let taskStatus: ETaskStatus = ETaskStatus.NotStarted;
    let appliedCategories: JSX.Element[] = [];
    let completedTaskByUserLabel: string = '';
    let dueDateStyle: string = styles.taskDetails;
    let iconClasDueDate: string = styles.iconClass;
    let dueDateValue: string = undefined;
    let plannerPlanUrl: string = undefined;

    if (!this.state.isloading) {
      if (this.state.task.dueDateTime) {
        dueDateValue = moment(this.state.task.dueDateTime).format('l');
        const dueDateValueYear = moment(this.state.task.dueDateTime).year();
        const currentYear = moment().year();
        if (dueDateValueYear === currentYear) {
          dueDateValue = dueDateValue.replace(`/${dueDateValueYear}`, '');
        }
        dueDate = moment(this.state.task.dueDateTime).isBefore(moment());
      }

      nrCheckListItemsCompleted = this.state.task.checklistItemCount - this.state.task.activeChecklistItemCount;
      const percentCompletedValue: number = this.state.task.percentComplete;

      switch (percentCompletedValue) {
        case 0:
          percentCompleted = 'StatusCircleRing';
          percentCompletedLabel = strings.NotStartedLabel;
          taskStatus = ETaskStatus.NotStarted;
          completedTaskByUserLabel = '';
          dueDateStyle = dueDate ? styles.dueDate : styles.taskDetails;
          iconClasDueDate = dueDate ? styles.iconClassDue : styles.iconClass;
          break;
        case 50:
          percentCompleted = 'CircleHalfFull';
          percentCompletedLabel = strings.InProgressLabel;
          taskStatus = ETaskStatus.Started;
          completedTaskByUserLabel = '';
          dueDateStyle = dueDate ? styles.dueDate : styles.taskDetails;
          iconClasDueDate = dueDate ? styles.iconClassDue : styles.iconClass;
          break;
        case 100:
          percentCompleted = 'CompletedSolid';
          percentCompletedLabel = strings.completed;
          iconStatus = 'RevToggleKey';
          documentCardClass = styles.documentCardCompleted;
          taskTitleClass = styles.taskTitleCompleted;
          statusIconStyle = styles.statusIconStyleCompleted;
          buttonIconStatus = styles.buttonIconStatusCompleted;
          taskStatus = ETaskStatus.Completed;
          dueDateStyle = styles.taskDetails;
          iconClasDueDate = styles.iconClass;
          completedTaskByUserLabel = `${strings.CompletedTaskOnLabel} ${moment(this.state.task.completedDateTime).format('LL')}`;
          break;
        default:
          break;
      }

      const categoryKeys = Object.keys(this.state.task.appliedCategories);

      for (const key of categoryKeys) {
        appliedCategories.push(
          <div
            title={
              this._plannerPlanDetails && this._plannerPlanDetails.categoryDescriptions
                ? this._plannerPlanDetails.categoryDescriptions[key]
                : ''
            }
            style={{
              width: 8,
              height: 15,
              marginTop: 2,
              top: 17,
              backgroundColor: this.state.task.appliedCategories[key] ? categoriesColors[key] : 'white'
            }}></div>
        );
      }
    }

    return (
      <>
        <DocumentCard
          className={documentCardClass}
          key={this.props.task.id}
          data-taskId={this.state.task.id}
          onClick={ev => {
            ev.preventDefault();
            ev.stopPropagation();
            this.setState({ showEditDialog: true });
          }}>
          {this.state.hasError ? (
            <MessageBar messageBarType={MessageBarType.error}>{this.state.errorMessage}</MessageBar>
          ) : (
            <div>
              {this.state.isloading ? (
                <Spinner size={SpinnerSize.medium} label={strings.LoadingTaskLabel} style={{ marginTop: 40 }}></Spinner>
              ) : (
                <>
                  <div>
                    <div style={{ width: '10px', position: 'absolute', right: 0 }}>{appliedCategories}</div>
                    <div className={styles.documentCardTitle}>
                      <Link
                        onClick={ev => {
                          ev.preventDefault();
                          ev.stopPropagation();
                          plannerPlanUrl = stringText.format(plannerUrl, this.domain, this.state.plannerInfo.id);
                          window.open(plannerPlanUrl);
                        }}>
                        {this.state.plannerInfo.title}
                      </Link>
                    </div>
                    <div className={styles.iconBottomDiv}>
                      <IconButton
                        iconProps={{
                          iconName: iconStatus,
                          className: statusIconStyle
                        }}
                        checked={false}
                        className={buttonIconStatus}
                        data-status={taskStatus}
                        data-taskId={this.state.task.id}
                        data-taskEtag={this.state.task['@odata.etag']}
                        onClick={this.onTaskStatusClick}
                      />
                    </div>

                    <DocumentCardTitle title={this.state.task.title} shouldTruncate className={taskTitleClass} />
                    <Text variant={'smallPlus'} block className={styles.textStyles}>
                      {this.state.taskDetails.description}
                    </Text>
                  </div>
                  <Separator />
                  <div style={{ display: 'flex', justifyContent: 'left' }}>
                    {dueDateValue && (
                      <div className={dueDateStyle} title={`Due ${dueDateValue}`}>
                        <Icon iconName='Calendar' className={iconClasDueDate} />
                        {dueDateValue}
                      </div>
                    )}

                    {this.state.task.conversationThreadId && (
                      <div className={styles.taskDetails} title={strings.HasCommentsLabel}>
                        <Icon iconName='Message' className={styles.iconClass} />
                      </div>
                    )}
                    {this.state.task.referenceCount > 0 && (
                      <div className={styles.taskDetails} title={strings.HasAttachementsLabel}>
                        <Icon iconName='Attach' className={styles.iconClass} />
                        {this.state.task.referenceCount}
                      </div>
                    )}
                    {this.state.task.checklistItemCount > 0 && (
                      <div
                        className={styles.taskDetails}
                        title={`${nrCheckListItemsCompleted} of ${this.props.task.checklistItemCount} ${strings.CheckListItemsCompletedLabel}`}>
                        <Icon iconName='CheckboxComposite' className={styles.iconClass} />
                        {nrCheckListItemsCompleted}/{this.state.task.checklistItemCount}
                      </div>
                    )}
                  </div>

                  <Separator style={{ paddingBottom: 0 }} />
                  <div>
                    <DocumentCardTitle
                      className={styles.documentCardTitleStyle}
                      styles={{ root: { paddingTop: 0 } }}
                      title={'Progress'}
                      showAsSecondaryTitle
                    />
                    <div title={percentCompletedLabel}>
                      <Icon iconName={percentCompleted} className={styles.progressIcon} />
                      <div className={styles.progress}>{percentCompletedLabel}</div>
                    </div>
                  </div>
                  <Separator />
                  <div style={{ margin: 10 }}>
                    {this.state.isloadingAssigments ? (
                      <Spinner size={SpinnerSize.small} style={{ marginTop: 10 }}></Spinner>
                    ) : (
                      <>
                        <Facepile
                          personaSize={PersonaSize.size32}
                          personas={this.state.assignments}
                          maxDisplayablePersonas={5}
                          overflowButtonType={OverflowButtonType.descriptive}
                          overflowButtonProps={{
                            ariaLabel: 'More users',
                            styles: { root: { cursor: 'default' } }
                          }}
                          showAddButton={false}
                        />
                        <Text variant={'small'} block style={{ marginLeft: 47 }}>
                          {completedTaskByUserLabel}
                        </Text>
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </DocumentCard>
        <>
          {this.state.showEditDialog && (
            <EditTask
              plannerPlan={this.state.plannerInfo}
              task={this.state.task}
              taskDetails={this.state.taskDetails}
              displayDialog={this.state.showEditDialog}
              spservice={this.props.spservice}
              onDismiss={this._onDismissDialog}
            />
          )}
        </>
      </>
    );
  }
}
