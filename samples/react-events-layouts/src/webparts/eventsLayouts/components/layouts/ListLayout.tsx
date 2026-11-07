import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { ILayoutProps } from './ILayoutProps';
import { DateBadge, EventCategory, EventDescription, EventMeta, EventTitle } from '../shared/EventParts';

const useStyles = makeStyles({
  list: { margin: 0, padding: 0, listStyleType: 'none' },
  row: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    gap: tokens.spacingHorizontalL,
    padding: `${tokens.spacingVerticalM} ${tokens.spacingHorizontalS}`,
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: tokens.borderRadiusMedium,
    ':last-child': { borderBottomColor: 'transparent' },
    ':hover': { backgroundColor: tokens.colorSubtleBackgroundHover }
  },
  badge: { boxShadow: 'none', border: `1px solid ${tokens.colorNeutralStroke2}` },
  content: { display: 'flex', flexDirection: 'column', gap: tokens.spacingVerticalXXS, minWidth: 0, flexGrow: 1 }
});

/** Compact, text-first list that fits narrow columns and dense pages. */
export const ListLayout: React.FC<ILayoutProps> = ({ events }) => {
  const styles = useStyles();
  return (
    <ul className={styles.list}>
      {events.map(event => (
        <li key={event.key} className={styles.row}>
          <DateBadge date={event.start} className={styles.badge} />
          <div className={styles.content}>
            <EventCategory event={event} />
            <EventTitle event={event} size="small" />
            <EventMeta event={event} />
            <EventDescription event={event} />
          </div>
        </li>
      ))}
    </ul>
  );
};
