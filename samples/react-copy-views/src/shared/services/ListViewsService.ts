import "@pnp/sp/fields/list";
import "@pnp/sp/lists";
import "@pnp/sp/views";
import "@pnp/sp/webs";
import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { RequestDigest, spfi, SPFI, SPFx } from "@pnp/sp";
import { IListInfo } from "@pnp/sp/lists";
import { IView, IViewInfo } from "@pnp/sp/views";
import { Web } from "@pnp/sp/webs";
import { CacheBust } from "./CacheBust";
import { IListView } from "../interfaces";

export interface IListViewsService {
    get: (siteUrl: string, listId: string) => Promise<IListView[]>;
    copy: (sourceView: IListView, targetSiteUrl: string, targetListId: string, setAsDefaultView: boolean) => Promise<void>;
}

export class ListViewsService implements IListViewsService {

    public static readonly serviceKey: ServiceKey<IListViewsService> =
        ServiceKey.create<IListViewsService>('SPFx:ListViewsService', ListViewsService);

    private _sp: SPFI;

    public constructor(serviceScope: ServiceScope) {
        serviceScope.whenFinished(() => {
            const pageContext = serviceScope.consume(PageContext.serviceKey);

            /* 
             * About RequestDigest():
             * Include RequestDigest() to ensure a correct X-RequestDigest header value is present. 
             * This is necessary because of a bug in SPFx, where an old pageContext can be consumed after refreshing the page.
             * 
             * About CacheBust():
             * This ensures that every call has a unique URL, to override browser caching.
             */
            this._sp = spfi().using(RequestDigest(), SPFx({ pageContext }), CacheBust());
        });
    }

    public async get(siteUrl: string, listId: string): Promise<IListView[]> {

        const web = Web([this._sp.web, siteUrl]);

        const views = await web.lists.getById(listId).views.select("Id", "Title", "ServerRelativeUrl", "ViewType2")();

        return views.map((view: IViewInfo) => {
            const viewFileName = view.ServerRelativeUrl.substring(view.ServerRelativeUrl.lastIndexOf('/') + 1);

            return {
                id: view.Id,
                title: view.Title,
                viewUrl: view.ServerRelativeUrl,
                viewType: view.ViewType2,
                fileName: viewFileName,
                listId,
                siteUrl
            } as IListView;
        });
    }

    public async copy(sourceView: IListView, targetSiteUrl: string, targetListId: string, setAsDefaultView: boolean): Promise<void> {
        const sourceWeb = Web([this._sp.web, sourceView.siteUrl]);
        const sourceList = sourceWeb.lists.getById(sourceView.listId);
        const sourceViewInfo = await sourceList.getView(sourceView.id)();
        const sourceViewFields = await sourceList.getView(sourceView.id).fields();

        const targetWeb = Web([this._sp.web, targetSiteUrl]);
        const targetList = targetWeb.lists.getById(targetListId);
        const targetListInfo = await targetList.expand("Views", "Fields").select("Views/Id", "Views/ServerRelativeUrl", "Fields/InternalName")();

        const targetView = targetListInfo.Views.filter(view => {
            const viewFileName = view.ServerRelativeUrl.substring(view.ServerRelativeUrl.lastIndexOf('/') + 1);
            return viewFileName === sourceView.fileName;
        })[0];

        const properties = this._buildProperties(sourceViewInfo as IViewInfo, targetListInfo, setAsDefaultView);

        if (!targetView) {
            const viewAddResult = await targetList.views.add(sourceView.title, false, properties);

            await this._updateViewFields(viewAddResult.view, sourceViewFields, targetListInfo);
        }
        else {
            const viewUpdateResult = await targetList.views.getById(targetView.Id).update(properties);

            await this._updateViewFields(viewUpdateResult.view, sourceViewFields, targetListInfo);
        }
    }

    private _buildProperties = (sourceView: IViewInfo, targetList: IListInfo, setAsDefaultView: boolean): IViewInfo => {
        const properties = {
            CustomFormatter: sourceView.CustomFormatter,
            RowLimit: sourceView.RowLimit,
            Hidden: sourceView.Hidden,
            IncludeRootFolder: sourceView.IncludeRootFolder,
            JSLink: sourceView.JSLink,
            Paged: sourceView.Paged,
            Scope: sourceView.Scope,
            TabularView: sourceView.TabularView,
            Title: sourceView.Title,
            ViewQuery: this._buildViewQuery(sourceView, targetList),
            ViewType2: sourceView.ViewType2
        } as IViewInfo;

        if (setAsDefaultView) {
            properties.DefaultView = true;
        }

        return properties;
    }

    /*
     * Builds a new ViewQuery based on the source ViewQuery and the available fields on the target list.     
     */
    private _buildViewQuery = (sourceView: IViewInfo, targetList: IListInfo): string => {

        const domParser = new DOMParser();
        const sourceViewDoc = domParser.parseFromString("<Root>" + sourceView.ViewQuery + "</Root>", "text/xml");
        const elementsToRemove = this._getFieldRefsToRemove(sourceViewDoc, targetList);

        if (elementsToRemove.length === 0) {
            return sourceView.ViewQuery;
        }
        else {
            for (let i = 0; i < elementsToRemove.length; i++) {
                this._recursiveDeleteElement(elementsToRemove[i]);
            }

            this._ensureOrderByElement(sourceViewDoc);
            this._fixAndOrConditions(sourceViewDoc);

            return sourceViewDoc.firstElementChild.innerHTML;
        }
    }

    /*
     * Get all FieldRef elements that can be removed from the ViewQuery.
     * If fields are in the ViewQuery that are not available in the targetList, they are removed.
     * Also includes their corresponding Value elements in the where condition
     */
    private _getFieldRefsToRemove = (sourceViewDoc: Document, targetList: IListInfo): Element[] => {
        const elementsToRemove: Element[] = [];
        const fieldRefs = sourceViewDoc.getElementsByTagName("FieldRef");

        for (let i = 0; i < fieldRefs.length; i++) {
            if (targetList.Fields.every(field => field.InternalName !== fieldRefs[i].getAttribute("Name"))) {
                elementsToRemove.push(fieldRefs[i]);

                if (fieldRefs[i].nextElementSibling && fieldRefs[i].nextElementSibling.nodeName === "Value") {
                    elementsToRemove.push(fieldRefs[i].nextElementSibling);
                }
            }
        }

        return elementsToRemove;
    }

    /*
     * Deletes the referenced element and also any parent element that is left without children.
     */
    private _recursiveDeleteElement = (element: Element): void => {
        const parentElement = element.parentElement;
        parentElement.removeChild(element);

        if (!parentElement.hasChildNodes()) {
            this._recursiveDeleteElement(parentElement);
        }
    }

    /*
     * If the OrderBy element contained Fields that are not available on the TargetList, the OrderBy element will have been empty and removed.
     * This function ensures that a default OrderBy element is created.
     */
    private _ensureOrderByElement = (sourceViewDoc: Document): void => {
        if (sourceViewDoc.getElementsByTagName("OrderBy").length === 0) {
            sourceViewDoc.firstElementChild.innerHTML = "<OrderBy><FieldRef Name=\"ID\" Ascending=\"TRUE\"/></OrderBy>" + sourceViewDoc.firstElementChild.innerHTML;
        }
    }

    /*
     * If any And/Or element has been left with a single condition, replace it with that condition.     
     */
    private _fixAndOrConditions = (sourceViewDoc: Document): void => {
        this._fixConditions(sourceViewDoc, "And");
        this._fixConditions(sourceViewDoc, "Or");
    }

    private _fixConditions = (sourceViewDoc: Document, condition: string): void => {
        const elements = sourceViewDoc.getElementsByTagName(condition);

        for (let i = 0; i < elements.length; i++) {
            if (elements[i].childElementCount === 1) {
                elements[i].replaceWith(elements[i].firstChild);
            }
        }
    }

    private _updateViewFields = async (targetView: IView, sourceViewFields: { Items: string[]; SchemaXml: string; }, targetList: IListInfo): Promise<void> => {

        const viewFields: string[] = [];
        sourceViewFields.Items.forEach(item => {
            if (targetList.Fields.some(field => field.InternalName === item)) {
                viewFields.push(item);
            }
        });


        if (viewFields.length > 0) {
            await targetView.fields.removeAll();

            for (let i = 0; i < viewFields.length; i++) {
                await targetView.fields.add(viewFields[i]);
            }
        }
    }
}