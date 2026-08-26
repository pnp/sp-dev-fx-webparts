import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import styles from './ESignature.module.scss';

export interface IStepHeaderProps {
  title: string;
  subtitle: string;
  onBack?: () => void;
}

export const StepHeader: React.FC<IStepHeaderProps> = ({ title, subtitle, onBack }) => {
  return (
    <div className={styles.stepHeader}>
      <Stack horizontal horizontalAlign='space-between' verticalAlign="center" tokens={{ childrenGap: 12 }}>
        <Text block className={styles.stepHeaderTitle}>{title}</Text>
        {onBack && (
          <button className={styles.stepHeaderBackBtn} onClick={onBack}>
            ← Back
          </button>
        )}
      </Stack>
      <Text variant="small" className={styles.stepHeaderSubtitle}>
        {subtitle}
      </Text>
    </div>
  );
};
