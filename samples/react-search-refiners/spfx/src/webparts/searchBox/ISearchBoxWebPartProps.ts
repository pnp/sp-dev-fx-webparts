import { PageOpenBehavior } from '../../helpers/UrlHelper';
import { DynamicProperty } from '@microsoft/sp-component-base';

interface ISearchBoxWebPartProps {
    searchInNewPage: boolean;
    pageUrl: string;
    openBehavior: PageOpenBehavior;
    enableQuerySuggestions: boolean;
    useDynamicDataSource: boolean;
    NlpServiceUrl: string;
    enableNlpService: boolean;
    enableDebugMode: boolean;
    isStaging: boolean;
    defaultQueryKeywords: DynamicProperty<string>;
}

export default ISearchBoxWebPartProps;