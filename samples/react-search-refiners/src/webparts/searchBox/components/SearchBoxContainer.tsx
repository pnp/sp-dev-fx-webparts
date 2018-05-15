import * as strings from 'SearchBoxWebPartStrings';
import Downshift from 'downshift';
import { IconType, Label, TextField, Spinner, SpinnerSize, Overlay, MessageBar, MessageBarType } from 'office-ui-fabric-react';
import * as React from 'react';
import "../SearchBoxWebPart.scss";
import { ISearchBoxProps } from './ISearchBoxContainerProps';
import { ISearchBoxContainerState } from './ISearchBoxContainerState';
import * as update from "immutability-helper";
import { UrlHelper, PageOpenBehavior } from '../../common/UrlHelper';

export default class SearchBoxContainer extends React.Component<ISearchBoxProps, ISearchBoxContainerState> {

  private readonly SUGGESTION_CHAR_COUNT_TRIGGER = 3;

  public constructor() {
    super();

    this._onSearch = this._onSearch.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onQuerySuggestionSelected = this._onQuerySuggestionSelected.bind(this);

    this.state = {
      proposedQuerySuggestions: [],
      selectedQuerySuggestions: [],
      isRetrievingSuggestions: false,
      searchInputValue: null,
      termToSuggestFrom: null,
      errorMessage: null
    };
  }

  public render(): React.ReactElement<ISearchBoxProps> {

    let renderErrorMessage: JSX.Element = null;

    if (this.state.errorMessage) {
      renderErrorMessage = <MessageBar messageBarType={ MessageBarType.error } 
                                        dismissButtonAriaLabel='Close'
                                        isMultiline={ false }
                                        onDismiss={ () => {
                                          this.setState({
                                            errorMessage: null,
                                          });
                                        }}
                                        className="errorMessage">
                                        { this.state.errorMessage }</MessageBar>;
    }
    
    const renderSearchBox = this.props.enableQuerySuggestions ? 
                          this.renderSearchBoxWithAutoComplete() : 
                          this.renderBasicSearchBox();    
    return (
      <div className="searchBox">
        { renderErrorMessage }
        { renderSearchBox }
      </div>
    );
  }

  public renderSearchBoxWithAutoComplete(): JSX.Element {
    return <Downshift
        onSelect={ this._onQuerySuggestionSelected }
        >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue,
          selectedItem,
          highlightedIndex,
          openMenu,
          clearItems
        }) => (
          <div>
            <TextField {...getInputProps({
                placeholder: strings.SearchInputPlaceholder,
                onKeyDown: event => {

                  // Submit search on "Enter" 
                  if (event.keyCode === 13 && (!isOpen || (isOpen && highlightedIndex === null))) {
                    this._onSearch(this.state.searchInputValue);
                  }
                }
            })}
            value={ this.state.searchInputValue }
            autoComplete= {false }
            onChanged={ (value) => {

                this.setState({
                  searchInputValue: value,
                });

                if (this.state.selectedQuerySuggestions.length === 0) {
                  clearItems();

                  this._onChange(value);
                  openMenu();
                } else {
                  if (!value) {

                    // Reset the selected suggestions if input is empty
                    this.setState({
                      selectedQuerySuggestions: [],
                    });
                  }
                }
            }} 
            iconProps={{
              iconName: 'Search',
              iconType: IconType.default
            }}/>
            {isOpen ?
              this.renderSuggestions(getItemProps, openMenu, selectedItem, highlightedIndex)
            : null}
          </div>
        )}
      </Downshift>;
  }

  public renderBasicSearchBox(): JSX.Element {
    return <TextField 
              placeholder={ strings.SearchInputPlaceholder }
              value={ this.state.searchInputValue }
              onChanged={ (value) => {
                this.setState({
                  searchInputValue: value,
                });
              }}
              onKeyDown={ (event) => {

                  // Submit search on "Enter" 
                  if (event.keyCode === 13) {
                    this._onSearch(this.state.searchInputValue);
                  }
              }}
              iconProps={{
                iconName: 'Search',
                iconType: IconType.default
              }}/>;
  }

  /**
   * Renders the suggestions panel below the input control
   * @param getItemProps downshift getItemProps callback
   * @param openMenu downshift openMenu callback
   * @param selectedItem downshift selectedItem callback
   * @param highlightedIndex downshift highlightedIndex callback
   */
  private renderSuggestions(getItemProps, openMenu, selectedItem, highlightedIndex): JSX.Element {
    
    let renderSuggestions: JSX.Element = null;
    let suggestions: JSX.Element[] = null;

    if (this.state.isRetrievingSuggestions && this.state.proposedQuerySuggestions.length === 0) {
      renderSuggestions = <div className="suggestionPanel">
                            <div {...getItemProps({item: null, disabled: true})}>
                              <div className="suggestionItem">
                                <Spinner size={ SpinnerSize.small }/>
                              </div>
                            </div>
                          </div>;
    }

    if (this.state.proposedQuerySuggestions.length > 0) {

      suggestions = this.state.proposedQuerySuggestions.map((suggestion, index) => {
                              return <div {...getItemProps({item: suggestion})}
                                  key={index}
                                  style={{
                                    fontWeight: selectedItem === suggestion ? 'bold' : 'normal'
                                  }}>
                                      <Label className={ highlightedIndex === index ? 'suggestionItem selected': 'suggestionItem'}>
                                          <div dangerouslySetInnerHTML={{ __html: suggestion }}></div>
                                      </Label>
                                  </div>;
                                });
      
      renderSuggestions = <div className="suggestionPanel">
                            { suggestions }
                          </div>;
    }
    
    return renderSuggestions;
  }

  /**
   * Handler when a user press enter in the search box
   * @param queryText The query text entered by the user
   */
  private async _onSearch(queryText: string) {
    
    
    if (this.props.searchInNewPage) {
      
      // Send the query to the a new via the query string
      const url = UrlHelper.addOrReplaceQueryStringParam(this.props.pageUrl, "q", encodeURIComponent(queryText));

      const behavior = this.props.openBehavior === PageOpenBehavior.NewTab ? "_blank" : "_self";
      window.open(url, behavior);
      
    } else {
      // Send the query to components on the page
      this.props.eventAggregator.raiseEvent("search:newQueryKeywords", {
        data: queryText,
        sourceId: "SearchBoxQuery",
        targetId: "SearchResults"
      });
    }
  }

  /**
   * Handler when a user enters new keywords in the search box input
   * @param inputValue 
   */
  private async _onChange(inputValue: string) {

    if (inputValue && this.props.enableQuerySuggestions) {

      if (inputValue.length >= this.SUGGESTION_CHAR_COUNT_TRIGGER) {

        try {

          this.setState({
            isRetrievingSuggestions: true,
            errorMessage: null
          });

          const suggestions = await this.props.searchDataProvider.suggest(inputValue);

          this.setState({
            proposedQuerySuggestions: suggestions,
            termToSuggestFrom: inputValue, // The term that was used as basis to get the suggestions from
            isRetrievingSuggestions: false
          });

        } catch(error) {
          
          this.setState({
            errorMessage: error.message,
            proposedQuerySuggestions: [],
            isRetrievingSuggestions: false
          });
        }
        
      } else {

        // Clear suggestions history
        this.setState({
          proposedQuerySuggestions: [],
        });
      }

    } else {

      if (!inputValue) {

        // Clear suggestions history
        this.setState({
          proposedQuerySuggestions: [],
        });
      }
    }
  }

  /**
   * Handler when a suggestion is selected in the dropdown
   * @param suggestion the suggestion value
   */
  private _onQuerySuggestionSelected(suggestion: string) {

    const termToSuggestFromIndex = this.state.searchInputValue.indexOf(this.state.termToSuggestFrom);
    let replacedSearchInputvalue =  this._replaceAt(this.state.searchInputValue, termToSuggestFromIndex, suggestion);

    // Remove inenr HTML markup if there is 
    replacedSearchInputvalue = replacedSearchInputvalue.replace(/(<B>|<\/B>)/g,"");

    this.setState({
      searchInputValue: replacedSearchInputvalue,
      selectedQuerySuggestions: update(this.state.selectedQuerySuggestions, { $push: [suggestion]}),
      proposedQuerySuggestions:[],
    });     
  }

  private _replaceAt(string, index, replace) {
    return string.substring(0, index) + replace;
  }
}
