import * as React from 'react';
import { CheckmarkCircleFilled } from '@fluentui/react-icons';
import { IContract } from '../../../models/IContract';
import { AlertTile } from './AlertTile';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import styles from './Alerts.module.scss';
import { generateAlerts } from './../../../utilities/alertsUtils';

export interface IAlertsViewProps {
  contracts: IContract[];
}

export const AlertsView: React.FC<IAlertsViewProps> = ({ contracts }) => {
    const alerts = generateAlerts(contracts);

    return (
      <Stack className={styles.alertsContainer}>
        <Stack className={styles.header}>
          <Text variant="xLarge" block className={styles.title}>Alerts & Conflicts</Text>
          <Text variant="small" className={styles.subtitle}>
            Auto-detected from your contracts: expiry monitoring, risk analysis, duplicate detection
          </Text>
        </Stack>
        {alerts.length === 0 ? (
          <Stack horizontalAlign="center" className={styles.emptyState}>
            <CheckmarkCircleFilled className={styles.emptyIcon} />
            <Text className={styles.emptyTitle}>All Clear</Text>
            <Text className={styles.emptySubtitle}>
              No alerts detected. All contracts are in good standing.
            </Text>
          </Stack>
        ) : (
          <Stack tokens={{ childrenGap: 9 }}>
            {alerts.map((a) => (
              <AlertTile key={a.id} alert={a} />
            ))}
          </Stack>
        )}
      </Stack>
    );
};
