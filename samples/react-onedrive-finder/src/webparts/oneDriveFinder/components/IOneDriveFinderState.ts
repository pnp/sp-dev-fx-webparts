import { IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';


export interface IOneDriveFinderState {
    breadcrumbItem: IBreadcrumbItem[];
    pageSize: number;
    siteID:string;
    itemID:string;
    siteItems: IDropdownOption[];
    fileExtensions: string[];
    customStyle: string;
    searchDrive: string;
    dialogFileStatus: boolean;
    dialogFile: any;
}
