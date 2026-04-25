import * as React from 'react';
import { Stack, Text, DefaultButton } from '@fluentui/react';
import { IContract } from '../../../models/IContract';
import { ClockRegular } from '@fluentui/react-icons';
import { ProgressSteps } from './ProgressSteps';
import { ContractTypeResults } from './ResultTypes/ContractTypeResults';
import { RiskAssessmentResults } from './ResultTypes/RiskAssessmentResults';
import { ComplianceResults } from './ResultTypes/ComplianceResults';
import { EntityExtractionResults } from './ResultTypes/EntityExtractionResults';
import styles from './Classification.module.scss';

export interface IClassifyState {
  step: number;
  done: boolean;
  result?: any;
}

export interface IClassifyProcessingProps {
  classifyState: IClassifyState | null;
  uploadedFileName: string;
  selectedClassificationType: string;
  contracts: IContract[];
  selectedFileForClassification: number;
  onReset: () => void;
}

export const ClassifyProcessing: React.FC<IClassifyProcessingProps> = ({
    classifyState, uploadedFileName, selectedClassificationType,
    contracts, selectedFileForClassification, onReset
}) => {
    const contract = contracts[selectedFileForClassification];

    const renderResults = (): React.ReactElement => {
      switch (selectedClassificationType) {
        case 'contract_type':
          return <ContractTypeResults result={classifyState!.result} />;
        case 'risk_assessment':
          return <RiskAssessmentResults result={classifyState!.result} />;
        case 'compliance_check':
          return <ComplianceResults result={classifyState!.result} />;
        case 'entity_extraction':
          return <EntityExtractionResults result={classifyState!.result} />;
        default:
          return <ContractTypeResults result={classifyState!.result} />;
      }
    };

    return (
      <Stack tokens={{ childrenGap: 20 }}>
        <Stack horizontal horizontalAlign="space-between" verticalAlign="end" wrap tokens={{ childrenGap: 12 }}>
          <Stack>
            <Stack horizontal verticalAlign="center" tokens={{ childrenGap: 10 }}>
              <Text className={styles.processingHeading}>Live Classification</Text>
              <Text className={styles.aiBadge}>AI POWERED</Text>
            </Stack>
            <Text className={styles.processingSubheading}>
              Knowledge Agent classifies document in real-time
            </Text>
          </Stack>
          {classifyState?.done && (
            <DefaultButton
              text="↻ Classify Another"
              onClick={onReset}
              className={styles.resetButton}
            />
          )}
        </Stack>

        <Stack horizontal tokens={{ childrenGap: 16 }}>
          <Stack.Item grow={1} styles={{ root: { flexBasis: 0 } }}>
            <ProgressSteps
              classifyState={classifyState}
              uploadedFileName={uploadedFileName}
              contract={contract}
            />
          </Stack.Item>

          <Stack.Item grow={1} styles={{ root: { flexBasis: 0 } }}>
            {classifyState?.done && classifyState.result ? renderResults() : (
              <Stack horizontalAlign="center" className={styles.pendingPanel}>
                <ClockRegular className={styles.pendingIcon} />
                <Text className={styles.pendingText}>
                  Extracted metadata will appear here…
                </Text>
              </Stack>
            )}
          </Stack.Item>
        </Stack>
      </Stack>
    );
};
