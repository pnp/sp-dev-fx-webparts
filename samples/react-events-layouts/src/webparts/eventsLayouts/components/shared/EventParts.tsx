import * as React from 'react';
import { makeStyles, mergeClasses, tokens, Tooltip } from '@fluentui/react-components';
import {
  ArrowRepeatAll16Regular,
  CalendarLtr16Regular,
  CalendarLtr28Regular,
  Location16Regular,
  Person16Regular
} from '@fluentui/react-icons';
import * as strings from 'EventsLayoutsWebPartStrings';
import { IEventItem } from '../../models';
import { useEventsContext } from '../EventsContext';

/** Multi-line truncation; line counts come from the property pane so this stays inline. */
export const clamp = (lines: number): React.CSSProperties => ({
  display: '-webkit-box',
  WebkitLineClamp: lines,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden'
});

const useStyles = makeStyles({
  // The title link stretches over its card so the whole card is clickable with a single tab stop.
  link: {
    color: 'inherit',
    textDecorationLine: 'none',
    ':hover': { textDecorationLine: 'underline' },
    ':focus-visible': { outlineStyle: 'none' },
    '::after': { content: '""', position: 'absolute', inset: 0, borderRadius: 'inherit', zIndex: 1 },
    ':focus-visible::after': { outline: `2px solid ${tokens.colorStrokeFocus2}`, outlineOffset: '-2px' }
  },
  title: {
    margin: 0,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    overflowWrap: 'anywhere'
  },
  small: { fontSize: tokens.fontSizeBase300, lineHeight: tokens.lineHeightBase300 },
  medium: { fontSize: tokens.fontSizeBase400, lineHeight: tokens.lineHeightBase400 },
  large: { fontSize: tokens.fontSizeBase600, lineHeight: tokens.lineHeightBase600 },
  description: {
    margin: 0,
    color: tokens.colorNeutralForeground2,
    fontSize: tokens.fontSizeBase300,
    lineHeight: tokens.lineHeightBase300
  },
  category: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  },
  meta: {
    display: 'flex',
    flexDirection: 'column',
    gap: tokens.spacingVerticalXXS,
    margin: 0,
    padding: 0,
    listStyleType: 'none',
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    lineHeight: tokens.lineHeightBase200
  },
  metaRow: { display: 'flex', alignItems: 'flex-start', gap: tokens.spacingHorizontalXS, minWidth: 0 },
  metaIcon: { flexShrink: 0, marginTop: '1px' },
  metaText: { minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' },
  recurring: { position: 'relative', zIndex: 2, flexShrink: 0, color: tokens.colorBrandForeground1 },
  image: { display: 'block', width: '100%', height: '100%', objectFit: 'cover' },
  imageFrame: {
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: tokens.colorBrandBackground2
  },
  fallback: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: tokens.colorBrandForeground2,
    backgroundImage: `linear-gradient(135deg, ${tokens.colorBrandBackground2}, ${tokens.colorBrandBackground2Hover})`
  },
  badge: {
    display: 'inline-flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    alignSelf: 'flex-start',
    minWidth: '52px',
    padding: `${tokens.spacingVerticalXS} ${tokens.spacingHorizontalS}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    boxShadow: tokens.shadow4,
    lineHeight: 1.1
  },
  badgeMonth: {
    color: tokens.colorBrandForeground1,
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    textTransform: 'uppercase'
  },
  badgeDay: { fontSize: tokens.fontSizeBase500, fontWeight: tokens.fontWeightBold }
});

export interface IEventTitleProps {
  event: IEventItem;
  size?: 'small' | 'medium' | 'large';
  /** Heading level; 4 when the title sits under a day heading. */
  level?: 3 | 4;
  className?: string;
}

export const EventTitle: React.FC<IEventTitleProps> = ({ event, size = 'medium', level = 3, className }) => {
  const styles = useStyles();
  const { display } = useEventsContext();
  const Heading = level === 4 ? 'h4' : 'h3';
  return (
    <Heading className={mergeClasses(styles.title, styles[size], className)} style={clamp(display.titleLines)} title={event.title}>
      {event.url
        ? <a className={styles.link} href={event.url} {...(event.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{event.title}</a>
        : event.title}
    </Heading>
  );
};

export const EventDescription: React.FC<{ event: IEventItem; className?: string }> = ({ event, className }) => {
  const styles = useStyles();
  const { display } = useEventsContext();
  if (!display.showDescription || !event.description || display.descriptionLines < 1) {
    return null;
  }
  return <p className={mergeClasses(styles.description, className)} style={clamp(display.descriptionLines)}>{event.description}</p>;
};

export const EventCategory: React.FC<{ event: IEventItem; className?: string }> = ({ event, className }) => {
  const styles = useStyles();
  const { display } = useEventsContext();
  return display.showCategory && event.category
    ? <div className={mergeClasses(styles.category, className)}>{event.category}</div>
    : null;
};

export const RecurringIcon: React.FC = () => {
  const styles = useStyles();
  return (
    <Tooltip content={strings.Recurring} relationship="label">
      <span className={styles.recurring} role="img"><ArrowRepeatAll16Regular /></span>
    </Tooltip>
  );
};

/** Date, location and organizer lines with icons. */
export const EventMeta: React.FC<{ event: IEventItem; className?: string }> = ({ event, className }) => {
  const styles = useStyles();
  const { display, formatter } = useEventsContext();
  const rows: { key: string; icon: JSX.Element; text: string; extra?: JSX.Element }[] = [{
    key: 'when',
    icon: <CalendarLtr16Regular className={styles.metaIcon} />,
    text: formatter.when(event),
    extra: event.isRecurring ? <RecurringIcon /> : undefined
  }];

  if (display.showLocation && event.location) {
    rows.push({ key: 'where', icon: <Location16Regular className={styles.metaIcon} />, text: event.location });
  }
  if (display.showOrganizer && event.organizer) {
    rows.push({ key: 'who', icon: <Person16Regular className={styles.metaIcon} />, text: event.organizer });
  }
  return (
    <ul className={mergeClasses(styles.meta, className)}>
      {rows.map(row => (
        <li key={row.key} className={styles.metaRow}>
          {row.icon}
          <span className={styles.metaText} title={row.text}>{row.text}</span>
          {row.extra}
        </li>
      ))}
    </ul>
  );
};

export interface IEventImageProps {
  event: IEventItem;
  className?: string;
  children?: React.ReactNode;
}

/** Event banner with a themed fallback when the event has no image (or it fails to load). */
export const EventImage: React.FC<IEventImageProps> = ({ event, className, children }) => {
  const styles = useStyles();
  const [failed, setFailed] = React.useState<boolean>(false);
  const showImage = !!event.imageUrl && !failed;
  return (
    <div className={mergeClasses(styles.imageFrame, className)}>
      {showImage
        ? <img className={styles.image} src={event.imageUrl} alt="" loading="lazy" onError={() => setFailed(true)} />
        : <div className={styles.fallback} aria-hidden="true"><CalendarLtr28Regular /></div>}
      {children}
    </div>
  );
};

/** Month + day tile, e.g. "MAY / 25". */
export const DateBadge: React.FC<{ date: Date; className?: string }> = ({ date, className }) => {
  const styles = useStyles();
  const { formatter } = useEventsContext();
  return (
    <div className={mergeClasses(styles.badge, className)} aria-hidden="true">
      <span className={styles.badgeMonth}>{formatter.month(date)}</span>
      <span className={styles.badgeDay}>{formatter.dayNumber(date)}</span>
    </div>
  );
};
