import * as React from 'react';
import styles from './WhoIsIn.module.scss';
import type { IWhoIsInProps } from './IWhoIsInProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class WhoIsIn extends React.Component<IWhoIsInProps> {
  public render(): React.ReactElement<IWhoIsInProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName,
      items = []
    } = this.props;

    return (
      <section className={`${styles.whoIsIn} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
          <div>Web part property value: <strong>{escape(description)}</strong></div>
        </div>

        <div>
          <h3>Who is In</h3>
          {items.length === 0 ? (
            <div>No records found in the WhoIsIn list.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Base Location</th>
                  <th>Travelling To</th>
                  <th>From</th>
                  <th>To</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: any) => {
                  const employee = item.Employee && item.Employee.Title ? item.Employee.Title : (item.Employee || '');
                  const fromDate = item.From ? new Date(item.From).toLocaleDateString() : '';
                  const toDate = item.To ? new Date(item.To).toLocaleDateString() : '';
                  const key = item.ID || item.Id || `${employee}-${fromDate}-${toDate}`;
                  return (
                    <tr key={key}>
                      <td>{escape(String(employee))}</td>
                      <td>{escape(String(item.BaseLocation || ''))}</td>
                      <td>{escape(String(item.TravellingTo || ''))}</td>
                      <td>{escape(fromDate)}</td>
                      <td>{escape(toDate)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <div>
          <h3>Welcome to SharePoint Framework!</h3>
          <p>
            The SharePoint Framework (SPFx) is a extensibility model for Microsoft Viva, Microsoft Teams and SharePoint. It's the easiest way to extend Microsoft 365 with automatic Single Sign On, automatic hosting and industry standard tooling.
          </p>
          <h4>Learn more about SPFx development:</h4>
          <ul className={styles.links}>
            </ul>
        </div>
      </section>
    );
  }
}
