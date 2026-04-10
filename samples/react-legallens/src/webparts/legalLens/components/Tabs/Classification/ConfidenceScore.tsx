import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import styles from './Classification.module.scss';

export interface IConfidenceScoreProps {
  value: number;
  label: string;
  sublabel: string;
  color: string;
}

export const ConfidenceScore: React.FC<IConfidenceScoreProps> = ({ value, label, sublabel, color }) => {
    return (
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 12 }} className={styles.confidenceScore}>
        <Text className={styles.confidenceValue} style={{ color }}>
          {Math.round(value * 100)}%
        </Text>
        <Stack>
          <Text className={styles.confidenceLabel}>
            {label}
          </Text>
          <Text className={styles.confidenceSublabel}>
            {sublabel}
          </Text>
        </Stack>
      </Stack>
    );
};
