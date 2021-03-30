import { IChecklistItem } from './IChecklistItem';

export interface IAsyncChecklistState {
    loading: boolean;
    items: IChecklistItem[];
    error: string;
}