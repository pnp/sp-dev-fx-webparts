import * as React from 'react';
import { ISearchBoxProps } from './ISearchBoxContainerProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import { Text } from "@microsoft/sp-core-library";
import * as strings from 'SearchBoxWebPartStrings';

export default class SearchBoxContainer extends React.Component<ISearchBoxProps, null> {

  public constructor() {
    super();

    this.onSearch = this.onSearch.bind(this);
  }

  public render(): React.ReactElement<ISearchBoxProps> {

      return (
        <SearchBox
            onSearch={ this.onSearch }
            placeholder={ strings.SearchInputPlaceholder }
            onClear={ () => { this.onSearch("*") }}
        />
    );
  }

  /**
   * Handler when a user enters new keywords
   * @param queryText The query text entered by the user
   */
  public onSearch(queryText: string) {    

    this.props.eventAggregator.raiseEvent("search:newQueryKeywords", {
        data: queryText,
        sourceId: "SearchBoxQuery",
        targetId: "SearchResults"
    });
  }
}
