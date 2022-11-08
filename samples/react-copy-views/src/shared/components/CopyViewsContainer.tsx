/* eslint-disable react/jsx-no-bind */
import * as React from 'react';
import { IList, IListView, ICopyTask, IDefaults } from '../interfaces';
import { CopyTaskState } from '../enums';
import { ServiceScope } from '@microsoft/sp-core-library';
import { IListViewsService, ListViewsService } from '../services';
import * as strings from 'CopyViewsSharedStrings';
import styles from './../SharedStyles.module.scss';
import { SourceListViewForm, TargetListForm, CopyStatus } from '.';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';

interface ICopyViewsContainerProps {
  serviceScope: ServiceScope;
  resultSourceId?: string;
  showCancel?: boolean;
  defaultValues?: IDefaults;
  onCopied: () => void;
  onCancel?: () => void;
}

interface ICopyViewsContainerState {
  sourceList?: IList;
  sourceViews?: IListView[];
  targetLists?: IList[];
  showCopyStatus: boolean;
  copyTasks?: ICopyTask[];
  error?: string;
  showErrorDetails: boolean;
  setAsDefaultView: boolean;
}

export class CopyViewsContainer extends React.Component<ICopyViewsContainerProps, ICopyViewsContainerState> {
  private _listViewsService: IListViewsService;

  public constructor(props: ICopyViewsContainerProps) {
    super(props);

    this._listViewsService = props.serviceScope.consume(ListViewsService.serviceKey);

    this.state = {
      showCopyStatus: false,
      showErrorDetails: false,
      setAsDefaultView: false,
      sourceViews: null
    }
  }

  public render(): React.ReactElement<ICopyViewsContainerProps> {
    const { serviceScope, resultSourceId, defaultValues, showCancel, onCancel } = this.props;
    const { sourceViews, targetLists, error, showErrorDetails, showCopyStatus, copyTasks, sourceList, setAsDefaultView } = this.state;

    const copyingDisabled = !(targetLists?.length > 0 && sourceViews?.length > 0);

    return <>          
      <h2 className={styles.title}>{ !showCopyStatus ? strings.CopyViews : strings.CopyStatus }</h2>
      { 
        error && <MessageBar 
          messageBarType={MessageBarType.error} 
          isMultiline={false}
          actions={
            <div>
              <Link onClick={() => this.setState({ showErrorDetails: !showErrorDetails })}>{strings.SeeMore}</Link>
            </div>
          }
          onDismiss={() => this.setState({ error: undefined })} 
          overflowButtonAriaLabel={strings.SeeMore}>
          {strings.ErrorOccurred}
          { showErrorDetails && <><br/>{error}</> }
        </MessageBar>
      }
      {      
        <div className={showCopyStatus && styles.formHidden}>
          <div className={styles.row}>
            <div className={styles.column}>
              <SourceListViewForm serviceScope={serviceScope} defaultValues={defaultValues} resultSourceId={resultSourceId} onSelectionUpdate={this._onSelectionUpdate} onError={this._onError} />
              <Checkbox label={strings.SetAsDefaultView} disabled={sourceViews?.length > 1} checked={setAsDefaultView} onChange={() => this.setState({ setAsDefaultView: !setAsDefaultView})} className={styles.checkboxSetDefaultView} /> 
            </div>
            <div className={styles.column}>
              <TargetListForm serviceScope={serviceScope} baseType={sourceList?.type} exclude={sourceList} resultSourceId={resultSourceId} onSelectionUpdate={(lists: IList[]) => this.setState({ targetLists: lists })} onError={this._onError} />
            </div>
          </div>     
          <div>
            <Stack tokens={{ childrenGap: 10 }} horizontal reversed style={{marginTop: 10}}>
              <PrimaryButton disabled={copyingDisabled} text={strings.Copy} onClick={this._copyViews}  />
              { showCancel && <DefaultButton text={strings.CloseDialog} onClick={() => onCancel()} /> }
            </Stack>
          </div>     
        </div>
      }
      {        
        showCopyStatus && <>
          <CopyStatus copyTasks={copyTasks} onRetry={this._retryCopyTask} />
          <div>
            <Stack tokens={{ childrenGap: 10 }} horizontal reversed style={{marginTop: 10}}>
              <PrimaryButton disabled={copyTasks.some(t => t.state === CopyTaskState.Busy)} text={strings.CopyAnotherView} onClick={() => this.setState({ showCopyStatus: false, copyTasks: [] })}  />
              { showCancel && <DefaultButton disabled={copyTasks.some(t => t.state === CopyTaskState.Busy)} text={strings.CloseDialog} onClick={() => onCancel()}  /> }
            </Stack>
          </div> 
        </>
      }
    </>;
  }  

  private _onSelectionUpdate = (listViews: IListView[], list: IList): void => {
    const { setAsDefaultView } = this.state;
    this.setState({ sourceViews: listViews, sourceList: list, setAsDefaultView: listViews?.length > 1 ? false : setAsDefaultView });
  }

  private _copyViews = async (): Promise<void> => {    
    const { sourceViews, targetLists } = this.state;
    
    const copyingDisabled = !(targetLists?.length > 0 && sourceViews?.length > 0);
    
    if (copyingDisabled) {
      return;
    }

    const copyTasks: ICopyTask[] = [];
    let index = 0;

    sourceViews.forEach(sourceView => {
      targetLists.forEach(targetList => {
        index++;
        copyTasks.push({ index, sourceView, targetList, state: CopyTaskState.Busy });
      });
    });

    this.setState({ showCopyStatus: true, copyTasks }, async () => {
      await Promise.all(copyTasks.map(copyTask => this._copyView(copyTask)));
    });
  }

  private _copyView =  async (copyTask: ICopyTask): Promise<void> => {
    const { setAsDefaultView } = this.state;

    try {      
      await this._listViewsService.copy(copyTask.sourceView, copyTask.targetList.siteUrl, copyTask.targetList.id, setAsDefaultView);

      const { copyTasks } = this.state;
      const currentCopyTask = copyTasks.filter(c => c.index === copyTask.index)[0];
      currentCopyTask.state = CopyTaskState.Done;
      
      this.setState({ copyTasks });
    }
    catch (error) {
      if (console && console.error && error) {
        console.error(error);
      }

      const { copyTasks } = this.state;
      const currentCopyTask = copyTasks.filter(c => c.index === copyTask.index)[0];
      currentCopyTask.state = CopyTaskState.Error;
      currentCopyTask.error = error?.message;
      
      this.setState({ copyTasks });
    }
  }

  private _onError = (error: Error): void => {
    if (console && console.error && error) {
      console.error(error);
    }
    this.setState({ error: error?.message, showErrorDetails: false });
  }
    
  private _retryCopyTask = async (copyTask: ICopyTask): Promise<void> => {
    const { copyTasks } = this.state;
    
    const currentCopyTask = copyTasks.filter(c => c.index === copyTask.index)[0];
    currentCopyTask.state = CopyTaskState.Busy;
    currentCopyTask.error = undefined;

    this.setState({ copyTasks }, async () => {
      await this._copyView(currentCopyTask);
    });
  }
}
