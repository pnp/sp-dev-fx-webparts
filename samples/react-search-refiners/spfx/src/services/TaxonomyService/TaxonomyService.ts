import ITaxonomyService from                      './ITaxonomyService';
import { ITermStore, ITerms, ITermData, Session, ITerm } from "@pnp/sp-taxonomy";

class TaxonomyService implements ITaxonomyService {

    private _siteUrl: string;

    public constructor(siteUrl: string){
        this._siteUrl = siteUrl;
    }

    /**
     * Gets multiple terms by their ids using the current taxonomy context
     * @param termIds An array of term ids to search for
     */
    public async getTermsById(termIds: string[]): Promise<(ITerm & ITermData)[]> {

        if (termIds.length > 0) {

            const taxonomySession = new Session(this._siteUrl);
            taxonomySession.setup({
                sp: {
                    headers: {
                        Accept: "application/json;odata=nometadata",
                    },
                },
            });

            // Get the default termstore
            const store: ITermStore = await taxonomySession.getDefaultSiteCollectionTermStore();    
            const terms: ITerms = await store.getTermsById(...termIds);

            return await terms.select('Id','Labels').get();
        } else {
            return [];
        }
    }
}

export default TaxonomyService;
