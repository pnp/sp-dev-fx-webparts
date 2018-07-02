import { PageOpenBehavior } from '../../helpers/UrlHelper';

interface ISearchBoxWebPartProps {
    searchInNewPage: boolean;
    pageUrl: string;
    openBehavior: PageOpenBehavior;
    enableQuerySuggestions: boolean;
    useDynamicDataSource: boolean;
    dynamicDataSourceId: string;
    dynamicDataSourcePropertyId: string;
    dynamicDataSourceComponentId: string;
}

export default ISearchBoxWebPartProps;