import * as React from 'react';
import styles from '../SpupsProperySync.module.scss';
import * as strings from 'SpupsProperySyncWebPartStrings';
import { DetailsList, IColumn, DetailsListLayoutMode, ConstrainMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { IPersonaSharedProps, Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { ActionButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Dialog, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { css } from 'office-ui-fabric-react/lib';
import SPHelper from '../../../../Common/SPHelper';
import * as moment from 'moment/moment';
import MessageContainer from '../MessageContainer';
import { MessageScope } from '../../../../Common/IModel';
import SyncJobResults from './SyncJobResults';

const orderBy: any = require('lodash/orderBy');
const filter: any = require('lodash/filter');

export interface ISyncJobsProps {
    helper: SPHelper;
    dateFormat: string;
}

export default function SyncJobsView(props: ISyncJobsProps) {
    const actionIcon: IIconProps = { iconName: 'InfoSolid' };
    const refreshIcon: IIconProps = { iconName: 'Refresh' };

    const [refreshLoading, setRefreshLoading] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [jobs, setJobs] = React.useState<any[]>([]);
    const [filteredjobs, setFilteredJobs] = React.useState<any[]>([]);
    const [columns, setColumns] = React.useState<IColumn[]>([]);
    const [jobresults, setJobResults] = React.useState<string>('');
    const [errorMsg, setErrorMessage] = React.useState<string>('');
    const [hideDialog, setHideDialog] = React.useState<boolean>(true);
    const [searchKey, setSearchKey] = React.useState<string>('');
    const [emptySearch, setEmptySearch] = React.useState<boolean>(false);

    const actionClick = (data) => {
        setJobResults(data.SyncResults);
        setErrorMessage(data.ErrorMessage);
        setHideDialog(false);
    };
    const StatusRender = (childprops) => {
        switch (childprops.Status.toLowerCase()) {
            case 'submitted':
                return (<div className={css(styles.status, styles.blue)}><Icon iconName="Save" /> {childprops.Status}</div>);
            case 'in-progress':
                return (<div className={css(styles.status, styles.orange)}><Icon iconName="ProgressRingDots" /> {childprops.Status}</div>);
            case 'completed':
                return (<div className={css(styles.status, styles.green)}><Icon iconName="Completed" /> {childprops.Status}</div>);
            case 'error':
            case 'completed with error':
                return (<div className={css(styles.status, styles.red)}><Icon iconName="ErrorBadge" /> {childprops.Status}</div>);
        }
    };
    const ActionRender = (actionProps) => {
        return (
            <ActionButton iconProps={actionIcon} allowDisabledFocus onClick={() => { actionClick(actionProps); }} disabled={actionProps.disabled} />
        );
    };
    const _buildColumns = () => {
        let cols: IColumn[] = [];
        cols.push({ key: 'ID', name: 'ID', fieldName: 'ID', minWidth: 50, maxWidth: 50 } as IColumn);
        cols.push({ key: 'Title', name: 'Title', fieldName: 'Title', minWidth: 250, maxWidth: 250 } as IColumn);
        cols.push({ key: 'SyncType', name: 'Sync Type', fieldName: 'SyncType', minWidth: 150, maxWidth: 150 } as IColumn);
        cols.push({
            key: 'Author', name: 'Author', fieldName: 'Author.Title', minWidth: 250, maxWidth: 250,
            onRender: (item: any, index: number, column: IColumn) => {
                const authorPersona: IPersonaSharedProps = {
                    imageUrl: `/_layouts/15/userphoto.aspx?Size=S&Username=${item["Author"].EMail}`,
                    text: item["Author"].Title,
                };
                return (
                    <div><Persona {...authorPersona} size={PersonaSize.size24} /></div>
                );
            }
        } as IColumn);
        cols.push({
            key: 'Created', name: 'Created', fieldName: 'Created', minWidth: 150, maxWidth: 150,
            onRender: (item: any, index: number, column: IColumn) => {
                return (<div>{moment(item.Created).format(props.dateFormat)}</div>);
            }
        } as IColumn);
        cols.push({
            key: 'Status', name: 'Status', fieldName: 'Status', minWidth: 200, maxWidth: 200,
            onRender: (item: any, index: number, column: IColumn) => {
                return (<StatusRender Status={item.Status} />);
            }
        } as IColumn);
        cols.push({
            key: 'Actions', name: 'Actions', fieldName: 'ID', minWidth: 100, maxWidth: 100,
            onRender: (item: any, index: number, column: IColumn) => {
                let disabled: boolean = ((item.Status.toLowerCase() == "error" && item.ErrorMessage && item.ErrorMessage.length > 0) || item.Status.toLowerCase().indexOf('completed') >= 0) ? false : true;
                return (<ActionRender SyncResults={item.SyncedData} ErrorMessage={item.ErrorMessage} disabled={disabled} />);
            }
        });
        setColumns(cols);
    };
    const _loadJobsList = async () => {
        let jobslist = await props.helper.getAllJobs();
        jobslist = orderBy(jobslist, ['ID'], ['desc']);
        setJobs(jobslist);
    };
    const _buildJobsList = async () => {
        _buildColumns();
        await _loadJobsList();
        setLoading(false);
    };
    const _closeDialog = () => {
        setHideDialog(true);
    };
    const _refreshList = async () => {
        setRefreshLoading(true);
        await _loadJobsList();
        setRefreshLoading(false);
    };
    const _searchJobsList = (srchkey) => {
        setEmptySearch(false);
        setSearchKey(srchkey);
        let filteredList = filter(jobs, (o) => {
            return o.Title.toLowerCase().indexOf(srchkey.toLowerCase()) >= 0 || o['Author'].Title.toLowerCase().indexOf(srchkey.toLowerCase()) >= 0 ||
                o.Status.toLowerCase().indexOf(srchkey.toLowerCase()) >= 0 || o.SyncType.toLowerCase().indexOf(srchkey.toLowerCase()) >= 0;
        });
        if (filteredList.length <= 0) setEmptySearch(true);
        setFilteredJobs(filteredList);
    };

    React.useEffect(() => {
        _buildJobsList();
    }, [props.dateFormat]);


    return (
        <div className={styles.syncjobsContainer}>
            {loading &&
                <ProgressIndicator label={strings.PropsLoader} description={strings.JobsListLoaderDesc} />
            }
            {(!loading && jobs && jobs.length > 0) ? (
                <>
                    <div className={styles.searchcontainer}>
                        <SearchBox placeholder={strings.JobsListSearchPH} underlined={true} value={searchKey} onChange={_searchJobsList} />
                    </div>
                    <div className={styles.refreshContainer}>
                        <IconButton iconProps={refreshIcon} title="Refresh" ariaLabel="Refresh" onClick={_refreshList} disabled={refreshLoading} />
                        {refreshLoading &&
                            <Spinner size={SpinnerSize.small} />
                        }
                    </div>
                    {emptySearch &&
                        <div style={{ marginTop: '-10px', width: '95%' }}>
                            <MessageContainer MessageScope={MessageScope.Failure} Message={strings.EmptySearchResults} />
                        </div>
                    }
                    <DetailsList
                        items={filteredjobs && filteredjobs.length > 0 ? filteredjobs : jobs}
                        setKey="set"
                        columns={columns}
                        compact={true}
                        layoutMode={DetailsListLayoutMode.justified}
                        constrainMode={ConstrainMode.unconstrained}
                        isHeaderVisible={true}
                        selectionMode={SelectionMode.none}
                        enableShimmer={true}
                        className={styles.uppropertylist} />
                </>
            ) : (
                    <>
                        {!loading &&
                            <MessageContainer MessageScope={MessageScope.Info} Message={strings.EmptyTable} />
                        }
                    </>
                )}
            <Dialog hidden={hideDialog} onDismiss={_closeDialog} minWidth='400' maxWidth='700'
                dialogContentProps={{
                    type: DialogType.close,
                    title: `${strings.JobResultsDialogTitle}`
                }}
                modalProps={{
                    isBlocking: true,
                    isDarkOverlay: true,
                    styles: { main: { minWidth: 400, maxHeight: 700 } },
                }}>
                <SyncJobResults helper={props.helper} data={jobresults} error={errorMsg} />
            </Dialog>

        </div>
    );
}

