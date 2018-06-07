import { IEventAggregator } from "@microsoft/sp-webpart-base";
import { PageOpenBehavior } from "../../common/UrlHelper";
import ISearchDataProvider from "../../dataProviders/SearchDataProvider/ISearchDataProvider";

export interface ISearchBoxProps {
    eventAggregator: IEventAggregator;
    enableQuerySuggestions: boolean;
    searchDataProvider: ISearchDataProvider;
    searchInNewPage: boolean;
    pageUrl: string;
    openBehavior: PageOpenBehavior;
}
