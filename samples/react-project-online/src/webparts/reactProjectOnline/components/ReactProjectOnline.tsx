import * as React from 'react';
import { stringIsNullOrEmpty } from "@pnp/common";

import * as strings from 'ReactProjectOnlineWebPartStrings';
import styles from './ReactProjectOnline.module.scss';

import { ListView, IViewField, SelectionMode } from "@pnp/spfx-controls-react/lib/ListView";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

import { IReactProjectOnlineProps, ReactProjectOnlineState } from '.';
import { IPOTask } from './../../../shared/interfaces';


export default class ReactProjectOnline extends React.Component<IReactProjectOnlineProps, ReactProjectOnlineState> {

  private _maxResults = 1000;
  private _taskItems: IPOTask[] = [];
  private _selectedTaskItems: IPOTask[] = [];

  constructor(props: IReactProjectOnlineProps) {
    super(props);

    // evaluate if configuration is required, and if so, display a placeholder
    const showPlaceHolder = stringIsNullOrEmpty(this.props.baseProperties.dataSourceId);

    // initialise state
    this.state = {
      dataLoaded: false,
      showPlaceHolder: showPlaceHolder
    };

    // bind functions to set the correct context
    this._onConfigure = this._onConfigure.bind(this);
    this._getTaskSelection = this._getTaskSelection.bind(this);
  }

  // componentDidMount() is invoked immediately after a component is mounted. Initialization that requires DOM nodes should go here.
  // If you need to load data from a remote endpoint, this is a good place to instantiate the network request.
  // Setting state in this method will trigger a re-rendering.
  public async componentDidMount() {
    this.props.webPartContext.statusRenderer.displayLoadingIndicator(document.getElementsByClassName(styles.reactProjectOnline)[0], strings.TitleFieldLabel);

    // load data and update state
    if (!stringIsNullOrEmpty(this.props.baseProperties.dataSourceId)) {
      this._taskItems = await this._getTaskItems();
      this.setState({
        dataLoaded: true
      });
    }
    this.props.webPartContext.statusRenderer.clearLoadingIndicator(document.getElementsByClassName(styles.reactProjectOnline)[0]);
  }

  // componentWillReceiveProps() is invoked before a mounted component receives new props.
  // If you need to update the state in response to prop changes (for example, to reset it), you may compare this.props and nextProps and perform
  // state transitions using this.setState() in this method.
  public async componentWillReceiveProps(props: IReactProjectOnlineProps) {
    // load data and update state
    if (!stringIsNullOrEmpty(this.props.baseProperties.dataSourceId)) {
      this._taskItems = await this._getTaskItems();
      this.setState({
        showPlaceHolder: false,
        dataLoaded: true
      });
    } else {
      this.setState({
        showPlaceHolder: true,
        dataLoaded: false
      });
    }
  }

  public render(): React.ReactElement<IReactProjectOnlineProps> {

    // Fields that need to be viewed in the task listview
    const taskViewFields: IViewField[] = [
      {
        name: 'Name',
        displayName: 'Name',
        sorting: true
      }
    ];

    return (
      <section>
        {this.state.showPlaceHolder &&
          <Placeholder
            iconName='Edit'
            iconText='Configure your web part'
            description='Please configure the web part.'
            buttonLabel='Configure'
            onConfigure={this._onConfigure} />
        }
        <div className={styles.reactProjectOnline}>
          {this.state.dataLoaded &&
            <div className={styles.container}>
              <ListView
                items={this._taskItems}
                viewFields={taskViewFields}
                compact={true}
                selectionMode={SelectionMode.single}
                selection={this._getTaskSelection} />
            </div>
          }
        </div>
      </section>
    );
  }

  private _onConfigure() {
    // Context of the web part
    this.props.webPartContext.propertyPane.open();
  }

  private _getTaskSelection(items: IPOTask[]) {
    this._selectedTaskItems = items;
    console.log(this._selectedTaskItems);

  }

  private async _getTaskItems(): Promise<IPOTask[]> {
    let items: IPOTask[] = [];
    const webUrl = this.props.webPartContext.pageContext.web.absoluteUrl;
    const selectFields = ['ID', 'Name'];
    const filter = '';
    const orderBy = '';

    try {
      // get tasks
      items = await this.props.poDataService.GetProjectTasks(
        webUrl,
        this.props.baseProperties.dataSourceId,
        selectFields,
        filter,
        orderBy,
        this._maxResults
      ) as IPOTask[];

    } catch (error) {
      console.log('Error loading tasks data from data service: ', error);
    }
    return items;
  }
}
