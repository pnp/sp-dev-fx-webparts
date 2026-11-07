import * as React from 'react';
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import * as strings from 'EventsLayoutsWebPartStrings';
import { IEventItem } from '../../models';
import { startOfDay } from '../../common/dates';
import { ILayoutProps } from './ILayoutProps';
import { useEventsContext } from '../EventsContext';
import { EventCategory, EventDescription, EventImage, EventMeta, EventTitle } from '../shared/EventParts';

interface IDayGroup {
  day: Date;
  events: IEventItem[];
}

/** Groups events by start day; events already in progress are listed under today. */
function groupByDay(events: IEventItem[]): IDayGroup[] {
  const today = startOfDay(new Date());
  const groups: IDayGroup[] = [];
  events.forEach(event => {
    const day = event.start < today ? today : startOfDay(event.start);
    const last = groups[groups.length - 1];
    if (last && last.day.getTime() === day.getTime()) {
      last.events.push(event);
    } else {
      groups.push({ day, events: [event] });
    }
  });
  return groups;
}

const useStyles = makeStyles({
  root: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXL },
  dayHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: tokens.spacingHorizontalM,
    marginBottom: tokens.spacingVerticalM,
    paddingLeft: tokens.spacingHorizontalM,
    borderLeft: `3px solid ${tokens.colorBrandBackground}`
  },
  dayCircle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    width: '40px',
    height: '40px',
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: tokens.fontWeightSemibold
  },
  dayLabel: { margin: 0, fontSize: tokens.fontSizeBase400, fontWeight: tokens.fontWeightSemibold, color: tokens.colorNeutralForeground1 },
  dayCount: { color: tokens.colorBrandForeground1, fontWeight: tokens.fontWeightRegular, marginLeft: tokens.spacingHorizontalS },
  dayMonth: { display: 'block', fontSize: tokens.fontSizeBase200, color: tokens.colorNeutralForeground3, textTransform: 'uppercase' },
  list: { margin: 0, padding: 0, listStyleType: 'none', display: 'flex', flexDirection: 'column' },
  row: {
    position: 'relative',
    display: 'flex',
    minHeight: '120px',
    overflow: 'hidden',
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    marginTop: '-1px',
    ':first-child': { marginTop: 0, borderRadius: `${tokens.borderRadiusLarge} ${tokens.borderRadiusLarge} 0 0` },
    ':last-child': { borderRadius: `0 0 ${tokens.borderRadiusLarge} ${tokens.borderRadiusLarge}` },
    ':only-child': { borderRadius: tokens.borderRadiusLarge },
    ':hover': { backgroundColor: tokens.colorNeutralBackground1Hover }
  },
  thumb: { position: 'relative', flexShrink: 0, width: '136px' },
  thumbSmall: { width: '88px' },
  thumbImage: { position: 'absolute', inset: 0 },
  thumbTime: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    padding: tokens.spacingHorizontalS,
    textAlign: 'center',
    color: '#ffffff',
    backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.55))'
  },
  thumbTimeNoImage: { backgroundImage: 'none', backgroundColor: tokens.colorBrandBackground, color: tokens.colorNeutralForegroundOnBrand },
  weekday: { fontSize: tokens.fontSizeBase200, letterSpacing: '0.08em', textTransform: 'uppercase' },
  time: { fontSize: tokens.fontSizeBase500, fontWeight: tokens.fontWeightBold, lineHeight: tokens.lineHeightBase500 },
  timeSmall: { fontSize: tokens.fontSizeBase300, lineHeight: tokens.lineHeightBase300 },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: tokens.spacingVerticalXS,
    minWidth: 0,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalL}`
  }
});

/** One event: time tile (image or brand color) followed by the details. */
const AgendaRow: React.FC<{ event: IEventItem; compact: boolean }> = ({ event, compact }) => {
  const styles = useStyles();
  const { formatter, display } = useEventsContext();
  const hasImage = display.showImage && !!event.imageUrl;
  return (
    <li className={styles.row}>
      <div className={mergeClasses(styles.thumb, compact && styles.thumbSmall)}>
        {hasImage && <EventImage event={event} className={styles.thumbImage} />}
        <div className={mergeClasses(styles.thumbTime, !hasImage && styles.thumbTimeNoImage)}>
          <span className={styles.weekday}>{formatter.weekday(event.start)}</span>
          <span className={mergeClasses(styles.time, compact && styles.timeSmall)}>
            {event.isAllDay ? strings.AllDay : formatter.time(event.start)}
          </span>
        </div>
      </div>
      <div className={styles.content}>
        <EventCategory event={event} />
        <EventTitle event={event} size="small" level={4} />
        <EventDescription event={event} />
        <EventMeta event={event} />
      </div>
    </li>
  );
};

export const AgendaLayout: React.FC<ILayoutProps> = ({ events, size }) => {
  const styles = useStyles();
  const { formatter } = useEventsContext();
  const compact = size === 'xs';

  return (
    <div className={styles.root}>
      {groupByDay(events).map(group => (
        <section key={group.day.getTime()} aria-label={formatter.dayLabel(group.day)}>
          <div className={styles.dayHeader}>
            <span className={styles.dayCircle} aria-hidden="true">{formatter.dayNumber(group.day)}</span>
            <div>
              <h3 className={styles.dayLabel}>
                {formatter.dayLabel(group.day)}
                <span className={styles.dayCount}>({group.events.length})</span>
              </h3>
              <span className={styles.dayMonth}>{formatter.month(group.day)}</span>
            </div>
          </div>
          <ul className={styles.list}>
            {group.events.map(event => <AgendaRow key={event.key} event={event} compact={compact} />)}
          </ul>
        </section>
      ))}
    </div>
  );
};
