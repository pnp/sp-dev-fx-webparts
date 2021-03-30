import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { useBoolean } from '@uifabric/react-hooks';
import styles from './PhotoSync.module.scss';
import * as strings from 'PhotoSyncWebPartStrings';
import { DetailsList, IColumn, DetailsListLayoutMode, ConstrainMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { ActionButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Dialog } from 'office-ui-fabric-react/lib/components/Dialog/Dialog';
import { DialogType } from 'office-ui-fabric-react/lib/components/Dialog';
import * as moment from 'moment';
import { AppContext, AppContextProps } from '../common/AppContext';
import MessageContainer from '../common/MessageContainer';
import SyncJobResults from './SyncJobResults';
import { MessageScope } from '../common/IModel';
import { PersonaRender, StatusRender, SyncTypeRender } from '../common/FieldRenderer';

const orderBy: any = require('lodash/orderBy');
const filter: any = require('lodash/filter');

export interface ISyncJobsProps {
    dateFormat: string;
}

const SyncJobs: React.FC<ISyncJobsProps> = (props) => {
    const appContext: AppContextProps = useContext(AppContext);
    const actionIcon: IIconProps = { iconName: 'InfoSolid' };
    const refreshIcon: IIconProps = { iconName: 'Refresh' };

    const [refreshLoading, setRefreshLoading] = useState<boolean>(false);
    const [loading, { setTrue: showLoading, setFalse: hideLoading }] = useBoolean(true);
    const [jobs, setJobs] = useState<any[]>([]);
    const [columns, setColumns] = useState<IColumn[]>([]);
    const [filItems, setFilItems] = useState<any[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [hideDialog, setHideDialog] = React.useState<boolean>(true);
    const [jobresults, setJobResults] = React.useState<string>('');
    const [errorMsg, setErrorMessage] = React.useState<string>('');

    const actionClick = (data) => {
        setJobResults(data.SyncResults);
        setErrorMessage(data.ErrorMessage);
        setHideDialog(false);
    };

    const ActionRender = (actionProps) => {
        return (
            <ActionButton iconProps={actionIcon} allowDisabledFocus onClick={() => { actionClick(actionProps); }} disabled={actionProps.disabled} />
        );
    };

    const _buildColumns = () => {
        let cols: IColumn[] = [];
        cols.push({
            key: 'ID', name: 'ID', fieldName: 'ID', minWidth: 50, maxWidth: 50,
            onRender: (item: any, index: number, column: IColumn) => {
                return (<div className={styles.fieldCustomizer}>{item.ID}</div>);
            }
        } as IColumn);
        cols.push({
            key: 'Title', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 150,
            onRender: (item: any, index: number, column: IColumn) => {
                return (<div className={styles.fieldCustomizer}>{item.Title}</div>);
            }
        } as IColumn);
        cols.push({
            key: 'SyncType', name: 'Sync Type', fieldName: 'SyncType', minWidth: 100, maxWidth: 100,
            onRender: (item: any, index: number, column: IColumn) => {
                return <SyncTypeRender Value={item.SyncType} />;
            }
        } as IColumn);
        cols.push({
            key: 'Author', name: 'Author', fieldName: 'Author.Title', minWidth: 250, maxWidth: 250,
            onRender: (item: any, index: number, column: IColumn) => {
                return <PersonaRender Title={item["Author"].Title} UserID={item["Author"].EMail} />;
            }
        } as IColumn);
        cols.push({
            key: 'Created', name: 'Created', fieldName: 'Created', minWidth: 100, maxWidth: 100,
            onRender: (item: any, index: number, column: IColumn) => {
                return (<div className={styles.fieldCustomizer}>{moment(item.Created).format(props.dateFormat ? props.dateFormat : 'DD/MM/YYYY')}</div>);
            }
        } as IColumn);
        cols.push({
            key: 'Status', name: 'Status', fieldName: 'Status', minWidth: 100, maxWidth: 150,
            onRender: (item: any, index: number, column: IColumn) => {
                return <StatusRender Value={item.Status} />;
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

    const _onChangeSearchBox = (srchkey: string) => {
        setSearchText(srchkey);
        if (srchkey && srchkey.length > 0) {
            let filtered: any[] = filter(jobs, (o) => {
                return o.ID.toString().indexOf(srchkey.toLowerCase()) > -1 ||
                    o.Title.toLowerCase().indexOf(srchkey.toLowerCase()) > -1 || o['Author'].Title.toLowerCase().indexOf(srchkey.toLowerCase()) > -1 ||
                    o.Status.toLowerCase().indexOf(srchkey.toLowerCase()) > -1 || o.SyncType.toLowerCase().indexOf(srchkey.toLowerCase()) > -1;
            });
            setFilItems(filtered);
        } else setFilItems(jobs);
    };

    const _loadJobsList = async () => {
        let jobsList: any[] = await appContext.helper.getAllJobs();
        jobsList = orderBy(jobsList, ['ID'], ['desc']);
        setJobs(jobsList);
        setFilItems(jobsList);
    };

    const _buildJobsList = async () => {
        _buildColumns();
        await _loadJobsList();
        hideLoading();
    };

    const _refreshList = async () => {
        setRefreshLoading(true);
        await _loadJobsList();
        setRefreshLoading(false);
    };

    const _closeDialog = () => {
        setHideDialog(true);
    };

    useEffect(() => {
        _buildJobsList();
    }, []);

    return (
        <div>
            {loading ? (
                <ProgressIndicator label={strings.PropsLoader} description={strings.JobsListLoaderDesc} />
            ) : (
                    <div className="ms-Grid-row" style={{ marginBottom: '5px', paddingLeft: '18px' }}>
                        <div className={styles.searchcontainer}>
                            <SearchBox
                                placeholder={`Search...`}
                                onChange={_onChangeSearchBox}
                                underlined={true}
                                iconProps={{ iconName: 'Filter' }}
                                value={searchText}
                                autoFocus={false}
                            />
                        </div>
                        <div className={styles.refreshContainer}>
                            <IconButton iconProps={refreshIcon} title="Refresh" ariaLabel="Refresh" onClick={_refreshList} disabled={refreshLoading} />
                            {refreshLoading &&
                                <Spinner size={SpinnerSize.small} />
                            }
                        </div>
                        {filItems && filItems.length > 0 ? (
                            <div style={{ overflowX: 'auto' }}>
                                <DetailsList
                                    items={filItems}
                                    setKey="set"
                                    columns={columns}
                                    compact={true}
                                    layoutMode={DetailsListLayoutMode.justified}
                                    constrainMode={ConstrainMode.unconstrained}
                                    isHeaderVisible={true}
                                    selectionMode={SelectionMode.none}
                                    enableShimmer={true}
                                />
                            </div>

                        ) : (
                                <MessageContainer MessageScope={MessageScope.Info} Message={strings.EmptyTable} />
                            )}
                    </div>
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
                <SyncJobResults data={jobresults} error={errorMsg} />
            </Dialog>
        </div>
    );
};

export default SyncJobs;