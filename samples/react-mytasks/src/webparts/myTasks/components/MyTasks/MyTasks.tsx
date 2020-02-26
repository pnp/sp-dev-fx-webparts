import * as moment from 'moment';
import * as React from 'react';
import * as strings from 'MyTasksWebPartStrings';
import spservices from './../../../../services/spservices';
import styles from './MyTasks.module.scss';
import TaskCard from './../TaskCard/TaskCard';
import {
  CommandButton,
  Icon,
  IContextualMenuProps,
  IIconProps,
  MessageBar,
  MessageBarType,
  SearchBox,
  Spinner,
  SpinnerSize,
  Stack
} from 'office-ui-fabric-react';
import { escape } from '@microsoft/sp-lodash-subset';
import { IMyTasksProps } from './IMyTasksProps';
import { IMyTasksState } from './IMyTasksState';
import { ITask } from './../../../../services/ITask';
import { NewTask } from './../NewTask/NewTask';

const filterIcon: IIconProps = { iconName: 'Filter' };
const Data: any[] = require('./../../../../services/mockData.json');
/**
 * Filters
 */
export enum filters {
  'All Tasks',
  'Not Started',
  'Started',
  'Completed'
}

/**
 * My tasks
 */
export default class MyTasks extends React.Component<IMyTasksProps, IMyTasksState> {
  private _Tasks: ITask[] = [];
  private _spservices: spservices;

  private menuProps: IContextualMenuProps = {
    items: [
      {
        key: '0',
        text: strings.alltasks,
        iconProps: { iconName: 'TaskSolid' },
        onClick: this.onClickFilterAllTasks.bind(this)
      },
      {
        key: '1',
        text: strings.notStarted,
        iconProps: { iconName: 'StatusCircleRing' },
        onClick: this.onClickFilterNotStartedTasks.bind(this)
      },
      {
        key: '2',
        text: strings.started,
        iconProps: { iconName: 'CircleHalfFull' },
        onClick: this.onClickFilterStartedTasks.bind(this)
      },
      {
        key: '3',
        text: strings.completed,
        iconProps: { iconName: 'CompletedSolid' },
        onClick: this.onClickFilterCompletedTasks.bind(this)
      }
    ]
  };

  constructor(props: IMyTasksProps) {
    super(props);

    this._spservices = new spservices(this.props.context);
    this.state = {
      tasks: [],
      isloading: true,
      currentFilter: filters['All Tasks'],
      currentFilterLabel: filters[0],
      hasError: false,
      errorMessage: undefined,
      hasMoreTasks: false,
      showDialog: false
    };
  }

  /**
   * Determines whether refresh on
   * @param ev
   */
  private _onRefresh = (ev?: any) => {
    const currentFilter: filters = this.state.currentFilter;
    switch (currentFilter) {
      case filters['All Tasks']:
        this.onClickFilterAllTasks(ev);
        break;
      case filters['Not Started']:
        this.onClickFilterNotStartedTasks(ev);
        break;
      case filters.Started:
        this.onClickFilterStartedTasks(ev);
        break;
      case filters.Completed:
        this.onClickFilterCompletedTasks(ev);
        break;
      default:
        break;
    }
  };

  /**
   * Determines whether click filter all tasks on
   * @param ev
   */
  private onClickFilterAllTasks(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
    this.setState({ isloading: true, currentFilter: filters['All Tasks'] });

    this._loadTasks();
  }

  /**
   * Determines whether click filter not started tasks on
   * @param ev
   */
  private async onClickFilterNotStartedTasks(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
    try {
      this.setState({ isloading: true, currentFilter: filters['Not Started'] });
      let filterTasks: ITask[] = await this._filterNotStartTasks();
      filterTasks = await this._sortTasks(filterTasks);
      this.setState({
        tasks: filterTasks,
        isloading: false,
        hasError: false,
        errorMessage: ''
      });
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message, isloading: false });
      console.log('error filter Tasks', error);
    }
  }

  /**
   * Determines whether click filter started tasks on
   * @param ev
   */
  private async onClickFilterStartedTasks(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
    try {
      this.setState({ isloading: true, currentFilter: filters.Started });
      let filterTasks: ITask[] = await this._filterStartedTasks();
      filterTasks = await this._sortTasks(filterTasks);
      this.setState({
        tasks: filterTasks,
        isloading: false,
        hasError: false,
        errorMessage: ''
      });
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message, isloading: false });
      console.log('error filter Tasks', error);
    }
  }

  /**
   * Determines whether click filter completed tasks on
   * @param ev
   */
  private async onClickFilterCompletedTasks(ev: React.MouseEvent<HTMLElement, MouseEvent>) {
    try {
      this.setState({ isloading: true, currentFilter: filters.Completed });
      let filterTasks: ITask[] = await this._filterCompletedTasks();
      filterTasks = await this._sortTasks(filterTasks);
      this.setState({
        tasks: filterTasks,
        isloading: false,
        hasError: false,
        errorMessage: ''
      });
    } catch (error) {
      console.log('error filter Tasks', error);
      this.setState({ isloading: false, hasError: true, errorMessage: error.message });
    }
  }

  private _sortTasks(tasks: ITask[]): Promise<ITask[]> {
    return new Promise((resolve, reject) => {
      const sortedTasks = tasks.sort((a, b) => {
        if (a.orderHint < b.orderHint) return -1;
        if (a.orderHint > b.orderHint) return 1;
        return 0;
      });
      resolve(sortedTasks);
    });
  }
  /**
   * Filters not start tasks
   * @returns not start tasks
   */
  private _filterNotStartTasks(): Promise<ITask[]> {
    return new Promise(async (resolve, reject) => {
      this._Tasks = [];
      try {
        this._Tasks = await this._spservices.getTasks();
        this._Tasks = this._Tasks.filter((task: ITask) => {
          return task.percentComplete == 0;
        });
        resolve(this._Tasks);
      } catch (error) {
        reject(error);
      }
    });
  }

  private async _searchTasks(value: string): Promise<void> {
    this.setState({ isloading: true, currentFilter: filters['All Tasks'] });
    this._Tasks = [];
    try {
      this._Tasks = await this._spservices.getTasks();
      this._Tasks = this._Tasks.filter((task: ITask) => {
        let result: number = task.title.indexOf(`${value}`);
        return result !== -1 ? true : false;
      });
      this.setState({ tasks: this._Tasks, isloading: false, currentFilter: filters['All Tasks'] });
    } catch (error) {
      this.setState({ isloading: false, hasError: true, errorMessage: error.message });
      console.log('error filter Tasks', error);
    }
  }

  /**
   * Filters started tasks
   * @returns started tasks
   */
  private _filterStartedTasks(): Promise<ITask[]> {
    return new Promise(async (resolve, reject) => {
      this._Tasks = [];
      try {
        this._Tasks = await this._spservices.getTasks();
        this._Tasks = this._Tasks.filter((task: ITask) => {
          return task.percentComplete == 50;
        });
        resolve(this._Tasks);
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Filters completed tasks
   * @returns completed tasks
   */
  private _filterCompletedTasks(): Promise<ITask[]> {
    return new Promise(async (resolve, reject) => {
      this._Tasks = [];
      try {
        this._Tasks = await this._spservices.getTasks();
        this._Tasks = this._Tasks.filter((task: ITask) => {
          return task.percentComplete == 100;
        });
        resolve(this._Tasks);
      } catch (error) {
        reject(error);
      }
    });
  }

  public componentDidUpdate(prevProps: IMyTasksProps, prevState: IMyTasksState): void {}

  public async _loadTasks() {
    this._Tasks = [];
    try {
      this.setState({ tasks: this._Tasks, isloading: true });
      this._Tasks = await this._spservices.getTasks();
      this._Tasks = await this._sortTasks(this._Tasks);
      this.setState({
        tasks: this._Tasks,
        isloading: false
      });
    } catch (error) {
      this.setState({ hasError: true, errorMessage: error.message, isloading: false });
    }
  }

  public async componentDidMount() {
    await this._loadTasks();
  }

  /**
   * Determines whether dismiss dialog on
   */
  private _onDismissDialog = (refresh: boolean): void => {
    if (refresh) {
      this.setState({ showDialog: false });
      this._onRefresh();
    } else {
      this.setState({ showDialog: false });
    }
  };

  /**
   * Renders my tasks
   * @returns render
   */
  public render(): React.ReactElement<IMyTasksProps> {
    const renderTasks: JSX.Element[] = [];
    for (const task of this.state.tasks) {
      renderTasks.push(
        <TaskCard
          task={task}
          spservice={this._spservices}
          refreshList={refresh => {
            if (refresh) {
              this._onRefresh();
            }
          }}
        />
      );
    }
    return (
      <div className={styles.myTasks}>
        {this.state.isloading ? (
          <Spinner size={SpinnerSize.medium}></Spinner>
        ) : (
          <>
            {this.state.hasError ? ( // has error
              <MessageBar messageBarType={MessageBarType.error}>{this.state.errorMessage}</MessageBar>
            ) : (
              <>
                <div className={styles.commandButtonsWrapper}>
                  <CommandButton
                    iconProps={{ iconName: 'add' }}
                    text={strings.AddLabel}
                    style={{ flexGrow: 8, paddingRight: 10 }}
                    disabled={false}
                    onClick={(ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
                      this.setState({ showDialog: true });
                    }}
                  />
                  <SearchBox placeholder={strings.SearchLabel} underlined={true} onSearch={this._searchTasks.bind(this)} />
                  <CommandButton
                    iconProps={{ iconName: 'refresh' }}
                    text={strings.RefreshLabel}
                    onClick={this._onRefresh}
                    disabled={false}
                  />
                  <CommandButton
                    iconProps={filterIcon}
                    text={filters[this.state.currentFilter]}
                    menuProps={this.menuProps}
                    disabled={false}
                    checked={true}
                  />
                </div>
                {renderTasks.length === 0 ? ( // has tasks ?
                  <>
                    <div className={styles.noTasksIcon}>
                      <Icon iconName='Taskboard' style={{ fontSize: 55 }} />
                    </div>
                    <div className={styles.noTaskLabel}>
                      <span style={{ fontSize: 22 }}>{strings.NoTaskFoundLabel}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <Stack wrap horizontal horizontalAlign='start'>
                      {renderTasks}
                    </Stack>
                  </>
                )}
                {this.state.showDialog && (
                  <NewTask spservice={this._spservices} displayDialog={this.state.showDialog} onDismiss={this._onDismissDialog} />
                )}
              </>
            )}
          </>
        )}
      </div>
    );
  }
}
