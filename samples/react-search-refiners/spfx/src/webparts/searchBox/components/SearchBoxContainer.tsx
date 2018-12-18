import * as React from                               'react';
import { ISearchBoxContainerProps } from             './ISearchBoxContainerProps';
import * as strings from                             'SearchBoxWebPartStrings';
import ISearchBoxContainerState from                 './ISearchBoxContainerState';
import { UrlHelper, PageOpenBehavior } from          '../../../helpers/UrlHelper';
import { MessageBar, MessageBarType } from           'office-ui-fabric-react/lib/MessageBar';
import Downshift from                                'downshift';
import { TextField } from                            'office-ui-fabric-react/lib/TextField';
import { IconType } from                             'office-ui-fabric-react/lib/Icon';
import { Spinner, SpinnerSize } from                 'office-ui-fabric-react/lib/Spinner';
import { Label } from                                'office-ui-fabric-react/lib/Label';
import * as update from                              'immutability-helper';
import styles from '../SearchBoxWebPart.module.scss';
import ISearchQuery from '../../../models/ISearchQuery';
import NlpDebugPanel from './NlpDebugPanel/NlpDebugPanel';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

const SUGGESTION_CHAR_COUNT_TRIGGER = 3;

export default class SearchBoxContainer extends React.Component<ISearchBoxContainerProps, ISearchBoxContainerState> {

  public constructor(props: ISearchBoxContainerProps) {

    super(props);

    this.state = {
      enhancedQuery: null,
      proposedQuerySuggestions: [],
      selectedQuerySuggestions: [],
      isRetrievingSuggestions: false,
      searchInputValue: '',
      termToSuggestFrom: null,
      errorMessage: null
    };

    this._onSearch = this._onSearch.bind(this);
    this._onChange = this._onChange.bind(this);
    this._onQuerySuggestionSelected = this._onQuerySuggestionSelected.bind(this);
  }

  private renderSearchBoxWithAutoComplete(): JSX.Element {
    return <Downshift
        onSelect={ this._onQuerySuggestionSelected }
        >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          selectedItem,
          highlightedIndex,
          openMenu,
          clearItems,
        }) => (
          <div>
            <div className={ styles.searchFieldGroup }>
              <TextField {...getInputProps({
                  placeholder: strings.SearchInputPlaceholder,
                  onKeyDown: event => {

                    // Submit search on "Enter" 
                    if (event.keyCode === 13 && (!isOpen || (isOpen && highlightedIndex === null))) {
                      this._onSearch(this.state.searchInputValue);
                    }
                  }
              })}
              className={ styles.searchTextField }
              value={ this.state.searchInputValue }
              autoComplete= "off"
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
              }}/>
              <IconButton iconProps={{
                  iconName: 'Search',
                  iconType: IconType.default,
                }} onClick= {() => { this._onSearch(this.state.searchInputValue);} } className={ styles.searchBtn }>
              </IconButton>
            </div>
            {isOpen ?
              this.renderSuggestions(getItemProps, selectedItem, highlightedIndex)
            : null}
          </div>
        )}
      </Downshift>;
  }

  private renderBasicSearchBox(): JSX.Element {
    return  <div className={ styles.searchFieldGroup }>
              <TextField 
                className={ styles.searchTextField }
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
              />
              <IconButton iconProps={{
                  iconName: 'Search',
                  iconType: IconType.default,
                }} onClick= {() => { this._onSearch(this.state.searchInputValue);} } className={ styles.searchBtn }>
              </IconButton>
            </div>;
  }

  /**
   * Renders the suggestions panel below the input control
   * @param getItemProps downshift getItemProps callback
   * @param selectedItem downshift selectedItem callback
   * @param highlightedIndex downshift highlightedIndex callback
   */
  private renderSuggestions(getItemProps, selectedItem, highlightedIndex): JSX.Element {
    
    let renderSuggestions: JSX.Element = null;
    let suggestions: JSX.Element[] = null;

    if (this.state.isRetrievingSuggestions && this.state.proposedQuerySuggestions.length === 0) {
      renderSuggestions = <div className={styles.suggestionPanel}>
                            <div {...getItemProps({item: null, disabled: true})}>
                              <div className={styles.suggestionItem}>
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
                                      <Label className={ highlightedIndex === index ? `${styles.suggestionItem} ${styles.selected}` : `${styles.suggestionItem}`}>
                                          <div dangerouslySetInnerHTML={{ __html: suggestion }}></div>
                                      </Label>
                                  </div>;
                                });
      
      renderSuggestions = <div className={styles.suggestionPanel}>
                            { suggestions }
                          </div>;
    }

    return renderSuggestions;
  }

  private _setInputValue(inputValue: string) {
    if (inputValue) {
      this.setState({
        searchInputValue: decodeURIComponent(inputValue),
      });
    }
  }

  /**
   * Handler when a user enters new keywords in the search box input
   * @param inputValue 
   */
  private async _onChange(inputValue: string) {

    if (inputValue && this.props.enableQuerySuggestions) {

      if (inputValue.length >= SUGGESTION_CHAR_COUNT_TRIGGER) {

        try {

          this.setState({
            isRetrievingSuggestions: true,
            errorMessage: null
          });

          const suggestions = await this.props.searchService.suggest(inputValue);

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

  /**
   * Handler when a user enters new keywords
   * @param queryText The query text entered by the user
   */
  public async _onSearch(queryText: string) {    

    // Don't send empty value
    if (queryText) {

      let query: ISearchQuery = {
        rawInputValue: queryText,
        enhancedQuery: ''
      };

      this.setState({
        searchInputValue: queryText,
      });

      if (this.props.enableNlpService && this.props.NlpService && queryText) {

        try {

          let enhancedQuery = await this.props.NlpService.enhanceSearchQuery(queryText, this.props.isStaging);
          query.enhancedQuery = enhancedQuery.enhancedQuery;

          enhancedQuery.entities.map((entity) => {          
          });

          this.setState({
            enhancedQuery: enhancedQuery,
          });

        } catch (error) {
          
          // In case of failure, use the non-optimized query instead
          query.enhancedQuery = queryText;  
        }
      }

      if (this.props.searchInNewPage) {
        
        // Send the query to the a new via the hash
        const url = `${this.props.pageUrl}#${encodeURIComponent(queryText)}`;

        const behavior = this.props.openBehavior === PageOpenBehavior.NewTab ? '_blank' : '_self';
        window.open(url, behavior);
        
      } else {

        // Notify the dynamic data controller
        this.props.onSearch(query);
      }
    }
  }

  public componentDidMount() {
    this._setInputValue(this.props.inputValue);
  }

  public componentWillReceiveProps(nextProps: ISearchBoxContainerProps) {
    this._setInputValue(nextProps.inputValue);
  }

  public render(): React.ReactElement<ISearchBoxContainerProps> {
    let renderErrorMessage: JSX.Element = null;

    const renderDebugInfos = this.props.enableDebugMode ?
                              <NlpDebugPanel rawResponse={ this.state.enhancedQuery }/>:
                              null;

    if (this.state.errorMessage) {
      renderErrorMessage = <MessageBar messageBarType={ MessageBarType.error } 
                                        dismissButtonAriaLabel='Close'
                                        isMultiline={ false }
                                        onDismiss={ () => {
                                          this.setState({
                                            errorMessage: null,
                                          });
                                        }}
                                        className={styles.errorMessage}>
                                        { this.state.errorMessage }</MessageBar>;
    }
    
    const renderSearchBox = this.props.enableQuerySuggestions ? 
                          this.renderSearchBoxWithAutoComplete() : 
                          this.renderBasicSearchBox();    
    return (
      <div className={styles.searchBox}>
        { renderErrorMessage }
        { renderSearchBox }
        { renderDebugInfos }
      </div>
    );
  }
}
