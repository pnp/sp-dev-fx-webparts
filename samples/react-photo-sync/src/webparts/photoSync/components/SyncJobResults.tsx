import * as React from 'react';
import { useEffect, useState } from 'react';
import * as strings from 'PhotoSyncWebPartStrings';
import { DetailsList, IColumn, DetailsListLayoutMode, ConstrainMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import MessageContainer from '../common/MessageContainer';
import { MessageScope } from '../common/IModel';
import { StatusRender, PersonaRender } from '../common/FieldRenderer';

const map: any = require('lodash/map');
const union: any = require('lodash/union');

export interface ISyncJobResultsProps {
    data: string;
    error: string;
}

const SyncJobResults: React.FC<ISyncJobResultsProps> = (props) => {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [jobresults, setJobResults] = React.useState<any[]>([]);
    const [columns, setColumns] = React.useState<IColumn[]>([]);
    const [emptyMessage, setEmptyMessage] = useState<boolean>(false);

    const _buildColumns = (colValues: string[]) => {
        let cols: IColumn[] = [];
        colValues.map(col => {
            if (col.toLowerCase() == "userid") {
                cols.push({
                    key: 'UserID', name: 'User ID', fieldName: col, minWidth: 300,
                    onRender: (item: any, index: number, column: IColumn) => {
                        return <PersonaRender Title={item[col]} UserID={item[col]} />;

                    }
                } as IColumn);
            } else {
                cols.push({
                    key: col, name: col, fieldName: col, minWidth: 100, maxWidth: 250,
                    onRender: (item: any, index: number, column: IColumn) => {
                        return <StatusRender Value={item[col]} />;
                    }
                } as IColumn);
            }
        });
        setColumns(cols);
    };

    const _buildJobResults = () => {
        if (props.error && props.error.length > 0) {

        } else {
            if (props.data && props.data.length > 0) {
                let parsedResults = JSON.parse(props.data);
                let colValues = ['userid', 'Status'];
                _buildColumns(colValues);
                setJobResults(parsedResults.value);
            } else setEmptyMessage(true);
        }
        setLoading(false);
    };

    useEffect(() => {
        _buildJobResults();
    }, [props.data]);

    return (
        <div style={{ maxHeight: '600', maxWidth: '600', overflow: 'auto' }}>
            {loading &&
                <ProgressIndicator label={strings.PropsLoader} description={strings.JobResultsLoaderDesc} />
            }
            {!loading && jobresults && jobresults.length > 0 &&
                <DetailsList
                    items={jobresults}
                    setKey="set"
                    columns={columns}
                    compact={true}
                    layoutMode={DetailsListLayoutMode.justified}
                    constrainMode={ConstrainMode.unconstrained}
                    isHeaderVisible={true}
                    selectionMode={SelectionMode.none}
                    enableShimmer={true}
                />
            }
            {props.error && props.error.length > 0 &&
                <MessageContainer MessageScope={MessageScope.Failure} Message={`${strings.SyncFailedErrorMessage} ${props.error}`} />
            }
            {emptyMessage &&
                <MessageContainer MessageScope={MessageScope.Info} Message={`${strings.EmptyTable}`} />
            }
        </div>
    );
};

export default SyncJobResults;