import { AnalyzeImageInStreamResponse } from '@azure/cognitiveservices-computervision/esm/models';

export interface IAnalysisService {
  AnalyzeImage(dataUrl: string): Promise<AnalyzeImageInStreamResponse>;
}
