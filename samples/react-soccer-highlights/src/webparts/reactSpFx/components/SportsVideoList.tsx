import React from "react";
import ReactDOM from "react-dom";
import { IVidesList } from "./IReactSpFxProps";
import SportsVideo from "./SportsVideo";
import ReactMarkdownWithHtml from "react-markdown/with-html";

export default class SportsVideoList extends React.Component<IVidesList> {
  public render() {
    const videos = this.props.videos;
    return (
      <div style={{ margin: "1px" }}>
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
