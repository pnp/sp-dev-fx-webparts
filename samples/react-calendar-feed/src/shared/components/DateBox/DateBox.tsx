import * as moment from "moment";
import { css } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import styles from "./DateBox.module.scss";
import { DateBoxSize, IDateBoxProps } from ".";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

/**
 * Shows a date in a SharePoint-looking date
 */
export class DateBox extends React.Component<IDateBoxProps, {}> {
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

  /**
   * Renders an event that happens in a single day
   * @param startMoment
   */
  private _renderSingleDay(startMoment: moment.Moment): JSX.Element {
    const { className, size, themeVariant } = this.props;

    return (
      <div className={css(styles.box,
        styles.boxIsSingleDay,
        (size === DateBoxSize.Small ? styles.boxIsSmall : styles.boxIsMedium), className)}
        style={
          themeVariant &&
          {
            // KLUDGE: It seems like the themeVariant palette doesn't expose primaryBackground
            backgroundColor: themeVariant.palette["primaryBackground"],
            borderColor: themeVariant.semanticColors.bodyDivider
          }}>
        <div className={styles.month}
          style={
            themeVariant &&
            { color: themeVariant.semanticColors.bodyText }}>{startMoment.format("MMM").toUpperCase()}</div>
        <div className={styles.day}
          style={
            themeVariant &&
            { color: themeVariant.semanticColors.bodyText }}>{startMoment.format("D")}</div>
      </div>);
  }

  /**
   * Renders an event that spans over multiple days
   * @param startMoment
   * @param endMoment
   */
  private _renderMultiDay(startMoment: moment.Moment, endMoment: moment.Moment): JSX.Element {
    const { className, size, themeVariant } = this.props;
    return (
      <div
        className={css(styles.box,
          styles.boxIsSingleDay,
          (size === DateBoxSize.Small ? styles.boxIsSmall : styles.boxIsMedium), className)}
        style={
          themeVariant &&
          {
            backgroundColor: themeVariant.palette["primaryBackground"],
            borderColor: themeVariant.semanticColors.bodyDivider
          }}>

        <div className={styles.date} style={
          themeVariant &&
          { color: themeVariant.semanticColors.bodyText }}>{startMoment.format("MMM D").toUpperCase()}</div>
        <hr className={styles.separator}
          style={
            themeVariant &&
            {
              borderColor: themeVariant.semanticColors.bodyText
            }}
        />
        <div className={styles.date} style={
          themeVariant &&
          { color: themeVariant.semanticColors.bodyText }}>{endMoment.format("MMM D").toUpperCase()}</div>
      </div>);
  }
}
