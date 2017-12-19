import * as React from 'react';
import styles from './Youtube.module.scss';
import { IYoutubeProps } from './IYoutubeProps';
import { IYoutubeState } from './IYoutubeState';
import { escape } from '@microsoft/sp-lodash-subset';
import { SearchBar } from './SearchBar/SearchBar';
import { VideoDetail } from './VideoDetail/VideoDetail';
import { VideoList } from './VideoList/VideoList'
import * as _ from 'lodash';
import axios from 'axios';

const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

export default class Youtube extends React.Component<IYoutubeProps, IYoutubeState> {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch(this.props.apiKey, '', this.props.channelId, this.props.maxResults.toString())
  }

  public render(): React.ReactElement<IYoutubeProps> {

    const videoSearch = _.debounce((term) => { this.videoSearch(this.props.apiKey, term, this.props.channelId, this.props.maxResults.toString()) }, 300);

    return (
      <div className={styles.youtube}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-white ms-fontColor-black ${styles.row}`}>
            <p className="ms-font-l">{escape(this.props.description)}</p>
            <div>
              <SearchBar onSearchTermChange={videoSearch} />
              <br />
              <VideoDetail video={this.state.selectedVideo} />
              <VideoList
                onVideoSelect={selectedVideo => this.setState({ selectedVideo })}
                videos={this.state.videos} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  private videoSearch(key: string, term: string, channelId: string, maxResults: string): any {
    if (!key) {
      //throw new Error('Youtube Search expected key, received undefined');
      console.log('Youtube Search expected key, received undefined');
      return;
    }

    let params = {
      part: 'snippet',
      key: key,
      q: term,
      maxResults: maxResults,
      type: 'video',
      channelId: channelId || null
    };

    axios.get(ROOT_URL, { params: params })
      .then((response) => {
        // if (callback) { callback(response.data.items); }
        // return response.data.items;
        this.setState({
          videos: response.data.items,
          selectedVideo: response.data.items[0]
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}
