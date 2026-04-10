import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import { ChartMultipleFilled, OpenRegular } from '@fluentui/react-icons';
import { IContract } from '../../../models/IContract';
import { IClause } from '../../../models/IClause';
import { IContractAnalysis } from '../../../models/IContractAnalysis';
import styles from './Library.module.scss';
import { MultilingualQA } from '../Translate/MultilingualQA';
import { ILang } from '../../../constants/languages';
import { IAzureAIFoundryService } from '../../../services/AzureAIFoundryService';
import { buildRiskAssessmentPrompt, buildEntityExtractionPrompt } from '../../../constants';
import { parseJSON } from '../../../utilities/classificationUtils';

export interface IDocumentOverviewProps {
  contract: IContract;
  aiFoundryService: IAzureAIFoundryService;
  langs: ILang[];
}

function ContractClauses({ clauses, analyzing }: { clauses: IClause[]; analyzing: boolean }): React.ReactElement | null {
  if (!analyzing && (!clauses || clauses.length === 0)) return null;
  return (
    <Stack className={styles.documentOverview} tokens={{ childrenGap: 0 }} style={{ marginTop: 12 }}>
      <Text className={styles.overviewSectionTitle}>Clauses {!analyzing && `(${clauses.length})`}</Text>
      <Stack className={styles.overviewSection} tokens={{ childrenGap: 6 }}>
        {analyzing ? (
          <Text className={styles.overviewFieldLabel}>Analyzing clauses...</Text>
        ) : (
          clauses.map((clause, i) => (
            <Text key={i} className={styles.clauseValue}>
              <strong>{clause.ref}:</strong> {clause.text}
            </Text>
          ))
        )}
      </Stack>
    </Stack>
  );
}

function ContractMetatada({ contract }: { contract: IContract }): React.ReactElement {
  return (
    <Stack className={styles.documentOverview} tokens={{ childrenGap: 0 }}>
      <Text className={styles.overviewSectionTitle}>Overview</Text>

      {/* subsection: identity fields */}
      <Stack className={styles.overviewSection} horizontal wrap tokens={{ childrenGap: 12 }}>
        <Stack className={styles.overviewField}>
          <Text className={styles.overviewFieldLabel}>Contract Name</Text>
          {contract.fileUrl ? (
            <a href={contract.fileUrl} target="_blank" rel="noopener noreferrer" className={styles.overviewFileLink}>
              <Text className={styles.overviewFieldValue}>{contract.name}</Text>
              <OpenRegular className={styles.overviewFileLinkIcon} />
            </a>
          ) : (
            <Text className={styles.overviewFieldValue}>{contract.name}</Text>
          )}
        </Stack>
        <Stack className={styles.overviewField}>
          <Text className={styles.overviewFieldLabel}>Type</Text>
          <Text className={styles.overviewFieldValue}>{contract.type}</Text>
        </Stack>
        <Stack className={styles.overviewField}>
          <Text className={styles.overviewFieldLabel}>Jurisdiction</Text>
          <Text className={styles.overviewFieldValue}>{contract.jurisdiction}</Text>
        </Stack>
        <Stack className={styles.overviewField}>
          <Text className={styles.overviewFieldLabel}>Expiry</Text>
          <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
            <Text className={styles.overviewFieldValue}>{contract.expiry}</Text>
            {contract.expiry && new Date(contract.expiry) < new Date() && (
              <Text className={styles.expiredBadge}>Expired</Text>
            )}
          </Stack>
        </Stack>
        <Stack className={styles.overviewField}>
          <Text className={styles.overviewFieldLabel}>Uploaded</Text>
          <Text className={styles.overviewFieldValue}>{contract.uploaded}</Text>
        </Stack>
      </Stack>

      {/* subsection: parties */}
      {contract.parties.length > 0 && (
        <Stack className={styles.overviewSection}>
          <Text className={styles.overviewFieldLabel}>Parties</Text>
          <Stack horizontal wrap tokens={{ childrenGap: 6 }} styles={{ root: { marginTop: 4 } }}>
            {contract.parties.map(p => (
              <Text key={p} className={styles.overviewTag}>{p}</Text>
            ))}
          </Stack>
        </Stack>
      )}

      {/* subsection: tags */}
      {contract.tags.length > 0 && (
        <Stack className={styles.overviewSection}>
          <Text className={styles.overviewFieldLabel}>Tags</Text>
          <Stack horizontal wrap tokens={{ childrenGap: 6 }} styles={{ root: { marginTop: 4 } }}>
            {contract.tags.map(t => (
              <Text key={t} className={styles.overviewTag}>{t}</Text>
            ))}
          </Stack>
        </Stack>
      )}

      {/* subsection: summary */}
      {contract.summary && (
        <Stack className={styles.overviewSection}>
          <Text className={styles.overviewFieldLabel}>Summary</Text>
          <Text className={styles.overviewSummary}>{contract.summary}</Text>
        </Stack>
      )}
    </Stack>
  );
}

function RiskAnalysis({ analyzing, analysisResult }: { analyzing: boolean; analysisResult: IContractAnalysis | null }): React.ReactElement {
  return (
    <Stack className={styles.riskAnalysis}>
      {analyzing && (
        <Text className={styles.overviewFieldLabel}>Analyzing risks...</Text>
      )}
      {analysisResult && (
        <RiskFactors factors={analysisResult.riskFactors} />
      )}
    </Stack>
  );
}

function RiskFactors({ factors }: { factors: IContractAnalysis['riskFactors'] }): React.ReactElement | null {
  if (!factors || factors.length === 0) return null;
    return (
      <Stack tokens={{ childrenGap: 10 }} style={{ marginBottom: '20px' }}>
        <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 6 }}>
          <ChartMultipleFilled style={{ fontSize: '14px' }} />
          <Text block className={styles.overviewSectionTitle}>Risk Factors ({factors.length})</Text>
        </Stack>
        {factors.map((factor, i) => (
          <Stack key={i} tokens={{ childrenGap: 4 }}>
            <Text block className={styles.riskFactorDesc}>
              <strong>{factor.factor}:</strong> {factor.description}
            </Text>
            <div className={styles.riskFactorRec}>
              <span>→</span>
              <span>{factor.recommendation}</span>
            </div>
          </Stack>
        ))}
      </Stack>
    );
}

export const DocumentOverview: React.FC<IDocumentOverviewProps> = ({ contract, aiFoundryService, langs }) => {
  const [analysisResult, setAnalysisResult] = React.useState<IContractAnalysis | null>(null);
  const [analyzing, setAnalyzing] = React.useState(false);

  React.useEffect(() => {
    const text = contract.fullText || contract.summary;
    if (!text) return;

    let cancelled = false;
    setAnalysisResult(null);
    setAnalyzing(true);

    Promise.all([
      aiFoundryService.callAI(buildRiskAssessmentPrompt(text), 2000).then(parseJSON),
      aiFoundryService.callAI(buildEntityExtractionPrompt(text), 2000).then(parseJSON),
    ]).then(([riskAssessment, entities]) => {
      if (cancelled) return;
      const result: IContractAnalysis = {
        fileName: contract.name,
        parties: contract.parties,
        effectiveDate: '',
        expiryDate: contract.expiry,
        jurisdiction: contract.jurisdiction,
        contractType: contract.type,
        clauses: entities?.keyObligations?.map((obligation: string, i: number) => ({
          ref: `§${i + 1}`,
          title: obligation.substring(0, 50),
          text: obligation,
          riskLevel: 'low' as const,
        })) || [],
        overallRiskScore: riskAssessment?.overallRiskScore || 0,
        riskFactors: riskAssessment?.riskFactors || [],
        summary: contract.summary,
        analyzedAt: new Date().toISOString(),
      };
      setAnalysisResult(result);
    }).catch(err => {
      console.warn('[DocumentOverview] AI analysis failed:', err);
    }).finally(() => {
      if (!cancelled) setAnalyzing(false);
    });

    return () => { cancelled = true; };
  }, [contract.id]);

  return (
    <Stack className={styles.documentWrap} horizontal tokens={{ childrenGap: 20 }}>

      <Stack className={styles.mainColumn} tokens={{ childrenGap: 0 }}>
        <RiskAnalysis analyzing={analyzing} analysisResult={analysisResult} />
        <MultilingualQA contract={contract} aiFoundryService={aiFoundryService} langs={langs} />
      </Stack>

      <Stack className={styles.detailsColumn} tokens={{ childrenGap: 0 }}>
        <ContractMetatada contract={contract} />
        <ContractClauses analyzing={analyzing} clauses={analysisResult?.clauses || []} />
      </Stack>
    </Stack>
  );
};
