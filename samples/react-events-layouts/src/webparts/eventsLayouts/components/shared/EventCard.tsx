import * as React from 'react';
import { makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { IEventItem } from '../../models';
import { useEventsContext } from '../EventsContext';
import { DateBadge, EventCategory, EventDescription, EventImage, EventMeta, EventTitle } from './EventParts';

const useStyles = makeStyles({
  card: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minWidth: 0,
    overflow: 'hidden',
    borderRadius: tokens.borderRadiusLarge,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    boxShadow: tokens.shadow2,
    transitionProperty: 'box-shadow, transform',
    transitionDuration: tokens.durationFast,
    ':hover': { boxShadow: tokens.shadow8 },
    '@media (prefers-reduced-motion: no-preference)': {
      ':hover': { transform: 'translateY(-2px)' }
    }
  },
  image: { aspectRatio: '16 / 9', flexShrink: 0 },
  badgeOverlay: { position: 'absolute', top: tokens.spacingVerticalM, left: tokens.spacingHorizontalM },
  body: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: tokens.spacingVerticalS,
    padding: tokens.spacingHorizontalL
  },
  meta: { marginTop: 'auto', paddingTop: tokens.spacingVerticalXS }
});

/** Vertical event card used by the Grid and Filmstrip layouts. */
export const EventCard: React.FC<{ event: IEventItem; className?: string }> = ({ event, className }) => {
  const styles = useStyles();
  const { display } = useEventsContext();
  return (
    <article className={mergeClasses(styles.card, className)}>
      {display.showImage && (
        <EventImage event={event} className={styles.image}>
          <DateBadge date={event.start} className={styles.badgeOverlay} />
        </EventImage>
      )}
      <div className={styles.body}>
        {!display.showImage && <DateBadge date={event.start} />}
        <EventCategory event={event} />
        <EventTitle event={event} />
        <EventDescription event={event} />
        <EventMeta event={event} className={styles.meta} />
      </div>
    </article>
  );
};
