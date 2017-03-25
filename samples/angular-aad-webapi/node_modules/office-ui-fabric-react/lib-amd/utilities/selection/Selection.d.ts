import { IObjectWithKey, ISelection } from './interfaces';
export interface ISelectionOptions {
    onSelectionChanged?: () => void;
    getKey?: (item: IObjectWithKey, index?: number) => string;
    canSelectItem?: (item: IObjectWithKey) => boolean;
}
export declare class Selection implements ISelection {
    count: number;
    getKey: (item: IObjectWithKey, index?: number) => string;
    canSelectItem: (item: IObjectWithKey) => boolean;
    private _changeEventSuppressionCount;
    private _items;
    private _selectedItems;
    private _isAllSelected;
    private _exemptedIndices;
    private _exemptedCount;
    private _keyToIndexMap;
    private _anchoredIndex;
    private _onSelectionChanged;
    private _hasChanged;
    private _unselectableIndices;
    private _unselectableCount;
    constructor(options?: ISelectionOptions);
    setChangeEvents(isEnabled: boolean, suppressChange?: boolean): void;
    /**
     * Selection needs the items, call this method to set them. If the set
     * of items is the same, this will re-evaluate selection and index maps.
     * Otherwise, shouldClear should be set to true, so that selection is
     * cleared.
     */
    setItems(items: IObjectWithKey[], shouldClear?: boolean): void;
    getItems(): IObjectWithKey[];
    getSelection(): IObjectWithKey[];
    getSelectedCount(): number;
    isRangeSelected(fromIndex: number, count: number): boolean;
    isAllSelected(): boolean;
    isKeySelected(key: string): boolean;
    isIndexSelected(index: number): boolean;
    setAllSelected(isAllSelected: boolean): void;
    setKeySelected(key: string, isSelected: boolean, shouldAnchor: boolean): void;
    setIndexSelected(index: number, isSelected: boolean, shouldAnchor: boolean): void;
    selectToKey(key: string, clearSelection?: boolean): void;
    selectToIndex(index: number, clearSelection?: boolean): void;
    toggleAllSelected(): void;
    toggleKeySelected(key: string): void;
    toggleIndexSelected(index: number): void;
    toggleRangeSelected(fromIndex: number, count: number): void;
    private _updateCount();
    private _change();
}
