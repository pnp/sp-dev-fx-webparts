import * as React from "react";
import styles from "./ReactSpFx.module.scss";
import { IReactSpFxProps, ISportsHighlightsState } from "./IReactSpFxProps";
import { escape } from "@microsoft/sp-lodash-subset";
import SportsHighlightsList from "./SportsHighlightsList";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";
import { Placeholder } from "@pnp/spfx-controls-react/lib/Placeholder";

import axios from "axios";
import { setVirtualParent } from "office-ui-fabric-react";
import SportsHighlights from "./SportsHighlightsList";
import "bootstrap/dist/css/bootstrap.css";

export default class ReactSpFx extends React.Component<
  IReactSpFxProps,
  ISportsHighlightsState
> {
  public constructor(props: IReactSpFxProps, state: ISportsHighlightsState) {
    super(props);
    this.state = {
      sportHighlightState: [],
    };
  }

  GetData = async () => {
    const resp = await axios.get(`https://www.scorebat.com/video-api/v1/`);
    const data = await resp.data;
    this.setState({ sportHighlightState: data });
  };

  async componentDidMount() {
    this.GetData();
  }

  public render(): React.ReactElement<IReactSpFxProps> {
    const globalComponent = this;
    console.log(this.props.pageSize);
    return (
      <div className={styles.container}>
        {!this.props.title && (
          <Placeholder
            iconName="Soccer Highlights"
            iconText="Configure your web part"
            description="Set Web Part Title and choose Page Size to hide this section."
            buttonLabel="Configure the Web Part"
            onConfigure={this.props.onConfigure}
          />
        )}
        {typeof this.props.title !== "undefined" && (
          <div id="mainDiv">
            <WebPartTitle
              displayMode={this.props.displayMode}
              title={this.props.title}
              updateProperty={this.props.updateProperty}
            />
          </div>
        )}
        <span></span>
        <SportsHighlightsList
          sportsHighlights={this.state.sportHighlightState}
          pageSize={this.props.pageSize}
        />
      </div>
    );
  }
}
