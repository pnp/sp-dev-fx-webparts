import { spPost } from "@pnp/sp";
import "@pnp/sp/lists";
import { IList, IRenderListDataParameters, List } from "@pnp/sp/lists/types";
import { IViewInfo } from "@pnp/sp/views/types";
import { IRenderListDataAsStreamResult, IListItemResult } from '../../sharepoint';
import { IPagedListDataStream } from "./IPagedListDataStream";

export class ListDataAsStream<T, TRow extends IListItemResult> implements IPagedListDataStream<T> {
    public static beginStream<T, TRow extends IListItemResult>(list: IList, view: IViewInfo, search: string, parameters: IRenderListDataParameters, overrideParameters: any, rowMap: (row: TRow) => T | Promise<T>): Promise<IPagedListDataStream<T>> {
        const listDataAsStream = new ListDataAsStream<T, TRow>(list, view, search, parameters, overrideParameters, rowMap);
        return listDataAsStream._renderPage();
    }

    constructor(
        private readonly _list: IList,
        private readonly _view: IViewInfo,
        private readonly _search: string,
        private readonly _parameters: IRenderListDataParameters,
        private readonly _overrideParameters: any,
        private readonly _rowMap: (row: TRow) => T | Promise<T>,
        private readonly _nextPageHref?: string,
        private readonly _previousPageHref?: string,
        private readonly _results?: T[]
    ) {
        _parameters.ViewXml = _parameters.ViewXml || _view.ListViewXml;
    }

    public get hasNext(): boolean {
        return this._nextPageHref?.length > 0;
    }

    public get hasPrevious(): boolean {
        return this._previousPageHref?.length > 0;
    }

    public get results(): readonly T[] {
        return this._results;
    }

    public async next(): Promise<IPagedListDataStream<T>> {
        if (this.hasNext) {
            return this._renderPage(this._nextPageHref);
        } else {
            return this;
        }
    }

    public async previous(): Promise<IPagedListDataStream<T>> {
        if (this.hasPrevious) {
            return this._renderPage(this._previousPageHref);
        } else {
            return this;
        }
    }

    private async _renderPage(pagingHref: string = ''): Promise<IPagedListDataStream<T>> {
        const rldas = List(this._list, "RenderListDataAsStream");

        const body = {
            overrideParameters: {
                "__metadata": { "type": "SP.RenderListDataOverrideParameters" },
                ...this._overrideParameters
            },
            parameters: {
                "__metadata": { "type": "SP.RenderListDataParameters" },
                ...this._parameters
            }
        };

        if (this._search && this._search.length > 0) {
            rldas.query.set("InplaceSearchQuery", encodeURIComponent(this._search));
        }

        pagingHref.split("&").filter(Boolean).forEach(kvp => {
            const [key, value] = kvp.split("=");
            rldas.query.set(key, value);
        });

        rldas.query.set("View", this._view.Id);

        const data = await spPost(rldas, { body: JSON.stringify(body) }) as IRenderListDataAsStreamResult<TRow>;

        const nextPageHref = (data.NextHref || "").slice(1);
        const previousPageHref = (data.PrevHref || "").slice(1);

        const results: T[] = [];
        for (const row of data.Row) {
            const result = await this._rowMap(row);
            results.push(result);
        }

        return new ListDataAsStream(this._list, this._view, this._search, this._parameters, this._overrideParameters, this._rowMap, nextPageHref, previousPageHref, results);
    }
}