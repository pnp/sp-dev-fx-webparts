import * as React from 'react';
import styles from '../SpupsProperySync.module.scss';
import * as strings from 'SpupsProperySyncWebPartStrings';
import { DetailsList, IColumn, DetailsListLayoutMode, ConstrainMode, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { IPersonaSharedProps, Persona, PersonaSize } from 'office-ui-fabric-react/lib/Persona';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { css } from 'office-ui-fabric-react/lib';
import SPHelper from '../../../../Common/SPHelper';
import MessageContainer from '../MessageContainer';
import { MessageScope } from '../../../../Common/IModel';

const map: any = require('lodash/map');
const union: any = require('lodash/union');

export interface ISyncJobResultsProps {
    helper: SPHelper;
    data: string;
    error: string;
}

export default function SyncJobResults(props: ISyncJobResultsProps) {
    const [loading, setLoading] = React.useState<boolean>(true);
    const [jobresults, setJobResults] = React.useState<any[]>([]);
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
                    key: col, name: col, fieldName: col, minWidth: 100, maxWidth: 250,
                    onRender: (item: any, index: number, column: IColumn) => {
                        return (
                            <>
                                {(item[col] && item[col] != '') ? (
                                    <>{item[col]} - <span className={css(styles.resultsIconSpan, styles.status, styles.green)}><Icon iconName="Completed" /></span></>
                                ) : (
                                        <>{"Empty"} - <span className={css(styles.resultsIconSpan, styles.status, styles.red)}><Icon iconName="ErrorBadge" /></span></>
                                    )}
                            </>
                        );
                    }
                } as IColumn);
            }
        });
        setColumns(cols);
    };

    const _buildJobResults = () => {
        if (props.error && props.error.length > 0) {

        } else {
            let parsedResults = JSON.parse(props.data);
            let colValues = ['UserID'];
            colValues = union(colValues, map(parsedResults.value[0].properties, 'name'));
            _buildColumns(colValues);
            let users = [];
            map(parsedResults.value, (userProps) => {
                var obj = new Object();
                obj['UserID'] = userProps.userid;
                map(userProps.properties, (prop) => {
                    obj[prop.name] = prop.value;
                });
                users.push(obj);
            });
            setJobResults(users);
        }
        setLoading(false);
    };

    React.useEffect(() => {
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
                    className={styles.uppropertylist} />
            }
            {props.error && props.error.length > 0 &&
                <MessageContainer MessageScope={MessageScope.Failure} Message={`${strings.SyncFailedErrorMessage} ${props.error}`} />
            }
        </div>
    );
}