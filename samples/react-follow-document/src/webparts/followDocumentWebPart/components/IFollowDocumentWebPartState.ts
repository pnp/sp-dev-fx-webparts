import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { FollowDocument } from "../models/followDocument";
export interface IFollowDocumentWebPartState {
  siteId?: string;
  listId?: string;
  Items: FollowDocument[];
  ItemsSearch?: any;
  ItemsGroup?: IDropdownOption[];
  previewImgUrl:string;
  visible: boolean;
}
