import * as React from 'react';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { Label } from 'office-ui-fabric-react/lib/Label';

const VideoListItem = ({ video, onVideoSelect }) => {
  const imageUrl = video.snippet.thumbnails.default.url;

  return (
    // <li onClick={() => onVideoSelect(video)} className="list-group-item">
    //   <div className="video-list media">
    //     <div className="media-left">
    //       <img className="media-object" src={imageUrl}/>
    //     </div>

    //     <div className="media-body">
    //       <div className="media-heading">{video.snippet.title}</div>
    //     </div>
    //   </div>
    // </li>
    <li onClick={() => onVideoSelect(video)} >
      <Image src={imageUrl} />
      <Label>{video.snippet.title}</Label>
    </li>
  )
};

export default VideoListItem;
