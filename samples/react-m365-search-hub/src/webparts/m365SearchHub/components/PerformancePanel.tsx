import * as React from 'react';
import { Body1Strong, Caption1, Divider } from '@fluentui/react-components';
import * as strings from 'M365SearchHubWebPartStrings';
import { ISearchTiming } from '../models/ISearchModels';
import { format } from '../utils/format';
import { useHubStyles } from './useHubStyles';

export interface IPerformancePanelProps {
  timing: ISearchTiming;
}

/**
 * What the last search cost.
 *
 * Reads figures the service already keeps for its own purposes and adds
 * nothing to them. If a number here ever needed the service to start recording
 * something it does not otherwise use, that number does not belong here.
 *
 * Nothing is sent anywhere. It is a description list so each figure is tied to
 * its label for a screen reader, rather than a grid of loose numbers.
 */
export const PerformancePanel: React.FunctionComponent<IPerformancePanelProps> = ({ timing }) => {
  const styles = useHubStyles();
  const rows: { label: string; value: string }[] = [
    { label: strings.PerformanceDuration, value: format(strings.PerformanceMilliseconds, Math.round(timing.durationMs)) },
    { label: strings.PerformanceResultCount, value: String(timing.resultCount) },
    {
      label: strings.PerformanceCache,
      value: timing.fromCache ? strings.PerformanceCacheHit : strings.PerformanceCacheMiss
    },
    { label: strings.PerformanceCancelled, value: timing.cancelled ? '1+' : '0' },
    { label: strings.PerformancePagesLoaded, value: String(timing.pagesLoaded) }
  ];

  return (
    <section className={styles.performance} aria-labelledby="m365sh-performance">
      <Divider />
      <Body1Strong as="h3" id="m365sh-performance">
        {strings.PerformanceHeading}
      </Body1Strong>

      <dl className={styles.performanceList}>
        {rows.map((row) => (
          <div key={row.label} className={styles.performanceRow}>
            <dt>
              <Caption1 className={styles.meta}>{row.label}</Caption1>
            </dt>
            <dd>
              <Body1Strong>{row.value}</Body1Strong>
            </dd>
          </div>
        ))}
      </dl>

      <Caption1 className={styles.meta}>{strings.PerformanceLocalOnly}</Caption1>
    </section>
  );
};
