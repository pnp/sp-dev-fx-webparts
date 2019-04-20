import * as React from 'react';
import styles from './FieldVisits.module.scss';

import { IUser } from '../model/IUser';

export interface IUserTabsProps {
  users?: IUser[];
  userSelectionChanged: (IUser) => {};
}

export class UserTabs extends React.Component<IUserTabsProps, {}> {

  public render(): React.ReactElement<IUserTabsProps> {

    return (
      <ul className={styles.userTabs}>
        {this.props.users? this.props.users.map(user => (
          <li className={user.isSelected ? styles.userTab + " " + styles.userTabSelected :
                         styles.userTab}
               onClick={ () => { this.props.userSelectionChanged(user); }} >
                 {user.fullName}
          </li>
        )) : <li></li> }
      </ul>
    );
  }

}  