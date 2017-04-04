export interface ISuggestionModel<T> {
    item: T;
    selected: boolean;
}
export declare class SuggestionsController<T> {
    currentIndex: number;
    currentSuggestion: ISuggestionModel<T>;
    private suggestions;
    constructor();
    updateSuggestions(newSuggestions: T[]): void;
    /**
     * Increments the suggestion index and gets the next suggestion in the list.
     */
    nextSuggestion(): boolean;
    /**
     * Decrements the suggestion index and gets the previous suggestion in the list.
     */
    previousSuggestion(): boolean;
    getSuggestions(): ISuggestionModel<T>[];
    getCurrentItem(): ISuggestionModel<T>;
    getSuggestionAtIndex(index: number): ISuggestionModel<T>;
    hasSelectedSuggestion(): boolean;
    private _convertSuggestionsToSuggestionItems(suggestions);
    private _setSelectedSuggestion(index);
}
