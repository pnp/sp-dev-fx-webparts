import * as _ from "lodash";
import DisplayProp from "./DisplayProp";
export default class Utils {
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
    public static SelectProperties(AllProperties: any, propertiesToSelect: Array<string>, searchableProperties: Array<string>): Array<DisplayProp> {
        let DisplayProps: Array<DisplayProp> = [];
        for (const prop in AllProperties) {
            const selectedProp = _.find(propertiesToSelect, p => { return p === prop; });
            if (selectedProp) {
                let displayProp: DisplayProp = new DisplayProp(selectedProp);
                displayProp.value = AllProperties[selectedProp];
                const sp = _.find(searchableProperties, sp => { return sp === prop; });
                if (sp) {
                    displayProp.searchable = true;
                }
                else {
                    displayProp.searchable = false;
                }
                DisplayProps.push(displayProp);
            }
        }
        return DisplayProps;
    }
}