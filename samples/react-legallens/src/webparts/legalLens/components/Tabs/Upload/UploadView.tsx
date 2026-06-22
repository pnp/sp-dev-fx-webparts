import * as React from 'react';
import { Stack, Text } from '@fluentui/react';
import { IContractAnalysis } from '../../../models/IContractAnalysis';
import { IContract } from '../../../models/IContract';
import { ISharePointService } from '../../../services/SharePointService';
import { IAzureAIFoundryService } from '../../../services/AzureAIFoundryService';
import {
  buildContractTypePrompt,
  buildRiskAssessmentPrompt,
  buildCompliancePrompt,
  buildEntityExtractionPrompt,
} from '../../../constants';
import { parseJSON } from '../../../utilities/classificationUtils';
import { UploadSelect } from './UploadSelect';
import { UploadAnalyzing } from './UploadAnalyzing';
import { UploadResults } from './UploadResults';
import styles from './Upload.module.scss';

interface IFullAnalysis {
  contractType?: any;
  riskAssessment?: any;
  compliance?: any;
  entities?: any;
}

interface IUploadViewProps {
  contracts: IContract[];
  sharePointService: ISharePointService;
  aiFoundryService: IAzureAIFoundryService;
  onAnalysisComplete: (file: File, fullAnalysis: IFullAnalysis) => void;
  onContractSaved?: () => void;
}

export const UploadView: React.FC<IUploadViewProps> = ({
  contracts,
  sharePointService,
  aiFoundryService,
  onAnalysisComplete,
  onContractSaved,
}) => {
  const [uploadView, setUploadView] = React.useState<'select' | 'analyzing' | 'results'>('select');
  const [uploadedFileName, setUploadedFileName] = React.useState('');
  const [analyzingProgress, setAnalyzingProgress] = React.useState(0);
  const [analyzeError, setAnalyzeError] = React.useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = React.useState<IContractAnalysis | null>(null);
  const isMountedRef = React.useRef(true);

  React.useEffect(() => {
    return () => { isMountedRef.current = false; };
  }, []);

  const handleFileUpload = async (file: File | null): Promise<void> => {
    if (!file) return;

    setUploadedFileName(file.name);
    setUploadView('analyzing');
    setAnalyzingProgress(0);
    setAnalyzeError(null);

    try {
      const documentText = await aiFoundryService.extractTextFromFile(file);

      if (isMountedRef.current) setAnalyzingProgress(10);

      const [contractType, riskAssessment, compliance, entities] = await Promise.all([
        aiFoundryService.callAI(buildContractTypePrompt(documentText), 1500).then(parseJSON),
        aiFoundryService.callAI(buildRiskAssessmentPrompt(documentText), 2000).then(parseJSON),
        aiFoundryService.callAI(buildCompliancePrompt(documentText), 2000).then(parseJSON),
        aiFoundryService.callAI(buildEntityExtractionPrompt(documentText), 2000).then(parseJSON),
      ]);

      if (isMountedRef.current) setAnalyzingProgress(80);

      const fullAnalysis: IFullAnalysis = { contractType, riskAssessment, compliance, entities };

      const result: IContractAnalysis = {
        fileName: file.name,
        parties: contractType?.parties || ['Party A', 'Party B'],
        effectiveDate: contractType?.effectiveDate || 'Not specified',
        expiryDate: contractType?.expiryDate || 'Not specified',
        jurisdiction: contractType?.jurisdiction || 'Not specified',
        contractType: contractType?.documentType || 'General Agreement',
        clauses: entities?.keyObligations?.map((obligation: string, i: number) => ({
          ref: `§${i + 1}`,
          title: obligation.substring(0, 50),
          text: obligation,
          riskLevel: 'low' as const,
        })) || [],
        overallRiskScore: riskAssessment?.overallRiskScore || 0,
        riskFactors: riskAssessment?.riskFactors || [],
        summary: `${contractType?.documentType || 'Agreement'} between ${contractType?.parties?.join(' and ') || 'parties'}. Risk Score: ${riskAssessment?.overallRiskScore || 0}/100.`,
        analyzedAt: new Date().toISOString(),
      };

      if (isMountedRef.current) {
        setAnalysisResult(result);
        setAnalyzingProgress(90);
        setUploadView('results');
      }

      onAnalysisComplete(file, fullAnalysis);

      try {
        await sharePointService.saveAnalyzedContract(file.name, file, result);
        if (isMountedRef.current) setAnalyzingProgress(100);
        onContractSaved?.();
      } catch (saveError) {
        console.warn('[Upload] Analysis complete but failed to save to SharePoint:', saveError);
        if (isMountedRef.current) setAnalyzingProgress(100);
      }

    } catch (error) {
      console.error('[Upload] Analysis error:', error);
      if (isMountedRef.current) {
        setAnalyzeError('Analysis failed. Please try again.');
        setUploadView('select');
      }
    }
  };

  const handleReset = (): void => {
    setUploadView('select');
    setAnalysisResult(null);
    setAnalyzingProgress(0);
    setAnalyzeError(null);
    setUploadedFileName('');
  };

  return (
    <Stack className={styles.viewWrap} tokens={{ childrenGap: 0 }}>

      <Stack className={styles.viewHeader}>
        <Stack horizontal verticalAlign="center" className={styles.viewTitleRow}>
          <Text block className={styles.viewTitle}>Upload & Analyze Contract</Text>
          <Text className={styles.aiBadge}>AI POWERED</Text>
        </Stack>
        <Text block className={styles.viewSubtitle}>
          Upload contract for instant risk & clause analysis · Powered by Azure AI Foundry
        </Text>
      </Stack>

      {analyzeError && (
        <Text block className={styles.errorBanner}>⚠ {analyzeError}</Text>
      )}

      {uploadView === 'select' && (
        <UploadSelect
          contracts={contracts}
          sharePointService={sharePointService}
          onFileUpload={handleFileUpload}
        />
      )}

      {uploadView === 'analyzing' && (
        <UploadAnalyzing
          uploadedFileName={uploadedFileName}
          analyzingProgress={analyzingProgress}
        />
      )}

      {uploadView === 'results' && analysisResult && (
        <UploadResults
          analysisResult={analysisResult}
          onReset={handleReset}
        />
      )}

    </Stack>
  );
};
