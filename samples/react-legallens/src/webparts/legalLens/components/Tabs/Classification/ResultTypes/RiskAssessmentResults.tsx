import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import { ConfidenceScore } from '../ConfidenceScore';
import { severityColor, severityBgColor } from '../../../../utilities/colorUtils';
import styles from '../Classification.module.scss';

export const RiskAssessmentResults: React.FC<{ result: any }> = ({ result }) => {
    const riskColor = severityColor(result.riskLevel);

    return (
      <Stack tokens={{ childrenGap: 12 }} className={styles.resultFadeIn}>
        <Stack className={styles.riskPanel} tokens={{ childrenGap: 12 }}>
          {/* Header */}
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 5 }}>
            <div className={styles.statusDot} style={{ background: riskColor }} />
            <Text className={styles.resultLabel} style={{ color: riskColor }}>
              Risk Assessment Complete
            </Text>
          </Stack>

          {/* Overall score row */}
          <Stack horizontal horizontalAlign="space-between" verticalAlign="center" className={styles.riskScoreRow}>
            <Stack>
              <Text className={styles.resultItemTitle}>Overall Risk Score</Text>
              <Text className={styles.resultItemMeta}>{result.riskLevel || 'Medium'} Risk Level</Text>
            </Stack>
            <Text className={styles.riskScoreValue} style={{ color: riskColor }}>
              {result.overallRiskScore || 45}
            </Text>
          </Stack>

          {/* Risk Factors */}
          <Stack tokens={{ childrenGap: 6 }}>
            <Text className={styles.sectionTitle}>IDENTIFIED RISK FACTORS</Text>
            {(result.riskFactors || []).map((factor: any, i: number) => (
              <Stack key={i} className={styles.riskFactorCard} tokens={{ childrenGap: 4 }}>
                <Stack horizontal horizontalAlign="space-between">
                  <Text className={styles.riskFactorName}>{factor.factor}</Text>
                  <Text className={styles.regStatusBadge}
                    style={{ background: severityBgColor(factor.severity), color: severityColor(factor.severity) }}
                  >
                    {factor.severity}
                  </Text>
                </Stack>
                <Text className={styles.riskFactorDesc}>{factor.description}</Text>
                <Text className={styles.recommendationText}>→ {factor.recommendation}</Text>
              </Stack>
            ))}
          </Stack>

          {/* Compliance Issues */}
          {result.complianceIssues && result.complianceIssues.length > 0 && (
            <Stack className={styles.complianceIssuesBox} tokens={{ childrenGap: 3 }}>
              <Text className={styles.complianceIssuesTitle}>⚠ COMPLIANCE ISSUES</Text>
              {result.complianceIssues.map((issue: string, i: number) => (
                <Text key={i} className={styles.complianceIssueItem}>• {issue}</Text>
              ))}
            </Stack>
          )}

          {/* Mitigation Steps */}
          {result.mitigationSteps && result.mitigationSteps.length > 0 && (
            <Stack tokens={{ childrenGap: 3 }}>
              <Text className={styles.mitigationTitle}>✓ RECOMMENDED MITIGATION</Text>
              {result.mitigationSteps.map((step: string, i: number) => (
                <Text key={i} className={styles.mitigationStep}>{i + 1}. {step}</Text>
              ))}
            </Stack>
          )}
        </Stack>

        <ConfidenceScore value={result.confidence || 0.92} label="Assessment Confidence" sublabel="AI-powered risk analysis" color="#818cf8" />
      </Stack>
    );
};
