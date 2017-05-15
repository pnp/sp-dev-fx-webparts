import * as React from 'react';
import styles from './SidePanel.module.scss';
import { ISidePanelProps } from './ISidePanelProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Button, ButtonType } from 'office-ui-fabric-react';

import Panel from '../Panel/Panel';
import { PanelPosition } from '../Panel/Panel';


export interface ISidePanelState {
  isOpen?: boolean;
}

export default class SidePanel extends React.Component<ISidePanelProps, ISidePanelState> {
  public constructor(props: ISidePanelProps, state: ISidePanelState) {
    super(props, state);
    this.state = {};
  }

  public render(): React.ReactElement<ISidePanelProps> {
    const panelPosition = !this.props.panelPosition && this.props.panelPosition !== 0 
      ? PanelPosition.Right : this.props.panelPosition;
    return (
      <div className={styles.helloWorld}>
        <div className={styles.container}>
          <div className={`ms-Grid-row ms-bgColor-themeDark ms-fontColor-white ${styles.row}`}>
            <div className="ms-Grid-col ms-u-lg10 ms-u-xl8 ms-u-xlPush2 ms-u-lgPush1 ms-lg10 ms-xl8 ms-xlPush2 ms-lgPush1">
              <p className="ms-font-l ms-fontColor-white">This Web Part shows how to open a side panel.</p>
              <p className="ms-font-l ms-fontColor-white">Please, click the button below.</p>
              <Button onClick={this.onButtonClick.bind(this)} buttonType={ButtonType.default}>{this.state.isOpen ? 'Hide Panel' : 'Show Panel'}</Button>
            </div>
          </div>
        </div>
        <Panel isOpen={this.state.isOpen} position={panelPosition} onDismiss={this.onPanelClosed.bind(this)}>
          <span>Child content of the panel</span>
        </Panel>
      </div>
    );
  }

  private onPanelClosed() {
    this.setState({
      isOpen: false
    });
  }

  private onButtonClick() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
}
