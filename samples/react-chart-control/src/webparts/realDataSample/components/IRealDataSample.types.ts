import { IWebPartContext } from '@microsoft/sp-webpart-base';

export interface IRealDataSampleProps {
  repoOwner: string;
  repo: string;
  context: IWebPartContext;
  onSelectionChange: (alias: string) => void;
}
