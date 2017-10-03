import * as React from 'react';

export const VideoDetail = ({ video }) => {
  if (!video) {
    return <div>Please be sure that the web part is properly configured with a valid API key!</div>;
  }

  const videoId = video.id.videoId;
  const url = `https://www.youtube.com/embed/${videoId}`;

  return (
    <div className="ms-Grid-col ms-lg8">
      <iframe src={url} frameBorder="0" allowFullScreen></iframe>
      <div><h2>{video.snippet.title}</h2></div>
      <span className="label label-default">{video.snippet.channelTitle}</span>
      <div>{video.snippet.description}</div>
    </div>
  );
};
