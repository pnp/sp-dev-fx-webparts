import { IContract } from '../models/IContract';

export interface ILegalLensState {
  view: 'library' | 'upload' | 'classify' | 'translate' | 'alerts' | 'esignature';
  contracts: IContract[];
  loading: boolean;
  error: string | null;

  // Shared between Upload and Classification tabs
  uploadedFile: File | null;
  fullAnalysis: {
    contractType?: any;
    riskAssessment?: any;
    compliance?: any;
    entities?: any;
  } | null;

  pulseAlert: boolean;
}
