import * as React from 'react';
import { INewsGlanceCardProps } from '../../../interfaces';
import styles from './NewsGlanceCard.module.scss';

const NewsGlanceCard: React.FunctionComponent<INewsGlanceCardProps> = (props) => {

    return (
        <div className={styles.newsGlancecard}>
            <div className={styles.wrapper}>
                {
                    props.imageUrl ?
                    <img src={props.imageUrl} className={styles.image} /> :
                    <div className={styles.textWrapper}>
                        <h3 className={styles.title}>{props.title}</h3>
                    </div>
                }
            </div>
        </div>
    );
};

export default NewsGlanceCard;