import * as React from 'react';
import styles from './GraphClient.module.scss';
import { IGraphClientProps } from './IGraphClientProps';
import { Providers } from '@microsoft/mgt-element';
import { RetryHandlerOptions } from '@microsoft/microsoft-graph-client';
import Editor from '@monaco-editor/react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export interface IGraphClientState {
  response: any;
  apiUrl: string;
  loading: boolean;
}

export default class GraphClient extends React.Component<IGraphClientProps, IGraphClientState> {
  constructor(props: IGraphClientProps) {
    super(props);

    this.state = {
      response: null,
      apiUrl: '',
      loading: false
    };
  }
  
  public render(): React.ReactElement<IGraphClientProps> {
    return (
      <div className={ styles.graphLatestClient }>
        <div className={styles.row}>  
          <div className={styles.col8}>
            <TextField
              placeholder="Specify your query"
              value={this.state.apiUrl}
              onChanged={this._apiUrlChanged}
              onKeyUp={(e: React.KeyboardEvent<any>) => e.key === 'Enter' && this._runQuery()}
            />
          </div>
          <div className={styles.col4}>
            <DefaultButton
              primary={true}
              onClick={this._runQuery}
              style={{ width: '100%' }}
              disabled={this.state.loading}>
              Run query
              {this.state.loading && (
                <>
                  <Spinner className={styles.spinner} size={SpinnerSize.xSmall} />
                </>
              )}
            </DefaultButton>
          </div>
        </div>       
        <Editor height="600px" theme="vs-dark" defaultLanguage="json" value={this.state.response ? JSON.stringify(this.state.response, null, 2) : ''} />
      </div>
    );
  }

  /**
   * Event handler for api URL change
   */
   private _apiUrlChanged = (val: string) => {
    this.setState({
      apiUrl: val,
    });
  }

  private _runQuery = async () => {
    this.setState({
      response: null,
      loading: true
    });

    const data = await Providers.globalProvider.graph.api("/me/events").middlewareOptions([new RetryHandlerOptions(5, 10)]).get();

    if(data && data.value && data.value.length > 0) {
      this.setState({
        response: data,
        loading: false
      });      
    }
  }
}
