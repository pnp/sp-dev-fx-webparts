import * as jsStyles from './EditTaskStyles';
import * as moment from 'moment';
import * as React from 'react';
import styles from './EditTask.module.scss';
import { Assigns } from './../Assigns/Assigns';
import * as strings from 'MyTasksWebPartStrings';
import { CommunicationColors } from '@uifabric/fluent-theme/lib/fluent/FluentColors';
import { DefaultPalette, FontSizes, FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { getGUID } from '@pnp/pnpjs';
import { IAssignments } from '../../../../services/IAssignments';
import { ICheckListItem } from '../../../../services/ICheckListItem';
import { IEditTaskProps } from './IEditTaskProps';
import { IEditTaskState } from './IEditTaskState';
import { IMember } from '../../../../services/IGroupMembers';
import { IPlannerBucket } from '../../../../services/IPlannerBucket';

import { registerChangeSettingsHandler } from '@microsoft/teams-js';
import { CheckList } from './../CheckList';
import {
  ActionButton,
  Checkbox,
  DatePicker,
  DayOfWeek,
  DialogType,
  Dropdown,
  Icon,
  IContextualMenuItem,
  IDatePickerStrings,
  IDropdownOption,
  IDropdownProps,
  IIconProps,
  ITextFieldProps,
  Label,
  MessageBar,
  MessageBarType,
  Spinner,
  SpinnerType,
  Stack,
  TextField,
  Facepile,
  OverflowButtonType,
  PersonaSize,
  IFacepilePersona,
  Dialog,
  StackItem,
  Callout,

} from 'office-ui-fabric-react';

import {Attachments} from './../Attachments';
import { labelProperties } from '@uifabric/utilities';
import { IPlannerAssignment } from '../../../../services/IPlannerAssignment';
import { getTheme } from '@uifabric/styling';
import { EditCategories} from './../../../../Controls/EditCategories/EditCategories';
import { refreshOptions} from '../TaskCard/ERefreshOptions';
import { ITask } from '../../../../services/ITask';

const DayPickerStrings: IDatePickerStrings = {
  months: [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker'
};

const addFriendIcon: IIconProps = { iconName: 'AddFriend', style: { marginLeft: 0, paddingLeft: 0 } };



/**
 * New task
 */
export class EditTask extends React.Component<IEditTaskProps, IEditTaskState> {

  private _assigns: IMember[] = [];
  private _checkListItems: ICheckListItem[] = [];


  constructor(props: IEditTaskProps) {
    super(props);

    this.state = {
      hideDialog: !this.props.displayDialog,
      hasError: false,
      errorMessage: '',
      progressSelectedKey: this.props.task.percentComplete === 0 ? 0 : this.props.task.percentComplete === 50  ? 50 : 100,
      disableSave: true,
      selectedBucket: undefined,
      buckets: undefined,
      isLoading: true,
      addAssigns: false,
      dueDate: '',
      calloutTarget: undefined,
      displayAssigns: false,
      renderAssigns: [],
      task: this.props.task,
      taskDetails: this.props.taskDetails,
      newCheckListItemTitle: '',
      displayAttachments:false,
      taskChanged: false,
      isCallOut: false,

    };
  }

  /**
   * Get assignments of edit task
   */
  private _getAssignments = async (assignments: IAssignments): Promise<void> => {
    let assignmentsKeys: string[] = [];

    assignmentsKeys = Object.keys(assignments);
    for (const userId of assignmentsKeys) {
      try {
        const user = await this.props.spservice.getUser(userId);
        this._assigns.push(user);
      } catch (error) {
        throw new Error(error);
      }
    }
  }
  /**
   * Render assignments of edit task
   */
  private _renderAssignments = async (assignments: IMember[]): Promise<IFacepilePersona[]> => {
    let personas: IFacepilePersona[] = [];

    for (const user of assignments) {
      try {
        // const userInfo = await this.props.spservice.getUser(user.id);
        const userPhoto = await this.props.spservice.getUserPhoto(user.userPrincipalName);
        personas.push({
          style: { paddingRight: 5 },
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
   * Components did mount
   */
  public async componentWillMount(): Promise<void> {
    const buckets = await this._getPlannerBuckets(this.state.task.planId);
    await this._getAssignments(this.state.task.assignments);
    const renderAssigns = await this._renderAssignments(this._assigns);
    // await this._getCheckListItems(this.state.taskDetails.checklist);
    // const renderCheckListItems = await this._renderCheckListItems(this._checkListItems);

    this.setState({
      buckets: buckets,
      isLoading: false,
      selectedBucket: this.state.task.bucketId,
      renderAssigns: renderAssigns
    });
  }

  /**
   * Components did update
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IEditTaskProps, prevState: IEditTaskState): void {
    if (this.props.displayDialog !== prevProps.displayDialog) {
      this.setState({ hideDialog: !this.props.displayDialog });
    }
    if (this.props.taskDetails !== prevProps.taskDetails) {
      this.setState({ taskDetails: this.props.taskDetails });
    }
  }


  private _displayAttachemnts = (ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => {
        this.setState({displayAttachments: true});
  }
  /**
   * Closes dialog
   * @param [ev]
   */
  private _closeDialog = (ev?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.setState({ hideDialog: true });
    this.props.onDismiss(refreshOptions.card); // Refresh card = 0 Refresh List os Cards = 1
  };

  /**
   * Get planner buckets of new task
   */
  private _getPlannerBuckets = async (planId: string): Promise<IDropdownOption[]> => {
    try {
      const plannerBuckets: IPlannerBucket[] = await this.props.spservice.getPlanBuckets(String(planId));
      let bucketsMenu: IDropdownOption[] = [];
      for (const bucket of plannerBuckets) {
        bucketsMenu.push({
          key: bucket.id,
          text: bucket.name
        });
      }
      return bucketsMenu;
    } catch (error) {
      Promise.reject(error);
    }
  }
  /**
   * Gets user plans
   */

  /**
   * Determines whether render option on
   */
  private _onRenderOption = (option: IDropdownOption): JSX.Element => {

    return (
      <div className={styles.selectPlanContainer}>
        {option.data && option.data.icon && (
          <Icon style={{ marginRight: '8px', color: DefaultPalette.green }} iconName={option.data.icon} aria-hidden='true' />
        )}
        <span>{option.text}</span>
      </div>
    );
  }

  private _onRenderTitleBucket = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];

    return (
      <div className={styles.selectPlanContainer}>
        {option.data && option.data.icon && (
          <Icon style={{ marginRight: '8px' }} iconName={option.data.icon} aria-hidden='true' />
        )}
        <span>{option.text}</span>
      </div>
    );
  }
  /**
   * Determines whether render title on
   */
  private _onRenderTitleProgress = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];

    return (
      <div className={styles.selectPlanContainer}>
        {option.data && option.data.icon && (
          <Icon style={{ marginRight: '8px', color: DefaultPalette.green }} iconName={option.data.icon} aria-hidden='true' />
        )}
        <span>{option.text}</span>
      </div>
    );
  }

  /**
   * Determines whether render placeholder on
   */
  private _onRenderPlaceholder = (props: IDropdownProps): JSX.Element => {
    return (
      <div className={styles.selectPlanContainer}>
        <Icon styles={{ root: { marginRight: '8px', fontSize: 20 } }} iconName={'plannerLogo'} aria-hidden='true' />
        <span>{props.placeholder}</span>
      </div>
    );
  }

  /**
   * Determines whether change bucket on
   */
  private _onChangeBucket = async (event: React.FormEvent<HTMLDivElement>, bucket: IDropdownOption) => {
    // selected Bucket
    try {
      const updatedTask:ITask =  await this.props.spservice.updateTaskProperty(this.state.task.id, 'bucketId', bucket.key, this.state.task["@odata.etag"]);
      this.setState({hasError:false, errorMessage:'',  selectedBucket: bucket.key ,task: updatedTask });
    } catch (error) {
      this.setState({hasError: true, errorMessage: error.message});
    }
  }

  /**
   * Determines whether change progress on
   */
  private _onChangeProgress = async (event: React.FormEvent<HTMLDivElement>, progress: IDropdownOption) => {
    // selected Bucket
    try {
      const updatedTask =   await this.props.spservice.updateTaskProperty(this.state.task.id, 'percentComplete', progress.key, this.state.task["@odata.etag"]);
    this.setState({hasError:false, errorMessage:'',  progressSelectedKey: progress.key , task:updatedTask  });
    } catch (error) {
      this.setState({hasError: true, errorMessage: error.message});
    }
  }

  /**
   * Validate task name of new task
   */
  private _validateTaskName = async (value: string): Promise<string> => {
    if (value.trim().length > 0) {
      return '';
    } else {
      return 'Plase enter task name';
    }
  }

/**
 * Determines whether change task name on
 */
private _onChangeTaskName = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string) => {
  event.preventDefault();
  this.setState({ task: { ...this.state.task, title: newValue}, taskChanged: true});
}

  /**
   * Determines whether blur task name on
   */
  private _onBlurTaskName = async (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>): Promise<void> => {
    event.preventDefault();
  try {
    if (this.state.taskChanged){
      const updatedTask   = await this.props.spservice.updateTaskProperty(this.state.task.id,'title', this.state.task.title, this.state.task["@odata.etag"]);
      this.setState({task:updatedTask , taskChanged: false,hasError:false, errorMessage:''});
  }
  } catch (error) {
    this.setState({hasError: true, errorMessage: error.message});
  }
}
  /**
   * Determines whether change description on
   */
  private _onChangeDescription =  async (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    event.preventDefault();
    this.setState({ taskDetails: { ...this.state.taskDetails, description: newValue }, taskChanged:true,  hasError:false, errorMessage:'' ,});
  }

  /**
   * Determines whether blur description on
   */
  private _onBlurDescription =  async (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    event.preventDefault();
    try {
      if (this.state.taskChanged){
        const updatedTaskDetails   = await this.props.spservice.updateTaskDetailsProperty(this.state.task.id,'description', this.state.taskDetails.description, this.state.taskDetails["@odata.etag"]);
        this.setState({taskDetails:updatedTaskDetails ,taskChanged: false, hasError:false, errorMessage:''});
       }
    } catch (error) {
      this.setState({hasError: true, errorMessage: error.message});
    }


  }
  /**
   * Determines whether select due date on
   */
  private _onSelectDueDate =  async (date: Date) => {
    try {
      const updatedTask  = await this.props.spservice.updateTaskProperty(this.state.task.id,'dueDateTime', moment(date).toISOString(), this.state.task["@odata.etag"]);
      this.setState({ hasError:false, errorMessage:'', task: updatedTask  });
    } catch (error) {
      this.setState({hasError: true, errorMessage: error.message});
    }
  }

  /**
   * Determines whether select start date on
   */
  private _onSelectStartDate = async (date: Date) => {
    try {
      const updatedTask  = await this.props.spservice.updateTaskProperty(this.state.task.id,'startDateTime', moment(date).toISOString(), this.state.task["@odata.etag"]);
      this.setState({ hasError:false, errorMessage:'',task: updatedTask  });
    } catch (error) {
      this.setState({hasError: true, errorMessage: error.message});
    }

  };

  private _onRenderTextField = (props: ITextFieldProps) => {
    return <Checkbox styles={{ checkbox: { height: 17, width: 17 } }}></Checkbox>;
  }
  private _onRenderTextFieldSufix = (props: ITextFieldProps) => {
    return <Icon iconName='delete' />;
  }

  /**
   * Determines whether dismiss assigns on
   */
  private _onDismissAssigns = async (assigns: IMember[]): Promise<void> => {
    try {
      this._assigns = assigns;
    const personas = await this._renderAssignments(assigns);

    let assignments: {[key:string]:IPlannerAssignment} = {} ;
    for (const user of assigns){
       assignments[user.id] = {"@odata.type": "#microsoft.graph.plannerAssignment", "orderHint": " !"};
    }
    const updatedTask   = await this.props.spservice.updateTaskProperty(this.state.task.id,'assignments', assignments, this.state.task["@odata.etag"]);
    this.setState({hasError:false, errorMessage:'',displayAssigns: !this.state.displayAssigns, renderAssigns: personas, task:updatedTask  });
    } catch (error) {
      this.setState({hasError: true, errorMessage: error.message});
    }
  };

  /**
   * Determines whether callout on
   */
  private _onAssigns = (ev?: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement | HTMLDivElement>) => {
    this.setState({ displayAssigns: !this.state.displayAssigns, calloutTarget: ev.currentTarget });
  }


  /**
   * Determines whether check list changed on
   */
  private _onCheckListChanged = (checkListItems: ICheckListItem[]) => {
    console.log(checkListItems);
    this._checkListItems = checkListItems;
  };


  private _onClickDeleteTask = async (ev?: React.MouseEvent<HTMLElement, MouseEvent> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => {
    try {
        await this.props.spservice.deleteTask(this.state.task.id, this.state.task["@odata.etag"]);
        this.setState({ hideDialog: true });
        this.props.onDismiss(refreshOptions.list); // Refresh card = 0 Refresh List os Cards = 1
    } catch (error) {
      this.setState({hasError: true, errorMessage: error.message});
    }
  };
  /**
   * Renders new task
   * @returns render
   */
  public render(): React.ReactElement<IEditTaskProps> {

    const hideDialog: boolean = this.state.hideDialog;

    return (
      <div>
        <Dialog
          hidden={hideDialog}
          onDismiss={this._closeDialog}
          minWidth={650}
          maxWidth={650}

          dialogContentProps={{
            topButtonsProps:[{
                iconProps: {
                  iconName: 'More'
                },
                style:{backgroundColor: '#1fe0' },
                menuIconProps: { iconName: '' },
                menuProps:{
                  items: [

                    {
                      key: '1',
                      text: strings.RemoveLabel,
                      iconProps: { iconName: 'Delete' },
                      onClick: this._onClickDeleteTask.bind(this)
                    }
                  ]
                },
                checked: true
            }],
            type: DialogType.normal,
            title: !this.state.isLoading ? <EditCategories task={this.props.task} spservice={this.props.spservice} plannerPlan={this.props.plannerPlan}/> : ''
          }}
          modalProps={{
            isBlocking: false,
            styles: jsStyles.modalStyles
            //  topOffsetFixed: true
          }}>
          {this.state.isLoading ? (
            <Spinner type={SpinnerType.normal} label={strings.LoadingTaskLabel} />
          ) : (
            <>

            <Stack horizontal horizontalAlign='start' gap='5' style={{marginBottom:2}} disableShrink>

            </Stack>

              <Stack gap='10'>
                {this.state.hasError ? (
                  <MessageBar messageBarType={MessageBarType.error}>{this.state.errorMessage}</MessageBar>
                ) : (
                  <>
                    <TextField
                      title={strings.TaskNameLabel}
                      styles={jsStyles.textFieldStylesTaskName}
                      borderless={true}
                      placeholder={strings.EnterTaskNameLabel}
                      required
                      onGetErrorMessage={this._validateTaskName}
                      onChange={this._onChangeTaskName}
                      onBlur={this._onBlurTaskName}
                      validateOnLoad={false}
                      value={this.state.task.title}
                    />
                    <Stack horizontal horizontalAlign='start' styles={jsStyles.stackStyles}>
                      <ActionButton
                        iconProps={addFriendIcon}
                        checked={true}
                        styles={jsStyles.addMemberButton}
                        text={this.state.renderAssigns && this.state.renderAssigns.length > 0 ? '' : strings.AssignLabel}
                        title={strings.AssignTaskLabel}
                        onClick={this._onAssigns}
                      />
                      {
                        <div onClick={this._onAssigns} style={{ cursor: 'pointer', width: '100%' }}>
                          <Facepile
                            personaSize={PersonaSize.size32}
                            personas={this.state.renderAssigns}
                            maxDisplayablePersonas={10}
                            overflowButtonType={OverflowButtonType.descriptive}
                            overflowButtonProps={{
                              ariaLabel: 'More users',
                              styles: { root: { cursor: 'default' } }
                            }}
                            showAddButton={false}
                          />
                        </div>
                      }
                    </Stack>

                    <Stack
                      tokens={jsStyles.stackTokens}
                      horizontal
                      wrap
                      disableShrink
                      horizontalAlign='space-between'
                      gap={25}
                      style={{ marginTop: 30 }}>
                      <div style={{ width: 172 }}>
                        <Dropdown
                          placeholder={strings.SelectBucketPlaceHolder}
                          styles={jsStyles.dropDownBucketStyles}
                          dropdownWidth={172}
                          title={strings.SelectBucketLabel}
                          label={strings.SelectBucketLabel}
                          ariaLabel={strings.SelectBucketPlaceHolder}
                          options={this.state.buckets}
                          selectedKey={this.state.selectedBucket}
                          onChange={this._onChangeBucket}
                        />
                      </div>

                      <div style={{ width: 172 }}>
                        <Dropdown
                          placeholder={strings.ProgressPlaceHolder}
                          title={strings.ProgressLabel}
                          label={strings.ProgressLabel}
                          styles={jsStyles.dropDownProgressStyles}
                          dropdownWidth={172}
                          ariaLabel={strings.ProgressLabel}
                          onRenderPlaceholder={this._onRenderPlaceholder}
                          onRenderTitle={this._onRenderTitleProgress}
                          onRenderOption={this._onRenderOption}
                          options={[
                            {
                              key: 0,
                              text: strings.notStarted,
                              data: { icon: 'StatusCircleRing' }
                            },
                            {
                              key: 50,
                              text: strings.started,
                              data: { icon: 'CircleHalfFull' }
                            },
                            {
                              key: 100,
                              text: strings.completed,
                              data: { icon: 'CompletedSolid' }
                            }
                          ]}
                          selectedKey={this.state.progressSelectedKey}
                          onChange={this._onChangeProgress}
                          //onChange={this._onChangePlan}
                        />
                      </div>
                      <div style={{ width: 172 }}>
                        <DatePicker
                         textField={jsStyles.textFielStartDateDatePickerStyles}
                          title={strings.StartDateLabel}
                          label={strings.StartDateLabel}
                          firstDayOfWeek={DayOfWeek.Sunday}
                          strings={DayPickerStrings}
                          showWeekNumbers={true}
                          firstWeekOfYear={1}
                          showGoToToday={true}
                          showMonthPickerAsOverlay={true}
                          borderless={true}
                          placeholder={strings.StartDateLabel}
                          ariaLabel={strings.StartDateLabel}
                          onSelectDate={this._onSelectStartDate}
                          value={
                            this.state.task.startDateTime  ? moment(this.state.task.startDateTime).toDate() : undefined
                          }
                        />
                      </div>

                      <div style={{ width: 172 }}>
                        <DatePicker
                          title={strings.DueDateLabel}
                          style={{ margin: 0 }}
                          label={strings.DueDateLabel}
                          firstDayOfWeek={DayOfWeek.Sunday}
                          textField={jsStyles.textFielDueDateDatePickerStyles}
                          //  style={{ width: 172, marginTop: 0, marginLeft: 0, marginRight: 'auto' }}
                          strings={DayPickerStrings}
                          showWeekNumbers={true}
                          firstWeekOfYear={1}
                          showGoToToday={true}
                          showMonthPickerAsOverlay={true}
                          borderless={true}
                          placeholder={strings.DueDateLabel}
                          ariaLabel={strings.DueDateLabel}
                          onSelectDate={this._onSelectDueDate}
                          value={this.state.task.dueDateTime ? moment(this.state.task.dueDateTime).toDate() : undefined}
                        />
                      </div>
                    </Stack>
                    <TextField
                      borderless={true}
                      label={strings.DescriptionLabel}
                      onChange={this._onChangeDescription}
                      onBlur={this._onBlurDescription}
                      multiline
                      value={this.state.taskDetails ? this.state.taskDetails.description : ''}
                      styles={jsStyles.textFieldDescriptionStyles}>
                      </TextField>
                      <Label>{strings.CheckListLabel}</Label>
                      <CheckList taskDetails={this.state.taskDetails} spservice={this.props.spservice} onCheckListChanged={this._onCheckListChanged}/>
                      <Label style={{marginTop:20}}>{strings.AttachmentsLabel}</Label>
                      <Attachments groupId={this.props.plannerPlan.owner} spservice={this.props.spservice} taskDetails={this.state.taskDetails}/>

                  </>
                )}
              </Stack>
            </>
          )}
        </Dialog>

        {this.state.displayAssigns && (
          <>
          <Assigns
            target={this.state.calloutTarget}
            onDismiss={this._onDismissAssigns}
            task={this.props.task}
            plannerPlan={this.props.plannerPlan}
            spservice={this.props.spservice}
            assigns={this._assigns}
            AssignMode={1}
          />
          </>
        )}
      </div>
    );
  }
}
