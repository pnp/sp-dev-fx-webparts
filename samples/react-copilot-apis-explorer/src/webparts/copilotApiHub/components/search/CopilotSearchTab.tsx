import * as React from "react";
import styles from "./CopilotSearchTab.module.scss";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { TextField } from "@fluentui/react/lib/TextField";
import { SpinnerSize, Spinner } from "@fluentui/react/lib/Spinner";
import { MessageBar, MessageBarType } from "@fluentui/react/lib/MessageBar";
import { CopilotSearchService } from "../../../../services/CopilotSearchService";
import type { CopilotSearchHit } from "../../../../services/ICopilotSearchService";
import PrerequisitesPanel from "../PrerequisitesPanel";

interface ICopilotSearchTabState {
  query: string;
  pageSize: number;
  results: CopilotSearchHit[];
  totalCount: number;
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

export default class CopilotSearchTab extends React.Component<
  {},
  ICopilotSearchTabState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      query: "",
      pageSize: 10,
      results: [],
      totalCount: 0,
      isLoading: false,
      error: null,
      hasSearched: false,
    };
  }

  private handleSearch = async (): Promise<void> => {
    const { query, pageSize } = this.state;
    if (!query.trim()) return;

    this.setState({ isLoading: true, error: null });

    try {
      const response = await CopilotSearchService.Search({
        query: query.trim(),
        pageSize: pageSize,
        dataSources: {
          oneDrive: {
            resourceMetadataNames: ["title", "author"],
          },
        },
      });

      this.setState({
        results: response.searchHits || [],
        totalCount: response.totalCount || 0,
        isLoading: false,
        hasSearched: true,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      this.setState({ error: errorMessage, isLoading: false, hasSearched: true });
    }
  };

  private handleKeyPress = (
    event: React.KeyboardEvent<HTMLElement>,
  ): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleSearch().catch(console.error);
    }
  };

  private formatPreview(preview: string): string {
    if (!preview) return "";
    return preview.replace(/<c0>/g, "<b>").replace(/<\/c0>/g, "</b>");
  }

  public render(): React.ReactElement {
    const { query, pageSize, results, totalCount, isLoading, error, hasSearched } =
      this.state;

    return (
      <div className={styles.searchContainer}>
        {/* API Info Bar */}
        <div className={styles.apiBar}>
          <div className={styles.apiBarLeft}>
            <strong>Copilot Search API</strong>
            <code style={{ fontSize: "12px" }}>POST /beta/copilot/search</code>
            <span className={styles.badge}>Beta</span>
          </div>
          <PrerequisitesPanel
            apiName="Copilot Search API"
            apiStatus="Beta"
            endpoint="POST /beta/copilot/search"
            description="Perform hybrid semantic and lexical search across OneDrive for work or school content using natural language queries."
            prerequisites={[
              {
                category: "Required Permissions",
                items: ["Files.Read.All", "Sites.Read.All"],
              },
              {
                category: "Licensing",
                items: [
                  "Microsoft 365 Copilot license required for users",
                ],
              },
              {
                category: "Limitations",
                items: [
                  "Beta API — subject to change without notice",
                  "Query max length: 1,500 characters",
                  "Data source: OneDrive for work or school only",
                  "Page size: 1-100 results per request",
                ],
              },
            ]}
          />
        </div>

        {/* Search Controls */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "16px", alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <TextField
              label="Search Query"
              value={query}
              onChange={(_, val) => this.setState({ query: val || "" })}
              onKeyPress={this.handleKeyPress}
              placeholder="Enter a natural language search query..."
              disabled={isLoading}
            />
          </div>
          <div style={{ width: "100px" }}>
            <TextField
              label="Page Size"
              type="number"
              value={String(pageSize)}
              onChange={(_, val) =>
                this.setState({
                  pageSize: Math.max(1, Math.min(100, parseInt(val || "10") || 10)),
                })
              }
              min={1}
              max={100}
              disabled={isLoading}
            />
          </div>
          <PrimaryButton
            text={isLoading ? "Searching..." : "Search"}
            iconProps={{ iconName: "Search" }}
            onClick={this.handleSearch}
            disabled={!query.trim() || isLoading}
            styles={{
              root: {
                backgroundColor: "#8661c5",
                borderColor: "#8661c5",
                height: 32,
              },
              rootHovered: { backgroundColor: "#7554b3" },
              rootPressed: { backgroundColor: "#6447a0" },
            }}
          />
        </div>

        {isLoading && (
          <Spinner size={SpinnerSize.medium} label="Searching..." styles={{ root: { margin: "40px 0" } }} />
        )}

        {error && (
          <MessageBar
            messageBarType={MessageBarType.error}
            onDismiss={() => this.setState({ error: null })}
            styles={{ root: { marginBottom: "12px" } }}
          >
            {error}
          </MessageBar>
        )}

        {hasSearched && !isLoading && !error && (
          <div>
            <div style={{ fontSize: "13px", color: "#666", marginBottom: "12px" }}>
              Found <strong>{totalCount}</strong> result
              {totalCount !== 1 ? "s" : ""} for &quot;{query}&quot;
            </div>

            {results.length === 0 ? (
              <div style={{ padding: "40px", textAlign: "center", color: "#999", backgroundColor: "#faf9f8", borderRadius: "8px" }}>
                No results found. Try a different search query.
              </div>
            ) : (
              results.map((hit, index) => (
                <div key={index} className={styles.searchResult}>
                  <div className={styles.resultTitle}>
                    <a href={hit.webUrl} target="_blank" rel="noopener noreferrer">
                      {hit.resourceMetadata?.title || "Untitled"}
                    </a>
                  </div>
                  <div className={styles.resultMeta}>
                    {hit.resourceMetadata?.author && (
                      <span>By {hit.resourceMetadata.author}</span>
                    )}
                    {hit.resourceType && (
                      <span style={{ marginLeft: "12px" }}>
                        Type: {hit.resourceType}
                      </span>
                    )}
                  </div>
                  {hit.preview && (
                    <div
                      className={styles.resultPreview}
                      dangerouslySetInnerHTML={{
                        __html: this.formatPreview(hit.preview),
                      }}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    );
  }
}
