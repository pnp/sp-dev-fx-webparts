import * as React from 'react';
import { IDateBoxProps, IDateBoxSize } from './IDateBoxProps';
import * as moment from "moment";
import styles from './DateBox.module.scss';
import { css } from 'office-ui-fabric-react';

export default class DateBox extends React.Component<IDateBoxProps, {}>{

  public render(): JSX.Element {

    let start = moment(this.props.startDate);
    let end = moment(this.props.endDate);
    let isSameDayEvent: boolean = start.isSame(end, "day");

    //Checking whether event is of single day or multiple days.
    if (isSameDayEvent) {
      return this._renderSingleDay(start);
    }
    else {
      return this._renderMultiDay(start, end);
    }
  }

  /*************************************************************************************************
   * Method rendering date box for single day event.
   * @param startEvent : Event start date.
   *************************************************************************************************/
  private _renderSingleDay = (startEvent: moment.Moment): JSX.Element => {

    return (
      <div className={css(styles.box,
        styles.boxIsSingleDay,
        (this.props.size === IDateBoxSize.Small ? styles.boxIsSmall : styles.boxIsMedium), this.props.className)}
        data-automation-id="singleDayDayContainer">
        <div className={styles.month}
          data-automation-id="singleDayMonthContainer">{startEvent.format("MMM").toUpperCase()}</div>
        <div className={styles.day}
          data-automation-id="singleDayDayContainer">{startEvent.format("D")}</div>
        <div className={styles.day}
          data-automation-id="singleDayDayContainer">{startEvent.format("ddd").toUpperCase()}</div>
      </div>);
  }

  /*************************************************************************************************
   * Method rendering date box for multiple day event.
   * @param startEvent : Event start date.
   * @param endEvent : Enet end date.
   *************************************************************************************************/
  private _renderMultiDay = (startEvent: moment.Moment, endEvent: moment.Moment): JSX.Element => {

    return (
      <div
        className={css(styles.box,
          styles.boxIsSingleDay,
          (this.props.size === IDateBoxSize.Small ? styles.boxIsSmall : styles.boxIsMedium), this.props.className
        )}
        data-automation-id="multipleDayBox">
        <div className={styles.month} data-automation-id="multipleDayStartDateContainer">{startEvent.format("MMM").toUpperCase()}</div>
        <div className={styles.day}
          data-automation-id="singleDayDayContainer">{startEvent.format("D") + "-" + endEvent.format("D")}</div>
      </div>);
  }
}