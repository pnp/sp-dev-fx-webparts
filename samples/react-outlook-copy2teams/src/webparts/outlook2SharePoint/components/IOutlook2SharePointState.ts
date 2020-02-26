import GraphController from '../../../controller/GraphController';

export interface IOutlook2SharePointState {
  graphController: GraphController;
  showSuccess: boolean;
  showError: boolean;
  showOneDrive: boolean;
  showTeams: boolean;
  showGroups: boolean;
  successMessage: string;
  errorMessage: string;
}
