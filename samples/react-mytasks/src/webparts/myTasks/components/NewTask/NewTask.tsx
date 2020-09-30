import * as jsStyles from './NewTaskStyles';
import * as moment from 'moment';
import * as React from 'react';
import styles from './NewTask.module.scss';
import {
  ActionButton,
  CommandButton,
  DatePicker,
  DayOfWeek,
  DefaultButton,
  Dialog,
  DialogFooter,
  DialogType,
  Dropdown,
  FirstWeekOfYear,
  Icon,
  IContextualMenu,
  IContextualMenuItem,
  IconType,
  IDatePickerStrings,
  IDropdownOption,
  IDropdownProps,
  IIconProps,
  ITextFieldProps,
  MessageBar,
  MessageBarType,
  PrimaryButton,
  Spinner,
  SpinnerType,
  Stack,
  TextField,
  Facepile,
  OverflowButtonType,
  PersonaSize,
  IFacepilePersona,
  } from 'office-ui-fabric-react';
import { Assigns } from './../Assigns/Assigns';
import { CommunicationColors } from '@uifabric/fluent-theme/lib/fluent/FluentColors';
import { DefaultPalette, FontSizes, FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { INewTaskProps } from './INewTaskProps';
import { INewTaskState } from './INewTaskState';
import { IPlannerBucket } from '../../../../services/IPlannerBucket';
import { IPlannerPlanExtended } from '../../../../services/IPlannerPlanExtended';
import { IUser } from '../../../../services/IUser';
import { PeoplePicker, PrincipalType } from '@pnp/spfx-controls-react/lib/PeoplePicker';
import { IPlannerPlan } from '../../../../services/IPlannerPlan';
import { IMember } from '../../../../services/IGroupMembers';
import { AssignMode } from '../Assigns/EAssignMode';
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

const textFieldStylesdatePicker: ITextFieldProps = {
  style: { display: 'flex', justifyContent: 'flex-start', marginLeft: 15 },
  iconProps: { style: { left: 0 } }
};

const addFriendIcon: IIconProps = { iconName: 'AddFriend', style: { marginLeft: 0, paddingLeft: 0 } };
const taskBoardIcon: IIconProps = {iconName: 'Taskboard', style: { left: 5, marginLeft: 0, paddingLeft: 0 }};
/**
 * New task
 */
export class NewTask extends React.Component<INewTaskProps, INewTaskState> {
  private _PlansDropDownOption: IDropdownOption[] = [];
  private _assigns: IMember[] = [];
  private  _userPlans:IPlannerPlanExtended[]=[];

  constructor(props: INewTaskProps) {
    super(props);

    this.state = {
      hideDialog: !this.props.displayDialog,
      hasError: false,
      errorMessage: '',
      planSelectedKey: '',
      taskName: '',
      disableAdd: true,
      selectedBucket: undefined,
      buckets: [],
      isLoading: true,
      addAssigns: false,
      dueDate: '',
      calloutTarget: undefined,
      assignments: undefined,
    };
  }

  /**
   * Components did mount
   */
  public async componentDidMount(): Promise<void> {
    this._getUserPlans();
  }

  /**
   * Gets people picker items
   * @param users
   */
  private _getPeoplePickerItems = (users: any[]) => {
   // this._selectedUsers = users;
  }
  /**
   * Closes dialog
   * @param [ev]
   */
  private _closeDialog = (ev?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    this.setState({ hideDialog: true });
    this.props.onDismiss(false);
  }

  /**
   * Determines whether add task on
   */
  private _onAddTask = async (ev?: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    try {

      let taskInfo:string[] = [];
      let assignments:object = {};
      taskInfo['planId'] = this.state.planSelectedKey;
      taskInfo['title'] = this.state.taskName;
      taskInfo['bucketId'] = this.state.selectedBucket.key;
      if (this.state.dueDate !== undefined){
        taskInfo['dueDate'] = this.state.dueDate;
      }
      for ( const user of this._assigns){
         assignments[user.id] = {"@odata.type": "#microsoft.graph.plannerAssignment", "orderHint": " !"};
      }
      taskInfo['assignments'] = assignments;
      const addTaskResult = await this.props.spservice.addTask(taskInfo);
      this.setState({ hideDialog: true });
      this.props.onDismiss(true);

    } catch (error) {
      this.setState({hasError:true, errorMessage: error.message, disableAdd: true});
    }
  }

  /**
   * Get planner buckets of new task
   */
  private _getPlannerBuckets = async (planId: string): Promise<IContextualMenuItem[]> => {
    try {
      const plannerBuckets: IPlannerBucket[] = await this.props.spservice.getPlanBuckets(String(planId));
      let bucketsMenu: IContextualMenuItem[] = [];
      for (const bucket of plannerBuckets) {
        bucketsMenu.push({
          key: bucket.id,
          name: bucket.name,
          onClick: () => {
            this.setState({ selectedBucket: {key: bucket.id, name: bucket.name} });
          }
        });
      }
      return bucketsMenu;
    } catch (error) {
      Promise.reject(error);
    }
  };
  /**
   * Gets user plans
   */
  private _getUserPlans = async () => {
    try {
        this._userPlans = await this.props.spservice.getUserPlans();
      if (this._userPlans.length > 0) {
        for (const plan of this._userPlans) {
          this._PlansDropDownOption.push({ key: String(plan.id), text: plan.title, data: { image: plan.planPhoto, groupId: plan.owner} });
        }
        // Get Planner Buckets
        const bucketsMenu = await this._getPlannerBuckets(String(this._PlansDropDownOption[0].key));
        this.setState({
          buckets: bucketsMenu,
          selectedBucket: {key : bucketsMenu[0].key , name: bucketsMenu[0].name},
          planSelectedKey: this._PlansDropDownOption[0].key,
          isLoading: false,
          hasError: false,
          errorMessage: ''
        });
      }
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message });
    }
  };

  /**
   * Determines whether render option on
   */
  private _onRenderOption = (option: IDropdownOption): JSX.Element => {
    return (
      <div className={styles.selectPlanContainer}>
        {option.data && option.data.image && (
          <Icon
            style={{ marginRight: '8px' }}
            imageProps={{ src: option.data.image, style: { width: 22, height: 22 } }}
            iconType={IconType.Image}
            aria-hidden='true'
          />
        )}
        <span>{option.text}</span>
      </div>
    );
  }

  /**
   * Determines whether render title on
   */
  private _onRenderTitle = (options: IDropdownOption[]): JSX.Element => {
    const option = options[0];

    return (
      <div className={styles.selectPlanContainer}>
        {option.data && option.data.image && (
          <Icon
            style={{ marginRight: '8px' }}
            imageProps={{ src: option.data.image, style: { width: 22, height: 22 } }}
            iconType={IconType.Image}
            aria-hidden='true'
          />
        )}
        <span>{option.text}</span>
      </div>
    );
  };

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
  };

  /**
   * Determines whether change plan on
   */
  private _onChangePlan = async (event: React.FormEvent<HTMLDivElement>, plan: IDropdownOption) => {
    // Get Planner Buckets
    const bucketsMenu = await this._getPlannerBuckets(String(plan.key));
    this._assigns = [];
    this.setState({ buckets: bucketsMenu, selectedBucket: {key: bucketsMenu[0].key, name:bucketsMenu[0].name}, planSelectedKey: plan.key,assignments:[]});
  }

  /**
   * Validate task name of new task
   */
  private _validateTaskName = (value: string): string => {
    if (value.trim().length > 0) {
      this.setState({ taskName: value, disableAdd: false });
      return '';
    } else {
      this.setState({ taskName: value, disableAdd: true });
      return 'Plase enter task name';
    }
  }


  private async _getAssignments(assignments: IMember[]): Promise<IFacepilePersona[]> {
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

  private _onCalloutDismiss = async  (assigns:IMember[]):Promise<void> => {

      this._assigns = assigns;
      const personas = await this._getAssignments(assigns);
      this.setState({ addAssigns: false , assignments: personas});


  }
  /**
   * Determines whether assign on
   */
  private _onAssign = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement |HTMLDivElement>) : void => {

      this.setState({addAssigns: !this.state.addAssigns, calloutTarget: ev.currentTarget});

  }

  /**
   * Determines whether select due date on
   */
  private _onSelectDueDate = (date:Date) => {
    this.setState({dueDate: moment(date).format('L')});
  }


  /**
   * Renders new task
   * @returns render
   */
  public render(): React.ReactElement<INewTaskProps> {
    const hideDialog: boolean = this.state.hideDialog;

    return (
      <div>
        <Dialog

          hidden={hideDialog}
          onDismiss={this._closeDialog}
          minWidth={400}
          maxWidth={400}
          dialogContentProps={{
            type: DialogType.normal,
            title: 'Add Task'
          }}
          modalProps={{
            isBlocking: false,
            styles: jsStyles.modalStyles,

          }}>
          {this.state.isLoading ? (
            <Spinner type={SpinnerType.normal} label='loading...' />
          ) : (
            <>
              <Stack gap='10'>
                {this.state.hasError ? (
                  <MessageBar messageBarType={MessageBarType.error}>{this.state.errorMessage}</MessageBar>
                ) : (
                  <>
                    <Dropdown
                      placeholder='Select an Plan'
                      title='Select an Plan'
                      label=''
                      ariaLabel='Select an Plan'
                      onRenderPlaceholder={this._onRenderPlaceholder}
                      onRenderTitle={this._onRenderTitle}
                      onRenderOption={this._onRenderOption}
                      options={this._PlansDropDownOption}
                      selectedKey={this.state.planSelectedKey}
                      onChange={this._onChangePlan}
                    />
                    <TextField
                      title='task name'
                      styles={jsStyles.textFieldStylesTaskName}
                      borderless={true}
                      placeholder='Please enter task name'
                      required
                      onGetErrorMessage={this._validateTaskName}
                      validateOnLoad={false}
                      value={this.state.taskName}
                    />
                    <Stack gap='0'>
                      <CommandButton
                        id='ContextualMenuButton1'
                        text={this.state.selectedBucket.name}
                        title='select bucket'
                        style={{ backgroundColor: 'white', paddingLeft: 0, color: '#666666' }}
                        checked={true}
                        width='30'
                        split={false}
                        iconProps={taskBoardIcon}
                        menuIconProps={{ iconName: '' }}
                        menuProps={{
                          shouldFocusOnMount: true,
                          items: this.state.buckets
                        }}

                      />

                      <DatePicker
                        title='Select due date'
                        textField={textFieldStylesdatePicker}
                        firstDayOfWeek={DayOfWeek.Sunday}
                        strings={DayPickerStrings}
                        showWeekNumbers={true}
                        firstWeekOfYear={1}
                        showGoToToday={true}
                        showMonthPickerAsOverlay={true}
                        borderless={true}
                        placeholder='Set due date'
                        ariaLabel='Set due date'
                        onSelectDate={this._onSelectDueDate}
                        value={this.state.dueDate !== '' ? moment(this.state.dueDate).toDate():undefined}
                      />
                      <Stack horizontal  horizontalAlign='start' styles={jsStyles.stackStyles} >
                      <ActionButton
                      iconProps={addFriendIcon}
                      checked={true}
                      styles={jsStyles.addMemberButton}
                      text={ this.state.assignments && this.state.assignments.length > 0 ? '': 'Assign'}
                      title='Assign task'
                      onClick={this._onAssign}
                    />
                    {
                      <div onClick={this._onAssign} style={{cursor:'pointer', width:'100%'}}>
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
                    </div>
                     }
                      </Stack>
                    </Stack>
                  </>
                )}
              </Stack>
              <DialogFooter>
                <PrimaryButton onClick={this._onAddTask} text='Add' disabled={this.state.disableAdd} />
                <DefaultButton onClick={this._closeDialog} text='Cancel' />
              </DialogFooter>
            </>
          )}
        </Dialog>
        {this.state.addAssigns && (
          <Assigns
            onDismiss={this._onCalloutDismiss}
            task={undefined}
            plannerPlan={this._userPlans.filter((plan) => { return plan.id === this.state.planSelectedKey;})[0]}
            spservice={this.props.spservice}
             assigns={this._assigns}
             AssignMode={AssignMode.Add}
          />
        )}
      </div>
    );
  }
}
