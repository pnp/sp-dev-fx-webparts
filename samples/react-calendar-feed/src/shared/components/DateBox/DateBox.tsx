import * as moment from "moment";
import { css } from "office-ui-fabric-react/lib/Utilities";
import * as React from "react";
import styles from "./DateBox.module.scss";
import { DateBoxSize, IDateBoxProps } from ".";

/**
 * Shows a date in a SharePoint-looking date
 */
export const DateBox = (props: IDateBoxProps) => {
  // convert start and end date into moments so that we can manipulate them
  const startMoment: moment.Moment = moment(props.startDate);

  // event actually ends one second before the end date
  const endMoment: moment.Moment = moment(props.endDate).add(-1, "s");

  // check if both dates are on the same day
  const isSameDay: boolean = startMoment.isSame(endMoment, "day");

  const { themeVariant } = props;
  const backgroundColor: string = themeVariant && themeVariant.palette["primaryBackground"];
  const textColor: string = themeVariant && backgroundColor != themeVariant.semanticColors.bodyText ?
    themeVariant.semanticColors.bodyText : themeVariant.palette["primaryText"];
  // If the background color matches the text color, it is probably a reversed section, use a different border color
  const borderColor: string = themeVariant && backgroundColor != themeVariant.semanticColors.bodyText ? themeVariant.semanticColors.bodyDivider : "[theme:neutralLight, default: #eaeaea]";

  if (isSameDay) {
    return (
      <div className={css(styles.box,
        styles.boxIsSingleDay,
        (props.size === DateBoxSize.Small ? styles.boxIsSmall : styles.boxIsMedium), props.className)}
        style={
          props.themeVariant &&
          {
            // KLUDGE: It seems like the themeVariant palette doesn't expose primaryBackground
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            color: textColor
          }}>
        <div className={styles.month}
          style={
            props.themeVariant &&
            { color: textColor }}>{startMoment.format("MMM").toUpperCase()}</div>
        <div className={styles.day}
          style={
            props.themeVariant &&
            { color: textColor }}>{startMoment.format("D")}</div>
      </div>);

  } else {
    return (
      <div
        className={css(styles.box,
          styles.boxIsSingleDay,
          (props.size === DateBoxSize.Small ? styles.boxIsSmall : styles.boxIsMedium), props.className)}
        style={
          props.themeVariant &&
          {
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            color: textColor
          }}>

        <div className={styles.date} style={
          props.themeVariant &&
          { color: textColor }}>{startMoment.format("MMM D").toUpperCase()}</div>
        <hr className={styles.separator}
          style={
            props.themeVariant &&
            {
              borderColor: textColor
            }}
        />
        <div className={styles.date} style={
          props.themeVariant &&
          { color: textColor }}>{endMoment.format("MMM D").toUpperCase()}</div>
      </div>);

  }
};
