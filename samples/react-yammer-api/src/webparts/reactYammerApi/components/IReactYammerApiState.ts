import { SearchResult } from '../yammer/SearchResult';

export interface IReactYammerApiState {
    searchResults: Array<SearchResult>;
    searchQuery: string;
}