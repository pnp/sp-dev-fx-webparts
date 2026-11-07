import * as React from 'react';
import { Button, makeStyles, mergeClasses, tokens } from '@fluentui/react-components';
import { ChevronLeft24Regular, ChevronRight24Regular } from '@fluentui/react-icons';
import * as strings from 'EventsLayoutsWebPartStrings';
import { SizeClass } from '../../common/useContainerSize';
import { ILayoutProps } from './ILayoutProps';
import { useEventsContext } from '../EventsContext';
import { EventCard } from '../shared/EventCard';

/** Share of the strip each card takes, per web part width. */
const CARD_WIDTH: Record<SizeClass, string> = { xs: '85%', sm: '48%', md: '32%', lg: '24%' };

const useStyles = makeStyles({
  root: { position: 'relative' },
  strip: {
    display: 'flex',
    gap: tokens.spacingHorizontalL,
    margin: 0,
    padding: `${tokens.spacingVerticalXS} 2px ${tokens.spacingVerticalM}`,
    listStyleType: 'none',
    overflowX: 'auto',
    scrollSnapType: 'x mandatory',
    scrollPaddingInline: '2px',
    scrollbarWidth: 'thin',
    '@media (prefers-reduced-motion: no-preference)': { scrollBehavior: 'smooth' }
  },
  item: { flexShrink: 0, scrollSnapAlign: 'start' },
  nav: {
    position: 'absolute',
    top: '40%',
    zIndex: 2,
    boxShadow: tokens.shadow8,
    backgroundColor: tokens.colorNeutralBackground1
  },
  prev: { left: `calc(-1 * ${tokens.spacingHorizontalS})` },
  next: { right: `calc(-1 * ${tokens.spacingHorizontalS})` }
});

/** Horizontally scrolling cards with snap points, touch scrolling and previous/next buttons. */
export const FilmstripLayout: React.FC<ILayoutProps> = ({ events, size }) => {
  const styles = useStyles();
  const { dir } = useEventsContext();
  const stripRef = React.useRef<HTMLUListElement>(null);
  const [edges, setEdges] = React.useState({ atStart: true, atEnd: false });

  const updateEdges = React.useCallback(() => {
    const strip = stripRef.current;
    if (strip) {
      // scrollLeft is negative in right-to-left documents, so compare absolute values.
      const offset = Math.abs(strip.scrollLeft);
      setEdges({ atStart: offset < 4, atEnd: offset + strip.clientWidth >= strip.scrollWidth - 4 });
    }
  }, []);

  React.useEffect(updateEdges, [events, size, updateEdges]);

  const scroll = (forward: boolean): void => {
    const strip = stripRef.current;
    if (strip) {
      const distance = strip.clientWidth * 0.9 * (forward ? 1 : -1) * (dir === 'rtl' ? -1 : 1);
      strip.scrollBy({ left: distance });
    }
  };

  // Chevrons point towards the visual start/end, which swaps in right-to-left.
  const StartIcon = dir === 'rtl' ? ChevronRight24Regular : ChevronLeft24Regular;
  const EndIcon = dir === 'rtl' ? ChevronLeft24Regular : ChevronRight24Regular;

  return (
    <div className={styles.root}>
      <ul ref={stripRef} className={styles.strip} onScroll={updateEdges}>
        {events.map(event => (
          <li key={event.key} className={styles.item} style={{ width: CARD_WIDTH[size] }}>
            <EventCard event={event} />
          </li>
        ))}
      </ul>
      {!edges.atStart && (
        <Button className={mergeClasses(styles.nav, styles.prev)} shape="circular" icon={<StartIcon />}
          aria-label={strings.Previous} onClick={() => scroll(false)} />
      )}
      {!edges.atEnd && (
        <Button className={mergeClasses(styles.nav, styles.next)} shape="circular" icon={<EndIcon />}
          aria-label={strings.Next} onClick={() => scroll(true)} />
      )}
    </div>
  );
};
