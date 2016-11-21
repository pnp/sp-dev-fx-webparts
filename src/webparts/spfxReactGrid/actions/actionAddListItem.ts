import {Action} from "./action";
import ListItem from "../model/listItem";
export const ACTION_ADDLISTITEM = "ACTION_ADDLISTITEM";
export type ACTION_ADDLISTITEM = { listItem: ListItem }

export function doActionAddListIten(listItem: ListItem): Action<ACTION_ADDLISTITEM> {
    return {
        type: ACTION_ADDLISTITEM,
        payload: {
            listItem: listItem
        }
    }
}