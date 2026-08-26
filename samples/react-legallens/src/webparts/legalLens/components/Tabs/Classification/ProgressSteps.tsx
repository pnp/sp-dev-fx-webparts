import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import { IContract } from '../../../models/IContract';
import { CLASSIFY_STEPS } from '../../../constants';
import { IClassifyState } from './ClassifyProcessing';
import styles from './Classification.module.scss';

export interface IProgressStepsProps {
  classifyState: IClassifyState | null;
  uploadedFileName: string;
  contract: IContract;
}

export const ProgressSteps: React.FC<IProgressStepsProps> = ({ classifyState, uploadedFileName, contract }) => {
    const progressWidth = classifyState ? `${((classifyState.step + 1) / CLASSIFY_STEPS.length) * 100}%` : '0%';

    return (
      <Stack tokens={{ childrenGap: 14 }}>
        {/* File info card */}
        <Stack className={styles.fileCard} tokens={{ childrenGap: 12 }}>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
            <Stack horizontalAlign="center" verticalAlign="center" className={styles.fileIcon}>
              <Text>📄</Text>
            </Stack>
            <Stack>
              <Text className={styles.fileName}>
                {uploadedFileName || contract?.name || 'NovaCorp — Vendor Agreement'}
              </Text>
              <Text className={styles.fileSource}>From SharePoint library</Text>
            </Stack>
          </Stack>

          {/* Progress bar */}
          <div className={styles.progressTrack}>
            <div
              className={`${styles.progressFill} ${classifyState?.done ? styles.progressDone : ''}`}
              style={{ width: progressWidth }}
            />
          </div>
        </Stack>

        {/* Steps list */}
        <Stack tokens={{ childrenGap: 5 }}>
          {CLASSIFY_STEPS.map((step, i) => {
            const done = classifyState && classifyState.step > i;
            const active = classifyState && classifyState.step === i;
            const stepClass = done ? styles.stepDone : active ? styles.stepActive : styles.stepPending;

            return (
              <Stack horizontal key={i} tokens={{ childrenGap: 9 }} className={`${styles.stepRow} ${stepClass}`}>
                <Stack horizontalAlign="center" verticalAlign="center"
                  className={`${styles.stepIndicator} ${done ? styles.indicatorDone : active ? styles.indicatorActive : ''}`}
                >
                  {done && <Text className={styles.checkmark}>✓</Text>}
                  {active && <div className={styles.spinner} />}
                </Stack>

                <Stack>
                  <Text className={`${styles.stepPhase} ${done ? styles.phaseDone : active ? styles.phaseActive : ''}`}>
                    {step.phase}
                  </Text>
                  <Text className={`${styles.stepDetail} ${active ? styles.detailActive : ''}`}>
                    {step.detail}
                  </Text>
                </Stack>
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    );
};
