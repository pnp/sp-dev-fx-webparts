/* tslint:disable */
import { IListItem } from "../../entities/IListItem";
import { ISelectedProperties } from "../../entities/ISeletedProperties";

export interface IBannerCardProps {
 item: IListItem;
 isSelected: boolean;
 onSeletedItem?: (item: IListItem) => void;
 currentCultureName:string;
 selectedProperties:ISelectedProperties;
}
