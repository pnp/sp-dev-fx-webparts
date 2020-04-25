import * as React from 'react';
import styles from '../SpupsProperySync.module.scss';
import * as strings from 'SpupsProperySyncWebPartStrings';
import { DetailsList, IColumn, DetailsListLayoutMode, ConstrainMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { IPersonaSharedProps, Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { ActionButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Dialog, DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { Icon, IconType, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import * as moment from 'moment/moment';
import SPHelper from '../../../../Common/SPHelper';
import MessageContainer from '../MessageContainer';
import { MessageScope, FileContentType } from '../../../../Common/IModel';
import TemplateStructure from './TemplatesStructure';

const orderBy: any = require('lodash/orderBy');
const filter: any = require('lodash/filter');

export interface ITemplatesProps {
    helper: SPHelper;
    siteurl: string;
    dateFormat: string;
}

export default function TemplatesView(props: ITemplatesProps) {
    const actionIcon: IIconProps = { iconName: 'InfoSolid' };
    const refreshIcon: IIconProps = { iconName: 'Refresh' };

    const [refreshLoading, setRefreshLoading] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [downloadLoading, setDownloadLoading] = React.useState<boolean>(false);
    const [templates, setTemplates] = React.useState<any[]>([]);
    const [filteredtemplates, setFilteredTemplates] = React.useState<any[]>([]);
    const [columns, setColumns] = React.useState<IColumn[]>([]);
    const [searchKey, setSearchKey] = React.useState<string>('');
    const [emptySearch, setEmptySearch] = React.useState<boolean>(false);
    const [hideDialog, setHideDialog] = React.useState<boolean>(true);
    const [fileurl, setFileUrl] = React.useState<string>('');

    const downloadTemplate = async (fileserverurl, filename) => {
        setDownloadLoading(true);
        const anchor = window.document.createElement('a');
        anchor.href = `${props.siteurl}/_layouts/15/download.aspx?SourceUrl=${fileserverurl}`;
        anchor.download = filename;
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        setDownloadLoading(false);
    };
    const actionClick = async (data) => {
        if (data.FileUrl) {
            setFileUrl(data.FileUrl);
            setHideDialog(false);
        }
    };
    const ActionRender = (actionProps) => {
        return (
            <ActionButton iconProps={actionIcon} allowDisabledFocus onClick={() => { actionClick(actionProps); }} />
        );
    };
    const _buildColumns = () => {
        let cols: IColumn[] = [];
        cols.push({
            key: 'Name', name: 'Name', fieldName: 'Name', minWidth: 300, maxWidth: 300,
            onRender: (item: any, index: number, column: IColumn) => {
                let fileextn = item.Name.split('.').pop();
                return (
                    <>
                        <div className={styles.fileiconDiv}>
                            {fileextn.toLowerCase() === "csv" &&
                                <Icon iconName="ExcelDocument" ariaLabel={item.Name} iconType={IconType.Default} />
                            }
                            {fileextn.toLowerCase() === "json" &&
                                <Icon iconName="FileCode" ariaLabel={item.Name} iconType={IconType.Default} />
                            }
                        </div>
                        <Link onClick={() => { downloadTemplate(`${item.ServerRelativeUrl}`, `${item.Name}`); }} value={item.Name}>{item.Name}</Link>
                        {downloadLoading &&
                            <div className={styles.downloadLoaderDiv}>
                                <Spinner size={SpinnerSize.small} />
                            </div>
                        }
                    </>
                );
            }
        });
        cols.push({
            key: 'Author', name: 'Author', fieldName: 'Author', minWidth: 300, maxWidth: 300,
            onRender: (item: any, index: number, column: IColumn) => {
                const authorPersona: IPersonaSharedProps = {
                    imageUrl: `/_layouts/15/userphoto.aspx?Size=S&Username=${item["Author"].Email}`,
                    text: item["Author"].Title,
                };
                return (
                    <div><Persona {...authorPersona} size={PersonaSize.size24} /></div>
                );
            }
        } as IColumn);
        cols.push({
            key: 'TimeCreated', name: 'Created', fieldName: 'TimeCreated', minWidth: 100, maxWidth: 200,
            onRender: (item: any, index: number, column: IColumn) => {
                return (
                    <div>{moment(item.TimeCreated).format(props.dateFormat)}</div>
                );
            }
        } as IColumn);
        cols.push({
            key: 'Actions', name: 'Actions', fieldName: 'ID', minWidth: 100, maxWidth: 100,
            onRender: (item: any, index: number, column: IColumn) => {
                return (<ActionRender FileUrl={item.ServerRelativeUrl} />);
            }
        });
        setColumns(cols);
    };
    const _loadTemplatesList = async () => {
        let templateList = await props.helper.getAllTemplates();
        templateList = orderBy(templateList, ['TimeCreated'], ['desc']);
        setTemplates(templateList);
    };
    const _buildTemplatesList = async () => {
        _buildColumns();
        await _loadTemplatesList();
        setLoading(false);
    };
    const _refreshList = async () => {
        setRefreshLoading(true);
        await _loadTemplatesList();
        setRefreshLoading(false);
    };
    const _searchTemplatesList = (srchkey) => {
        setEmptySearch(false);
        setSearchKey(srchkey);
        let filteredList = filter(templates, (o) => {
            return o.Name.toLowerCase().indexOf(srchkey.toLowerCase()) >= 0 || o['Author'].Title.toLowerCase().indexOf(srchkey.toLowerCase()) >= 0;
        });
        if (filteredList.length <= 0) setEmptySearch(true);
        setFilteredTemplates(filteredList);
    };
    const _closeDialog = () => {
        setHideDialog(true);
    };

    React.useEffect(() => {
        _buildTemplatesList();
    }, [props.dateFormat]);

    return (
        <div className={styles.templatesContainer}>
            {loading &&
                <ProgressIndicator label={strings.PropsLoader} description={strings.TemplateListLoaderDesc} />
            }
            {(!loading && templates && templates.length > 0) ? (
                <>
                    <div className={styles.searchcontainer}>
                        <SearchBox placeholder={strings.TemplateListSearchPH} underlined={true} value={searchKey} onChange={_searchTemplatesList} />
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
                    <div className={styles.templateList}>
                        <DetailsList
                            items={filteredtemplates && filteredtemplates.length > 0 ? filteredtemplates : templates}
                            setKey="set"
                            columns={columns}
                            compact={true}
                            layoutMode={DetailsListLayoutMode.justified}
                            constrainMode={ConstrainMode.unconstrained}
                            isHeaderVisible={true}
                            selectionMode={SelectionMode.none}
                            enableShimmer={true}
                            className={styles.uppropertylist} />
                    </div>
                </>
            ) : (
                    <>
                        {!loading &&
                            <MessageContainer MessageScope={MessageScope.Info} Message={strings.EmptyTable} />
                        }
                    </>
                )
            }
            <Dialog hidden={hideDialog} onDismiss={_closeDialog} maxWidth='700' minWidth='500px'
                dialogContentProps={{
                    type: DialogType.close,
                    title: `${strings.TemplateStructureDialogTitle}`
                }}
                modalProps={{
                    isBlocking: true,
                    isDarkOverlay: true,
                    styles: { main: { minWidth: 500, maxHeight: 700 } },
                }}>
                <TemplateStructure helper={props.helper} fileurl={fileurl} />
            </Dialog>
        </div >
    );
}