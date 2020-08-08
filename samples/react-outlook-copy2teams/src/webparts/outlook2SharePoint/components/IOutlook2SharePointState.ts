import GraphController from '../../../controller/GraphController';
import { IMailMetadata } from '../../../model/IMailMetadata';

export interface IOutlook2SharePointState {
  graphController: GraphController;
  mailMetadata: IMailMetadata;
  showSuccess: boolean;
  showError: boolean;
  showOneDrive: boolean;
  showTeams: boolean;
  showGroups: boolean;
  successMessage: string;
  errorMessage: string;
}
