import { videoProperties } from "office-ui-fabric-react";
import React from "react";
import ReactDOM from "react-dom";
import { ISportsHighlightProps } from "./IReactSpFxProps";
import SportsVideoList from "./SportsVideoList";

export default class SportsHighlight extends React.Component<
  ISportsHighlightProps
> {
  public render() {
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };

    const {
      title,
      id,
      date,
      side1,
      side2,
      competition,
      thumbnail,
      videos,
    } = this.props;
    return (
      <div style={{ margin: "2px" }}>
        <div style={{ display: "inline-block", marginLeft: "12px" }}>
          <div style={{ fontSize: "1.25rem", fontWeight: "bold" }}>{title}</div>
          <div style={{ fontSize: "16px", fontWeight: "bold" }}>
            {competition.name}
          </div>
          <div style={{ fontSize: "14px", fontWeight: "normal" }}>
            Date & Time: <b>{new Date(date.toString()).toLocaleString("en-US", options)}</b>
          </div>
          <div>{id}</div>
          <SportsVideoList videos={videos} />
        </div>
      </div>
    );
  }
}
