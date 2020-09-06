import * as React from 'react';
import styles from './Loader.module.scss';
import { ILoaderProps } from './ILoaderProps';
import * as ReactDom from 'react-dom';

export interface ILoaderState {
  currentTime: string;
}

export default class Loader extends React.Component<ILoaderProps, ILoaderState> {
  
  constructor(props: ILoaderProps) {
    super(props);
    this.state = {
      currentTime: ''
    };
  }
  
  public render(): React.ReactElement<ILoaderProps> {
    return (
      <div className={styles.loader}>
        <button onClick={this._loadDocumentsClicked.bind(this)}>
          Load Documents
        </button>
        <button onClick={this._loadMomentClicked.bind(this)}>
          Load moment js
        </button>
        <div className="momentContainer">
          {this.state.currentTime}
        </div>
        <div className="detailsContainer">
        </div>
      </div>
    );
  }

  private async _loadDocumentsClicked() {
    const component = await import(
      /* webpackChunkName: 'documentdetails-component' */
      './DetailsListComponent' //Custom component from the solution
    );

    const element: React.ReactElement<any> = React.createElement(
      component.DetailsListDocumentsComponent
    );

    const currentElement = ReactDom.findDOMNode(this);
    const detailsContainerElement = currentElement.getElementsByClassName("detailsContainer")[0];
    
    ReactDom.render(element, detailsContainerElement);
}

  private async _loadMomentClicked() {
    const moment = await import(
      /* webpackChunkName: 'moment-js' */
      'moment'
    );
    this.setState({
      currentTime: moment().calendar()
    });
  }
}
