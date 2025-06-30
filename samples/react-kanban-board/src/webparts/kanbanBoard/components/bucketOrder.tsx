import * as React from 'react';
import { IKanbanBucket } from '../../../kanban';
import styles from './KanbanBoardV2.module.scss';

export const bucketOrder = (item:IKanbanBucket): JSX.Element => {
    return (
        <span>
            {<span className={styles.ordercolor} style={{ backgroundColor: item.color?item.color:'none' }} />}
            {item.bucketheadline?item.bucketheadline:item.bucket}
        </span>
    );
};