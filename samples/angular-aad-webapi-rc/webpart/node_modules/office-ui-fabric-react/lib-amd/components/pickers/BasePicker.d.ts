import * as React from 'react';
import { FocusZone } from '../../FocusZone';
import { Selection } from '../../utilities/selection/index';
import { Suggestions } from './Suggestions/Suggestions';
import { ISuggestionsProps } from './Suggestions/Suggestions.Props';
import { SuggestionsController } from './Suggestions/SuggestionsController';
import { IBasePickerProps } from './BasePicker.Props';
import { BaseAutoFill } from './AutoFill/BaseAutoFill';
import { IPickerItemProps } from './PickerItem.Props';
import { BaseComponent } from '../../common/BaseComponent';
import './BasePicker.scss';
export interface IBasePickerState {
    items?: any;
    suggestedDisplayValue?: string;
    moreSuggestionsAvailable?: boolean;
    suggestionsVisible?: boolean;
    suggestionsLoading?: boolean;
}
export declare class BasePicker<T, P extends IBasePickerProps<T>> extends BaseComponent<P, IBasePickerState> {
    protected selection: Selection;
    protected root: HTMLElement;
    protected input: BaseAutoFill;
    protected focusZone: FocusZone;
    protected suggestionElement: Suggestions<T>;
    protected suggestionStore: SuggestionsController<T>;
    protected SuggestionOfProperType: new (props: ISuggestionsProps<T>) => Suggestions<T>;
    protected loadingTimer: number;
    protected currentPromise: PromiseLike<any>;
    constructor(basePickerProps: P);
    componentWillReceiveProps(newProps: IBasePickerProps<T>, newState: IBasePickerState): void;
    componentDidMount(): void;
    focus(): void;
    dismissSuggestions(): void;
    completeSuggestion(): void;
    render(): JSX.Element;
    protected renderSuggestions(): JSX.Element;
    protected renderItems(): JSX.Element[];
    protected resetFocus(index: number): void;
    protected onSuggestionSelect(): void;
    protected onSelectionChange(): void;
    protected updateSuggestions(suggestions: any[]): void;
    protected updateValue(updatedValue: string): void;
    protected resolveNewValue(updatedValue: string, suggestions: T[]): void;
    protected onChange(): void;
    protected onInputChange(value: string): void;
    protected onSuggestionClick(ev: React.MouseEvent<HTMLElement>, item: any, index: number): void;
    protected onInputFocus(ev: React.FocusEvent<HTMLInputElement | BaseAutoFill>): void;
    protected onKeyDown(ev: React.KeyboardEvent<HTMLElement>): void;
    protected onGetMoreResults(): void;
    protected addItemByIndex(index: number): void;
    protected addItem(item: T): void;
    protected removeItem(item: IPickerItemProps<T>): void;
    protected removeItems(itemsToRemove: any[]): void;
    protected onBackspace(ev: React.KeyboardEvent<HTMLElement>): void;
    private _getTextFromItem(item, currentValue?);
}
export declare class BasePickerListBelow<T, P extends IBasePickerProps<T>> extends BasePicker<T, P> {
    render(): JSX.Element;
    protected onBackspace(ev: React.KeyboardEvent<HTMLElement>): void;
}
