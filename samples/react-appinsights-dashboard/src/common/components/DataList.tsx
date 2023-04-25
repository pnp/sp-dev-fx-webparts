import * as React from 'react';
import styles from '../CommonControl.module.scss';
import { IColumn, DetailsListLayoutMode, ConstrainMode, SelectionMode, IGroup, ShimmeredDetailsList } from '@fluentui/react';
import { findIndex, groupBy } from '@microsoft/sp-lodash-subset';
import { Dictionary } from '../CommonProps';

export interface IDataListProps {
    Items: any[];   // eslint-disable-line @typescript-eslint/no-explicit-any
    Columns: IColumn[];
    GroupBy: boolean;
    GroupByCol?: string;
    CountCol?: string;
}

const DataList: React.FunctionComponent<IDataListProps> = (props) => {

    const [columns, setColumns] = React.useState<IColumn[]>([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [items, setItems] = React.useState<any[]>([]);
    const [groups, setGroups] = React.useState<IGroup[]>([]);

    const _getItemIndex = (key: string): number => {
        return findIndex(props.Items, (o) => { return o.date === key; });
    };
    const _buildGroups = ():void => {
        const grouped: Dictionary<string[]> = groupBy(props.Items, props.GroupByCol);
        const groupsTemp: IGroup[] = [];
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
    const _loadDataList = ():void => {
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
                <ShimmeredDetailsList
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
                    enableShimmer={!items} />
            ) : (
                    <ShimmeredDetailsList
                        items={items}
                        setKey="set"
                        columns={columns}
                        compact={true}
                        layoutMode={DetailsListLayoutMode.justified}
                        constrainMode={ConstrainMode.unconstrained}
                        isHeaderVisible={true}
                        selectionMode={SelectionMode.none}
                        enableShimmer={!items} />
                )}
        </div>
    );
};

export default DataList;