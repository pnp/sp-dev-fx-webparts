import * as React from 'react';
import styles from './VersionDisplay.module.scss';
import { IVersionDisplayProps } from './IVersionDisplayProps';
import { escape } from '@microsoft/sp-lodash-subset';
import * as strings from 'VersionDisplayWebPartStrings';

export default class VersionDisplay extends React.Component<IVersionDisplayProps, {}> {
  public render(): React.ReactElement<IVersionDisplayProps> {
    return (
      <div className={ styles.versionDisplay }>
        <div className={ styles.container }>
          <div className={ styles.row }>
            <div className={ styles.column }>
              <span className={ styles.title }>{strings.WebParttitle}</span>
              <p className={ styles.subTitle }>{strings.WebPartDescription}</p>
              <p className={ styles.description }>{strings.ManifestVersionLabel} {escape(this.props.manifestVersion)}.0</p>
              <p className={ styles.description }>{strings.RequireVersionLabel} {escape(this.props.requireVersion)}</p>
              <p className={ styles.description }>{strings.StaticImportVersionLabel} {escape(this.props.staticImportVersion)}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
