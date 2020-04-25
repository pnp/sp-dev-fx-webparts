import * as React from 'react';
import styles from '../SpupsProperySync.module.scss';
import * as strings from 'SpupsProperySyncWebPartStrings';
import { DetailsList, IColumn, DetailsListLayoutMode, ConstrainMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { IPersonaSharedProps, Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import * as csv from 'csvtojson';
import SPHelper from '../../../../Common/SPHelper';
import { FileContentType } from '../../../../Common/IModel';

export interface IBulkSyncDataProps {
    helper: SPHelper;
    fileurl: string;
}

export default function BulkSyncData(props: IBulkSyncDataProps) {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [filedata, setFileData] = React.useState<any[]>([]);
    const [columns, setColumns] = React.useState<IColumn[]>([]);

    const _buildColumns = (colValues: string[]) => {
        let cols: IColumn[] = [];
        colValues.map(col => {
            if (col.toLowerCase() == "userid") {
                cols.push({
                    key: 'UserID', name: 'User ID', fieldName: col, minWidth: 250, maxWidth: 250,
                    onRender: (item: any, index: number, column: IColumn) => {
                        const authorPersona: IPersonaSharedProps = {
                            imageUrl: `/_layouts/15/userphoto.aspx?Size=S&Username=${item[col]}`,
                            text: item[col],
                        };
                        return (
                            <div><Persona {...authorPersona} size={PersonaSize.size24} /></div>
                        );
                    }
                } as IColumn);
            } else {
                cols.push({
                    key: col, name: col, fieldName: col, minWidth: 150,
                    onRender: (item: any, index: number, column: IColumn) => {
                        if (item[col]) {
                            return (<div>{item[col]}</div>);
                        } else {
                            return (<div className={styles.emptyData}>{strings.EmptyDataText}</div>);
                        }
                    }
                } as IColumn);
            }
        });
        setColumns(cols);
    };
    const _getJSONData = (inputjson?: any) => {
        let parsedJson = (inputjson) ? inputjson : JSON.parse(inputjson);
        let _dynamicColumns: string[] = [];
        Object.keys(parsedJson[0]).map((key) => {
            _dynamicColumns.push(key);
        });
        _buildColumns(_dynamicColumns);
        setFileData(parsedJson);
        setLoading(false);
    };
    const _buildBulkSyncDataList = async () => {
        if (props.fileurl) {
            let fileextn: string = props.fileurl.split('.').pop();
            let filecontent: any = null;
            if (fileextn.toLowerCase() === "csv") {
                filecontent = await props.helper.getFileContent(props.fileurl, FileContentType.Text);
                let finalOut: any = await csv().fromString(filecontent);
                _getJSONData(finalOut);
            }
            else {
                filecontent = await props.helper.getFileContent(props.fileurl, FileContentType.JSON);
                _getJSONData(filecontent);
            }
        }
    };    

    React.useEffect(() => {
        _buildBulkSyncDataList();
    }, [props.fileurl]);

    return (
        <div style={{ maxHeight: '600', maxWidth: '600', overflow: 'auto' }}>
            {loading &&
                <Spinner size={SpinnerSize.small} label={strings.BulkSyncFileDataLoaderDesc} labelPosition={"top"} />
            }
            {!loading && filedata && filedata.length > 0 &&
                <DetailsList
                    items={filedata}
                    setKey="set"
                    columns={columns}
                    compact={true}
                    layoutMode={DetailsListLayoutMode.justified}
                    constrainMode={ConstrainMode.unconstrained}
                    isHeaderVisible={true}
                    selectionMode={SelectionMode.none}
                    enableShimmer={true}
                    className={styles.uppropertylist} />
            }
        </div>
    );
}