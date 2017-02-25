import * as _ from "lodash";
require("sp-init");
require("microsoft-ajax");
require("sp-runtime");
require("sharepoint");
import DisplayProp from "./DisplayProp";
export default class utils {
    //http://vipulkelkar.blogspot.com/2015/09/index-web-property-bag-using-javascript.html
    public static EncodePropertyKey(propKey) {
        var bytes = [];
        for (var i = 0; i < propKey.length; ++i) {
            bytes.push(propKey.charCodeAt(i));
            bytes.push(0);
        }
        var b64encoded = window.btoa(String.fromCharCode.apply(null, bytes));
        return b64encoded;
    }
    public static DecodePropertyKey(propKey) {
        const encoded = window.atob(propKey);
        let decoded = "";
        for (let x = 0; x < encoded.length; x = x + 2) {
            decoded = decoded + encoded.substr(x, 1);
        }
        return decoded;
    }
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
    public static SelectProperties(AllProperties: any, propertiesToSelect: Array<string>, searchableProperties: Array<string>, addMissingProps?: boolean): Array<DisplayProp> {
        // let DisplayProps: Array<DisplayProp> = [];
        // for (const prop in AllProperties) {
        //     const selectedProp = _.find(propertiesToSelect, p => { return p === prop; });
        //     if (selectedProp) {
        //         let displayProp: DisplayProp = new DisplayProp(selectedProp);
        //         displayProp.value = AllProperties[selectedProp];
        //         const sp = _.find(searchableProperties, sp => { return sp === prop; });
        //         if (sp) {
        //             displayProp.searchable = true;
        //         }
        //         else {
        //             displayProp.searchable = false;
        //         }
        //         DisplayProps.push(displayProp);
        //     }
        // }
        // return DisplayProps;
        let DisplayProps: Array<DisplayProp> = [];
        for (const propToSelect of propertiesToSelect) {
            let displayProp: DisplayProp = new DisplayProp(propToSelect);

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
    public static setSPProperty(name: string, value: string, siteUrl: string) { // SHARED CODE
        return new Promise((resolve, reject) => {
            var webProps;
            var clientContext = new SP.ClientContext(siteUrl);
            var web = clientContext.get_web();
            webProps = web.get_allProperties();
            webProps.set_item(name, value);
            web.update();
            webProps = web.get_allProperties();
            clientContext.load(web);
            clientContext.load(webProps);
            clientContext.executeQueryAsync((s, a) => { resolve(); }, (s, a) => { reject(); });

        });
    }
    public static saveSearchablePropertiesToSharePoint(siteUrl: string, propnames: Array<string>): Promise<any> {
        let encodedPropNames: Array<string> = [];
        for (const propname of propnames) {
            if (propname != "") {
                encodedPropNames.push(this.EncodePropertyKey(propname));
            }
        }
        debugger;
        return this.setSPProperty("vti_indexedpropertykeys", encodedPropNames.join("|") + "|", siteUrl);//need the pipe at the end too?
    }
}