import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import styles from './NewsGlanceTitle.module.scss';

const NewsGlanceTitle: React.FunctionComponent<{ title: string }> = (props) => {

    return (
        <div className={styles.glanceTitleContainer}>
            <Icon className={styles.glanceIcon} iconName="View" />
            <h3 className={styles.glanceTitle}> {props.title}</h3>
        </div>
    );
};

export default NewsGlanceTitle;