import * as React from 'react';
import styles from './VisioSample.module.scss';
import { IVisioSampleProps } from './IVisioSampleProps';
import { escape } from '@microsoft/sp-lodash-subset';

export class VisioSample extends React.Component<IVisioSampleProps, {}> {

  public render(): React.ReactElement<IVisioSampleProps> {
    return (
      <div className={styles.visioSample}>
        <div id='iframeHost' className={styles.iframeHost}></div>
        <div id='diagramDetailsPanel' className={styles.detailsPanel}></div>
      </div>
    );
  }

  public componentDidMount() {
    if (this.props.documentUrl) {
      this.props.visioService.load(this.props.documentUrl);
    }
  }
}
