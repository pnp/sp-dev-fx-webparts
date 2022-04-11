import * as React from 'react';
import styles from './HappyBirthday.module.scss';
import { IHappyBirthdayProps } from './IHappyBirthdayProps';
import { IHappbirthdayState } from './IHappybirthdayState';
import { IUser } from './IUser';
import HappyBirthdayCard from '../../controls/happyBirthdayCard/HappyBirthdayCard';
import * as moment from 'moment';

export class HappyBirthday extends React.Component<IHappyBirthdayProps, IHappbirthdayState> {

  public render(): React.ReactElement<IHappyBirthdayProps> {
    return (
      <div className={styles.happyBirthday}>
        {
          this.props.users.map((user: IUser) => {
            return (
              <div className={styles.container}>
                <HappyBirthdayCard userName={user.userName}
                  jobDescription={user.jobDescription}
                  birthday={moment(user.birthday, ["MM-DD-YYYY", "YYYY-MM-DD", "DD/MM/YYYY", "MM/DD/YYYY"]).format('Do MMMM')}
                  anniversary={user.anniversary}
                  congratulationsMsg={user.message}
                  userEmail={user.userEmail}
                  imageTemplate={this.props.imageTemplate}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}
export default HappyBirthday;
