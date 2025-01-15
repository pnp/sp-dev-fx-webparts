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
          this.props.users.map((user: IUser, index: number) => (
            <div className={styles.container} key={user.key || index}>
              <HappyBirthdayCard
                userName={user.userName}
                jobDescription={user.jobDescription || "No Job Description"}
                birthday={moment(user.birthday).format('Do MMMM')}
                anniversary={!!user.anniversary}
                congratulationsMsg={user.message}
                userEmail={user.userEmail}
                imageTemplate={Number(this.props.imageTemplate)} // Ensure this is a number
              />
            </div>
          ))
        }
      </div>
    );
  }
}
