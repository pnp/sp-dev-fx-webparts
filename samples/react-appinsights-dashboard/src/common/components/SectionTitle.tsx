import * as React from 'react';
import styles from '../CommonControl.module.scss';

export interface ISectionTitleProps {
    Title: string;
}

const SectionTitle: React.FunctionComponent<ISectionTitleProps> = (props) => {
    return (
        <div className={styles.secTitleContainer}>
            <div className={styles.title}>{props.Title}</div>
        </div>
    );
};

export default SectionTitle;