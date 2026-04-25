import * as React from 'react';
import { IContract } from '../../../models/IContract';
import { IAzureAIFoundryService } from '../../../services/AzureAIFoundryService';
import { ISharePointService } from '../../../services/SharePointService';
import {
    CLASSIFY_STEPS,
    buildContractTypePrompt,
    buildRiskAssessmentPrompt,
    buildCompliancePrompt,
    buildEntityExtractionPrompt
} from '../../../constants';
import { parseJSON, getFallbackResult } from '../../../utilities/classificationUtils';
import { ClassifySelect } from './ClassifySelect';
import { ClassifyProcessing, IClassifyState } from './ClassifyProcessing';

export interface IClassificationViewProps {
  contracts: IContract[];
  aiFoundryService: IAzureAIFoundryService;
  sharePointService: ISharePointService;
  uploadedFile: File | null;
  fullAnalysis: any;
}

export const ClassificationView: React.FC<IClassificationViewProps> = ({
    contracts, aiFoundryService, sharePointService, uploadedFile, fullAnalysis
}) => {
    const [view, setView] = React.useState<'select' | 'processing'>('select');
    const [selectedFile, setSelectedFile] = React.useState(0);
    const [selectedType, setSelectedType] = React.useState('contract_type');
    const [classifyState, setClassifyState] = React.useState<IClassifyState | null>(null);
    const mountedRef = React.useRef(true);

    React.useEffect(() => {
        return () => { mountedRef.current = false; };
    }, []);

    // Auto-start classification when view changes to 'processing'
    React.useEffect(() => {
        if (view === 'processing' && !classifyState) {
            startClassificationSimulation();
        }
    }, [view]);

    const startClassificationSimulation = (): void => {
        let currentStep = 0;
        setClassifyState({ step: 0, done: false });
        const runNextStep = (): void => {
            currentStep++;
            if (currentStep >= CLASSIFY_STEPS.length) {
                performActualClassification();
                return;
            }
            if (mountedRef.current) {
                setClassifyState({ step: currentStep, done: false });
            }
            setTimeout(runNextStep, CLASSIFY_STEPS[currentStep].duration);
        };
        setTimeout(runNextStep, CLASSIFY_STEPS[0].duration);
    };

    const performActualClassification = async (): Promise<void> => {
        try {
            const contract = contracts[selectedFile];

            // Check if we have cached analysis for this document
            if (fullAnalysis && uploadedFile && contract?.name === uploadedFile.name) {
                let result;
                switch (selectedType) {
                    case 'contract_type':
                        result = fullAnalysis.contractType;
                        break;
                    case 'risk_assessment':
                        result = fullAnalysis.riskAssessment;
                        break;
                    case 'compliance_check':
                        result = fullAnalysis.compliance;
                        break;
                    case 'entity_extraction':
                        result = fullAnalysis.entities;
                        break;
                    default:
                        result = fullAnalysis.contractType;
                }

                if (mountedRef.current) {
                    setClassifyState({
                        step: CLASSIFY_STEPS.length - 1,
                        done: true,
                        result
                    });
                }
                return;
            }

            // No cached data - run fresh analysis
            let documentText = '';

            if (uploadedFile) {
                documentText = await aiFoundryService.extractTextFromFile(uploadedFile);
            } else if (contract?.fileUrl) {
                const fileBlob = await sharePointService.getContractFile(contract.fileUrl);
                documentText = await aiFoundryService.extractTextFromFile(fileBlob);
            } else if (contract?.fullText) {
                documentText = contract.fullText;
            }

            let result;

            switch (selectedType) {
                case 'contract_type':
                    result = await classifyContractType(documentText);
                    break;
                case 'risk_assessment':
                    result = await classifyRiskAssessment(documentText);
                    break;
                case 'compliance_check':
                    result = await classifyCompliance(documentText);
                    break;
                case 'entity_extraction':
                    result = await classifyEntities(documentText);
                    break;
                default:
                    result = await classifyContractType(documentText);
            }

            if (mountedRef.current) {
                setClassifyState({
                    step: CLASSIFY_STEPS.length - 1,
                    done: true,
                    result
                });
            }

        } catch (error) {
            console.error('[Classification] Error:', error);
            if (mountedRef.current) {
                setClassifyState({
                    step: CLASSIFY_STEPS.length - 1,
                    done: true,
                    result: getFallbackResult(selectedType)
                });
            }
        }
    };

    const classifyContractType = async (documentText: string): Promise<any> => {
        const response = await aiFoundryService.callAI(buildContractTypePrompt(documentText), 1500);
        return parseJSON(response);
    };

    const classifyRiskAssessment = async (documentText: string): Promise<any> => {
        const response = await aiFoundryService.callAI(buildRiskAssessmentPrompt(documentText), 2000);
        return parseJSON(response);
    };

    const classifyCompliance = async (documentText: string): Promise<any> => {
        const response = await aiFoundryService.callAI(buildCompliancePrompt(documentText), 2000);
        return parseJSON(response);
    };

    const classifyEntities = async (documentText: string): Promise<any> => {
        const response = await aiFoundryService.callAI(buildEntityExtractionPrompt(documentText), 2000);
        return parseJSON(response);
    };

    const handleClassify = (): void => {
        setView('processing');
    };

    const handleReset = (): void => {
        setClassifyState(null);
        setView('select');
    };

    const uploadedFileName = uploadedFile?.name || '';

    return (
      <div style={{ animation: 'fadeIn 0.35s ease' }}>
        {view === 'select' && (
          <ClassifySelect
            contracts={contracts}
            selectedFile={selectedFile}
            selectedType={selectedType}
            onFileChange={setSelectedFile}
            onTypeChange={setSelectedType}
            onClassify={handleClassify}
          />
        )}
        {view === 'processing' && (
          <ClassifyProcessing
            classifyState={classifyState}
            uploadedFileName={uploadedFileName}
            selectedClassificationType={selectedType}
            contracts={contracts}
            selectedFileForClassification={selectedFile}
            onReset={handleReset}
          />
        )}
      </div>
    );
};
