import * as React from 'react';
import styles from './VersionDisplay.module.scss';
import { IVersionDisplayProps } from './IVersionDisplayProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class VersionDisplay extends React.Component<IVersionDisplayProps, {}> {
  public render(): React.ReactElement<IVersionDisplayProps> {
    return (
      <div className={ styles.versionDisplay }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>Version Display</span>
              <p className={ styles.subTitle }>This web part displays the solution version.</p>
              <p className={ styles.description }>Version (using require): {escape(this.props.requireVersion)}</p>
              <p className={ styles.description }>Version (using static import): {escape(this.props.staticImportVersion)}</p>
              <p className={ styles.description }>Version (using manifest): {escape(this.props.manifestVersion)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
