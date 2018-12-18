import { Guid } from "@microsoft/sp-core-library";
import * as strings from "CalendarFeedSummaryWebPartStrings";
import * as ICS from "ics-js";
import * as moment from "moment";
import { ActionButton, DocumentCard, DocumentCardType, FocusZone, css } from "office-ui-fabric-react";
import * as React from "react";
import { IEventCardProps, IEventCardState } from ".";
import { DateBox, DateBoxSize } from "../DateBox";
import styles from "./EventCard.module.scss";
import { Text } from "@microsoft/sp-core-library";
/**
 * Shows an event in a document card
 */
export class EventCard extends React.Component<IEventCardProps, IEventCardState> {
    public render(): React.ReactElement<IEventCardProps> {
        const { isNarrow } = this.props;

        if (isNarrow) {
            return this._renderNarrowCell();
        } else {
            return this._renderNormalCell();
        }
    }

    private _renderNormalCell(): JSX.Element {
        const { start,
            end,
            allDay,
            title,
            url,
            category,
            // description,
            location } = this.props.event;
        const eventDate: moment.Moment = moment(start);
        const dateString: string = allDay ? eventDate.format(strings.AllDayDateFormat) : eventDate.format(strings.LocalizedTimeFormat);
        const { isEditMode } = this.props;
        return (
            <div>
                <div
                    className={css(styles.cardWrapper)}
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
                    >
                        <FocusZone>
                            <div className={styles.dateBoxContainer} style={{ height: 160 }} data-automation-id="normal-card-preview">
                                <DateBox
                                    className={styles.dateBox}
                                    startDate={start}
                                    endDate={end}
                                    size={DateBoxSize.Medium}
                                />
                            </div>
                            <div className={styles.detailsContainer}>
                                <div className={styles.category}>{category}</div>
                                <div className={styles.title} data-automation-id="event-card-title">{title}</div>
                                <div className={styles.datetime}>{dateString}</div>
                                <div className={styles.location}>{location}</div>
                                <ActionButton
                                    className={styles.addToMyCalendar}
                                    iconProps={{ iconName: "AddEvent" }}
                                    ariaLabel={strings.AddToCalendarAriaLabel}
                                    onClick={this._onAddToMyCalendar}
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

    private _renderNarrowCell(): JSX.Element {
        const { start,
            end,
            allDay,
            title,
            url,
            // category,
            // location
          } = this.props.event;
        const eventDate: moment.Moment = moment.utc(start);
        const dateString: string = allDay ? eventDate.format(strings.AllDayDateFormat) : eventDate.format(strings.LocalizedTimeFormat);
        return (
            <div>
                <div
                    className={css(styles.cardWrapper, styles.compactCard, styles.root, styles.rootIsCompact)}
                    data-is-focusable={true}
                    data-is-focus-item={true}
                    role="listitem"
                    aria-label={Text.format(strings.EventCardWrapperArialLabel, title, dateString)}
                >
                    <DocumentCard
                        className={css(styles.root, styles.rootIsActionable, styles.rootIsCompact)}
                        type={DocumentCardType.compact}
                        onClickHref={url}
                    >
                        <div data-automation-id="normal-card-preview">
                            <DateBox
                                className={styles.dateBox}
                                startDate={start}
                                endDate={end}
                                size={DateBoxSize.Small}
                            />
                        </div>
                        <div>
                            <div className={styles.title} data-automation-id="event-card-title">{title}</div>
                            <div className={styles.datetime}>{dateString}</div>
                        </div>
                    </DocumentCard>
                </div>
            </div>
        );
    }

    private _onAddToMyCalendar = (): void => {
        const { event } = this.props;

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
    }
}
