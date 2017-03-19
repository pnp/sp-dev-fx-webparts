import * as React from 'react';
import { Button } from '../../../Button';
import { ISuggestionItemProps, ISuggestionsProps } from './Suggestions.Props';
import { BaseComponent } from '../../../common/BaseComponent';
import './Suggestions.scss';
export declare class SuggestionsItem<T> extends React.Component<ISuggestionItemProps<T>, {}> {
    render(): JSX.Element;
}
export declare class Suggestions<T> extends BaseComponent<ISuggestionsProps<T>, {}> {
    protected _searchForMoreButton: Button;
    protected _selectedElement: HTMLDivElement;
    private SuggestionsItemOfProperType;
    constructor(suggestionsProps: ISuggestionsProps<T>);
    componentDidUpdate(): void;
    render(): JSX.Element;
    focusSearchForMoreButton(): void;
    scrollSelected(): void;
    private _renderSuggestions();
    private _getMoreResults();
}
