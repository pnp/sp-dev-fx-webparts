import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import { ConfidenceScore } from '../ConfidenceScore';
import { statusColor, statusBgColor, findingColor } from '../../../../utilities/colorUtils';
import styles from '../Classification.module.scss';

export const ComplianceResults: React.FC<{ result: any }> = ({ result }) => {
    const complianceColor = statusColor(result.overallCompliance);

    return (
      <Stack tokens={{ childrenGap: 12 }} className={styles.resultFadeIn}>
        <Stack className={styles.compliancePanel} tokens={{ childrenGap: 12 }}>
          {/* Header dot + label */}
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
            <div className={styles.statusDot} style={{ background: complianceColor }} />
            <Text className={styles.resultLabel} style={{ color: complianceColor }}>
              Compliance Check Complete
            </Text>
          </Stack>

          {/* Overall score row */}
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center" className={styles.complianceScoreRow}>
            <Stack>
              <Text className={styles.resultItemTitle}>Overall Compliance</Text>
              <Text className={styles.resultItemMeta}>{result.overallCompliance || 'Partial'}</Text>
            </Stack>
            <Text className={styles.complianceScoreValue} style={{ color: complianceColor }}>
              {result.complianceScore || 72}%
            </Text>
          </Stack>

          {/* Regulations */}
          <Stack tokens={{ childrenGap: 8 }}>
            {(result.regulations || []).map((reg: any, i: number) => {
              const regColor = statusColor(reg.status);

              return (
                <Stack key={i} className={styles.regCard} tokens={{ childrenGap: 8 }}>
                  <Stack horizontal horizontalAlign="space-between" verticalAlign="center">
                    <Text className={styles.resultItemTitle}>{reg.name}</Text>
                    <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 8 }}>
                      <Text className={styles.regScore} style={{ color: regColor }}>
                        {reg.score}%
                      </Text>
                      <Text className={styles.regStatusBadge} style={{ background: statusBgColor(reg.status), color: regColor }}>
                        {reg.status}
                      </Text>
                    </Stack>
                  </Stack>

                  <Stack tokens={{ childrenGap: 2 }}>
                    {(reg.findings || []).map((finding: string, j: number) => (
                      <Text key={j} className={styles.findingText} style={{ color: findingColor(finding) }}>
                        {finding}
                      </Text>
                    ))}
                  </Stack>

                  {reg.recommendations && reg.recommendations.length > 0 && (
                    <Stack tokens={{ childrenGap: 2 }} className={styles.recommendationSection}>
                      {reg.recommendations.map((rec: string, j: number) => (
                        <Text key={j} className={styles.recommendationText}>→ {rec}</Text>
                      ))}
                    </Stack>
                  )}
                </Stack>
              );
            })}
          </Stack>

          {/* Summary counters */}
          <Stack horizontal tokens={{ childrenGap: 12 }} className={styles.issueSummary}>
            <Stack.Item grow={1} className={styles.issueSummaryItem}>
              <Text className={styles.issueSummaryCriticalValue}>{result.criticalIssues || 0}</Text>
              <Text className={styles.issueSummaryLabel}> Critical</Text>
            </Stack.Item>
            <Stack.Item grow={1} className={styles.issueSummaryItem}>
              <Text className={styles.issueSummaryWarningValue}>{result.warnings || 0}</Text>
              <Text className={styles.issueSummaryLabel}> Warnings</Text>
            </Stack.Item>
          </Stack>
        </Stack>

        <ConfidenceScore value={result.confidence || 0.89} label="Analysis Confidence" sublabel="Compliance verification" color="#818cf8" />
      </Stack>
    );
};
