import * as React from 'react';
import styles from '../CommonControl.module.scss';
import { DetailsList, IColumn, DetailsListLayoutMode, ConstrainMode, SelectionMode, IGroup } from 'office-ui-fabric-react/lib/DetailsList';

const groupBy: any = require('lodash/groupBy');
const findIndex: any = require('lodash/findIndex');

export interface IDataListProps {
    Items: any[];
    Columns: IColumn[];
    GroupBy: boolean;
    GroupByCol?: string;
    CountCol?: string;
}

const DataList: React.FunctionComponent<IDataListProps> = (props) => {

    const [columns, setColumns] = React.useState<IColumn[]>([]);
    const [items, setItems] = React.useState<any[]>([]);
    const [groups, setGroups] = React.useState<IGroup[]>([]);

    const _getItemIndex = (key): number => {
        return findIndex(props.Items, (o) => { return o.date == key; });
    };
    const _buildGroups = () => {
        let grouped: any[] = groupBy(props.Items, props.GroupByCol);
        let groupsTemp: IGroup[] = [];
        Object.keys(grouped).map((key, index) => {
            groupsTemp.push({
                key: key,
                name: key,
                count: grouped[key].length,
                startIndex: _getItemIndex(key)
            });            
        });
        setGroups(groupsTemp);
    };
    const _loadDataList = () => {
        setColumns(props.Columns);
        if (props.GroupBy && props.GroupByCol.length > 0 && props.CountCol.length > 0) _buildGroups();
        setItems(props.Items);
    };

    React.useEffect(() => {
        if (props.Items && props.Items.length > 0 && props.Columns && props.Columns.length > 0) {
            _loadDataList();
        }
    }, [props.Items, props.Columns]);

    return (
        <div className={styles.dataList}>
            {(groups.length > 0 && props.GroupBy && props.GroupByCol.length > 0 && props.CountCol.length > 0) ? (
                <DetailsList
                    items={items}
                    setKey="set"
                    columns={columns}
                    compact={true}
                    groups={groups}
                    groupProps={{
                        showEmptyGroups: true
                    }}
                    layoutMode={DetailsListLayoutMode.justified}
                    constrainMode={ConstrainMode.unconstrained}
                    isHeaderVisible={true}
                    selectionMode={SelectionMode.none}
                    enableShimmer={true} />
            ) : (
                    <DetailsList
                        items={items}
                        setKey="set"
                        columns={columns}
                        compact={true}
                        layoutMode={DetailsListLayoutMode.justified}
                        constrainMode={ConstrainMode.unconstrained}
                        isHeaderVisible={true}
                        selectionMode={SelectionMode.none}
                        enableShimmer={true} />
                )}

        </div>
    );
};

export default DataList;