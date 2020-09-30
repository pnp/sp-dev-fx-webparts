import * as React from 'react';
import styles from './O365GroupsManager.module.scss';
import { IO365GroupsManagerProps } from './IO365GroupsManagerProps';
import { IO365GroupsManagerState } from './IO365GroupsManagerState';
import O365GroupService from '../../../../services/O365GroupService';
import GroupList from '../GroupList/GroupList';
import NewGroup from "../NewGroup/NewGroup";
import { autobind, ActionButton, IIconProps } from 'office-ui-fabric-react';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';

const addGroupIcon: IIconProps = { iconName: 'AddGroup' };

export default class O365GroupsManager extends React.Component<IO365GroupsManagerProps, IO365GroupsManagerState> {
  constructor(props: IO365GroupsManagerProps) {
    super(props);

    this.state = {
      isLoading: true,
      groups: [],
      ownerGroups: [],
      memberGroups: [],
      showNewGroupScreen: false,
      loadCount: 0
    };
  }

  public render(): React.ReactElement<IO365GroupsManagerProps> {
    return (
      <div className={styles.o365GroupsManager}>
        <div className={styles.container}>
          <div className={styles.row}>
              {
                this.state.loadCount === 3 && !this.state.showNewGroupScreen
                  ?
                  <p>
                    <h1 className={styles.headerMsgStyle}>O365 Groups Manager</h1>
                    <GroupList flowUrl={this.props.flowUrl} items={this.state.groups} ownerGroups={this.state.ownerGroups} memberGroups={this.state.memberGroups} ></GroupList>
                    <br/>
                    <ActionButton className={styles.newHeaderLinkStyle} iconProps={addGroupIcon} allowDisabledFocus onClick={this.showNewGroupScreen}>
                      New Group
                    </ActionButton>
                  </p>
                  : 
                  !this.state.showNewGroupScreen &&
                  <Spinner label="Loading Groups..." />
              }
              {
                this.state.showNewGroupScreen &&
                <div>
                  <div className={styles.row}>
                    <div className={styles.headerStyle}>
                      <NewGroup returnToMainPage={this.showMainScreen} context={this.props.context} />
                    </div>
                  </div>
                </div>
              }
          </div>
        </div>
      </div>
    );
  }

  @autobind
  public showNewGroupScreen() {
    this.setState(() => {
      return {
        ...this.state,
        showNewGroupScreen: true
      };
    });
  }

  @autobind
  public showMainScreen() {
    this.setState(() => {
      return {
        ...this.state,
        showNewGroupScreen: false
      };
    });
  }

  public componentDidMount(): void {
    this._getGroups();
  }

  public _getGroups = (): void => {
    O365GroupService.getMyOwnerGroups().then(groups => {
      console.log(groups);
      this.setState({
        ownerGroups: groups.map(item => item.id),
        loadCount: this.state.loadCount + 1
      });
    });

    O365GroupService.getMyMemberGroups().then(groups => {
      console.log(groups);
      this.setState({
        memberGroups: groups.map(item => item.id),
        loadCount: this.state.loadCount + 1
      });
    });

    O365GroupService.getGroups().then(groups => {
      console.log(groups);

      this.setState({
        isLoading: false,
        groups: groups,
        loadCount: this.state.loadCount + 1
      });
    });
  }
}
