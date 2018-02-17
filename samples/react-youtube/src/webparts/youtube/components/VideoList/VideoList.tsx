import * as React from 'react';
import VideoListItem from '../VideoListItem/VideoListItem';

export const VideoList = (props) => {
    const videoItems = props.videos.map((video, index) => {
        return (
            <VideoListItem
                key={index}
                video={video}
                onVideoSelect={props.onVideoSelect} />
        )
    });

    return (
        // <ul className="ms-Grid-col ms-lg4 ms-xl4">
        //   {videoItems}
        // </ul>
        <ul className="ms-Grid-col ms-lg4 ms-xl4">
            {videoItems}
        </ul>
    );
};

// export default VideoList;
