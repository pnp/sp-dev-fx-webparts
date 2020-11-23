import React from "react";
import ReactDOM from "react-dom";
import { IVideosList } from "./IReactSpFxProps";
import SportsVideo from "./SportsVideo";
import ReactMarkdownWithHtml from "react-markdown/with-html";

export default class SportsVideoList extends React.Component<IVideosList> {
  public render() {
    const videos = this.props.videos;
    return (
      <div style={{ margin: "1px", alignContent:"center" }}>
        {this.props.videos.map((video, i) => (
          <SportsVideo
            key={i}
            embed={video.embed}
            title={video.title}
          />
        ))}
      </div>
    );
  }
}
