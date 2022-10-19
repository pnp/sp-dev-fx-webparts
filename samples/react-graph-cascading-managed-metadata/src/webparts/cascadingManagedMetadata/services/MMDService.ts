import { ITerms, ICMMDDropdownOption } from "../../interfaces";
import { MSGraph } from "./MSGraph";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { find } from '@microsoft/sp-lodash-subset';

export class MMDService {

    private static _sessionStorageKey: string = "CMMD_Options";
    private static _logSource: string = "Cascading MMD Service -";

    public static async GetTermsAsDropdownOptions(apiUrl: string, selectProperties: string[], parent: string, tryFromCache: boolean): Promise<ICMMDDropdownOption[]> {
        if (tryFromCache) {
            let optionsFromCache: ICMMDDropdownOption[] = this._fetchFromSessionStorge();
            
            if (optionsFromCache.length) {
                let requiredOptionsFromCache = optionsFromCache.filter(o => o.parent == parent);
                if (requiredOptionsFromCache.length) {
                    return requiredOptionsFromCache;
                }
            }
        }
        //Get data using Graph
        return await this._getTermsAsDropdownOptionsUsingGraph(apiUrl, selectProperties, parent);
    }

    private static async _getTermsAsDropdownOptionsUsingGraph(apiUrl: string, selectProperties: string[], parent: string): Promise<ICMMDDropdownOption[]> {
        try {
            let terms: ITerms = await MSGraph.Call("get", apiUrl, "beta", {}, selectProperties);
            if (terms.value) {
                const options: ICMMDDropdownOption[] = terms.value.map(t => ({
                    key: t.id,
                    text: t.labels[0].name,
                    data: {
                        latitude: Number(find(t.properties, p => p.key === "latitude")?.value) ?? null,
                        longitude: Number(find(t.properties, p => p.key === "longitude")?.value) ?? null,
                    },
                    parent
                }));

                let optionsFromCache: ICMMDDropdownOption[] = this._fetchFromSessionStorge();
                let optionsToStoreInCache: ICMMDDropdownOption[] = [...optionsFromCache, ...options];
                window.sessionStorage.setItem(this._sessionStorageKey, JSON.stringify(optionsToStoreInCache));
                console.debug("%s Data added in cache.", this._logSource);
                return options;
            } else {
                return [];
            }
        } catch (error) {
            console.error("%s Error getting data from Graph. Details - %o", this._logSource, error);
            return [];
        }

    }

    private static _fetchFromSessionStorge(): ICMMDDropdownOption[] {
        let result: ICMMDDropdownOption[] = [];
        let stringResult: string = window.sessionStorage.getItem(this._sessionStorageKey);
        if (stringResult) {
            try {
                result = JSON.parse(stringResult);
                if (result.length) {
                    console.debug("%s Fetched data from cache", this._logSource);
                }
            } catch (error) {
                console.error("%s Error getting data from cache. Details - %o", this._logSource, error);
            }
        }
        return result;
    }
}
