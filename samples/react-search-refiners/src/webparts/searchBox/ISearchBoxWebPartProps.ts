import { PageOpenBehavior } from '../../helpers/UrlHelper';
import IDynamicDataSourceConnection from '../../models/IDynamicDataSourceConnection';

interface ISearchBoxWebPartProps {
    searchInNewPage: boolean;
    pageUrl: string;
    openBehavior: PageOpenBehavior;
    enableQuerySuggestions: boolean;
    useDynamicDataSource: boolean;
    sourceInstance: IDynamicDataSourceConnection;
}

export default ISearchBoxWebPartProps;