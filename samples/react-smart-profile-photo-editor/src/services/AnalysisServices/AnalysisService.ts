import { IAnalysisService } from "./IAnalysisService";
import { AnalyzeImageInStreamResponse } from '@azure/cognitiveservices-computervision/esm/models';
import { ComputerVisionClient } from '@azure/cognitiveservices-computervision';
import { ApiKeyCredentials } from '@azure/ms-rest-js';


export class AnalysisService implements IAnalysisService {
  private readonly key: string = undefined;
  private readonly endpoint: string = undefined;

  /**
   *
   */
  constructor(apiKey: string, endpoint: string) {
    this.key = apiKey;
    this.endpoint = endpoint;
  }

  public async AnalyzeImage(dataUrl: string): Promise<AnalyzeImageInStreamResponse> {
    let base64data: string = dataUrl.replace(/^data:image\/png;base64,|^data:image\/jpeg;base64,|^data:image\/jpg;base64,|^data:image\/jpeg;base64,/, '');
    var buf = new Buffer(base64data, 'base64');
    let computerVisionClient = new ComputerVisionClient(
      new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': this.key } }), this.endpoint);

    var analysis: AnalyzeImageInStreamResponse = (await computerVisionClient.analyzeImageInStream(buf, {
      details: ["Celebrities"],
      visualFeatures: ["Categories",
        "Adult",
        "Tags",
        "Tags",
        "Description",
        "Faces",
        "Color",
        "ImageType",
        "Objects"]
    }));
    return analysis;
  }

}
