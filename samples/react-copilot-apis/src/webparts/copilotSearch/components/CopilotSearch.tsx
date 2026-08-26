import * as React from 'react';
import styles from './CopilotSearch.module.scss';
import type { ICopilotSearchProps } from './ICopilotSearchProps';
import { PrimaryButton, Spinner, SpinnerSize } from '@fluentui/react';
import { Icon } from '@fluentui/react/lib/Icon';
import { CopilotSearchHit } from '../../../services/ICopilotSearchService';

interface ICopilotSearchState {
  searchQuery: string;
  searchResults: CopilotSearchHit[];
  isLoading: boolean;
  totalCount: number;
  hasSearched: boolean;
  errorMessage: string | undefined;
}

export default class CopilotSearch extends React.Component<ICopilotSearchProps, ICopilotSearchState> {

  constructor(props: ICopilotSearchProps) {
    super(props);
    this.state = {
      searchQuery: '',
      searchResults: [],
      isLoading: false,
      totalCount: 0,
      hasSearched: false,
      errorMessage: undefined
    };
  }

  private handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchQuery: event.target.value });
  };

  private handleSearch = async (): Promise<void> => {
    const { searchQuery } = this.state;
    const { copilotSearchService, pageSize } = this.props;
    
    if (!searchQuery.trim()) {
      return;
    }

    if (!copilotSearchService) {
      this.setState({
        errorMessage: 'Copilot Search service is not available',
        isLoading: false,
        hasSearched: true
      });
      return;
    }

    this.setState({ 
      isLoading: true, 
      errorMessage: undefined,
      hasSearched: true 
    });

    try {
      // Parse pageSize if provided
      const pageSizeNum = pageSize ? parseInt(pageSize, 10) : undefined;

      const response = await copilotSearchService.Search(
        searchQuery,
        {
          pageSize: pageSizeNum && !isNaN(pageSizeNum) ? pageSizeNum : 25,
          dataSources: {
            oneDrive: {
              resourceMetadataNames: ['title', 'author']
            }
          }
        }
      );

      this.setState({
        searchResults: response.searchHits,
        totalCount: response.totalCount,
        isLoading: false,
        errorMessage: undefined
      });
    } catch (error) {
      console.error('Error performing search:', error);
      this.setState({
        searchResults: [],
        totalCount: 0,
        isLoading: false,
        errorMessage: `Failed to perform search: ${error instanceof Error ? error.message : 'Unknown error'}`
      });
    }
  };

  private handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSearch().catch((error) => {
        console.error('Error performing search:', error);
      });
    }
  };

  private formatPreview = (preview: string): string => {
    // Replace <c0>text</c0> tags with <b>text</b> for highlighting
    return preview.replace(/<c0>/g, '<b>').replace(/<\/c0>/g, '</b>');
  };

  public render(): React.ReactElement<ICopilotSearchProps> {
    const { hasTeamsContext } = this.props;
    const { searchQuery, searchResults, isLoading, totalCount, hasSearched, errorMessage } = this.state;

    return (
      <section className={`${styles.copilotSearch} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.searchContainer}>
          <div className={styles.searchHeader}>
            <div className={styles.headerLeft}>
              <Icon iconName="SearchAndApps" className={styles.headerIcon} />
              <h2 className={styles.searchTitle}>Microsoft 365 Copilot Search</h2>
            </div>
          </div>

          {/* Search Input Area */}
          <div className={styles.inputArea}>
            <div className={styles.searchInputContainer}>
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Enter your search query... (Press Enter to search)"
                value={searchQuery}
                onChange={this.handleQueryChange}
                onKeyPress={this.handleKeyPress}
                disabled={isLoading}
              />
            </div>
            <div className={styles.buttonContainer}>
              <PrimaryButton
                text="Search"
                iconProps={{ iconName: 'Search' }}
                onClick={this.handleSearch}
                disabled={!searchQuery.trim() || isLoading}
                className={styles.searchButton}
              />
            </div>
          </div>

          {/* Results Area */}
          <div className={styles.resultsArea}>
            {!hasSearched && !isLoading ? (
              <div className={styles.emptyState}>
                <Icon iconName="SearchAndApps" className={styles.emptyStateIcon} />
                <p>Enter a search query to find relevant documents</p>
              </div>
            ) : isLoading ? (
              <div className={styles.loadingContainer}>
                <Spinner size={SpinnerSize.large} label="Searching..." />
              </div>
            ) : errorMessage ? (
              <div className={styles.errorContainer}>
                <Icon iconName="ErrorBadge" className={styles.errorIcon} />
                <p className={styles.errorMessage}>{errorMessage}</p>
              </div>
            ) : (
              <div className={styles.resultsContainer}>
                <div className={styles.resultsHeader}>
                  <Icon iconName="SearchIssue" className={styles.resultsIcon} />
                  <span className={styles.resultsCount}>
                    Found {totalCount} result{totalCount !== 1 ? 's' : ''} for "{searchQuery}"
                  </span>
                </div>
                {searchResults.length === 0 ? (
                  <div className={styles.noResults}>
                    <Icon iconName="SearchIssue" className={styles.noResultsIcon} />
                    <p>No results found for your query</p>
                  </div>
                ) : (
                  <div className={styles.resultsList}>
                    {searchResults.map((hit, index) => {
                      const title = (hit.resourceMetadata?.title as string) || 'Untitled Document';
                      const author = hit.resourceMetadata?.author as string;
                      const formattedPreview = this.formatPreview(hit.preview);
                      
                      return (
                        <div key={index} className={styles.resultItem}>
                          <div className={styles.resultHeader}>
                            <Icon iconName="Page" className={styles.resultIcon} />
                            <div className={styles.resultHeaderContent}>
                              <a 
                                href={hit.webUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles.resultTitle}
                              >
                                {title}
                              </a>
                              {author && (
                                <div className={styles.resultAuthor}>
                                  <Icon iconName="Contact" className={styles.authorIcon} />
                                  {author}
                                </div>
                              )}
                            </div>
                          </div>
                          <div 
                            className={styles.resultPreview}
                            dangerouslySetInnerHTML={{ __html: formattedPreview }}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}
