export interface ITourProps {
  description: string;
  actionValue: string;
  collectionData: ITourStepConfig[];
}

export interface ITourStepConfig
{
  uniqueId: string;
  WebPart: string;
  StepDescription: string;
  Position: string;
  Enabled: boolean;
  sortIdx: number;
}