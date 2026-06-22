export interface IAddBookmarkManagerState {
  isFormDialogOpen: boolean;
  title: string;
  description: string;
  url: string;
  selectedLabels: string[];
  selectedGroupId: string | undefined;
  titleError: string;
  urlError: string;
}