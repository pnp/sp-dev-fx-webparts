import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import styles from './Upload.module.scss';

interface IUploadAnalyzingProps {
  uploadedFileName: string;
  analyzingProgress: number;
}

export const UploadAnalyzing: React.FC<IUploadAnalyzingProps> = ({
  uploadedFileName,
  analyzingProgress,
}) => (
  <Stack className={styles.analyzingCard} tokens={{ childrenGap: 0 }}>
    <Text block className={styles.analyzingTitle}>Analyzing: {uploadedFileName}</Text>

    <Stack className={styles.progressWrap}>
      <Stack horizontal horizontalAlign="space-between" className={styles.progressHeader}>
        <Text className={styles.progressLabel}>Processing...</Text>
        <Text className={styles.progressPercent}>{analyzingProgress}%</Text>
      </Stack>
      <div className={styles.progressTrack}>
        <div className={styles.progressFill} style={{ width: `${analyzingProgress}%` }} />
      </div>
    </Stack>

    <Stack className={styles.stepList} tokens={{ childrenGap: 8 }}>
      {[
        { step: 'Extracting text', done: analyzingProgress > 20 },
        { step: 'Identifying entities', done: analyzingProgress > 40 },
        { step: 'Analyzing clauses', done: analyzingProgress > 60 },
        { step: 'Calculating risk score', done: analyzingProgress > 80 },
      ].map((item, i) => (
        <Stack key={i} horizontal verticalAlign="center" className={styles.stepRow} tokens={{ childrenGap: 8 }}>
          <div className={`${styles.stepDot}${item.done ? ` ${styles.stepDotDone}` : ''}`}>
            {item.done && <Text className={styles.stepCheck}>✓</Text>}
          </div>
          <Text className={`${styles.stepText}${item.done ? ` ${styles.stepTextDone}` : ''}`}>
            {item.step}
          </Text>
        </Stack>
      ))}
    </Stack>
  </Stack>
);
