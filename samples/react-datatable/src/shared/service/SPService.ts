import { WebPartContext } from "@microsoft/sp-webpart-base";
import { sp } from '@pnp/sp/presets/all';

export class SPService {
    constructor(private context: WebPartContext) {
        sp.setup({
            spfxContext: this.context
        });
    }

    public async getListItems(selectedList: string, selectedFields: any[]) {
        try {
            let selectQuery: any[] = ['Id'];
            let expandQuery: any[] = [];
            let listItems = [];
            let items: any;
            for (var i = 0; i < selectedFields.length; i++) {
                switch (selectedFields[i].fieldType) {
                    case 'SP.FieldUser':
                        selectQuery.push(`${selectedFields[i].key}/Title,${selectedFields[i].key}/EMail,${selectedFields[i].key}/Name`);
                        expandQuery.push(selectedFields[i].key);
                        break;
                    case 'SP.FieldLookup':
                        selectQuery.push(`${selectedFields[i].key}/Title`);
                        expandQuery.push(selectedFields[i].key);
                        break;
                    case 'SP.Field':
                        selectQuery.push('Attachments,AttachmentFiles');
                        expandQuery.push('AttachmentFiles');
                        break;
                    default:
                        selectQuery.push(selectedFields[i].key);
                        break;
                }
            }
            items = await sp.web.lists.getById(selectedList).items
                .select(selectQuery.join())
                .expand(expandQuery.join())
                .top(4999)
                .getPaged();
            listItems = items.results;
            while (items.hasNext) {
                items = await items.getNext();
                listItems = [...listItems, ...items.results];
            }
            return listItems;
        } catch (err) {
            Promise.reject(err);
        }
    }

    public async getFields(selectedList: string): Promise<any> {
        try {
            const allFields: any[] = await sp.web.lists
                .getById(selectedList)
                .fields
                .filter("Hidden eq false and ReadOnlyField eq false and Title ne 'Content Type' and Title ne 'Attachments'")
                .get();
            return allFields;
        }
        catch (err) {
            Promise.reject(err);
        }
    }

    public async getUserProfileUrl(loginName: string) {
        try {
            const properties = await sp.profiles.getPropertiesFor(loginName);
            const profileUrl = properties['PictureUrl'];
            return profileUrl;
        }
        catch (err) {
            Promise.reject(err);
        }
    }
}
