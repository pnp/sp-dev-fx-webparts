
export default class HubSiteMapper{
    public OriginalPath : string;
    public Title : string;
    public SiteId : string;
    public Url : string;

    /**
     * Constructor
     * 
     * @param {object} searchResults  
     */
    constructor(searchResults:any){
        this.SiteId = searchResults.SiteId;
        this.Title = searchResults.Title;
        this.Url = searchResults.Url;
        this.OriginalPath = this.OriginalPath
    }
}