import { ITerm } from "@pnp/sp-taxonomy";

interface ITaxonomyService {
    
    /**
     * Gets multiple terms by their ids using the current taxonomy context
     * @param termIds An array of term ids to search for
     * @return {Promise<ITerm[]>}       A promise containing the terms.
     */
    getTermsById(termIds: string[]): Promise<ITerm[]>;
}

export default ITaxonomyService;