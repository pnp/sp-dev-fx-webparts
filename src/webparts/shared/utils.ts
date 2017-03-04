import * as _ from "lodash";
import { Web } from "sp-pnp-js";
require("sp-init");
require("microsoft-ajax");
require("sp-runtime");
require("sharepoint");
import DisplayProp from "./DisplayProp";

/**
 * Various utilitty functions used by the React-ProprtyBag* Webparts
 * 
 * @export
 * @class utils
 */
export default class utils {

    //http://vipulkelkar.blogspot.com/2015/09/index-web-property-bag-using-javascript.html

    /**
     * See ://http://vipulkelkar.blogspot.com/2015/09/index-web-property-bag-using-javascript.html
     * Encodes a PropertyKey so that it can be included in the Sharepoint vti_indexedpropertykeys property
     * 
     * @static
     * @param {any} propKey The unencoded Property Key
     * @returns 
     * 
     * @memberOf utils
     */
    public static EncodePropertyKey(propKey) {
        var bytes = [];
        for (var i = 0; i < propKey.length; ++i) {
            bytes.push(propKey.charCodeAt(i));
            bytes.push(0);
        }
        var b64encoded = window.btoa(String.fromCharCode.apply(null, bytes));
        return b64encoded;
    }

    /**
     * See ://http://vipulkelkar.blogspot.com/2015/09/index-web-property-bag-using-javascript.html
     * Decodes  a PropertyKey retrieved from  the Sharepoint vti_indexedpropertykeys property
     * 
     * @static
     * @param {any} propKey The encoded Property Key
     * @returns 
     * 
     * @memberOf utils
     */
    public static DecodePropertyKey(propKey) {
        const encoded = window.atob(propKey);
        let decoded = "";
        for (let x = 0; x < encoded.length; x = x + 2) {
            decoded = decoded + encoded.substr(x, 1);
        }
        return decoded;
    }
    /**
     *  Decodes all the searchable Properities recived from Sharepoint
     * 
     * @static
     * @param {string} sp The encoded Sarchable Properties String
     * @returns {Array<string>} An array of the names of all the searchable properties
     * 
     * @memberOf utils
     */
    public static decodeSearchableProps(sp: string): Array<string> {
        const searchableprops: Array<string> = [];
        if (sp) {
            const encodedPropNames = sp.split("|");
            for (const encodedPropName of encodedPropNames) {
                searchableprops.push(this.DecodePropertyKey(encodedPropName));
            }
        }
        return searchableprops;
    }
    /**
     * AllProperties- the resullsts from web.select("Title", "AllProperties").expand("AllProperties").get()
     * propertiesToSelect- The properties you waant to select out of AllProperties
     * searchableProperties-- and araay of properties which are known to be searchjable
     * 
     */
    /**
     *  Extracts a Array of DisplayProp's from AllProperties  
     * 
     * @static
     * @param {*} AllProperties 
     * @param {Array<string>} propertiesToSelect The Properties to Select from AllProperties
     * @param {Array<string>} searchableProperties An Array of Searchable Properties. These will be marked as seartchable in the results
     * @param {boolean} [addMissingProps] Indicates if the method should add a empty property if it is in propertiesToSelect but not in AllProperties
     * @returns {Array<DisplayProp>} 
     * 
     * @memberOf utils
     */
    public static SelectProperties(AllProperties: any, propertiesToSelect: Array<string>, searchableProperties: Array<string>, addMissingProps?: boolean): Array<DisplayProp> {
        const DisplayProps: Array<DisplayProp> = [];
        for (const propToSelect of propertiesToSelect) {
            const displayProp: DisplayProp = new DisplayProp(propToSelect);

            displayProp.value = AllProperties[propToSelect];
            if (_.find(searchableProperties, sp => { return sp === propToSelect; })) {

                displayProp.searchable = true;
            }
            else {
                displayProp.searchable = false;
            }
            DisplayProps.push(displayProp);
        }

        return DisplayProps;

    }

    /**
     * Saves a Property into the SharePoint PropertyBag
     * 
     * @static
     * @param {string} name  The name of the property to set 
     * @param {string} value  The value to set
     * @param {string} siteUrl The SPSite to set it in
     * @returns 
     * 
     * @memberOf utils
     */
    public static setSPProperty(name: string, value: string, siteUrl: string) { 
        return new Promise((resolve, reject) => {
            let webProps;
            const clientContext = new SP.ClientContext(siteUrl);
            const web = clientContext.get_web();
            webProps = web.get_allProperties();
            webProps.set_item(name, value);
            web.update();
            webProps = web.get_allProperties();
            clientContext.load(web);
            clientContext.load(webProps);
            clientContext.executeQueryAsync(
                (sender, args) => { resolve(); },
                (sender, args) => { reject(args.get_message()); }
            );

        });
    }
    /**
     * Sets the values of the propnames parameter to be searchable in the selected site
     * 
     * @static
     * @param {string} siteUrl 
     * @param {Array<string>} propnames 
     * @returns {Promise<any>} 
     * 
     * @memberOf utils
     */
    public static saveSearchablePropertiesToSharePoint(siteUrl: string, propnames: Array<string>): Promise<any> {
        const encodedPropNames: Array<string> = [];
        for (const propname of propnames) {
            if (propname != "") {
                encodedPropNames.push(this.EncodePropertyKey(propname));
            }
        }

        return this.setSPProperty("vti_indexedpropertykeys", encodedPropNames.join("|") + "|", siteUrl);//need the pipe at the end too?
    }
    /**
     * Forces a full crawl of a site by incrementing the vti_searchversion property
     * 
     * @static
     * @param {string} siteUrl The site to force a full crawl on
     * @returns {Promise<any>} 
     * 
     * @memberOf utils
     */
    public static forceCrawl(siteUrl: string): Promise<any> {
        const web = new Web(siteUrl);

        return web.select("Title", "AllProperties").expand("AllProperties").get().then(r => {
            let version: number = r.AllProperties["vti_x005f_searchversion"];
            if (version) {
                version++;
                this.setSPProperty("AllProperties", version.toString(), siteUrl);
            }
        });
    }

    /**
     * Adds the siteTemplates as filter parameters to queryText
     * 
     * @static
     * @param {Array<string>} siteTemplates  The Site templates to be included
     * @param {string} querytext  The queryText to add the filter to
     * @returns {string}  The new queryText with the filter included
     * 
     * @memberOf utils
     */
    public static addSiteTemplatesToSearchQuery(siteTemplates: Array<string>, querytext: string): string {
        let newQueryText = querytext.valueOf();
        if (siteTemplates.length > 0 && siteTemplates[0] !== "") {
            newQueryText += " AND (";
            for (const siteTemplate of siteTemplates) {
                const siteTemplateParts = siteTemplate.split("#");
                if (!siteTemplateParts[1]) {
                    newQueryText += "SiteTemplate=" + siteTemplateParts[0];
                }
                else {
                    newQueryText += "(SiteTemplate=" + siteTemplateParts[0] + " AND SiteTemplateId=" + siteTemplateParts[1] + ")";
                }
                if (siteTemplates.indexOf(siteTemplate) !== siteTemplates.length - 1) {
                    newQueryText += " OR ";
                }
            }
            newQueryText += " )";
        }
        return newQueryText;
    }
    /**
     *  Adds filters to the querytext. Filters are OR'd together
     * 
     * @static
     * @param {Array<string>} filters The filters to add (in the form ManagedPropertyName=Value)
     * @param {string} querytext 
     * @returns {string} 
     * 
     * @memberOf utils
     */
    public static addFiltersToSearchQuery(filters: Array<string>, querytext: string): string {
        let newQueryText = querytext.valueOf();
        if (filters.length > 0 && filters[0] !== "") {
            newQueryText += " AND ( ";
            for (const filter of filters) {
                newQueryText += " " + filter + " ";
                if (filters.indexOf(filter) !== filters.length - 1) {
                    newQueryText += " OR ";
                }
            }
            newQueryText += " )";
        }
        return newQueryText;
    }
    /**
     *  Parses a string that is returned from an SPFX Multiline Input Paramater inito an array of strings,
     * removinng blank entries
     * 
     * 
     * @static
     * @param {string} value The value from the SPFX Multiline Input Paramater
     * @returns {Array<string>} 
     * 
     * @memberOf utils
     */
    
    public static parseMultilineTextToArray(value: string): Array<string> {
        if (!value) {
            return [];
        }
        return value.split('\n').filter(val => { return val.trim() != ""; });
    }
}
