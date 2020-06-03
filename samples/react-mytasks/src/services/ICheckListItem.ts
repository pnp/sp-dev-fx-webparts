export interface ICheckListItem {
   key: string;
  isChecked: boolean;
  lastModifiedBy?: string;
  lastModifiedByDateTime?: string;
  orderHint?: string;
  title: string;
}
