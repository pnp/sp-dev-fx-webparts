export interface IFormProps {
  listId: string;
  updateIsNeedRefreshData: (value: boolean) => void;
  selectedItem: any;
  setSelectedItem: (selectedItem: any) => void;
}