import * as React from 'react';
import styles from './ReactStyledList.module.scss';

import type { IBookItem } from '../services/SharePointService';

interface IListCardProps {
    item: IBookItem;
}

export default class ListCard extends React.Component<IListCardProps> {
    public render(): React.ReactElement<IListCardProps> {
        const { item } = this.props;

        return (
            <div className={styles.gridItem}>
                <div className={styles.number}>{item}</div>
                <div className={styles.contentContainer}>
                    <div className={styles.author}>{item.BookAuthor}</div>
                    <div className={styles.bookAbstract}>{item.BookAbstract}</div>
                </div>
                <div className={styles.category}>{item.Category}</div>
                <div className={styles.price}>{item.Price}</div>
            </div>
        );
    }
}
