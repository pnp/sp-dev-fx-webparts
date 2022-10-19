import { IListInfo } from '@pnp/sp/lists';

export interface IHideListsState {
    data: IListInfo[];
    rowData: any;
    user: any;
    isCalloutVisible: boolean;
    isConfirmCalloutMessage: string;
    isConfirmCallOutVisible: boolean;
}
