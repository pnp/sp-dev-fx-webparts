import * as React from 'react';
import styles from './FieldVisits.module.scss';

import { IVisit } from '../model/IVisit';

export interface IVisitListProps {
  visits?: IVisit[];
  selectedVisit?: IVisit;
  visitSelectionChanged: (IVisit) => {};
}

export class VisitList extends React.Component<IVisitListProps, {}> {

  public render(): React.ReactElement<IVisitListProps> {

    return (
      <div>
        <div className={styles.visitList}>
          {this.props.visits ? this.props.visits.map(item => (
            <div className={ (item == this.props.selectedVisit) ?
                              styles.visitListRow + ' ' + styles.visitListRowSelected : styles.visitListRow }
                onClick={ () => { this.props.visitSelectionChanged(item); }}
            >
              <div className={styles.visitListDateColumn}>
                <div className={styles.visitListTime}>
                  {item.calendarItem.DateTime.getHours() % 12}:
                  {item.calendarItem.DateTime.getMinutes()<10 ? "0" : ""}
                  {item.calendarItem.DateTime.getMinutes()}&nbsp;
                  {item.calendarItem.DateTime.getHours() < 12 ? 'am' : 'pm'}
                </div>
                <div className={styles.visitListDate}>
                  {item.calendarItem.DateTime.toDateString()}
                </div>
              </div>
              <div className={styles.visitListDetailColumn}>
                <div className={styles.visitListTitle}>{item.calendarItem.Title}</div>
                <div className={styles.visitListContact}>
                  {item.customer.CompanyName}&nbsp;
                  ({item.customer.ContactName})
                </div>
                <div className={styles.visitListLocation}>
                  {item.customer.Address},
                  {item.customer.City},
                  {item.customer.Region}&nbsp;
                  {item.customer.Country}&nbsp;
                  {item.customer.PostalCode}
                </div>
              </div>
            </div>
          )) : <div></div> }
        </div>
      </div>
    );
  }

}  