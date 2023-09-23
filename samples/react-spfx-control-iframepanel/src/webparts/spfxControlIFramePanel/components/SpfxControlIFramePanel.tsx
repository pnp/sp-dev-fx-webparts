import * as React from 'react';
import styles from './SpfxControlIFramePanel.module.scss';
import { ISpfxControlIFramePanelProps } from './ISpfxControlIFramePanelProps';
import { ISpfxControlIFramePanelState } from './ISpfxControlIFramePanelState';
import { IFramePanel } from "@pnp/spfx-controls-react/lib/IFramePanel";
import { PanelType, PrimaryButton } from 'office-ui-fabric-react';

export default class SpfxControlIFramePanel extends React.Component<ISpfxControlIFramePanelProps, ISpfxControlIFramePanelState> {

  constructor(props: ISpfxControlIFramePanelProps) {
    super(props);
    this.state = {
      iFramePanelOpened: false,
    };
  }
  public render(): React.ReactElement<ISpfxControlIFramePanelProps> {
    const {
      hasTeamsContext,
    } = this.props;

    return (
      <section className={`${styles.spfxControlIFramePanel} ${hasTeamsContext ? styles.teams : ''}`}>
                <div>
          <h2>IFramePanel control</h2>
          <h3>Link: {this.props.iFramePanelurl}</h3>
          <PrimaryButton text="Open IFramePanel" onClick={() => this.setState({ iFramePanelOpened: true })} />
          <IFramePanel url={this.props.iFramePanelurl}
             type={PanelType.medium}
             headerText="Panel Title"
             closeButtonAriaLabel="Close"
             isOpen={this.state.iFramePanelOpened}
             onDismiss={this._onDismiss.bind(this)}
             iframeOnLoad={this._onIframeLoaded.bind(this)} />
        </div>
      </section>
    );
  }

  private _onDismiss(): void {
    console.log("onDismiss");
    this.setState({ iFramePanelOpened: false });
  }

  private _onIframeLoaded(): void {
    console.log("onIframeLoaded");
  }
}
