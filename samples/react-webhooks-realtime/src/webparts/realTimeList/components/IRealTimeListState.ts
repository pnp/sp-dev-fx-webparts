import {
    IColumn
  } from 'office-ui-fabric-react/lib/DetailsList';

export interface IRealTimeListState {
    sortedItems?: any[];
    columns?: IColumn[];
    loading?: boolean;
    newsFeed?: string;
    newsFeedVisible?: boolean;
}  