import { AnalyzeImageInStreamResponse } from '@azure/cognitiveservices-computervision/esm/models';

export interface IAnalysisDialogContentState {
  // This space for rent
  isAnalyzing: boolean;
  analysis?: AnalyzeImageInStreamResponse;
  isValid?: boolean;
  isPortrait?: boolean;
  isPortraitValid?: boolean;
  onlyOnePersonValid?: boolean;
  isClipartValid?: boolean;
  isLinedrawingValid?: boolean;
  isAdultValid?: boolean;
  isRacyValid?: boolean;
  isGoryValid?: boolean;
  keywordsValid?: boolean;
  invalidKeywords?: string[];
  isSubmitted: boolean;
  celebrity?: string;
}
