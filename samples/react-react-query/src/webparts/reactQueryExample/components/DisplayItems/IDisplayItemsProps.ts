export interface IDisplayItemsProps {
  listId: string;
  isNeedRefreshData: boolean;
  updateIsNeedRefreshData: (value: boolean) => void;
  setSelectedItem: (selectedItem: any) => void;
}