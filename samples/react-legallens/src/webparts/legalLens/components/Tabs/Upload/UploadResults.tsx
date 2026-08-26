import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import {
  ErrorCircleFilled,
  WarningFilled,
  CheckmarkCircleFilled,
  ChartMultipleFilled,
  DocumentBulletListRegular,
  InfoRegular,
  CircleFilled,
} from '@fluentui/react-icons';
import { IContractAnalysis } from '../../../models/IContractAnalysis';
import { clauseRiskBgColor, clauseRiskTextColor, riskScoreBgColor, riskScoreTextColor } from '../../../utilities/colorUtils';
import styles from './Upload.module.scss';

interface IUploadResultsProps {
  analysisResult: IContractAnalysis;
  onReset: () => void;
}

function getSeverityIcon(severity: string): React.ReactElement {
  const iconProps = { style: { fontSize: '20px' } };
  switch (severity.toLowerCase()) {
    case 'critical': return <ErrorCircleFilled {...iconProps} style={{ ...iconProps.style, color: '#ef4444' }} />;
    case 'high': return <WarningFilled {...iconProps} style={{ ...iconProps.style, color: '#f59e0b' }} />;
    case 'medium': return <InfoRegular {...iconProps} style={{ ...iconProps.style, color: '#fbbf24' }} />;
    case 'low': return <CheckmarkCircleFilled {...iconProps} style={{ ...iconProps.style, color: '#10b981' }} />;
    default: return <CircleFilled {...iconProps} style={{ ...iconProps.style, color: '#6b7280' }} />;
  }
}

function RiskScoreCard({ score }: { score: number }): React.ReactElement {
  return (
    <div
      className={styles.riskScoreCard}
      style={{ background: `linear-gradient(135deg, ${riskScoreBgColor(score)}, rgba(0,0,0,0.1))` }}
    >
      <Text block className={styles.riskScoreLabel}>Overall Risk Score</Text>
      <Stack horizontal verticalAlign="end" horizontalAlign="center">
        <Text block className={styles.riskScoreNumber} style={{ color: riskScoreTextColor(score) }}>
          {score}
        </Text>
        <Text block className={styles.riskScoreTotal}>/ 100</Text>
      </Stack>
      <Stack horizontal verticalAlign="center" horizontalAlign="center" className={styles.riskScoreStatus} tokens={{ childrenGap: 6 }}>
        {score >= 70 ? (
          <><ErrorCircleFilled style={{ fontSize: '14px', color: '#ef4444' }} /><Text className={styles.riskScoreStatusText}>High Risk</Text></>
        ) : score >= 40 ? (
          <><WarningFilled style={{ fontSize: '14px', color: '#f59e0b' }} /><Text className={styles.riskScoreStatusText}>Medium Risk</Text></>
        ) : (
          <><CheckmarkCircleFilled style={{ fontSize: '14px', color: '#10b981' }} /><Text className={styles.riskScoreStatusText}>Low Risk</Text></>
        )}
      </Stack>
    </div>
  );
}

function RiskFactors({ factors }: { factors: IContractAnalysis['riskFactors'] }): React.ReactElement | null {
  if (!factors || factors.length === 0) return null;

  return (
    <Stack style={{ marginBottom: '20px' }}>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
        <ChartMultipleFilled style={{ fontSize: '14px' }} />
        <Text block className={styles.sectionTitle}>Risk Factors ({factors.length})</Text>
      </Stack>
      {factors.map((factor, i) => (
        <div key={i} className={styles.riskFactorCard}>
          <Stack horizontal className={styles.riskFactorContent} tokens={{ childrenGap: 12 }}>
            <div className={styles.riskFactorIconWrap}>{getSeverityIcon(factor.severity)}</div>
            <Stack className={styles.riskFactorBody} tokens={{ childrenGap: 4 }}>
              <Text block className={styles.riskFactorSeverity}>{factor.severity} - {factor.factor}</Text>
              <Text block className={styles.riskFactorDesc}>{factor.description}</Text>
              <div className={styles.riskFactorRec}>
                <span>→</span>
                <span>{factor.recommendation}</span>
              </div>
            </Stack>
          </Stack>
        </div>
      ))}
    </Stack>
  );
}

function Clauses({ clauses }: { clauses: IContractAnalysis['clauses'] }): React.ReactElement {
  return (
    <Stack>
      <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
        <DocumentBulletListRegular style={{ fontSize: '14px' }} />
        <Text block className={styles.sectionTitle}>Clauses ({clauses.length})</Text>
      </Stack>
      {clauses.map((clause, i) => (
        <Stack key={i} horizontal verticalAlign="center" className={styles.clauseRow} tokens={{ childrenGap: 0 }}>
          <Stack className={styles.clauseInfo}>
            <Text block className={styles.clauseTitle}>{clause.ref} — {clause.title}</Text>
            {clause.riskReason && (
              <Text block className={styles.clauseRiskReason}>⚠ {clause.riskReason}</Text>
            )}
          </Stack>
          <div
            className={styles.clauseBadge}
            style={{
              background: clauseRiskBgColor(clause.riskLevel),
              color: clauseRiskTextColor(clause.riskLevel),
            }}
          >
            {clause.riskLevel}
          </div>
        </Stack>
      ))}
    </Stack>
  );
}

export const UploadResults: React.FC<IUploadResultsProps> = ({ analysisResult, onReset }) => (
  <Stack tokens={{ childrenGap: 0 }}>
    <Stack className={styles.successBanner}>
      <Text block className={styles.successTitle}>Analysis Complete & Saved to SharePoint</Text>
      <Text block className={styles.successHint}>
        Document uploaded to library with metadata · Refresh library view to see it
      </Text>
    </Stack>

    <RiskScoreCard score={analysisResult.overallRiskScore} />
    <RiskFactors factors={analysisResult.riskFactors} />
    <Clauses clauses={analysisResult.clauses}/>

    {onReset && (
      <Stack className={styles.resetActions}>
        <button className={styles.resetButton} onClick={onReset}>
          Analyze Another Contract
        </button>
      </Stack>
    )}
  </Stack>
);
