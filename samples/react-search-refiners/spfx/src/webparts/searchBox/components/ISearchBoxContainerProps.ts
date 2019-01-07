import { PageOpenBehavior } from '../../../helpers/UrlHelper';
import ISearchService from       '../../../services/SearchService/ISearchService';
import INlpService from '../../../services/NlpService/INlpService';
import ISearchQuery from '../../../models/ISearchQuery';

export interface ISearchBoxContainerProps {
    onSearch: (searchQuery: ISearchQuery) => void;
    searchInNewPage: boolean;
    enableQuerySuggestions: boolean;
    enableNlpService: boolean;
    searchService: ISearchService;
    pageUrl: string;
    openBehavior: PageOpenBehavior;
    inputValue: string;
    NlpService: INlpService;
    enableDebugMode: boolean;
    isStaging: boolean;
    domElement: HTMLElement;
}
