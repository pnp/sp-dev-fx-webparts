import { ISearchResults } from "../../models/ISearchResult";
import IResultService from "./IResultService";

export interface ISearchEvent extends Event {
    rendererId?: string;
    results?: ISearchResults;
    mountNode?: string;
}

export interface IRenderer {
    id: string;
    name: string;
    icon: string;
}

export class ResultService implements IResultService {
    private SEARCH_CHANGED_EVENT_NAME: string = "pnp-spfx-search-changed";
    private SEARCH_RENDERERS_OBJECT_NAME: string = "pnp-spfx-search-renderers";

    public updateResultData(results: ISearchResults, rendererId: string, mountNode: string) {
        let searchEvent: ISearchEvent = new Event(this.SEARCH_CHANGED_EVENT_NAME);
        searchEvent.rendererId = rendererId;
        searchEvent.results = results; 
        searchEvent.mountNode = mountNode;
        window.dispatchEvent(searchEvent);
    }

    public registerRenderer(rendererId: string, rendererName: string, rendererIcon: string, callback: (e: ISearchEvent) => void): void {
        const newRenderer = {
            id: rendererId,
            name: rendererName,
            icon: rendererIcon
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