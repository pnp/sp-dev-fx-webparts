import * as React from "react";
import styles from "./ReactSpFx.module.scss";
import { IReactSpFxProps, ISportsHighlightsState } from "./IReactSpFxProps";
import SportsHighlightsList from "./SportsHighlightsList";
import { WebPartTitle } from "@pnp/spfx-controls-react/lib/WebPartTitle";


import "bootstrap/dist/css/bootstrap.css";

export default class ReactSpFx extends React.Component<IReactSpFxProps> {
  public constructor(props: IReactSpFxProps, state: ISportsHighlightsState) {
    super(props);
  }

  public render(): React.ReactElement<IReactSpFxProps> {
    return (
      <div className={styles.container}>
        <WebPartTitle
          displayMode={this.props.displayMode}
          title={this.props.title}
          updateProperty={this.props.updateProperty}
        />
        <SportsHighlightsList pageSize={this.props.pageSize} showFlatMode={this.props.showFlatMode}
        />
      </div>
    );
  }
}
