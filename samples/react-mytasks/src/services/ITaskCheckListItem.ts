export interface ITaskCheckListItem {
    [key:string]: {
    "@odata.type":string;
    isChecked: boolean;
    lastModifiedBy?: string;
    lastModifiedByDateTime?: string;
    orderHint: string;
    title: string ; };
  }
