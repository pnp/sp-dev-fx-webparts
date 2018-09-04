interface ITaxonomyService {

    /**
     * Ensure all script dependencies are loaded before using the taxonomy SharePoint CSOM functions
     * https://dev.office.com/sharepoint/docs/spfx/web-parts/guidance/connect-to-sharepoint-using-jsom
     * @return {Promise<void>}       A promise allowing you to execute your code logic.
     */
    initialize();
    
    /**
     * Gets multiple terms by their ids using the current taxonomy context
     * @param termIds An array of term ids to search for
     * @return {Promise<SP.Taxonomy.TermCollection>}       A promise containing the terms.
     */
    getTermsById(termIds: string[]): Promise<SP.Taxonomy.TermCollection>;
}

export default ITaxonomyService;