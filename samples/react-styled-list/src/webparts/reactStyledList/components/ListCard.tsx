import * as React from 'react';
import styles from './ReactStyledList.module.scss';
import type { GridItem } from '../data/sampleItems';

export interface IListCardProps {
    item: GridItem;
}

export default class ListCard extends React.Component<IListCardProps> {
    public render(): React.ReactElement<IListCardProps> {
        const { item } = this.props;

        return (
            <div className={styles.gridItem}>
                <div className={styles.number}>{item.number}</div>
                <div className={styles.contentContainer}>
                    <div className={styles.author}>{item.author}</div>
                    <div className={styles.bookAbstract}>{item.bookAbstract}</div>
                </div>
                <div className={styles.category}>{item.category}</div>
                <div className={styles.price}>{item.price}</div>
            </div>
        );
    }
}
