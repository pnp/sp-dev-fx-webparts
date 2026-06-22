import * as React from 'react';
import styles from './DemoAccessData.module.scss';
import type { IDemoAccessDataProps } from './IDemoAccessDataProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DataAccessOptions } from '../../../Core/DataAccessOptions';
const iconPng: string = require('../assets/icon.png');

interface IDemoAccessDataState {
  fetchResult: any;
  spHttpResult: any;
  graphResult: any;
  pnpResult: any;
  loading: {
    fetch: boolean;
    spHttp: boolean;
    graph: boolean;
    pnp: boolean;
  };
}

export default class DemoAccessData extends React.Component<IDemoAccessDataProps, IDemoAccessDataState> {
  private dataAccessOptions: DataAccessOptions;

  constructor(props: IDemoAccessDataProps) {
    super(props);
    
    this.state = {
      fetchResult: null,
      spHttpResult: null,
      graphResult: null,
      pnpResult: null,
      loading: {
        fetch: false,
        spHttp: false,
        graph: false,
        pnp: false
      }
    };

    // Initialize DataAccessOptions with required dependencies
    const msGraphClientFactory = this.props.context.msGraphClientFactory;
    const spHttpClient = this.props.context.spHttpClient;
    const absoluteURL = this.props.context.pageContext.web.absoluteUrl;
    
    this.dataAccessOptions = new DataAccessOptions(msGraphClientFactory, spHttpClient, absoluteURL);
  }

  private handleFetchClick = async (): Promise<void> => {
    this.setState(prevState => ({ 
      loading: { ...prevState.loading, fetch: true } 
    }));
    
    try {
      const result = await this.dataAccessOptions.GetWithFetch();
      this.setState({ 
        fetchResult: result,
        loading: { ...this.state.loading, fetch: false }
      });
    } catch (error) {
      this.setState({ 
        fetchResult: { error: error.message },
        loading: { ...this.state.loading, fetch: false }
      });
    }
  };

  private handleSPHttpClick = async (): Promise<void> => {
    this.setState(prevState => ({ 
      loading: { ...prevState.loading, spHttp: true } 
    }));
    
    try {
      const result = await this.dataAccessOptions.GetWithSPHttpClient();
      this.setState({ 
        spHttpResult: result,
        loading: { ...this.state.loading, spHttp: false }
      });
    } catch (error) {
      this.setState({ 
        spHttpResult: { error: error.message },
        loading: { ...this.state.loading, spHttp: false }
      });
    }
  };

  private handleGraphClick = async (): Promise<void> => {
    this.setState(prevState => ({ 
      loading: { ...prevState.loading, graph: true } 
    }));
    
    try {
      const result = await this.dataAccessOptions.GetWithGraphClient();
      this.setState({ 
        graphResult: result,
        loading: { ...this.state.loading, graph: false }
      });
    } catch (error) {
      this.setState({ 
        graphResult: { error: error.message },
        loading: { ...this.state.loading, graph: false }
      });
    }
  };

  private handlePnPClick = async (): Promise<void> => {
    this.setState(prevState => ({
      loading: { ...prevState.loading, pnp: true }
    }));

    try {
      const result = await this.dataAccessOptions.GetWithPnPjs(this.props.context);
      this.setState({
        pnpResult: result,
        loading: { ...this.state.loading, pnp: false }
      });
    } catch (error) {
      this.setState({
        pnpResult: { error: error.message },
        loading: { ...this.state.loading, pnp: false }
      });
    }
  };

  public render(): React.ReactElement<IDemoAccessDataProps> {
    const {
      description,      
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.demoAccessData} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={iconPng} className={styles.welcomeImage} />
          <h2>Welcome, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>
        <div className={styles.dataAccessSection}>
          <h3>Data Access Options Demo</h3>
          
          <div className={styles.buttonGroup}>
            <button 
              className={styles.actionButton}
              onClick={this.handleFetchClick}
              disabled={this.state.loading.fetch}
            >
              {this.state.loading.fetch ? 'Loading...' : 'Get with Fetch API'}
            </button>
            
            <button 
              className={styles.actionButton}
              onClick={this.handleSPHttpClick}
              disabled={this.state.loading.spHttp}
            >
              {this.state.loading.spHttp ? 'Loading...' : 'Get with SPHttpClient'}
            </button>
            
            <button 
              className={styles.actionButton}
              onClick={this.handleGraphClick}
              disabled={this.state.loading.graph}
            >
              {this.state.loading.graph ? 'Loading...' : 'Get with Graph Client'}
            </button>

            <button
              className={styles.actionButton}
              onClick={this.handlePnPClick}
              disabled={this.state.loading.pnp}
            >
              {this.state.loading.pnp ? 'Loading...' : 'Get with PnPjs'}
            </button>
          </div>

          <div className={styles.resultsContainer}>
            {this.state.fetchResult && (
              <div className={styles.resultPanel}>
                <h4>Fetch API Result:</h4>
                <pre className={styles.jsonResult}>
                  {JSON.stringify(this.state.fetchResult, null, 2)}
                </pre>
              </div>
            )}
            
            {this.state.spHttpResult && (
              <div className={styles.resultPanel}>
                <h4>SPHttpClient Result:</h4>
                <pre className={styles.jsonResult}>
                  {JSON.stringify(this.state.spHttpResult, null, 2)}
                </pre>
              </div>
            )}
            
            {this.state.graphResult && (
              <div className={styles.resultPanel}>
                <h4>Graph Client Result:</h4>
                <pre className={styles.jsonResult}>
                  {JSON.stringify(this.state.graphResult, null, 2)}
                </pre>
              </div>
            )}

            {this.state.pnpResult && (
              <div className={styles.resultPanel}>
                <h4>PnPjs Result:</h4>
                <pre className={styles.jsonResult}>
                  {JSON.stringify(this.state.pnpResult, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }
}
