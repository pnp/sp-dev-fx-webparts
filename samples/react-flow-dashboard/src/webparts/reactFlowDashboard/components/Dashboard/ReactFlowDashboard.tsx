import * as React from 'react';
import styles from './ReactFlowDashboard.module.scss';
import * as strings from 'ReactFlowDashboardWebPartStrings';
import { IReactFlowDashboardProps , Items} from './IReactFlowDashboardProps';
import { IReactFlowDashboardState } from './IReactFlowDashboardState';
import { IFlowRun } from '../RunHistory/IReactFlowRunHistoryProps';
import { WebPartTitle } from '@pnp/spfx-controls-react';
import {
  MessageBar, MessageBarType, IconButton,
  IIconProps, Label, TooltipHost,
  DetailsList, DetailsListLayoutMode, SelectionMode, 
  IColumn, mergeStyles, Spinner, 
  ProgressIndicator,ITooltipHostStyles, Link
} from 'office-ui-fabric-react';
import FlowService from '../../services/FlowService';
import GraphService from '../../services/GraphService';
import { AadTokenProvider } from '@microsoft/sp-http-base';
import FlowRunHistoryPanel from '../RunHistory/index';

const emojiIcon: IIconProps = { iconName: 'Sync' };
const calloutProps = { gapSpace: 0 };
const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };

export default class ReactFlowDashboard extends React.Component<IReactFlowDashboardProps, IReactFlowDashboardState> {

  private _flowService: FlowService;
  constructor(props: IReactFlowDashboardProps | Readonly<IReactFlowDashboardProps>){
    super(props);
    this._renderItemColumn = this._renderItemColumn.bind(this);
    this._flowService = this.props.flowService;
    const columns : IColumn[] = [
      {
        key: 'id',
        name: 'Display name',
        fieldName: 'flowDisplayName',
        minWidth: 100,
        maxWidth: 125,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: true,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'id',
        name: 'Author',
        fieldName: 'flowAuthor',
        minWidth: 100,
        maxWidth: 125,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'id',
        name: 'Name',
        fieldName: 'flowName',
        minWidth: 50,
        maxWidth: 125,
        isRowHeader: true,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        sortAscendingAriaLabel: 'Sorted A to Z',
        sortDescendingAriaLabel: 'Sorted Z to A',
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
      },
      {
        key: 'id',
        name: 'Status',
        fieldName: 'flowState',
        minWidth: 50,
        maxWidth: 70,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        onColumnClick: this._onColumnClick,
        data: 'sting',
        isPadded: true,
      },
      {
        key: 'id',
        name: 'Run history',
        fieldName: 'flowHistory',
        minWidth: 70,
        maxWidth: 100,
        isResizable: true,
        isSorted: false,
        isSortedDescending: false,
        onColumnClick: this._onColumnClick,
        data: 'sting',
        isPadded: true,
      }
    ];

    this.state = {
      flowItems : [],
      columns : columns,
      isLoaded : true, 
      groups: [],
      showFlowEnabledMessage : false,
      isSynced : true,
      openPanel: false
    };
  }

  public async componentDidMount(){
    const {environments, flowService, graphService, provider} = this.props;
    await this.loadFlowDetails(environments, flowService, graphService, provider); 
  }

  public async componentDidUpdate(prevProps: Readonly<IReactFlowDashboardProps>, prevState: IReactFlowDashboardState, snapshot?: any){ 
    const { environments,flowService, graphService, provider} = this.props;
    prevProps.environments !== environments && await this.loadFlowDetails(environments, flowService, graphService, provider);
    prevState.isSynced !== this.state.isSynced && ! this.state.isSynced && await this.loadFlowDetails(environments, flowService, graphService, provider);
  }

  public async loadFlowDetails(environments: string[], flowService:FlowService, graphService:GraphService, provider: AadTokenProvider){

    const data : Items[] = await flowService.getFlowDetails(environments, flowService, graphService, provider);
    const timeNow = new Date().toLocaleString();
    const group = this.getGroupInfo(data);
    this.setState({flowItems : data, isLoaded : data.length > 0 ? false : true, groups : group,isSynced:true, syncedTime:timeNow});
  }

  public getGroupInfo(data:Items[]){

    const groupsMap: { [environment: string]: number } = {}; // To keep track of environment and its count
    const groups: { key: string, name: string, startIndex: number, count: number }[] = [];
  
    data.forEach((item, index) => {
      const environment = item.environment;
      if (groupsMap[environment] === undefined) {
        // If the environment is not in the groupsMap, create a new entry
        groupsMap[environment] = groups.length;
        groups.push({
          key: environment,
          name: environment,
          startIndex: index,
          count: 1
        });
      } else {
        // If the environment is already in the groupsMap, increment the count
        const groupIndex = groupsMap[environment];
        groups[groupIndex].count++;
      }
    });
  
    return groups;
  }

  public onButtonClick = async (item: any): Promise<void> => { 
    this.setState({flowEnabled : true});
    const response = await this._flowService.restartFlow(item.environment, item.flowName);
    if (response && response.success) {
      console.log('Flow restarted successfully.');
      this.setState(
        {
          flowEnabled : false, 
          flowEnabledMessage : `Flow restarted successfully ${response.data} .`, 
          flowEnabledMessageBarType:MessageBarType.success,
          showFlowEnabledMessage : true
        }
      );
    } else {
      console.error('Flow restart failed.');
      console.error('Error message:', response?.error || 'Unknown error');
      this.setState(
        {
          flowEnabled : false, 
          flowEnabledMessage : `Flow restarted successfully ${response?.error} .`, 
          flowEnabledMessageBarType:MessageBarType.error,
          showFlowEnabledMessage : true
        }
      );
    }
  };

  public getFlowRunHistory = async (item: any): Promise<void> => { 
    const response = await this._flowService.fetchFlowRunHistory(item.environment, item.flowName);
    const flowRunHistory : IFlowRun[] = [];
    response.length > 0 &&  response.forEach(e => {
      flowRunHistory.push({
        runName : e.name,
        startTime : e.properties.startTime,
        endTime : e.properties.endTime,
        status : e.properties.status,
        triggername : e.properties.trigger.name
      });
    });
    this.setState({runhistoryItems:response ? response : [], flowrunItems:flowRunHistory, openPanel:true});
  }
  
  public _onSync(){
    this.setState({isSynced:false, showFlowEnabledMessage : false});
  }

  public render(): React.ReactElement<IReactFlowDashboardProps> {
    const {environments, displayMode, webpartTitle, setWebPartTitle} = this.props;
    const {flowItems, columns, isLoaded, groups, flowEnabled, showFlowEnabledMessage, flowEnabledMessageBarType, flowEnabledMessage, syncedTime, flowrunItems, openPanel} = this.state;
    const flowEnabledStatus : JSX.Element = flowEnabled ? <div className={styles.notifications}><ProgressIndicator label="Restarting flow" /></div> : <div/>;
    const _showFlowEnabledMessage : JSX.Element = showFlowEnabledMessage ? <div className={styles.notifications}><MessageBar messageBarType={flowEnabledMessageBarType}>{flowEnabledMessage}<IconButton className={styles.refresh} iconProps={emojiIcon} title="Refresh" ariaLabel="Refresh" disabled={false} checked={false} onClick={this._onSync.bind(this)}/></MessageBar></div> : <div/>;
    const showFlowHistory : JSX.Element = openPanel ? <div><FlowRunHistoryPanel items={flowrunItems|| []} isOpen={openPanel} onDismiss={e => this.setState({flowrunItems:[], openPanel:false})}/> </div>: <div/>
    return (
      <div className={styles.reactFlowDashboard}>
        {
        environments.length ? 
          (
            <React.Fragment>
              {flowEnabledStatus}
              {_showFlowEnabledMessage}
              {showFlowHistory}
              <WebPartTitle
                displayMode={displayMode}
                title={webpartTitle}
                updateProperty={setWebPartTitle} />
              <div className={styles.syncbtn}>
                <Label>Last Updated : {syncedTime}</Label>
                <TooltipHost
                  content="Refresh"
                  id={"SyncToolTipID"}
                  calloutProps={calloutProps}
                  styles={hostStyles}
                >
                <IconButton iconProps={emojiIcon} title="Refresh" ariaLabel="Refresh" disabled={false} checked={false} onClick={this._onSync.bind(this)}/>
                </TooltipHost>
              </div>
              {isLoaded ? (<Spinner label="Loading" ariaLive="assertive" labelPosition="bottom" />) : (
                <DetailsList
                  items={flowItems}
                  groups={groups}
                  columns={columns}
                  onRenderItemColumn={this._renderItemColumn}
                  selectionMode={SelectionMode.none}
                  setKey="none"
                  layoutMode={DetailsListLayoutMode.justified}
                  isHeaderVisible={true}
                />
              )}
            </React.Fragment>

          ) : 
          (
            <MessageBar messageBarType={MessageBarType.error}>
              {strings.EnvironmentEmptyError}
          </MessageBar>
          )
        }
      </div>
    );
  }

  private _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns, flowItems } = this.state;
    const newColumns: IColumn[] = columns.slice();
    const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
    newColumns.forEach((newCol: IColumn) => {
      if (newCol === currColumn) {
        currColumn.isSortedDescending = !currColumn.isSortedDescending;
        currColumn.isSorted = true;
      } else {
        newCol.isSorted = false;
        newCol.isSortedDescending = true;
      }
    });
    const newItems = this._copyAndSort(flowItems, currColumn.fieldName!, currColumn.isSortedDescending); // eslint-disable-line @typescript-eslint/no-non-null-assertion
    this.setState({
      columns: newColumns,
      flowItems: newItems
    });
  }

  private _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
    const key = columnKey as keyof T;
    return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
  }

  public _renderItemColumn(item : Items, index: number, column: IColumn) {
    const fieldContent = item[column.fieldName as keyof Items] as string;
    let fieldColor = "green";
    let showLink : boolean = false;
    switch (column.fieldName) {
      case 'flowState':
        fieldContent.toLocaleLowerCase() === "stopped" || fieldContent.toLocaleLowerCase() === "suspended" ? fieldColor = "red": fieldColor;
        fieldContent.toLocaleLowerCase() === "stopped" || fieldContent.toLocaleLowerCase() === "suspended" ? showLink = true: showLink;
        return (
            showLink ? 
              (<div>
                <span data-selection-disabled={true} className={mergeStyles({ color: fieldColor, height: '100%', display: 'block' })}>
                  {fieldContent}
                </span>
                <div>
                  <Link onClick={()=> this.onButtonClick(item) }>Restart flow</Link>
                </div>
              </div> ): 
              (
                <span data-selection-disabled={true} className={mergeStyles({ color: fieldColor, height: '100%', display: 'block' })}>
                  {fieldContent}
                </span>
              )
        );
      case 'flowHistory':
        return(
          <div>
            <Link onClick={()=> this.getFlowRunHistory(item) }>Get flow run history</Link>
        </div>
        );
      default:
        return <span>{fieldContent}</span>;
    }
  }

}

