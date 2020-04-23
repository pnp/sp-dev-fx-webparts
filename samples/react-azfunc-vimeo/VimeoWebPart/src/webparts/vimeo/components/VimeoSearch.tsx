import * as React from 'react';
import styles from './Vimeo.module.scss';
import { IVimeoSearchProps } from './IVimeoSearchProps';
import { IVimeoProps } from './IVimeoProps';
import { escape } from '@microsoft/sp-lodash-subset';

import {
    TextField
} from 'office-ui-fabric-react/lib/TextField';
import {
    PrimaryButton
} from 'office-ui-fabric-react/lib/Button';
import { HttpClient, IHttpClientOptions, HttpClientResponse } from '@microsoft/sp-http';
import { IVimeoEntryProps } from './IVimeoEntryProps';
import VimeoEntry from './VimeoEntry';
import VimeoPreviewPlayer from './VimeoPreviewPlayer';

export interface IVideoSearchState {
    searchValue?: string;
    videos: Array<IVimeoEntryProps>;
    currentVideo?: any;
    playerHidden: string;
}

export default class VimeoSearch extends React.Component<IVimeoSearchProps, IVideoSearchState> {


    public state: IVideoSearchState;

    private reqOptions: IHttpClientOptions;

    constructor(props) {

        super(props);

        console.log(props.httpClient);

        this.state = {
            searchValue: '',
            videos: [],
            currentVideo: null,
            playerHidden: 'hidden'
        };

        this.searchVideos = this.searchVideos.bind(this);
        // this.updateSearch = this.updateSearch.bind(this);

        const reqHeaders = new Headers();
        reqHeaders.append('Content-type', 'application/json');

        this.reqOptions = {
            headers: reqHeaders
        };

    }

    private handleSearch(value) {

        this.state.searchValue = value;

        this.setState(
            this.state
        );

    }


    private searchVideos(evt) {

        this.props.httpClient
            .get(
                'https://localhost:7071/api/Search?q=' + this.state.searchValue,
                HttpClient.configurations.v1,
                this.reqOptions)
            .then(
                (response: Response): Promise<HttpClientResponse> => {
                    console.log("REST API response received.");
                    return response.json();
                })
            .then(
                (result: any) => {

                    console.log(result.data);


                    this.state.videos = result.data.map((videoResultItem) => {

                        var videoPlayerUri = videoResultItem.uri.replace('videos', 'video');

                        return {
                            title: videoResultItem.name,
                            description: videoResultItem.description,
                            url: 'https://player.vimeo.com' + videoPlayerUri,
                            author: videoResultItem.user,
                            pictures: videoResultItem.pictures
                        };

                    });

                    this.setState(this.state);

                }
            );
    }

    private onShowVideo(item) {

        this.state.currentVideo = item;
        this.state.playerHidden = 'show';

        this.setState(
            this.state
        );
    }

    public onSave(item){

        this.props.onSave(item);

    }

    public render(): React.ReactElement<IVimeoSearchProps> {

        var videoResult = this.state.videos.map((item, index) => {
            return (
                <VimeoEntry
                    key={index}
                    item={item}
                    onShowVideo={this.onShowVideo.bind(this)}
                />
            );
        });

        return (
            <div>
                <div className={styles.videoSearchBar}>
                    <TextField id="HelloWorld"
                        className={styles.n8dSearchbox}
                        value={this.state.searchValue}
                        onChanged={this.handleSearch.bind(this)}
                        autoComplete="off"
                    />
                    <PrimaryButton text="Search" className={styles.n8dSearchbutton}
                        onClick={this.searchVideos}
                    />
                </div>

                <VimeoPreviewPlayer playbackVideo={this.state.currentVideo} onAdd={this.onSave.bind(this)}></VimeoPreviewPlayer>

                <div className={styles.videoSearchResult}>
                    {videoResult}
                </div>
            </div>

        );
    }
}
