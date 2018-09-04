import * as React from 'react';
import styles from './Vimeo.module.scss';
import { IVimeoEntryProps } from './IVimeoEntryProps';
import { escape } from '@microsoft/sp-lodash-subset';

import VimeoConstants from './VimeoConstants';

export interface IStateVideoEntry {
    showVideo: any;
    videoPlayer: any;
    editMode: boolean;
}


export default class VimeoEntry extends React.Component<IVimeoEntryProps, {}> {


    private showVideo: boolean;
    public state: IStateVideoEntry;


    constructor(props) {

        super(props);

        this.state = {
            showVideo: this.props,
            videoPlayer: null,
            editMode: true
        };

    }

    private previewPicture(): string {

        let pictureUrl;

        if (this.props !== undefined && this.props.item.pictures !== undefined && this.props.item.pictures.uri !== undefined) {

            pictureUrl = this.props.item.pictures.sizes[2].link;

        } else {

            pictureUrl = "";

        }

        return pictureUrl;

    }

    private userInfo(): React.ReactElement<{}> {

        let authorUrl = "https://www.vimeo.com/" + this.props.item.author.uri.replace('s/', '');

        return (
            <div className={styles.videoResultAuthor}>
                <a href={authorUrl} target="_blank">
                    <img src={this.props.item.author.pictures.sizes[0].link} alt="" className={styles.videoResultAuthorImage} />
                    <div className={styles.videoResultAuthorName}>{this.props.item.author.name}</div>
                </a>
            </div>
        );

    }

    public showVideos() {

        this.props.onShowVideo(this.props.item);

        let curShowVideo = this.state.showVideo;

        this.state.showVideo = !curShowVideo;
        this.state.videoPlayer = this.renderVideo(!curShowVideo);

        this.setState(this.state);

    }

    public renderVideo(showVideo) {

        if (showVideo) {

            return (
                <div>Hide Videos</div>
            );

        } else {

            return (
                <div>Show Videos</div>
            );
        }

    }

    public render(): React.ReactElement<IVimeoEntryProps> {

        if (this.state.editMode) {

            return (
                <div className={styles.videoResultItem} onClick={this.showVideos.bind(this)}>
                    <div className={styles.videoResultPreview}>
                        <img src={this.previewPicture()} />
                    </div>
                    <div className={styles.videoResultInfo}>
                        <div className={styles.videoResultTitle}>{this.props.item.name}</div>
                        {this.userInfo()}
                        <div className={styles.videoResultDescription}>{this.props.item.description}</div>
                    </div>
                </div>
            );

        }
    }
}