import { Guid } from "@microsoft/sp-core-library";
import * as strings from "CalendarFeedSummaryWebPartStrings";
import ical from "ical-generator";
import * as moment from "moment";
import { ActionButton, DocumentCard, DocumentCardType, FocusZone, css } from "office-ui-fabric-react";
import * as React from "react";
import { IEventCardProps } from ".";
import { DateBox, DateBoxSize } from "../DateBox";
import styles from "./EventCard.module.scss";
import { Text } from "@microsoft/sp-core-library";
import { useCallback } from 'react';

/**
 * Shows an event in a document card
 */
export const EventCard = (props: IEventCardProps):JSX.Element => {
  const { isNarrow, themeVariant, isEditMode, event } = props;

  // Get the cell information
  const { start, end, allDay, title, url, category, location } = event;

  const eventDate: moment.Moment = moment(start);
  const dateString: string = allDay ? eventDate.format(strings.AllDayDateFormat) : eventDate.format(strings.LocalizedTimeFormat);

  /**
   * Handle adding to calendar
   */
  const _onAddToMyCalendar = useCallback((): void => {
    // create a calendar to hold the event
    const cal = ical({ 
      name: 'My Calendar' ,
      prodId: '//SPFX//NONSGML v1.0//EN'
    });
    
   
    // create an event
    cal.createEvent({
      id: Guid.newGuid().toString(),
      start: allDay ? moment(start).startOf('day').toDate() : new Date(start),
      end: allDay ? moment(end).endOf('day').toDate() : new Date(end),
      
      summary: title,
      url: url,
      description: event.description,
      location: location,
      allDay: allDay
    });
// export the calendar
const icalString = cal.toString();
const blob = new Blob([icalString], { type: 'text/calendar;charset=utf8' });
const urlBlob = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = urlBlob;
a.download = 'event.ics';
a.click();
URL.revokeObjectURL(urlBlob);
}, [event, allDay, end, start, title, url, event.description, location]);



  //Unfortunately, themes don't always populate all the palette/semantic colors.
  //Detect if background color is the same as the foreground and find default
  const backgroundColor: string = themeVariant && (isNarrow ? themeVariant.semanticColors.bodyBackground : themeVariant.palette.white);
  const textColor: string = themeVariant && backgroundColor !== themeVariant.semanticColors.bodyText ?
    themeVariant.semanticColors.bodyText : themeVariant.palette.black;
  const subTextColor: string = themeVariant && themeVariant.semanticColors.bodySubtext && backgroundColor !== themeVariant.semanticColors.bodySubtext ? themeVariant.semanticColors.bodySubtext : textColor;

  if (isNarrow) {
    // Calculate the date and string format

    // Define theme variant styles if themevariant was passed
    return (
      <div>
        <div
          className={css(styles.cardWrapper, styles.compactCard, styles.root, styles.rootIsCompact)}
          style={themeVariant && { backgroundColor: themeVariant.semanticColors.bodyBackground }}
          data-is-focusable={true}
          data-is-focus-item={true}
          role="listitem"
          aria-label={Text.format(strings.EventCardWrapperArialLabel, title, dateString)}
        >
          <DocumentCard
            className={css(styles.root, styles.rootIsActionable, styles.rootIsCompact)}
            type={DocumentCardType.compact}
            style={themeVariant && { backgroundColor: themeVariant.semanticColors.bodyBackground }}
            onClickHref={url}
          >
            <div>
              <DateBox
                className={styles.dateBox}
                startDate={start}
                endDate={end}
                size={DateBoxSize.Small}
                themeVariant={themeVariant}
              />
            </div>
            <div>
              <div className={styles.title} style={themeVariant && { color: textColor }}>{title}</div>
              <div className={styles.datetime} style={themeVariant && { color: subTextColor }}>{dateString}</div>
            </div>
          </DocumentCard>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div
          className={css(styles.cardWrapper)}
          style={themeVariant && { backgroundColor: themeVariant.semanticColors.bodyBackground }}
          data-is-focusable={true}
          data-is-focus-item={true}
          role="listitem"
          aria-label={Text.format(strings.EventCardWrapperArialLabel, title, `${dateString}`)}
          tabIndex={0}
        >
          <DocumentCard
            className={css(styles.root, !isEditMode && styles.rootIsActionable, styles.normalCard)}
            type={DocumentCardType.normal}
            onClickHref={isEditMode ? null : url}
            style={themeVariant && { borderColor: themeVariant.semanticColors.bodyDivider }}
          >
            <FocusZone>
              <div className={styles.dateBoxContainer} style={{ height: 160 }}>
                <DateBox
                  className={styles.dateBox}
                  startDate={start}
                  endDate={end}
                  size={DateBoxSize.Medium}
                  themeVariant={themeVariant}
                />
              </div>
              <div className={styles.detailsContainer}>
                <div className={styles.category} style={themeVariant && { color: subTextColor }}>{category}</div>
                <div className={styles.title} style={themeVariant && { color: textColor }}>{title}</div>
                <div className={styles.datetime} style={themeVariant && { color: subTextColor }}>{dateString}</div>
                <div className={styles.location} style={themeVariant && { color: subTextColor }}>{location}</div>
                <ActionButton
                  className={styles.addToMyCalendar}
                  style={themeVariant && { color: textColor }}
                  iconProps={{ iconName: "AddEvent" }}
                  ariaLabel={strings.AddToCalendarAriaLabel}
                  onClick={_onAddToMyCalendar}
                >
                  {strings.AddToCalendarButtonLabel}
                </ActionButton>
              </div>
            </FocusZone>
          </DocumentCard>
        </div>
      </div>
    );
  }
};