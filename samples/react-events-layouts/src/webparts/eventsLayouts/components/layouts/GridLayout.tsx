import * as React from 'react';
import { makeStyles, tokens } from '@fluentui/react-components';
import { ILayoutProps } from './ILayoutProps';
import { EventCard } from '../shared/EventCard';

const useStyles = makeStyles({
  // auto-fill lets the grid pick 1..n columns from the section width without breakpoints.
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 240px), 1fr))',
    gap: tokens.spacingHorizontalL,
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  }
});

export const GridLayout: React.FC<ILayoutProps> = ({ events }) => {
  const styles = useStyles();
  return (
    <ul className={styles.grid}>
      {events.map(event => <li key={event.key}><EventCard event={event} /></li>)}
    </ul>
  );
};
