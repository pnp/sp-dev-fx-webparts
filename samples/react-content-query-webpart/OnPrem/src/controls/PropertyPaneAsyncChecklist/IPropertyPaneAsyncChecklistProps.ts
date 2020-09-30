import { IChecklistItem } from './components/AsyncChecklist/IChecklistItem';
import { IAsyncChecklistStrings } from './components/AsyncChecklist/IAsyncChecklistStrings';

export interface IPropertyPaneAsyncChecklistProps {
    loadItems: () => Promise<IChecklistItem[]>;
    onPropertyChange: (propertyPath: string, newCheckedKeys: string[]) => void;
    checkedItems: string[];
    disable?: boolean;
    strings: IAsyncChecklistStrings;
}