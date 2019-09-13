import * as React from 'react';
import styles from './ReactMyGroups.module.scss';
import { IReactMyGroupsProps } from './IReactMyGroupsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import GroupService from '../../../../services/GroupService';
import { IReactMyGroupsState } from './IReactMyGroupsState';
import { GroupList } from '../GroupList';
import { IGroup } from '../../../../models';

export class ReactMyGroups extends React.Component<IReactMyGroupsProps, IReactMyGroupsState> {

  constructor(props: IReactMyGroupsProps) {
    super(props);

    this.state = {
      groups: []
    };

  }

  public render(): React.ReactElement<IReactMyGroupsProps> {
    return (
      <div className={ styles.reactMyGroups }>
        <h1>My Office 365 Groups</h1>
          <GroupList groups={this.state.groups} />
      </div>
    );
  }

  public componentDidMount (): void {
    this._getGroups();
  }

  public _getGroups = (): void => {
    GroupService.getGroups().then(groups => {
      console.log(groups);
      this.setState({
        groups: groups
      });
      this._getGroupLinks(groups);
    });
  }

  public _getGroupLinks = (groups: any): void => {
    groups.map(groupItem => (
      GroupService.getGroupLinks(groupItem).then(groupurl => {
        console.log(groupurl.value);
        this.setState(prevState => ({
          groups: prevState.groups.map(group => group.id === groupItem.id ? {...group, url: groupurl.value} : group)
        }));
      })
    ));
  }

}
