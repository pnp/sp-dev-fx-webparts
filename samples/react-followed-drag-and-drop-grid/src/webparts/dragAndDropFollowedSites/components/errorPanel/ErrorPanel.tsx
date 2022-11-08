import * as React from 'react';
import * as strings from 'DragAndDropFollowedSitesWebPartStrings';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import IErrorPanelProps from './IErrorPanelProps';
import IErrorPanelState from './IErrorPanelState';
import styles from './ErrorPanel.module.scss';

export default class ErrorPanel extends React.Component<IErrorPanelProps, IErrorPanelState> {

  public render() {
    return (
      <div className={styles.panel}>
        <div>
          <Icon iconName={'BugSolid'} />
        </div>
        <div>
          <label>{strings.ErrorText}</label>
        </div>
        <div className={styles.refreshButtonRow}>
          <PrimaryButton onClick={() => this.refresh()}>
            {strings.ErrorPanelRefresh}
          </PrimaryButton>
        </div>
        <div className={styles.console}>
          <p>{strings.ErrorCouldNotGetData}</p>
        </div>
      </div>
    );
  }

  private refresh(): void {
    window.location.reload();
  }
}
