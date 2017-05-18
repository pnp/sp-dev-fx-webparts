import * as React from 'react';
import { IReactYammerApiProps } from './IReactYammerApiProps';
import { IReactYammerApiState } from './IReactYammerApiState';
import { Button } from 'office-ui-fabric-react/lib/Button';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { SearchResult } from '../yammer/SearchResult';

export default class ReactYammerApi extends React.Component<IReactYammerApiProps, IReactYammerApiState> {
  constructor(props: IReactYammerApiProps) {
    super(props);
    this.state = {
      searchResults: new Array<SearchResult>(),
      searchQuery: this.props.defaultSearchQuery
    } as IReactYammerApiState;
  }

  public componentDidMount(): void {
    // load the Yammer Sdk and authenticate.
    this.props.yammer.loadSdk().then(_ => {
      this.props.yammer
        .getLoginStatus()
        .then((res: any) => {
          // search based on the default search query.
          // set in the in the webpart properties pane.
          this._search(this.props.defaultSearchQuery);
        })
        .catch((err: any) => {
          // add login button if authentication failed.
          this.props.yammer.loginButton("#yammer-login");
        });
    });
  }

  public render(): React.ReactElement<IReactYammerApiProps> {
    return (
      <div className="ms-Grid">
        <div className="ms-Grid-row">
          <h1 className="ms-Grid-col ms-u-sm12">
            Yammer {this.props.strings.SearchLabel}
          </h1>
          <div className="ms-Grid-col ms-u-sm10">
            <SearchBox
              className="search-box"
              value={this.state.searchQuery}
              onChange={this._handleInputChange.bind(this)}
              onSearch={this._handleSearch.bind(this)}>
            </SearchBox>
          </div>
          <div className="ms-Grid-col ms-u-sm2">
            <Button id="SearchButton" onClick={this._handleSearch.bind(this)}>
              {this.props.strings.SearchLabel}
            </Button>
          </div>
          <div className="ms-Grid-col ms-u-sm12">
            <code>
              {this.state.searchResults.map(item =>
                <pre key={item.id}>
                  {JSON.stringify(item, null, 2)}
                </pre>
              )}
            </code>
          </div>
          <div className="ms-Grid-col ms-u-sm12">
            <span id="yammer-login"></span>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Performs Yammer search.
   * @param querySearch 
   */
  private _search(querySearch: string): void {
    this.props.yammer.search(querySearch)
      .then((searchResults: Array<SearchResult>) => {
        this.setState((prevState: IReactYammerApiState, props: IReactYammerApiProps): IReactYammerApiState => {
          prevState.searchResults = searchResults;
          return prevState;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  /**
   * Search button event handler.
   * @param event 
   */
  private _handleSearch(event: any): void {
    this._search(this.state.searchQuery);
  }

  /**
   * Search input handler.
   * @param searchQuery
   */
  private _handleInputChange(searchQuery: string): void {
    this.setState((prevState: IReactYammerApiState, props: IReactYammerApiProps): IReactYammerApiState => {
      prevState.searchQuery = searchQuery;
      return prevState;
    });
  }
}

