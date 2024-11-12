import React from 'react';
import { Text } from '@fluentui/react';
import styles from './BlueSky.module.scss';

interface BlueSkyTimestampSectionProps {
    timestamp: string;
}

const BlueSkyTimestampSection: React.FC<BlueSkyTimestampSectionProps> = ({ timestamp }) => {
    return (
        <div>
            <Text className={styles.cardTimestamp}>{new Date(timestamp).toLocaleString()}</Text>
        </div>
    );
};

export default BlueSkyTimestampSection;