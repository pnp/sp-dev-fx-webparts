import * as moment from "moment";
import { css } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import styles from "./DateBox.module.scss";
import { DateBoxSize, IDateBoxProps, IDateBoxState } from "./DateBox.types";

/**
 * Shows a date in a SharePoint-looking date
 */
export class DateBox extends React.Component<IDateBoxProps, IDateBoxState> {
  public render(): React.ReactElement<IDateBoxProps> {
    // convert start and end date into moments so that we can manipulate them
    const startMoment: moment.Moment = moment(this.props.startDate);

    // event actually ends one second before the end date
    const endMoment: moment.Moment = moment(this.props.endDate).add(-1, "s");

    // check if both dates are on the same day
    const isSameDay: boolean = startMoment.isSame(endMoment, "day");

    if (isSameDay) {
      return this._renderSingleDay(startMoment);
    } else {
      return this._renderMultiDay(startMoment, endMoment);
    }
  }

  private _renderSingleDay(startMoment: moment.Moment): JSX.Element {
    const { className, size } = this.props;
    return (
      <div className={css(styles.box,
        styles.boxIsSingleDay,
        (size === DateBoxSize.Small ? styles.boxIsSmall : styles.boxIsMedium), className)}
        data-automation-id="singleDayDayContainer">
        <div className={styles.month}
          data-automation-id="singleDayMonthContainer">{startMoment.format("MMM").toUpperCase()}</div>
        <div className={styles.day}
          data-automation-id="singleDayDayContainer">{startMoment.format("D")}</div>
      </div>);
  }

  private _renderMultiDay(startMoment: moment.Moment, endMoment: moment.Moment): JSX.Element {
    const { className, size } = this.props;
    return (
      <div
        className={css(styles.box,
          styles.boxIsSingleDay,
          (size === DateBoxSize.Small ? styles.boxIsSmall : styles.boxIsMedium), className)}
        data-automation-id="multipleDayBox">
        <div className={styles.date} data-automation-id="multipleDayStartDateContainer">{startMoment.format("MMM D").toUpperCase()}</div>
        <hr className={styles.separator} />
        <div className={styles.date} data-automation-id="multipleDayEndDateContainer">{endMoment.format("MMM D").toUpperCase()}</div>
      </div>);
  }
}
