import * as React from 'react';
import styles from './CheckUserGroup.module.scss';
import { WebPartTitle } from '@pnp/spfx-controls-react/lib/WebPartTitle';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { ICheckUserGroupProps } from './ICheckUserGroupProps';
import { ICheckUserGroupState } from './ICheckUserGroupState';
import { CheckGroupMembers } from './CheckGroupMembers/CheckGroupMembers';
import { CheckUserMembership } from './CheckUserMembership/CheckUserMembership';

export default class CheckUserGroup extends React.Component<ICheckUserGroupProps, ICheckUserGroupState> {
  constructor(props: ICheckUserGroupProps) {
    super(props);

    this.state = {
      selectedKey: 'UserMembership'
    };
  }

  /**
   * Pivot Item click event handler to update the selected key
   */
  private handleLinkClick = (item: PivotItem): void => {
    this.setState({
      selectedKey: item.props.itemKey
    });
  }

  public render(): React.ReactElement<ICheckUserGroupProps> {
    return (
      <div className={styles.checkUserGroup}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <WebPartTitle displayMode={this.props.displayMode}
                title={this.props.title}
                updateProperty={this.props.updateProperty}
              />
              <Pivot headersOnly={true}
                selectedKey={this.state.selectedKey}
                onLinkClick={this.handleLinkClick}
              >
                <PivotItem headerText='Check User Membership' itemKey='UserMembership' />
                <PivotItem headerText='Check Group Members' itemKey='GroupMembers' />
              </Pivot><br />
              {this.state.selectedKey === 'UserMembership' &&
                <CheckUserMembership context={this.props.context} />
              }
              {this.state.selectedKey === 'GroupMembers' &&
                <CheckGroupMembers context={this.props.context} />
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
