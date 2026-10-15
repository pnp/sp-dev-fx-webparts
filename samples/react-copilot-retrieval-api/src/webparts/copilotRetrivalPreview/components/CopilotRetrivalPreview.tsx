import * as React from 'react';
import styles from './CopilotRetrivalPreview.module.scss';
import type { ICopilotRetrivalPreviewProps } from './ICopilotRetrivalPreviewProps';
import type { IRetrivalResponse, IRetrievalHit } from './IRetrivalResponse';
import { DetailsList, Dropdown, IColumn, Label, MessageBar, MessageBarType, PrimaryButton, TextField } from '@fluentui/react';
import { marked } from 'marked';
import * as strings from 'CopilotRetrivalPreviewWebPartStrings';

interface ICopilotRetrivalPreviewState {
  loading: boolean;
filterExpression?: string;
queryText?: string;
dataSource?: string;
  response?: IRetrivalResponse;
  errorMessage?: string;
maximumNumberOfResults: number;
}

export default class CopilotRetrivalPreview extends React.Component<ICopilotRetrivalPreviewProps, ICopilotRetrivalPreviewState> {
  private columns: IColumn[] = [
    { key: 'col1', name: 'Title', fieldName: 'title', minWidth: 200, maxWidth: 400, isResizable: true },
    { key: 'col2', name: 'Author', fieldName: 'author', minWidth: 120, maxWidth: 200, isResizable: true },
    { key: 'col3', name: 'SnippetTHML', fieldName: 'snippet', minWidth: 200, maxWidth: 600, isResizable: true, 
      onRender: (item) => {
       const html = marked.parse(item.snippet, { gfm: true, breaks: true }) as string;

        return(
        <div style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}>
          <div dangerouslySetInnerHTML={{ __html: html }} style={{ maxHeight: '100px', overflowY: 'auto' }} />
        </div>);
      }
    }
  ];

  constructor(props: ICopilotRetrivalPreviewProps) {
    super(props);
    this.state = {
      loading: false,
      maximumNumberOfResults: 4
    };
  }

  componentDidMount(): void {
    
    const { wpcontext, filterQuery } = this.props;

    // Determine site URL from web part context if available, otherwise fallback to window.location.origin
    const siteUrl = (wpcontext && wpcontext.pageContext && wpcontext.pageContext.web && wpcontext.pageContext.web.absoluteUrl) || (typeof window !== 'undefined' ? window.location.origin : '');
    const filterExpression = filterQuery || `Path:"${siteUrl}"`;

    this.setState({
      filterExpression
    });
  }
  
  
  
  public render(): React.ReactElement<ICopilotRetrivalPreviewProps> {
    const {
      hasTeamsContext,
    } = this.props;
    const hits: IRetrievalHit[] = this.state.response?.retrievalHits || [];
    const results = hits.map(h => ({
      title: h.resourceMetadata?.title || '',
      author: h.resourceMetadata?.author || '',
      snippet: h.extracts && h.extracts.length > 0 ? h.extracts.map(e => e.text).join(' ') : '',
     
      webUrl: h.webUrl
    }));

    return (
      <section className={`${styles.copilotRetrivalPreview} ${hasTeamsContext ? styles.teams : ''}`}>
        <div>
          <Label style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '10px' }}>Copilot Retrieval Preview</Label>

          <div style={{ marginBottom: '20px' }}>
            <Dropdown 
              placeholder="Select a DataSource"
              label='Data Source'
              options={[
                { key: 'sharePoint', text: 'SharePoint' },
              ]}
              selectedKey="sharePoint"
              onChange={(e, option) => this.setState({ dataSource: ""+option?.key })}
            />
             <Dropdown 
              placeholder="ResultCount"
              label='Result Count'
              options={[
                { key: '4', text: '4' },
                { key: '8', text: '8' },
                { key: '12', text: '12' },
                { key: '16', text: '16' },
              ]}
              selectedKey={String(this.state.maximumNumberOfResults)}
              onChange={(e, option) => this.setState({ maximumNumberOfResults: Number(option?.key) })}
            />
               <TextField
              placeholder="Enter your Filter expression"
              value={this.state.filterExpression || ''}
              onChange={(e, newValue) => this.setState({ filterExpression: newValue || '' })}
              label='Filter Expression'
            />
            <TextField
              placeholder="Enter your search text"
              value={this.state.queryText || ''}
              onChange={(e, newValue) => this.setState({ queryText: newValue || '' })}
              label='Search Text'
            />
            <PrimaryButton disabled={this.state.loading} onClick={this.onRetrival}>Retrieval</PrimaryButton>
          </div>
          { this.state.errorMessage && (
            <MessageBar messageBarType={MessageBarType.error}>
              {this.state.errorMessage}
            </MessageBar>
          )}
          { this.state.loading && <div>Loading...</div> }
          { !this.state.loading && results && results.length > 0 && (
          <div>
                <DetailsList items={results} columns={this.columns} setKey="set" selectionMode={0} onItemInvoked={() => { /* no-op */ }} />
                
          </div>)}
          { !this.state.loading && !this.state.errorMessage && (!results || results.length === 0) && (
          <div>
              No Items found.
          </div>)}
        </div>
      </section>
    );
  }

  private onRetrival = (): void => {
    if (this.state.loading) {
      return;
    }

    if (!this.state.queryText?.trim()) {
      this.setState({ errorMessage: strings.QueryRequired, response: undefined, loading: false });
      return;
    }

    this.setState({ loading: true, errorMessage: undefined, response: undefined },
      this.getRetrivalResult);
  };

  private getRetrivalResult = async (): Promise<void> => {
    const { wpcontext } = this.props;
    const { queryText, filterExpression, dataSource, maximumNumberOfResults } = this.state;

    try {
      const client = await wpcontext.msGraphClientFactory.getClient('3');
      const response: IRetrivalResponse = await client
        .api('https://graph.microsoft.com/beta/copilot/retrieval')
        .post({
          queryString: queryText,
          dataSource: dataSource || 'sharePoint',
          filterExpression: filterExpression || undefined,
          resourceMetadata: ['title', 'author'],
          maximumNumberOfResults: String(maximumNumberOfResults)
        });

      this.setState({ response });
    } catch (error: unknown) {
      console.error('Error calling Retrieval API:', error);
      // Graph SDK errors expose message directly; raw API responses nest it under error.
      const details = typeof error === 'object' && error !== null && 'error' in error
        ? error.error
        : error;
      const message = typeof details === 'object' && details !== null && 'message' in details
        && typeof details.message === 'string' ? details.message : undefined;
      this.setState({ errorMessage: message?.trim() || strings.RetrievalFailed });
    } finally {
      this.setState({ loading: false });
    }
  };

}
