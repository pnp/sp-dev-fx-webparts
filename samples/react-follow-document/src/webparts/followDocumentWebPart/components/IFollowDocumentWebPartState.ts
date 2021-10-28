import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
export interface IFollowDocumentWebPartState {
  siteId?: string;
  listId?: string;
  Items: any;
  ItemsSearch?: any;
  ItemsGroup?: IDropdownOption[];
  previewImgUrl:string;
  visible: boolean;
}
