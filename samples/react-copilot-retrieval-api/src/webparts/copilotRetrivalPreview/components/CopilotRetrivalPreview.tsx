import * as React from 'react';
import styles from './CopilotRetrivalPreview.module.scss';
import type { ICopilotRetrivalPreviewProps } from './ICopilotRetrivalPreviewProps';
import type { IRetrivalResponse, IRetrievalHit } from './IRetrivalResponse';
import { DetailsList, Dropdown, IColumn, Label, PrimaryButton, TextField } from '@fluentui/react';
import { marked } from 'marked';

interface ICopilotRetrivalPreviewState {
  loading: boolean;
filterExpression?: string;
queryText?: string;
dataSource?: string;
  response?: IRetrivalResponse;
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
            <PrimaryButton onClick={() => this.onRetrival()}>Retrieval</PrimaryButton>
          </div>
          { this.state.loading && <div>Loading...</div> }
          { !this.state.loading && results && results.length > 0 && (
          <div>
                <DetailsList items={results} columns={this.columns} setKey="set" selectionMode={0} onItemInvoked={() => { /* no-op */ }} />
                
          </div>)}
          { !this.state.loading && (!results || results.length === 0) && (
          <div>
              No Items found.
          </div>)}
        </div>
      </section>
    );
  }

private onRetrival = ():void  => {
  this.setState({ loading: true}, 
    () => this.getRetrivalResult());
}



private getRetrivalResult = ():void => {
  const {wpcontext} = this.props;
  const {queryText, filterExpression, dataSource, maximumNumberOfResults} = this.state;

  if (!queryText) {
    alert('Please enter a query.');
    return;
  }
  wpcontext.msGraphClientFactory.getClient("3").then((client) => {
      const endpoint = 'https://graph.microsoft.com/beta/copilot/retrieval';
    const body = {
      queryString:  queryText,
      dataSource: dataSource || 'sharePoint',
      filterExpression: filterExpression || undefined,
      resourceMetadata:  ['title', 'author'],
      maximumNumberOfResults: "" + maximumNumberOfResults
    } as Record<string, unknown>;
  
  client.api(endpoint)
    .post(body)
    .then((resp) => {
      
      console.log("Retrieval API response: ", resp);
      this.setState({ response: resp as IRetrivalResponse, loading: false });
    }).catch((error) => {
      console.error("Error calling Retrieval API: ", error);
      alert('Error calling Retrieval API. Check console for details.');
    });
  
    

  }).catch((error) => {
    console.error("Error getting Graph client: ", error);
    alert('Error getting Graph client. Check console for details.');
  });

}

}
