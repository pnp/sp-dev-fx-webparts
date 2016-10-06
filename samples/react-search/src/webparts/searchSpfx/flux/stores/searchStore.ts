import appDispatcher from '../dispatcher/appDispatcher';
import searchActionIDs from '../actions/searchActionIDs';
import SearchTokenHelper from '../helpers/SearchTokenHelper';
import { EventEmitter } from 'events';

import { IWebPartContext } from '@microsoft/sp-client-preview';
import { ISearchResults, ICells, ICellValue } from '../../utils/ISearchResults';

const CHANGE_EVENT: string = 'change';

export class SearchStoreStatic extends EventEmitter {
	private _results: any[] = [];
	private _url: string;
	private _response: any;

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
		if (crntResults.length > 0) {
			const flds: string[] = fields.toLowerCase().split(',');
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

	public setLoggingInfo(url: string, response: any) {
		this._url = url;
		this._response = response;
	}

	public getLoggingInfo(): any {
		return {
			URL: this._url,
			Response: this._response
		};
	}
}

const searchStore: SearchStoreStatic = new SearchStoreStatic();

appDispatcher.register((action) => {
	switch (action.actionType) {
		case searchActionIDs.SEARCH_GET:
			const tokenHelper = new SearchTokenHelper();
			let url: string = action.context.pageContext.web.absoluteUrl + "/_api/search/query?querytext=";
			// Check if a query is provided
			url += !searchStore.isEmptyString(action.query) ? `'${tokenHelper.replaceTokens(action.query, action.context)}'` : "'*'";
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
				searchStore.setLoggingInfo(url, res);
				let resultsRetrieved = false;
				if (res !== null) {
					if (typeof res.PrimaryQueryResult !== 'undefined') {
						if (typeof res.PrimaryQueryResult.RelevantResults !== 'undefined') {
							if (typeof res.PrimaryQueryResult.RelevantResults !== 'undefined') {
								if (typeof res.PrimaryQueryResult.RelevantResults.Table !== 'undefined') {
									if (typeof res.PrimaryQueryResult.RelevantResults.Table.Rows !== 'undefined') {
										resultsRetrieved = true;
										searchStore.setSearchResults(res.PrimaryQueryResult.RelevantResults.Table.Rows, action.fields);
									}
								}
							}
						}
					}
				}

				// Reset the store its search result set on error
				if (!resultsRetrieved) {
					searchStore.setSearchResults([], null);
				}
				searchStore.emitChange();
			});

			break;
	}
});


export default searchStore;