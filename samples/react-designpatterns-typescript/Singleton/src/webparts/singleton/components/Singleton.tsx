import * as React from 'react';
import styles from './Singleton.module.scss';
import { ISingletonProps } from './ISingletonProps';
import { escape } from '@microsoft/sp-lodash-subset';
import ConfigurationManager from './ConfigurationManager';

export default class Singleton extends React.Component<ISingletonProps, {}> {

  private numberOfItemsPerPage: number;
  private maxNumberOfConnections: number;
  private restTimeout: number;

  constructor(props: ISingletonProps, state: any) {
    super(props);
    let config:ConfigurationManager  =  ConfigurationManager.getInstance();
    this.numberOfItemsPerPage = config.numberOfItemsPerPage();
    this.maxNumberOfConnections = config.numberOfItemsPerPage();
    this.restTimeout = config.restTimeout();
  }

  public render(): React.ReactElement<ISingletonProps> {
    return (
      <div className={ styles.singleton }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Welcome to SharePoint!</span>
              <p className={ styles.label }>Number of items perr page: {escape(this.numberOfItemsPerPage.toString())}</p>
              <p className={ styles.label }>Max number of connections: {escape(this.maxNumberOfConnections.toString())}</p>
              <p className={ styles.label }>Rest timeout: {escape(this.restTimeout.toString())}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
