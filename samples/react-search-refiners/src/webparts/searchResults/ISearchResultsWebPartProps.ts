import ResultsLayoutOption from '../../models/ResultsLayoutOption';
import IDynamicDataSourceConnection from '../../models/IDynamicDataSourceConnection';

export interface ISearchResultsWebPartProps {
    queryKeywords: string;
    queryTemplate: string;
    resultSourceId: string;
    sortList: string;
    enableQueryRules: boolean;
    maxResultsCount: number;
    selectedProperties: string;
    refiners: string;
    showPaging: boolean;
    showResultsCount: boolean;
    showBlank: boolean;
    useSearchBoxQuery: boolean;
    selectedLayout: ResultsLayoutOption;
    externalTemplateUrl: string;
    inlineTemplateText: string;
    useHandlebarsHelpers: boolean;
    webPartTitle: string;
    sourceInstance: IDynamicDataSourceConnection;
}
