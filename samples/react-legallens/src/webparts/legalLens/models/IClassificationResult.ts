export interface IClassificationResult {
  classificationType: string;
  confidence: number;
  primaryCategory: string;
  secondaryCategories: string[];
  detectedLanguage: string;
  keyTerms: string[];
  suggestedTags: string[];
  complianceFlags: Array<{
    regulation: string;
    applicable: boolean;
    reason: string;
  }>;
  classifiedAt: string;
}