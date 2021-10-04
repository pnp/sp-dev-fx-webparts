import * as moment from "moment";
import { DocumentCard, DocumentCardActivity, DocumentCardType, FocusZone, css } from "office-ui-fabric-react";
import * as React from "react";
import { IEventCardProps } from "./IEventCardProps";
import DateBox from "../DateBox/DateBox";
import { IDateBoxSize } from '../DateBox/IDateBoxProps';
import styles from "./EventCard.module.scss";
import { Text } from "@microsoft/sp-core-library";
import * as strings from "ReactMyEventsWebPartStrings";
import { FontIcon } from '@fluentui/react/lib/Icon';
import { mergeStyles } from '@fluentui/react/lib/Styling';

/**
 * Shows an event in a document card
 */
export const EventCard = (props: IEventCardProps) => {


    const { isCompact, themeVariant, isEditMode, event, layout } = props;

    const { start,
        end,
        allDay,
        subject,
        organizer,
        webLink,
        categories,
        location,
        onlineMeeting,
        createdDateTime
    } = event;

    const eventDate: moment.Moment = moment(start.dateTime);
    const endDate: moment.Moment = moment(end.dateTime);
    const eventDateString: string = allDay ? eventDate.format(strings.AllDayDateFormat) : eventDate.format(strings.LocalizedTimeFormat);
    const endDateString: string = allDay ? endDate.format(strings.AllDayDateFormat) : endDate.format(strings.LocalizedTimeFormat);
    const userProfileImg = `/_layouts/15/userphoto.aspx?size=L&username=${organizer.emailAddress.address}`;
    const DocumentCardActivityPeople = [{ name: organizer.emailAddress.name, profileImageSrc: userProfileImg, initials: '' }];
    const backgroundColor: string = themeVariant && (isCompact ? themeVariant.semanticColors.bodyBackground : themeVariant.palette["primaryBackground"]);
    const textColor: string = themeVariant && backgroundColor != themeVariant.semanticColors.bodyText ?
        themeVariant.semanticColors.bodyText : themeVariant.palette["primaryText"];
    const subTextColor: string = themeVariant && themeVariant.semanticColors.bodySubtext && backgroundColor != themeVariant.semanticColors.bodySubtext ? themeVariant.semanticColors.bodySubtext : textColor;
    const created = strings.CreatedLabel + " " + moment(createdDateTime).fromNow();
    const teamsMeetingURL = onlineMeeting && onlineMeeting.joinUrl;

    const openTeamsLink = (url) => {
        window.open(url, '_blank');
    };

    if (isCompact) {
        return (
            <div>
                <div
                    className={css(styles.cardWrapper, styles.compactCard, styles.root, styles.rootIsCompact)}
                    style={themeVariant && { backgroundColor: themeVariant.semanticColors.bodyBackground }}
                    data-is-focusable={true}
                    data-is-focus-item={true}
                    role="listitem"
                    aria-label={Text.format(strings.EventCardWrapperArialLabel, subject, eventDateString)}
                >
                    <DocumentCard
                        type={DocumentCardType.compact}
                        onClickHref={webLink}
                        onClickTarget="_blank"
                    >
                        <div>
                            <DateBox
                                className={styles.dateBox}
                                startDate={eventDate}
                                endDate={endDate}
                                size={IDateBoxSize.Small}
                                themeVariant={themeVariant}
                            />
                        </div>
                        <div>
                            <div className={styles.title} style={themeVariant && { color: textColor }}>{subject}</div>
                            <div className={styles.datetime} style={themeVariant && { color: subTextColor }}>{eventDateString + "-" + endDateString}</div>
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
                    aria-label={Text.format(strings.EventCardWrapperArialLabel, subject, `${eventDateString}`)}
                    tabIndex={0}
                >
                    <DocumentCard
                        className={css(styles.root, !isEditMode && styles.rootIsActionable, styles.normalCard)}
                        type={DocumentCardType.normal}
                        onClickHref={isEditMode ? null : webLink}
                        style={themeVariant && { borderColor: themeVariant.semanticColors.bodyDivider }}
                    >
                        <FocusZone>
                            <div className={styles.dateBoxContainer} style={{ height: 120, borderBottom: '1px solid rgb(237, 235, 233)' }}>
                                <DateBox
                                    className={styles.dateBox}
                                    startDate={eventDate}
                                    endDate={endDate}
                                    size={IDateBoxSize.Medium}
                                    themeVariant={themeVariant}
                                />
                            </div>
                            <div className={styles.detailsContainer}>
                                <div className={styles.category} style={themeVariant && { color: subTextColor }}>{categories}</div>
                                <div className={styles.title} style={themeVariant && { color: textColor }}>{subject}</div>
                                <div className={styles.datetime} style={themeVariant && { color: subTextColor }}>
                                    <FontIcon
                                        aria-label="DateTime"
                                        iconName="DateTime"
                                        className={styles.iconClass} />
                                    {eventDateString + "-" + endDateString}</div>
                                <div className={styles.location} style={themeVariant && { color: subTextColor }}>
                                    {location.displayName &&
                                        <FontIcon aria-label="Location"
                                            iconName="Location"
                                            className={styles.iconClass} />}
                                    {location.displayName}</div>
                                <div className={styles.activityContainer}>
                                    <DocumentCardActivity
                                        styles={{
                                            root: styles.cardActivityRoot,
                                            details: styles.cardActivityDetails
                                        }}
                                        activity={created}
                                        people={DocumentCardActivityPeople}
                                    />
                                    {teamsMeetingURL &&
                                        <FontIcon
                                            aria-label="TeamsLogo16"
                                            iconName="TeamsLogo16"
                                            onClick={() => openTeamsLink(teamsMeetingURL)}
                                            className={styles.iconClass} />
                                    }
                                </div>
                            </div>
                        </FocusZone>
                    </DocumentCard>
                </div>
            </div>
        );
    }
};
