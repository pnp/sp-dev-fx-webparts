import { ISearchResults } from "../../models/ISearchResult";
import { IRenderer } from "./ResultService";
import {ICustomTemplateFieldValue} from './ResultService';

export default interface IResultService {
    /**
     * Persists the results to the local storage and fires and update event.
     * @param results The new results
     * @param rendererId The Id of the custom action chosen to render the resultdata.
     * @param mountNode The name of the html node which the renderers should use to display the results
     */
    updateResultData(results: ISearchResults, rendererId: string, mountNode: string, customTemplateFieldValues?: ICustomTemplateFieldValue[]);
    
    /**
     * Registerer the renderer as an renderer to be picked up by the search-refiners webpart.
     * @param rendererId The id of the renderer
     * @param rendererName The name that should be displayed in the search-refiners webpart
     * @param rendererIcon The office-ui-fabric icon to be displayed.
     * @param callback The function that should run whenever the renderer recieves data
     */
    registerRenderer(rendererId: string, rendererName: string, rendererIcon: string, callback: (e) => void, customFields?:string[]);

    /**
     * Get all registered renderers on the current page. 
     */
    getRegisteredRenderers(): IRenderer[];
}