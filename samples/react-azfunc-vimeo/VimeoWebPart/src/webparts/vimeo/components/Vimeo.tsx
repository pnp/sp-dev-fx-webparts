import * as React from 'react';
import styles from './Vimeo.module.scss';
import { IVimeoProps } from './IVimeoProps';
import { escape } from '@microsoft/sp-lodash-subset';

import VimeoEntry from './VimeoEntry';
import VimeoSearch from './VimeoSearch';

import VimeoPlayer from './VimeoPlayer';

export default class Vimeo extends React.Component<IVimeoProps, {}> {

  constructor(props) {

    super(props);

  }

  private onSave(item) {

    this.props.onSave(item);

  }

  private handleModes(editMode) {

    if (editMode) {

      return (
        <div>
          <h1>Search Vimeo</h1>
          <VimeoSearch httpClient={this.props.httpClient} onSave={this.onSave.bind(this)} />
        </div>
      );

    } else {

      return (<VimeoPlayer playbackVideoUrl={this.props.VimeoUrl} />);

    }

  }

  public render(): React.ReactElement<IVimeoProps> {

    let modeContent = this.handleModes(this.props.editMode);

    return (
      <div className={styles.vimeo}>
        {modeContent}
      </div>
    );
  }

}
