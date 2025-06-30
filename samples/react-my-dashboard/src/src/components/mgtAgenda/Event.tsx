/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

import * as strings from 'DashBoardWebPartStrings';
import {
  format,
  isSameDay,
  parseISO,
} from 'date-fns';

import {
  Badge,
  Caption1,
  Caption1Strong,
  Card,
  Link,
} from '@fluentui/react-components';
import { PersonCardInteraction } from '@microsoft/mgt';
import {
  MgtTemplateProps,
  Person,
} from '@microsoft/mgt-react/dist/es6/spfx';

/* import { useCache } from '../../hooks/useLocalStorage';
import { useTimeZoneHelper } from '../../hooks/useTimeZoneHelper'; */
import { useEventStyles } from './useEventStyles';

export interface IEventProps {
  event: any;
}

export const Event: React.FunctionComponent<IEventProps> = (props: React.PropsWithChildren<IEventProps>) => {
  const { event } = props;
  const eventStyles = useEventStyles();
  const { end, start, subject, organizer, webLink, importance } = event;

  const { emailAddress } = organizer;
  const { name, address } = emailAddress || {};
  const { dateTime: endDate } = end;
  const { dateTime: startDate } = start;

  const convertedStartDate = React.useMemo(() => (event.start.timeZone === "UTC" ? `${startDate}Z` : startDate), [
    startDate,
    event.start.timeZone,
  ]);
  const convertedEndDate = React.useMemo(() => (event.end.timeZone === "UTC" ? `${endDate}Z` : endDate), [
    endDate,
    event.end.timeZone,
  ]);
  const startHour = React.useMemo(() => format(parseISO(convertedStartDate), "hh:mm aaa"), [convertedStartDate]);
  const endHour = React.useMemo(() => format(parseISO(convertedEndDate), "hh:mm aaa"), [convertedEndDate]);

  const startDateString = React.useMemo(() => {
    return format(parseISO(convertedStartDate), "PPpp");
  }, [convertedStartDate]);

  const isToday = React.useMemo((): boolean => {
    return isSameDay(parseISO(convertedStartDate), new Date());
  }, [convertedStartDate]);

  const renderDate = React.useMemo(() => {
    if (isToday) {
      return `${startHour} - ${endHour}`;
    }
    return startDateString;
  }, [startDateString, isToday, startHour, endHour]);

  const PersonTemplateLine1 = React.useCallback((props: MgtTemplateProps): JSX.Element => {
    const { person } = props.dataContext;
    const { displayName } = person;
    return <Caption1Strong className={eventStyles.userDisplayName}>{displayName}</Caption1Strong>;
  }, []);
  const PersonTemplateLine2 = React.useCallback((props: MgtTemplateProps): JSX.Element => {
    return name ? <Caption1>{strings.eventOrganizer}</Caption1> : <></>;
  }, []);

  const importanceBadgeColor = React.useMemo(() => {
    switch (importance) {
      case "low":
        return "informative";
      case "normal":
        return "brand";
      case "high":
        return "danger";
      default:
        return "informative";
    }
  }, [importance]);

  if (!event) return null;
  return (
    <>
      <Card className={eventStyles.card} size="large" appearance="outline">
        <header className={eventStyles.cardHeader}>
          <Caption1 className={eventStyles.dateTitle}>{renderDate}</Caption1>
          <Badge color={importanceBadgeColor} shape="rounded" appearance="tint">
            {importance}
          </Badge>
        </header>
        <div>
          <Link appearance="subtle" href={webLink} target="_blank">
            <Caption1Strong block truncate wrap={false} className={eventStyles.cardTextSubject} title={subject}>
              {subject}
            </Caption1Strong>
          </Link>
          <div style={{ width: 40, height: 40 }}> {/* bug with person card on Teams App mobile  need to specify with and heigt*/}
            <Person
              personQuery={address}
              showPresence
              view={4}
              avatarSize="small"
              personCardInteraction={PersonCardInteraction.hover}
            >
              <PersonTemplateLine1 template="line1" />
              <PersonTemplateLine2 template="line2" />
            </Person>
          </div>
        </div>
      </Card>
    </>
  );
};
