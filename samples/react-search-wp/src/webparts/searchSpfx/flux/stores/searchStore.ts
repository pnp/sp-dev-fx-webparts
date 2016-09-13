import appDispatcher from '../dispatcher/appDispatcher';
import searchActionIDs from '../actions/searchActionIDs';
import { EventEmitter } from 'events';

import { IWebPartContext } from '@microsoft/sp-client-preview';
import { ISearchResults, ICells, ICellValue } from '../../utils/ISearchResults';
import { IPageContext } from '../../utils/IPageContext';

declare const _spPageContextInfo: IPageContext;

const CHANGE_EVENT: string = 'change';

export class SearchStoreStatic extends EventEmitter {
	private _results: any[] = [];

	/**
	 * @param {function} callback
	 */
	public addChangeListener(callback: Function): void {
        this.on(CHANGE_EVENT, callback);
    }

	/**
	 * @param {function} callback
	 */
    public removeChangeListener(callback: Function): void {
        this.removeListener(CHANGE_EVENT, callback);
    }

    public emitChange(): void {
        this.emit(CHANGE_EVENT);
    }

	public getSearchResults(): ICells[] {
		return this._results;
	}

	public setSearchResults(crntResults: ICells[], fields: string): void {
		const flds: string[] = fields.toLowerCase().split(',');
		if (crntResults.length > 0) {
			const temp: any[] = [];
			crntResults.forEach((result) => {
				// Create a temp value
				var val: Object = {};
				result.Cells.forEach((cell: ICellValue) => {
					if (flds.indexOf(cell.Key.toLowerCase()) !== -1) {
						// Add key and value to temp value
						val[cell.Key] = cell.Value;
					}
				});
				// Push this to the temp array
				temp.push(val);
			});
			this._results = temp;
		} else {
			this._results = [];
		}
	}

	/**
	 * @param {IWebPartContext} context
	 * @param {string} url
	 */
	public GetSearchData (context: IWebPartContext, url: string): Promise<ISearchResults> {
		return context.httpClient.get(url, {
			headers: {
				// Some users experience issues retrieving search results: https://github.com/SharePoint/sp-dev-docs/issues/44
				// Current fix is to set an empty odata-version header
				"odata-version": ""
			}
		}).then((res: Response) => {
			return res.json();
		});
	}

	/**
	 * @param {string} query
	 */
	public ReplaceTokens (query: string, context: IWebPartContext): string {
		if (query.toLowerCase().indexOf("{site}") !== -1) {
			query = query.replace(/{site}/ig, context.pageContext.web.absoluteUrl);
		}
		if (query.toLowerCase().indexOf("{sitecollection}") !== -1) {
			query = query.replace(/{sitecollection}/ig, _spPageContextInfo.siteAbsoluteUrl);
		}
		return query;
	}

	/**
	 * @param {string} value
	 */
	public isEmptyString (value: string): boolean {
		return value === null || typeof value === "undefined" || !value.length;
	}

	/**
	 * @param {any} value
	 */
	public isNull (value: any): boolean {
		return value === null || typeof value === "undefined";
	}
}

const searchStore: SearchStoreStatic = new SearchStoreStatic();

appDispatcher.register((action) => {
	switch (action.actionType) {
		case searchActionIDs.SEARCH_GET:
			let url: string = action.context.pageContext.web.absoluteUrl + "/_api/search/query?querytext=";
			// Check if a query is provided
			url += !searchStore.isEmptyString(action.query) ? `'${searchStore.ReplaceTokens(action.query, action.context)}'` : "'*'";
			// Check if there are fields provided
			url += '&selectproperties=';
			url += !searchStore.isEmptyString(action.fields) ? `'${action.fields}'` : "'path,title'";
			// Add the rowlimit
			url += "&rowlimit=";
			url += !searchStore.isNull(action.maxResults) ? action.maxResults : 10;
			// Add sorting
			url += !searchStore.isEmptyString(action.sorting) ? `&sortlist='${action.sorting}'` : "";
			// Add the client type
			url += "&clienttype='ContentSearchRegular'";

			searchStore.GetSearchData(action.context, url).then((res: ISearchResults) => {
				if (res !== null) {
					if (typeof res.PrimaryQueryResult !== 'undefined') {
						if (typeof res.PrimaryQueryResult.RelevantResults !== 'undefined') {
							if (typeof res.PrimaryQueryResult.RelevantResults !== 'undefined') {
								if (typeof res.PrimaryQueryResult.RelevantResults.Table !== 'undefined') {
									if (typeof res.PrimaryQueryResult.RelevantResults.Table.Rows !== 'undefined') {
										searchStore.setSearchResults(res.PrimaryQueryResult.RelevantResults.Table.Rows, action.fields);
										searchStore.emitChange();
									}
								}
							}
						}
					}
				}
			});

			break;
	}
});


export default searchStore;