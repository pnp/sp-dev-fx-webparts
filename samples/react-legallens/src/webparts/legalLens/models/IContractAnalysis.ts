export interface IContractAnalysis {
  fileName: string;
  parties: string[];
  effectiveDate: string;
  expiryDate: string;
  jurisdiction: string;
  contractType: string;
  clauses: Array<{
    ref: string;
    title: string;
    text: string;
    riskLevel: 'low' | 'medium' | 'high';
    riskReason?: string;
  }>;
  overallRiskScore: number;
  riskFactors: Array<{
    factor: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    description: string;
    recommendation: string;
  }>;
  summary: string;
  analyzedAt: string;
}