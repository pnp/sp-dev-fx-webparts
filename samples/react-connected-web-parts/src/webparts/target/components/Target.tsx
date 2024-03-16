import * as React from 'react';
import styles from './Target.module.scss';
import type { ITargetProps } from './ITargetProps';
import * as strings from 'TargetWebPartStrings';

export default class Target extends React.Component<ITargetProps, {}> {
  public render(): React.ReactElement<ITargetProps> {

    const { firstName, lastName, preferences, userName } = this.props;

    // Get the value from the dynamic properties
    const firstNameValue = firstName?.tryGetValue();
    const lastNameValue = lastName?.tryGetValue();
    const preferencesValue = preferences?.tryGetValue();
    const userNameValue = userName?.tryGetValue();

    return (
      <section className={styles.target}>
        <div className={styles.welcome}>
          <h2>{strings.Title}</h2>
        </div>
        <div>
          <h4>{strings.BasicGroupName}</h4>
          <div>
            <b>{strings.FirstName}</b>: {(firstNameValue && firstNameValue.length > 0) ? firstNameValue : strings.NotSpecified}
          </div>
          <div>
            <b>{strings.LastName}</b>: {(lastNameValue && lastNameValue.length > 0) ? lastNameValue : strings.NotSpecified}
          </div>
        </div>
        <div>
          <h4>{strings.ComplexGroupName}</h4>
          <div>
            <b>{strings.Color}</b>: {(preferencesValue && preferencesValue.color && preferencesValue.color.length > 0) ? preferencesValue.color : strings.NotSpecified}
          </div>
          <div>
            <b>{strings.Date}</b>: {(preferencesValue && preferencesValue.date && preferencesValue.date !== null) ? preferencesValue.date.toLocaleDateString() : strings.NotSpecified}
          </div>
          <div>
            <b>{strings.Like}</b>: {(preferencesValue && preferencesValue.like !== undefined) ? (preferencesValue.like === true ? strings.Yes : strings.No) : strings.NotSpecified}
          </div>
        </div>
        <div>
          <h4>{strings.PageEnvironmentGroupName}</h4>
          <div>
            <b>{strings.UserName}</b>: {(userNameValue && userNameValue.length > 0) ? userNameValue : strings.NotSpecified}
          </div>
        </div>
      </section>
    );
  }
}
