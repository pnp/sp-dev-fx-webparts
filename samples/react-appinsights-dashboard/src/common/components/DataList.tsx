import * as React from 'react';
import styles from '../CommonControl.module.scss';
import { IColumn, DetailsListLayoutMode, ConstrainMode, SelectionMode, IGroup, ShimmeredDetailsList } from '@fluentui/react';
import { findIndex, groupBy } from '@microsoft/sp-lodash-subset';

export interface Dictionary<T> {
    [index: string]: T;
  }

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
        let grouped: Dictionary<string[]> = groupBy(props.Items, props.GroupByCol); //KK: any=> string
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
                    enableShimmer={true} />
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
                        enableShimmer={true} />
                )}

        </div>
    );
};

export default DataList;