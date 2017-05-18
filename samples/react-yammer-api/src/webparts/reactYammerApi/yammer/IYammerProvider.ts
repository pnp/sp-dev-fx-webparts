import { SearchResult } from './SearchResult';

/**
 * Yammer rest apis provider interface.
 */
export interface IYammerProvider {
    /**
     * Appends the Yammer platform_js_sdk.js on the page, if not present.
     */
    loadSdk(): Promise<any>;
    /**
     * Checks if the user is logged in and has token and cookies in place.
     */
    getLoginStatus(): Promise<any>;
    /**
     * Appends Yammer login button to HTML element.
     */
    loginButton(selector: string): Promise<any>;
    /**
     * Performs Yammer rest api request.
     */
    request(jQueryAjaxSettings: any): void;
    /**
     * Performs Yammer search.
     */
    search(searchQuery: string): Promise<Array<SearchResult>>;
}