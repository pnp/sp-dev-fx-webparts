import { IWebPartContext } from                   '@microsoft/sp-webpart-base';
import { Logger, LogLevel, ConsoleListener } from '@pnp/logging';
import { SPComponentLoader } from                 '@microsoft/sp-loader';
import ITaxonomyService from                      './ITaxonomyService';
import { Text } from                              '@microsoft/sp-core-library';

class TaxonomyService implements ITaxonomyService {

    private _workingLanguageLcid: number;
    private _context: IWebPartContext;

    public constructor(webPartContext: IWebPartContext, workingLanguage?: number){
        this._context = webPartContext;
        this._workingLanguageLcid = workingLanguage ? workingLanguage : null;
    }

    /**
     * Ensure all script dependencies are loaded before using the taxonomy SharePoint CSOM functions
     * https://dev.office.com/sharepoint/docs/spfx/web-parts/guidance/connect-to-sharepoint-using-jsom
     * @return {Promise<void>}       A promise allowing you to execute your code logic.
     */
    public initialize(): Promise<void>  {

        const loadScriptPromise = new Promise<void>((resolve) => {

            const siteCollectionUrl = this._context.pageContext.site.absoluteUrl;

            SPComponentLoader.loadScript(siteCollectionUrl + '/_layouts/15/init.js', {
                    globalExportsName: '$_global_init',
            })
            .catch((error) => {
                Logger.write(Text.format("Error when loading '{0}' script. Details: {1}.", "init.js", error));
            })
            .then((): Promise<{}> => {

                return SPComponentLoader.loadScript(siteCollectionUrl + '/_layouts/15/MicrosoftAjax.js', {
                    globalExportsName: 'Sys'
                });

            })
            .catch((error) => {
                Logger.write(Text.format("Error when loading '{0}' script. Details: {1}.", "MicrosoftAjax.js", error));
            })
            .then((): Promise<{}> => {

                // The SP.Runtime.js file is needed in the hosted workbench environment
                // However, in a production environment, there will be an error message in the console saying the file is loaded twice
                // This is not a real issue for our purpose so we can keep these lines.
                return SPComponentLoader.loadScript(siteCollectionUrl + '/_layouts/15/SP.Runtime.js', {
                    globalExportsName: 'SP'
                });

            })
            .catch((error) => {
                Logger.write(Text.format("Error when loading '{0}' script. Details: {1}.", "SP.Runtime.js", error));
            })
            .then((): Promise<{}> => {
                return SPComponentLoader.loadScript(siteCollectionUrl + '/_layouts/15/SP.js', {
                    globalExportsName: 'SP'
                });
            })
            .catch((error) => {
                Logger.write(Text.format("Error when loading '{0}' script. Details: {1}.", "SP.js", error));
            })
            .then((): Promise<{}> => {
                return SPComponentLoader.loadScript(siteCollectionUrl + '/_layouts/15/SP.taxonomy.js', {
                    globalExportsName: 'SP'
                });
            })
            .catch((error) => {
                Logger.write(Text.format("Error when loading '{0}' script. Details: {1}.", "SP.taxonomy.js", error));
            })
            .then(() => {

                // Hack the default method to pass the correct parameters to the server (bug in SP.taxonomy.js)
                // https://www.stephensaw.me/sharepoint-sp-taxonomy-js-term-getterms-not-working/
                const getTerms: any = function (g, h, e, d, c, f) {
                    var a = this.get_context(), b;
                    b = new SP.Taxonomy.TermCollection(a, new SP.ObjectPathMethod(a, this.get_path(), "GetTerms", [g, h, e, d, c, f]));
                    return b;
                };

                SP.Taxonomy.Term.prototype.getTerms = getTerms;

                resolve();
            });
        });

        return loadScriptPromise;
    }

    /**
     * Gets multiple terms by their ids using the current taxonomy context
     * @param termIds An array of term ids to search for
     */
    public getTermsById(termIds: string[]): Promise<SP.Taxonomy.TermCollection> {

        if (termIds.length > 0) {

            const spContext = SP.ClientContext.get_current();
            const taxSession: SP.Taxonomy.TaxonomySession  = SP.Taxonomy.TaxonomySession.getTaxonomySession(spContext);
            const termStore = taxSession.getDefaultSiteCollectionTermStore();

            if (this._workingLanguageLcid) {
                termStore.set_workingLanguage(this._workingLanguageLcid);
            }

            // The namespace SP is only available here (because of the init() method)
            const terms: SP.Taxonomy.TermCollection = termStore.getTermsById(termIds.map(t => new SP.Guid(t)));

            // Additional properties can be loaded here
            spContext.load(terms, "Include(Id, Name)");

            const p = new Promise<SP.Taxonomy.TermCollection>((resolve, reject) => {

                spContext.executeQueryAsync(() => {
                    resolve(terms);

                },  (sender, args) => {
                    const errorMessage = "[TaxonomyProvider.getTermById()]: Error: " + args.get_message();
                    Logger.write(errorMessage, LogLevel.Error);
                    reject(errorMessage);
                });
            });

            return p;
        }
    }
}

export default TaxonomyService;
