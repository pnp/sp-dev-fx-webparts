import * as React from 'react';
import { IAlert } from "../../../models/IAlert";
import { ClockRegular, DocumentBulletListRegular, WarningFilled } from '@fluentui/react-icons';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import styles from './Alerts.module.scss';

export interface IAlertTileProps {
  alert: IAlert;
}

const getIcon = (type: string): JSX.Element => {
    switch (type) {
        case 'duplicate': return <DocumentBulletListRegular className={styles.iconDuplicate} />;
        case 'conflict': return <WarningFilled className={styles.iconConflict} />;
        default: return <ClockRegular className={styles.iconExpiry} />;
    }
};

export const AlertTile: React.FC<IAlertTileProps> = ({ alert }) => {
    const severityClass = alert.severity === 'critical' ? styles.critical : styles.warning;

    return (
        <Stack className={`${styles.alertTile} ${severityClass}`}>
            <Stack horizontal horizontalAlign="space-between" className={styles.alertHeader}>
                <Stack horizontal verticalAlign="center" className={styles.alertInfo}>
                    <Stack horizontalAlign="center" verticalAlign="center" className={`${styles.alertIcon} ${severityClass}`}>
                        {getIcon(alert.type)}
                    </Stack>
                    <Stack>
                        <Text className={styles.alertTitle}>{alert.title}</Text>
                        <Text className={`${styles.alertSeverity} ${severityClass}`}>
                            {alert.severity}
                        </Text>
                    </Stack>
                </Stack>
                <Text className={styles.alertTime}>{alert.time}</Text>
            </Stack>
            <Text className={styles.alertDesc}>{alert.desc}</Text>
        </Stack>
    );
};
