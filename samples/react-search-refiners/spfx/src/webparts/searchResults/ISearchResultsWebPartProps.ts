import ResultsLayoutOption from '../../models/ResultsLayoutOption';
import { DynamicProperty } from '@microsoft/sp-component-base';

export interface ISearchResultsWebPartProps {
    queryKeywords: DynamicProperty<string>;
    queryTemplate: string;
    resultSourceId: string;
    sortList: string;
    enableQueryRules: boolean;
    maxResultsCount: number;
    selectedProperties: string;
    refiners: string;
    sortableFields: string;
    showPaging: boolean;
    showResultsCount: boolean;
    showBlank: boolean;
    selectedLayout: ResultsLayoutOption;
    externalTemplateUrl: string;
    inlineTemplateText: string;
    useHandlebarsHelpers: boolean;
    webPartTitle: string;
}
