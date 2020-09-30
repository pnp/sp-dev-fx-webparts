import { Guid } from "@microsoft/sp-core-library";
import * as strings from "CalendarFeedSummaryWebPartStrings";
import * as ICS from "ics-js";
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
export const EventCard = (props: IEventCardProps) => {
  const { isNarrow, themeVariant, isEditMode, event } = props;

  // Get the cell information
  const { start,
    end,
    allDay,
    title,
    url,
    category,
    location
  } = event;

  const eventDate: moment.Moment = moment(start);
  const dateString: string = allDay ? eventDate.format(strings.AllDayDateFormat) : eventDate.format(strings.LocalizedTimeFormat);

  /**
   * Handle adding to calendar
   */
  const _onAddToMyCalendar = useCallback((): void => {

    // create a calendar to hold the event
    const cal: ICS.VCALENDAR = new ICS.VCALENDAR();
    cal.addProp("VERSION", 2.0);
    cal.addProp("PRODID", "//SPFX//NONSGML v1.0//EN");

    // create an event
    const icsEvent: ICS.VEVENT = new ICS.VEVENT();

    // generate a unique id
    icsEvent.addProp("UID", Guid.newGuid().toString());

    // if the event is all day, just pass the date component
    if (event.allDay) {
      icsEvent.addProp("DTSTAMP", event.start, { VALUE: "DATE" });
      icsEvent.addProp("DTSTART", event.start, { VALUE: "DATE" });
    } else {
      icsEvent.addProp("DTSTAMP", event.start, { VALUE: "DATE-TIME" });
      icsEvent.addProp("DTSTART", event.start, { VALUE: "DATE-TIME" });
      icsEvent.addProp("DTEND", event.start, { VALUE: "DATE-TIME" });
    }

    // add a title
    icsEvent.addProp("SUMMARY", event.title);

    // add a url if there is one
    if (event.url !== undefined) {
      icsEvent.addProp("URL", event.url);
    }

    // add a description if there is one
    if (event.description !== undefined) {
      icsEvent.addProp("DESCRIPTION", event.description);
    }

    // add a location if there is one
    if (event.location !== undefined) {
      icsEvent.addProp("LOCATION", event.location);
    }

    // add the event to the calendar
    cal.addComponent(icsEvent);

    // export the calendar
    // my spidey senses are telling me that there are sitaations where this isn't going to work, but none of my tests could prove it.
    // i suspect we're not encoding events properly
    window.open("data:text/calendar;charset=utf8," + encodeURIComponent(cal.toString()));
  }, [event]);

  //Unfortunately, themes don't always populate all the palette/semantic colors.
  //Detect if background color is the same as the foreground and find default
  const backgroundColor: string = themeVariant && (isNarrow ? themeVariant.semanticColors.bodyBackground : themeVariant.palette["primaryBackground"]);
  const textColor: string = themeVariant && backgroundColor != themeVariant.semanticColors.bodyText ?
    themeVariant.semanticColors.bodyText : themeVariant.palette["primaryText"];
  const subTextColor: string = themeVariant && themeVariant.semanticColors.bodySubtext && backgroundColor != themeVariant.semanticColors.bodySubtext ? themeVariant.semanticColors.bodySubtext : textColor;

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
