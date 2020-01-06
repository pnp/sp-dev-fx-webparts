import * as strings from 'ConfigureTabWebPartStrings';
import { ITabLink } from '../model/ITabLink';

export default class TabLinkParser {

    public parseTabLinks(tabNames: string, entityIds: string, contentPageUrls: string): ITabLink[] {

        if (!tabNames || !entityIds || !contentPageUrls) {
            throw new Error(strings.BlankTabsErrorMessage);
        }

        var tabNameArray = tabNames.trim().split('\n');
        var entityIdArray = entityIds.trim().split('\n');
        var contentPageUrlArray = contentPageUrls.trim().split('\n');
        var result: ITabLink[] = [];

        var length = tabNameArray.length;
        if (entityIdArray.length != length || contentPageUrlArray.length != length) {
            throw new Error(strings.UnevenTabsErrorMessage);
        }

        for (let i = 0; i < length; i++) {
            if (!tabNameArray[i] || !entityIdArray[i] || !contentPageUrlArray[i]) {
                throw new Error(strings.BlankTabsErrorMessage);
            }
            result.push({
                tabName: tabNameArray[i],
                entityId: entityIdArray[i],
                contentPageUrl: contentPageUrlArray[i]
            });
        }

        return result;
    }
}