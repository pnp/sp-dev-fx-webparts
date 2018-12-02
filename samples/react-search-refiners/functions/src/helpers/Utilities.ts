export class Utilities {

    /**
     * Add or replace a query string parameter
     * @param url The current URL
     * @param param The query string parameter to add or replace
     * @param value The new value
     */
    static addOrReplaceQueryStringParam(url: string, param: string, value: string): string {
        // tslint:disable-next-line:prefer-template
        const re = new RegExp('[\\?&]' + param + '=([^&#]*)');
        const match = re.exec(url);
        let delimiter;
        let newString;

        if (match === null) {
            // Append new param
            const hasQuestionMark = /\?/.test(url);
            delimiter = hasQuestionMark ? '&' : '?';
            // tslint:disable-next-line:prefer-template
            newString = url + delimiter + param + '=' + value;
        } else {
            delimiter = match[0].charAt(0);
            // tslint:disable-next-line:prefer-template
            newString = url.replace(re, delimiter + param + '=' + value);
        }

        return newString;
    }
}
