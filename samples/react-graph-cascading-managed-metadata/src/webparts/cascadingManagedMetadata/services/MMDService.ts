import { ITerms, IOption } from "../../interfaces";
import { MSGraph } from "./MSGraph";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export class MMDService {

    private static _sessionStorageKey: string = "CMMD_Options";
    private static _logSource: string = "Cascading MMD Service -";

    public static async GetTermsAsDropdownOptions(apiUrl: string, parent: string, tryFromCache: boolean): Promise<IDropdownOption[]> {

        let options: IDropdownOption[] = [];
        if (tryFromCache) {
            let optionsFromCache: IOption[] = this._fetchFromSessionStorge();
            if (optionsFromCache.length) {
                let requiredOptionsFromCache = optionsFromCache.filter(o => o.parent == parent);
                if (requiredOptionsFromCache.length) {
                    options = requiredOptionsFromCache.map(r => ({ key: r.key, text: r.text }));
                    return options;
                }
            }
        }
        //Get data using Graph
        return await this._getTermsAsDropdownOptionsUsingGraph(apiUrl, parent);
    }

    private static async _getTermsAsDropdownOptionsUsingGraph(apiUrl: string, parent: string): Promise<IDropdownOption[]> {
        try {
            let terms: ITerms = await MSGraph.Get(apiUrl, "beta");
            if (terms.value) {
                //* Set key as description of the term
                //* Description will be of the format latitude;longitude
                //* This will be used to render maps
                const options: IDropdownOption[] = terms.value.map(t => ({
                    key: t.descriptions[0] ? t.descriptions[0].description : t.id,
                    text: t.labels[0].name
                }));
                let optionsToStoreInCache: IOption[] = options.map(o => ({
                    key: o.key.toString(),
                    text: o.text,
                    parent
                }));
                let optionsFromCache: IOption[] = this._fetchFromSessionStorge();
                optionsToStoreInCache = [...optionsFromCache, ...optionsToStoreInCache];
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

    private static _fetchFromSessionStorge(): IOption[] {
        let result: IOption[] = [];
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
