import { IAnalysisService } from ".";
import { AnalyzeImageInStreamResponse } from '@azure/cognitiveservices-computervision/esm/models';

const FAKE_DELAY: number = 5000;

const GOOD_REPONSE: any = {
  categories: [
    {
      name: "people_portrait",
      score: 0.953125,
      detail: {
        celebrities: []
      }
    }],
  adult:
  {
    isAdultContent: false,
    isRacyContent: false,
    isGoryContent: false,
    adultScore: 0.05552997067570686,
    racyScore: 0.05687160789966583,
    goreScore: 0.003745682304725051
  },
  color: {
    dominantColorForeground: "Black",
    dominantColorBackground: "Black",
    dominantColors: ["Black"],
    accentColor: "C5064F",
    isBWImg: false, "isBwImg": false
  },
  imageType: {
    clipArtType: 0,
    lineDrawingType: 0
  },
  tags: [{ name: "person", confidence: 0.9995626211166382 },
  { name: "man", confidence: 0.9974520206451416 },
  { name: "necktie", confidence: 0.9936947226524353 },
  { name: "human face", confidence: 0.9810442328453064 },
  { name: "suit", confidence: 0.9699360132217407 },
  { name: "portrait", confidence: 0.9696626663208008 },
  { name: "tie", confidence: 0.9663352966308594 },
  { name: "wearing", confidence: 0.927700400352478 },
  { name: "smile", confidence: 0.9273260831832886 },
  { name: "clothing", confidence: 0.9267553091049194 },
  { name: "indoor", confidence: 0.9261177778244019 },
  { name: "headshot", confidence: 0.8910813331604004 },
  { name: "dark", confidence: 0.7800303101539612 },
  { name: "shirt", confidence: 0.7269779443740845 },
  { name: "beard", confidence: 0.7061726450920105 },
  { name: "posing", confidence: 0.6241326928138733 },
  { name: "face", confidence: 0.6114757061004639 },
  { name: "jacket", confidence: 0.5651172995567322 },
  { name: "human beard", confidence: 0.5122537016868591 },
  { name: "dressed", confidence: 0.4890264570713043 }],
  description: {
    tags: [
      "person",
      "man",
      "necktie",
      "suit",
      "wearing",
      "indoor",
      "clothing",
      "dark",
      "posing",
      "jacket",
      "looking",
      "dressed",
      "camera",
      "smiling",
      "photo",
      "glasses",
      "shirt",
      "standing",
      "red",
      "black",
      "holding",
      "young",
      "purple",
      "pink",
      "white"],
    captions: [
      {
        text: "a man wearing a suit and tie smiling at the camera",
        confidence: 0.9828590384248658
      }]
  },
  faces: [
    {
      age: 45,
      gender: "Male",
      faceRectangle: {
        left: 63,
        top: 54,
        width: 82,
        height: 82
      }
    }],
  objects: [
    {
      rectangle: {
        x: 110,
        y: 159,
        w: 42,
        h: 41
      },
      object: "tie",
      confidence: 0.723
    },
    {
      rectangle:
      {
        x: 2,
        y: 127,
        w: 196,
        h: 73
      },
      object: "suit",
      confidence: 0.545
    },
    {
      rectangle:
      {
        x: 3,
        y: 23,
        w: 194,
        h: 177
      },
      object: "person",
      confidence: 0.897
    }],
  requestId: "d6556475-6e77-484e-97b2-7dcb5c02f74c",
  metadata: {
    width: 200,
    height: 200,
    format: "Png"
  }
};


export class MockAnalysisService implements IAnalysisService {
  /**
   * Constructor doesn't do anything, it just mimics the real one
   */
  constructor(_apiKey: string, _endpoint: string) {

  }

  public AnalyzeImage(_dataUrl: string): Promise<AnalyzeImageInStreamResponse> {
    return new Promise<AnalyzeImageInStreamResponse>((resolve) => {
      // pretend we're getting the data from Azure
      setTimeout(() => {
        resolve(GOOD_REPONSE);
      }, FAKE_DELAY);
    });
  }

}
