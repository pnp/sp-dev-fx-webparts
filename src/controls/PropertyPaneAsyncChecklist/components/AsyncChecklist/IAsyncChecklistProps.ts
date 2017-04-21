import { IChecklistItem } from './IChecklistItem';
import { IAsyncChecklistStrings } from './IAsyncChecklistStrings';

export interface IAsyncChecklistProps {
    loadItems: () => Promise<IChecklistItem[]>;
    onChange?: (checkedKeys:string[]) => void;
    checkedItems: string[];
    disable?: boolean;
    strings: IAsyncChecklistStrings;
    stateKey?: string;
}