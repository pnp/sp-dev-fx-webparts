import * as React from 'react';
import styles from './ReactStyledList.module.scss';
import type { IReactStyledListProps } from './IReactStyledListProps';
import ListCard from './ListCard';
import { sampleItems } from '../data/sampleItems';

export default class ReactStyledList extends React.Component<IReactStyledListProps> {
  public render(): React.ReactElement<IReactStyledListProps> {
    const { theme, alignment, hasTeamsContext } = this.props;

    const containerClass = `${styles.reactStyledList} ${hasTeamsContext ? styles.teams : ''} ${theme === 'light' ? styles.light : styles.dark} ${alignment === 'vertical' ? styles.vertical : styles.horizontal}`;

    return (
      <section className={containerClass}>
        <div className={styles.gridContainer}>
          {sampleItems.map((item) => (
            <ListCard key={item.number} item={item} />
          ))}
        </div>
      </section>
    );
  }
}
