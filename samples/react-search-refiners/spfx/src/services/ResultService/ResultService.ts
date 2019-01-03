import { ISearchResults } from "../../models/ISearchResult";
import IResultService from "./IResultService";
import 'custom-event-polyfill';

export interface ISearchEvent extends CustomEvent {
    rendererId?: string;
    results?: ISearchResults;
    mountNode?: string;
    customTemplateFieldValues?: ICustomTemplateFieldValue[];
}

export interface IRenderer {
    id: string;
    name: string;
    icon: string;
    customFields?: string[];
}

export interface ICustomTemplateFieldValue {
    fieldName: string;
    searchProperty: string;
}

export class ResultService implements IResultService {
    private SEARCH_CHANGED_EVENT_NAME: string = "pnp-spfx-search-changed";
    private SEARCH_RENDERERS_OBJECT_NAME: string = "pnp-spfx-search-renderers";

    public updateResultData(results: ISearchResults, rendererId: string, mountNode: string, customTemplateFieldValues?: ICustomTemplateFieldValue[]) {
        let searchEvent: ISearchEvent = new CustomEvent(this.SEARCH_CHANGED_EVENT_NAME);
        searchEvent.rendererId = rendererId;
        searchEvent.results = results; 
        searchEvent.mountNode = mountNode;
        searchEvent.customTemplateFieldValues = customTemplateFieldValues;
        window.dispatchEvent(searchEvent);
    }

    public registerRenderer(rendererId: string, rendererName: string, rendererIcon: string, callback: (e: ISearchEvent) => void, customFields?: string[]): void {
        const newRenderer = {
            id: rendererId,
            name: rendererName,
            icon: rendererIcon,
            customFields: customFields
        };
        if( window[this.SEARCH_RENDERERS_OBJECT_NAME] === undefined) {
            window[this.SEARCH_RENDERERS_OBJECT_NAME] = [newRenderer];
        } else {
            window[this.SEARCH_RENDERERS_OBJECT_NAME].push(newRenderer);
        }
        addEventListener(this.SEARCH_CHANGED_EVENT_NAME, (e: ISearchEvent) =>  this.handleNewDataRegistered(e, rendererId, callback));
    }

    public getRegisteredRenderers(): IRenderer[] {
        return window[this.SEARCH_RENDERERS_OBJECT_NAME];
    }

    private handleNewDataRegistered(e: ISearchEvent, rendererId, callback: (e) => void ) {
        if(e.rendererId === rendererId) {
            callback(e);
        }
    }
}