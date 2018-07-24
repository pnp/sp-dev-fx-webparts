import * as React from 'react';
import styles from './Vimeo.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import VimeoPlayer from './VimeoPlayer';

import VimeoConstants from './VimeoConstants';
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button';

export interface IVimeoPlayerPreviewProps {
    playbackVideo: any;
    inEditMode?: boolean;
    onAdd: Function;
}

export default class VimeoPlayerPreviewEntry extends React.Component<IVimeoPlayerPreviewProps, {}> {

    private onSaveItem(){

        this.props.onAdd(this.props.playbackVideo);

    }

    public render(): React.ReactElement<{ IVimeoPlayerPreviewProps }> {

        if (this.props.playbackVideo !== null) {

            return (
                <div className={styles.videoPreviewPane}>
                    <div className={styles.videoPlayerHeader}>Video Preview</div>
                    <VimeoPlayer playbackVideoUrl={ this.props.playbackVideo.url } />.
                    <div className={styles.videoPlayerToolbar}>&nbsp;</div>
                    <PrimaryButton text="Use this video" className={styles.n8dSavebutton}
                        onClick={this.onSaveItem.bind(this)}
                    />
                </div>
            );

        } else {
            return (<span />);
        }
    }
}