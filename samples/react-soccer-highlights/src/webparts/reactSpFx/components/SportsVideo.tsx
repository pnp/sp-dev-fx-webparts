import React from "react";
import ReactDOM from "react-dom";
import { IVideo } from "./IReactSpFxProps";
import ReactMarkdownWithHtml from "react-markdown/with-html";
import { body } from "@pnp/pnpjs";

export default class SportsVideo extends React.Component<IVideo> {
  public render() {
    const { title, embed } = this.props;
    return (
      <div>
        <div
          style={{ fontSize: "18px", fontWeight: "bold", textAlign: "center", color:"blue" }}
          title={"click to play " + title}
        >
          {title}
        </div>
        <div id={"video" + title}
          dangerouslySetInnerHTML={{ __html: embed }}
          style={{ padding: "8px" }}
          title={"click to play " + title}
        />
      </div>
    );
  }
}
