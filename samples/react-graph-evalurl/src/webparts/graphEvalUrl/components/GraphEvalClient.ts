import {
    GraphHttpClient, HttpClientResponse,
} from '@microsoft/sp-http';

export default class GraphEvalClient {

    _context: any;
    _graphClient: GraphHttpClient;
    _urlToEvaluate: URL;
    _isList = false;
    _isLibrary = false;

    constructor(graphClient: any) {

        // use locally stored graphHttpClient
        this._graphClient = graphClient;

    }

    private _getUrlJunks(urlPath: string): string[] {
        return urlPath
            .toLowerCase() // convert urlPath to lowerstring
            .split('\/') // split out all slashes
            // Filter all empty values
            .filter((junk) => {
                if (junk !== '') {
                    return junk;
                }
            })
    }

    /**
     * Assume the site collectio on an URL
     * @param urlPath URL that should be evaluated
     */
    private _getSiteCollectionUrl(urlPath: string): string {

        let urlPathElements = this._getUrlJunks(urlPath);

        // Use the root site collection
        if (urlPathElements[0] !== 'sites') {

            return ''

        }

        // found sub site collection and use only /sites/<your subweb>
        if (urlPathElements.length >= 2) {

            // assumes we have a /sites/something
            return `/${urlPathElements[0]}/${urlPathElements[1]}/`

        }

    }

    /**
     * Assume the url on an URL
     * @param urlPath URL that should be evaluated
     */
    private _getAssumedWeburl(urlPath: string) {

        let siteColleciton = this._getSiteCollectionUrl(urlPath),
            urlPathElements = this._getUrlJunks(urlPath);


        /* Get location if there is for form or lists to identify
            docuemnt library or list
        */
        let formLocation = urlPathElements.indexOf('forms'),
            listLocation = urlPathElements.indexOf('lists'),
            sitePages = urlPathElements.indexOf('sitepages');

        /* Check if it is a full list url
         * otherwise check if it is a list
         * otherwise truncate the path for ine level
         */
        if (formLocation !== -1) {

            this._isLibrary = true;
            return `/${urlPathElements.slice(0, formLocation - 1).join('/')}`;

        } else if (listLocation !== -1) {

            this._isList = true;
            return `/${urlPathElements.slice(0, listLocation).join('/')}`;

        } else if (sitePages !== -1) {

            console.log(urlPathElements.slice(0, sitePages));

            return `/${urlPathElements.slice(0, sitePages).join('/')}`;

        } else {

            // just return path one higher then the final web or list in case no one have entered no view
            return `/${urlPathElements.slice(0, urlPathElements.length).join('/')}`;

        }

    }

    /**
     * Assume the list or library url based on a path
     * @param urlPath URL that should be evaluated
     */
    private _getAssumedList(urlPath: string) {

        let webUrl = this._getAssumedWeburl(urlPath),
            urlPathElements = this._getUrlJunks(urlPath);

        // Check if a list should be found otherwise docuemnt library or unspecified     
        if (this._isList) {

            let listIndex = urlPathElements.indexOf('lists');

            // +2 for adding /lists/<listname>
            return urlPathElements.slice(0, listIndex + 2).join('/');

        } else if (this._isLibrary) {

            let formIndex = urlPathElements.indexOf('forms');

            /* 
                No additional index needs to be added bcause document libraries already exist 
                in root folder of Site Collection
            */
            return `/${urlPathElements.slice(0, formIndex).join('/')}`;

        } if (urlPathElements[urlPathElements.length - 1].indexOf('.apsx')) {

            return `/${urlPathElements.slice(0, urlPathElements.length - 1).join('/')}`;

        } else {

            throw 'Neither list nor document library could be identified';

        }

    }

    /**
     * Try to parse the url to a JavaScript Url Object
     * @param url 
     */
    private _evaluateUrl(url: string) {

        console.log(url);
        try {

            return new URL(url)

        } catch (Exception) {

            throw Exception;

        }

    }

    /**
     * Graph query to resturn a site collection or web
     * @param hostname 
     * @param scUrl 
     */
    private _evaluateWeb(hostname: string, scUrl: string): Promise<any> {

        let graphQuery;

        if (scUrl !== '' && scUrl.indexOf('sites') !== -1) {
            // query just a regular sub site collection
            graphQuery = `beta/sites/${hostname}:${scUrl}`;

        } else if (scUrl !== '' && scUrl.indexOf('sites') === -1) {
            // query just a regular sub site collection
            graphQuery = `beta/sites/${hostname}/sites/`;

        } else {

            // query only the root
            graphQuery = `beta/sites/${hostname}`;

        }

        console.log(graphQuery, scUrl);

        return this._graphClient.get(
            graphQuery,
            GraphHttpClient.configurations.v1
        ).then(
            (response: HttpClientResponse) => {

                return response.json();

            }
        ).catch(
            (error) => {

                throw error;

            }
        );
    }

    /**
     * Graph query that returns all lists in a specific web
     * @param siteId 
     * @param url 
     */
    private _evaluateLists(siteId: string, url: string): Promise<any> {

        // Transfer result values to the group variable
        // TODO: Check until you find the final subsite

        const NO_RESULT = 'No document library could be found under the give path';

        let pathToFileQuery = `beta/sites/${siteId}/Lists`;

        return this._graphClient.get(
            pathToFileQuery,
            GraphHttpClient.configurations.v1
        ).then(
            (response) => {

                return response.json();
            }
        )

    }

    /**
     * Evaluate if site collection exists and return it if found
     * @param url 
     */
    public EvaluateSiteCollection(url: string): Promise<any> {

        let scUrl;

        // General url evaluation
        try {

            this._urlToEvaluate = this._evaluateUrl(url);

        } catch (Exception) {
            throw Exception;
        }

        // Try to make site collection url
        try {

            scUrl = this._getSiteCollectionUrl(this._urlToEvaluate.pathname);

        } catch (Exception) {

            throw Exception

        }

        // if building a site collection url worked well
        if (scUrl !== null && scUrl !== undefined) {


            return this._evaluateWeb(this._urlToEvaluate.hostname, scUrl)
                .then(
                    (response) => {
                        return response;
                    }
                )
                .catch(
                    (error) => {

                        throw `Error retrieving Site Collection at ${scUrl} - ${error}`;

                    }
                )
        }


    }


    /**
     * Evaluate a web by URL and returns the web object
     * @param url 
     */
    public EvaluateWeb(url: string): Promise<any> {

        let scUrl;

        // General url evaluation
        try {

            this._urlToEvaluate = this._evaluateUrl(url);

        } catch (Exception) {

            throw Exception;

        }

        // Try to make web url
        try {

            scUrl = this._getAssumedWeburl(this._urlToEvaluate.pathname);

        } catch (Exception) {
            console.log('Error: Identify Site Collection URL');
            throw Exception

        }

        if (scUrl !== null && scUrl !== undefined) {

            return this._evaluateWeb(this._urlToEvaluate.hostname, scUrl)
                .then(
                    (response) => {
                        return response;
                    }
                )
                .catch(
                    (error) => {

                        throw `Error retrieving Site Collection at ${scUrl} - ${error}`;

                    }
                )
        }
    }

    /**
     * Evaluate if web and a specific list exists in the web
     * @param url 
     * @param webid 
     */
    public EvaluateList(url: string): Promise<any> {

        let webUrl,
            listUrl;

        // General url evaluation
        try {

            this._urlToEvaluate = this._evaluateUrl(url);

        } catch (Exception) {

            throw Exception;

        }

        // Try to make web url url
        try {

            webUrl = this._getAssumedWeburl(this._urlToEvaluate.pathname);

        } catch (Exception) {

            throw Exception

        }

        // try to find a list or document library url
        try {

            listUrl = this._getAssumedList(this._urlToEvaluate.pathname);

        } catch (Exception) {

            throw Exception

        }

        // If list and web are ok proceed
        if (webUrl !== null && webUrl !== undefined &&
            listUrl !== null && listUrl !== undefined) {

            /**
             * Evaluate web because the graph ID is needed to evaluate a list
             */
            return this._evaluateWeb(this._urlToEvaluate.hostname, webUrl)
                .then(
                    (response) => {

                        let webIdResults,
                            webId;

                        // just in case multiple items got returned by the graph
                        if (response.value !== undefined) {

                            // filter the best match
                            webIdResults = response.value.filter((obj) => {

                                return obj.webUrl.toLowerCase().indexOf(webUrl) !== -1;

                            });

                            // return first found id
                            webId = webIdResults[0].id;


                        } else {

                            // if only single item was returned
                            webId = response.id;

                        }

                        return this._evaluateLists(webId, listUrl)
                            .then(
                                (response) => {

                                    /**
                                     * Graph always returns all lists and docuemnt libraries from site collection
                                     * This filters out to return only the searched List or library instead of all
                                     * In case none could be found only a empty array will get returned
                                     */
                                    const suiteableLists = response.value.filter((obj) => {

                                        return obj.webUrl.toLowerCase().indexOf(listUrl) !== -1;

                                    });

                                    response.value = suiteableLists;

                                    return response;

                                }
                            )
                            .catch(
                                (error) => {

                                    throw `List cannot be found or evaluated - ${error}`;

                                }

                            )

                    }
                )
                .catch(
                    (error) => {

                        throw `Error retrieving Site Collection at ${webUrl} - ${error}`;

                    }
                )
        }
    }

}
