import { ITaskList } from '../models/ICommonObjects';
import {
    IPropertyPaneDropdownOption,
} from '@microsoft/sp-property-pane';

export class Utils {

    public GetKeyFroDropdown(list: ITaskList): string {

        return list.Id + "#" + list.ListItemEntityTypeFullName;
    }

    public GetListId(option: IPropertyPaneDropdownOption): string {
        let result = "";
        let keyAsString = option.key.toString();
        if (keyAsString.indexOf("#") > 0) {
            result = keyAsString.split("#")[0];
        }
        return result;
    }

    public GetListItemEntityType(option: IPropertyPaneDropdownOption): string {
        let result = "";
        let keyAsString = option.key.toString();
        if (keyAsString.indexOf("#") > 0) {
            result = keyAsString.split("#")[1];
        }
        return result;
    }
}
