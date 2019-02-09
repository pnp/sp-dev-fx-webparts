import * as React from 'react';

// Good looks
import styles from './WebSearchTab.module.scss';

// Localization
import * as strings from 'PropertyPaneFilePickerStrings';

// Types
import { IWebSearchTabProps, IWebSearchTabState, ISearchSuggestion, ISearchResult, ImageSize, ImageAspect, ImageLicense } from './WebSearchTab.types';

// Offce Fabric stuff
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Check } from 'office-ui-fabric-react/lib/Check';
import { Dropdown, IDropdownProps, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { IRectangle } from 'office-ui-fabric-react/lib/Utilities';
import { Selection, SelectionMode, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';

// Used for HTTP requests
import { SPHttpClient, IHttpClientOptions, SPHttpClientResponse } from '@microsoft/sp-http';

// CSS utility to combine classes dynamically
import { css } from '@uifabric/utilities/lib/css';

/**
 * Rows per page
 */
const ROWS_PER_PAGE = 3;

/**
 * Maximum row height
 */
const MAX_ROW_HEIGHT = 250;

/**
 * Maximum file size when searching
 */
const MAXFILESIZE = 52428800;

/**
 * Maximum number of search results
 */
const MAXRESULTS = 100;

/**
 * This is the default search suggestions as of Jan 2019.
 * I have no idea where Bing gets them.
 * But you can provide your own when calling this component
 */
const DEFAULT_SUGGESTIONS: ISearchSuggestion[] = [
  {
    topic: 'Backgrounds',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/background_b4f5f0fd0af42d6dc969f795cb65a13c.jpg'
  },
  {
    topic: 'Classrooms',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/classroom_a0b3addf2246028cb7486ddfb0783c6c.jpg'
  },
  {
    topic: 'Conferences',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/conference_b450359b0962cf464f691b68d7c6ecd1.jpg'
  },
  {
    topic: 'Meetings',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/meeting_694397debfa52bc06a952310af01d59d.jpg'
  },
  {
    topic: 'Patterns',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/pattern_6e7c8fd91c9b5fa47519aa3fd4a95a82.jpg'
  },
  {
    topic: 'Teamwork',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/teamwork_5841da2ae9b9424173f601d86e3a252c.jpg'
  },
  {
    topic: 'Technology',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/technology_9a8a4e09c090c65f4c0b3ea06bd48b83.jpg'
  },
  {
    topic: 'Scenery',
    backgroundUrl: 'https://spoprod-a.akamaihd.net/files/sp-client-prod_2019-01-11.008/scenery_abe5bfb8f3913bd52be279a793472ead.jpg'
  }
];

/**
 * The tenant storage key to use when storing the Bing API key.
 */
const BINGAPI_TENANT_STORAGEKEY: string = 'BingApi';

/**
 * Renders search suggestions and performs seach queries
 */
export default class WebSearchTab extends React.Component<IWebSearchTabProps, IWebSearchTabState> {
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;
  private _selection: Selection;
  private _listElem: List = undefined;

  constructor(props: IWebSearchTabProps) {
    super(props);

    this._selection = new Selection(
      {
        selectionMode: SelectionMode.single,
        onSelectionChanged: () => {
          // Get the selected item
          const selectedItems = this._selection.getSelection();
          if (selectedItems && selectedItems.length > 0) {
            //Get the selected key
            const selectedKey: ISearchResult = selectedItems[0] as ISearchResult;

            //Brute force approach to making sure all URLs are loading over HTTPS
            // even if it breaks the page.
            const selectedUrl: string = selectedKey.contentUrl.replace('http://', 'https://');

            // Save the selected file
            this.setState({
              fileUrl: selectedUrl
            });
          } else {
            // Remove any selected file
            this.setState({
              fileUrl: undefined
            });
          }
          if (this._listElem) {
            // Force the list to update to show the selection check
            this._listElem.forceUpdate();
          }
        }
      });

    this.state = {
      isLoading: true,
      hasKey: undefined,
      results: undefined,
    };
  }

  /**
   * Get the API key
   */
  public componentDidMount(): void {
    // Find out if we should show anything
    this._getAPIKey();
  }

  /**
   * Render the tab
   */
  public render(): React.ReactElement<IWebSearchTabProps> {
    const { hasKey, query, results } = this.state;
    return (
      <div className={styles.tabContainer}>
        <div className={styles.tabHeaderContainer}>
          <h2 className={styles.tabHeader}>{strings.WebSearchLinkLabel}</h2>
          {hasKey && this._renderSearchBox()}
        </div>
        <div className={styles.tab}>
          {hasKey === false && strings.SorryWebSearch}  {/* If we verified we don't have a key, give a little Sorry message */}
          {hasKey && !query && this._renderSearchSuggestions()} {/* No search yet, show suggestions */}
          {query && results && this._renderSearchResults()} {/* Got results, show them */}
        </div>
        <div className={styles.actionButtonsContainer}>
          {this.state.results && this.state.license === 'Any' && <MessageBar>
            {strings.CreativeCommonsMessage}
          </MessageBar>}
          <Label className={styles.copyrightLabel}>
            {strings.CopyrightWarning}&nbsp;&nbsp;
            <Link target='_blank' href={strings.CopyrightUrl}>{strings.LearnMoreLink}</Link>
          </Label>

          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={this.state.fileUrl === undefined}
              className={styles.actionButton}
              onClick={() => this._handleSave()}
            >{strings.OpenButtonLabel}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Renders the returned search results
   */
  private _renderSearchResults = (): JSX.Element => {
    const { results } = this.state;

    // If there are no results, tell 'em.
    if (results === undefined || results.length < 1) {
      return <Label className={styles.noResultLabel}>{strings.NoResultsBadEnglish}</Label>;
    }

    return (
      <FocusZone>
        <SelectionZone selection={this._selection}
          onItemInvoked={(item: ISearchResult) => this._selection.setKeySelected(item.key, true, true)}
        >
          <List
            ref={this._linkElement}
            className={styles.bingGrildList}
            items={this.state.results}
            getItemCountForPage={this._getItemCountForPage}
            getPageHeight={this._getPageHeight}
            renderedWindowsAhead={4}
            onRenderCell={this._onRenderSearchResultsCell}
          />
        </SelectionZone>
      </FocusZone>
    );
  }

  /**
   * Show an individual search result item
   */
  private _onRenderSearchResultsCell = (item: ISearchResult, index: number | undefined): JSX.Element => {
    const { query } = this.state;

    let isSelected: boolean = false;

    if (this._selection && index !== undefined) {
      isSelected = this._selection.isIndexSelected(index);
    }

    // The logic for calculating the thumbnail dimensions is not quite the same as the out-of-the-box file picker,
    // but it'll have to do.

    // Find the aspect ratio of the picture
    const ratio: number = item.width / item.height;

    // Fit the height to the desired row height
    let thumbnailHeight: number = Math.min(this._rowHeight, item.height);

    // Resize the picture with the same aspect ratio
    let thumbnailWidth: number = thumbnailHeight * ratio;

    const searchResultAltText: string = strings.SearchResultAlt.replace('{0}', query);
    return (
      <div
        className={styles.bingGridListCell}
        style={{
          width: 100 / this._columnCount + '%'
        }}
      >
        <div
          aria-label={searchResultAltText}
          className={css(styles.bingTile, isSelected ? styles.isSelected : undefined)}
          data-is-focusable={true}
          data-selection-index={index}
          style={{
            width: `${thumbnailWidth}px`,
            height: `${thumbnailHeight}px`
          }}>
          <div className={styles.bingTileContent} data-selection-invoke={true}>
            <Image src={item.thumbnailUrl} className={styles.bingTileThumbnail} alt={searchResultAltText} width={thumbnailWidth} height={thumbnailHeight} />
            <div className={styles.bingTileFrame}></div>
            <div className={styles.bingTileCheckCircle}
              role='checkbox'
              aria-checked={isSelected}
              data-item-index={index} data-selection-toggle={true} data-automationid='CheckCircle'>
              <Check checked={isSelected} />
            </div>
            <div className={styles.bingTileNamePlate}>
              <Link
                href={item.contentUrl}
                target='_blank'
                aria-label={strings.SearchResultAriaLabel}
              >{item.displayUrl}</Link>
            </div>
          </div>
        </div>
      </div>);
  }

  /**
   * Renders suggestions when there aren't any queries
   */
  private _renderSearchSuggestions = (): JSX.Element => {
    const suggestions: ISearchSuggestion[] = this.props.suggestions !== undefined ? this.props.suggestions : DEFAULT_SUGGESTIONS;

    return (
      <FocusZone>
        <List
          className={styles.filePickerFolderCardGrid}
          items={suggestions}
          getItemCountForPage={this._getItemCountForPage}
          getPageHeight={this._getPageHeight}
          renderedWindowsAhead={4}
          onRenderCell={this._onRenderSuggestionCell}
        />
      </FocusZone>
    );
  }

  /**
   * Gets search results from Bing
   */
  private _getSearchResults = () => {
    const aspect: string = this.state.aspect ? this.state.aspect : 'All';
    const size: string = this.state.size ? this.state.size : 'All';
    const license: string = this.state.license ? this.state.license : 'Any';
    const { query } = this.state;

    if (query === undefined) {
      // No query
      return;
    }

    // Show a loading indicator
    this.setState({ isLoading: true });

    // Use this client option to prevent CORS issues.
    const httpClientOptions: IHttpClientOptions = {
      headers: new Headers(),
      method: 'GET',
      mode: 'cors'
    };

    // Submit the request
    const apiUrl: string = `https://www.bingapis.com/api/v7/images/search?appid=${this.state.apiKey}&traffictype=Internal_monitor&q=${encodeURIComponent(query)}&count=${MAXRESULTS}&aspect=${aspect}&maxFileSize=${MAXFILESIZE}&mkt=en-US&size=${size}&license=${license}`;
    this.props.context.httpClient.get(apiUrl,
      SPHttpClient.configurations.v1, httpClientOptions)
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          // Cast to Bing search results (for type safety)
          const bingResults: IBingSearchResult[] = responseJSON.value;

          //Convert results to search results
          const searchResults: ISearchResult[] = bingResults.map((bingResult: IBingSearchResult) => {
            // Get dimensions
            const width: number = bingResult!.thumbnail!.width ? bingResult!.thumbnail!.width : bingResult!.width;
            const height: number = bingResult!.thumbnail!.height ? bingResult!.thumbnail!.height : bingResult!.height;

            // Create a search result
            const searchResult: ISearchResult = {
              thumbnailUrl: bingResult.thumbnailUrl,
              contentUrl: bingResult.contentUrl,
              displayUrl: this.getDisplayUrl(bingResult.hostPageDisplayUrl),
              key: bingResult.imageId,
              width: width,
              height: height,
            };
            return searchResult;
          });

          // Set the items so that the selection zone can keep track of them
          this._selection.setItems(searchResults, true);

          // Save results and stop loading indicator
          this.setState({
            isLoading: false,
            results: searchResults
          });
        });
      });
  }

  /**
   * Calculates how many items there should be in the page
   */
  private _getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
    if (itemIndex === 0) {
      this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
      this._rowHeight = this._columnWidth;
    }

    return this._columnCount * ROWS_PER_PAGE;
  }

  /**
   * Gets the height of a list "page"
   */
  private _getPageHeight = (): number => {
    return this._rowHeight * ROWS_PER_PAGE;
  }

  /**
   * Renders a cell for search suggestions
   */
  private _onRenderSuggestionCell = (item: ISearchSuggestion, index: number | undefined): JSX.Element => {
    return (
      <div
        className={styles.filePickerFolderCardTile}
        data-is-focusable={true}
        style={{
          width: 100 / this._columnCount + '%'
        }}
      >
        <div className={styles.filePickerFolderCardSizer}>
          <div className={styles.filePickerFolderCardPadder}>
            <Image src={item.backgroundUrl} className={styles.filePickerFolderCardImage} imageFit={ImageFit.cover} />
            <DefaultButton className={styles.filePickerFolderCardLabel} onClick={(_event) => this._handleSearch(item.topic)}>{item.topic}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Renders the search box
   */
  private _renderSearchBox = (): JSX.Element => {
    const { query } = this.state;
    const hasQuery: boolean = query !== undefined;
    const license: string = this.state.license ? this.state.license : 'All';
    return <div className={styles.searchBoxContainer}>
      <div className={styles.searchBoxMedium}>
        <div className={styles.searchBox}>
          <SearchBox
            placeholder={strings.SearchBoxPlaceholder}
            value={query}
            onSearch={newQuery => this._handleSearch(newQuery)}
          />
        </div>
      </div>
      <Label>{strings.PoweredByBing}</Label>
      {hasQuery && <div className={styles.dropdownContainer}>
        <Dropdown
          className={styles.filterDropdown}
          placeholder={strings.ImageSizePlaceholderText}
          onRenderPlaceHolder={(props: IDropdownProps) => this._renderFilterPlaceholder(props)}
          selectedKey={this.state.size}
          options={[
            { key: 'All', text: strings.SizeOptionAll },
            { key: 'Small', text: strings.SizeOptionSmall },
            { key: 'Medium', text: strings.SizeOptionMedium },
            { key: 'Large', text: strings.SizeOptionLarge },
            { key: 'Wallpaper', text: strings.SizeOptionExtraLarge }
          ]}
          onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => this._handleChangeSize(option)}
        />
        <Dropdown
          className={styles.filterDropdown}
          placeholder={strings.ImageLayoutPlaceholderText}
          onRenderPlaceHolder={(props: IDropdownProps) => this._renderFilterPlaceholder(props)}
          selectedKey={this.state.aspect}
          options={[
            { key: 'All', text: strings.LayoutOptionAll },
            { key: 'Square', text: strings.LayoutOptionSquare },
            { key: 'Wide', text: strings.LayoutOptionWide },
            { key: 'Tall', text: strings.LayoutOptionTall },
          ]}
          onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => this._handleChangeLayout(option)}
        />
        <Dropdown
          className={styles.filterDropdown}
          placeholder={strings.LicensePlaceholderText}
          onRenderPlaceHolder={(props: IDropdownProps) => this._renderFilterPlaceholder(props)}
          selectedKey={license}
          options={[
            { key: 'All', text: strings.LicenseOptionAll },
            { key: 'Any', text: strings.LicenseOptionAny }
          ]}
          onChange={(event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption, index?: number) => this._handleChangeLicense(option)}
        />
      </div>}
    </div>;
  }

  /**
   * Handles when a user changes the size drop down.
   * Resubmits search query
   */
  private _handleChangeSize = (option: IDropdownOption) => {
    this.setState({
      size: option.key as ImageSize
    }, () => this._getSearchResults());
  }

  /**
   * Handles when user selects a new layout from the drop down.
   * Resubmits search query.
   */
  private _handleChangeLayout = (option: IDropdownOption) => {
    this.setState({
      aspect: option.key as ImageAspect
    }, () => this._getSearchResults());
  }

  /**
   * Handles when a user changes the license from the drop down
   * Resubits search query
   */
  private _handleChangeLicense = (option: IDropdownOption) => {
    this.setState({
      license: option.key as ImageLicense
    }, () => this._getSearchResults());
  }

  /**
   * Renders the drop down placeholders
   */
  private _renderFilterPlaceholder = (props: IDropdownProps): JSX.Element => {
    return <span>{props.placeholder}</span>;
  }

  /**
   * Handles when user triggers search query
   */
  private _handleSearch = (newQuery?: string) => {
    this.setState({
      query: newQuery
    }, () => this._getSearchResults());
  }

  /**
   * Handles when user closes search pane
   */
  private _handleClose = () => {
    this.props.onClose();
  }

  /**
   * Handes when user saves selection
   * Calls property pane file picker's save function
   */
  private _handleSave = () => {
    this.props.onSave(encodeURI(this.state.fileUrl));
  }

  /**
   * Removes protocol and retrieves only the domain, just like Bing search results does
   * in the SharePoint file picker
   * @param url The display url as provided by Bing
   */
  private getDisplayUrl(url: string): string {
    // remove any protocols
    if (url.indexOf('://') > -1) {
      const urlParts: string[] = url.split('://');
      url = urlParts.pop();
    }

    // Split the URL on the first slash
    const splitUrl = url.split('/');
    return splitUrl[0];
  }

  /**
   * Retrieves the API key from tenant storage
   */
  private _getAPIKey() {
    const { absoluteUrl } = this.props.context.pageContext.web;
    const apiUrl: string = `${absoluteUrl}/_api/web/GetStorageEntity('${BINGAPI_TENANT_STORAGEKEY}')`;
    this.props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON: any) => {
          this.setState({
            isLoading: false,
            apiKey: responseJSON.Value,
            hasKey: responseJSON.Value !== undefined
          });
        });
      }, () => {
        this.setState({
          isLoading: false,
          hasKey: false
        });
      });
  }

  /**
   * Creates a reference to the list
   */
  private _linkElement = (e: any) => {
    this._listElem = e;
  }
}
