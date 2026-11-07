import * as React from 'react';
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import * as strings from 'EventsLayoutsWebPartStrings';
import { ILayoutProps } from './ILayoutProps';
import { useEventsContext } from '../EventsContext';
import { EventCategory, EventDescription, EventImage, EventMeta, EventTitle } from '../shared/EventParts';

const LINE: string = '2px';
const DOT: string = '14px';

const useStyles = makeStyles({
  list: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXL,
    margin: 0,
    padding: `0 0 0 28px`,
    listStyleType: 'none',
    '::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: '6px',
      width: LINE,
      backgroundColor: tokens.colorNeutralStroke2
    }
  },
  // Wide web parts: the line moves to the center and events alternate sides.
  alternate: {
    paddingLeft: 0,
    '::before': { left: `calc(50% - ${LINE} / 2)` }
  },
  item: { position: 'relative' },
  itemStart: { width: '50%', paddingRight: '32px', boxSizing: 'border-box' },
  itemEnd: { width: '50%', marginLeft: '50%', paddingLeft: '32px', boxSizing: 'border-box' },
  dot: {
    position: 'absolute',
    top: '4px',
    left: '-28px',
    width: DOT,
    height: DOT,
    boxSizing: 'border-box',
    borderRadius: tokens.borderRadiusCircular,
    backgroundColor: tokens.colorBrandBackground,
    boxShadow: `0 0 0 4px ${tokens.colorNeutralBackground1}`
  },
  dotStart: { left: 'auto', right: `calc(-${DOT} / 2)` },
  dotEnd: { left: `calc(-${DOT} / 2)` },
  when: {
    display: 'block',
    marginBottom: tokens.spacingVerticalS,
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold
  },
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow2,
    ':hover': { boxShadow: tokens.shadow8 }
  },
  image: { height: '140px' },
  body: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXS, padding: tokens.spacingHorizontalL }
});

/** Chronological line of events; alternates sides when the web part is wide enough. */
export const TimelineLayout: React.FC<ILayoutProps> = ({ events, size }) => {
  const styles = useStyles();
  const { formatter, display } = useEventsContext();
  const alternate = size === 'md' || size === 'lg';

  return (
    <ol className={mergeClasses(styles.list, alternate && styles.alternate)}>
      {events.map((event, index) => {
        const start = alternate && index % 2 === 0;
        const end = alternate && index % 2 === 1;
        return (
          <li key={event.key} className={mergeClasses(styles.item, start && styles.itemStart, end && styles.itemEnd)}>
            <span className={mergeClasses(styles.dot, start && styles.dotStart, end && styles.dotEnd)} aria-hidden="true" />
            <span className={styles.when}>
              {formatter.dayLabel(event.start)} · {event.isAllDay ? strings.AllDay : formatter.time(event.start)}
            </span>
            <article className={styles.card}>
              {display.showImage && event.imageUrl && <EventImage event={event} className={styles.image} />}
              <div className={styles.body}>
                <EventCategory event={event} />
                <EventTitle event={event} size="small" />
                <EventDescription event={event} />
                <EventMeta event={event} />
              </div>
            </article>
          </li>
        );
      })}
    </ol>
  );
};
