import { PageOpenBehavior } from '../../../helpers/UrlHelper';
import ISearchService from       '../../../services/SearchService/ISearchService';

export interface ISearchBoxContainerProps {
    onSearch: (query: string) => void;
    searchInNewPage: boolean;
    enableQuerySuggestions: boolean;
    searchService: ISearchService;
    pageUrl: string;
    openBehavior: PageOpenBehavior;
    inputValue: string;
}
