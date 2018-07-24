import * as React from 'react';
import styles from './Vimeo.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';

import VimeoConstants from './VimeoConstants';

export interface IVimeoPlayerProps {
    playbackVideoUrl: any;
}

export default class VimeoEntry extends React.Component<IVimeoPlayerProps, {}> {

    public render(): React.ReactElement<{ IVimeoPlayerProps }> {

        if (this.props.playbackVideoUrl !== null) {

            return (
                <div className={styles.videoPlayerOuter}>
                    <iframe src={this.props.playbackVideoUrl} frameBorder="0" allowFullScreen className={styles.videoPlayer} ref='videoSource'></iframe>
                </div>
            );

        } else {
            return (<span />);
        }
    }
}