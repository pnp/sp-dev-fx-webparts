/**
 * A Helper Class.
 * This helps building an easy html-structure in a fluent manner.
 */
export class HTMLDescriptionBuilder {

    private _html = "";

    /**
     * 
     * @returns the resulting HTML
     */
    public toString() {
        
        return this._html;
    }

    /**
     * Appends html to the current document
     * @param html 
     * @returns 
     */
    public add(html: string) {
        this._html += html;
        return this;
    }
    /**
     * Appends an HTML tag to the current document
     * @param tag 
     * @param value 
     * @returns 
     */
    public addTag(tag: string, value: string) {
        return this.add(`<${tag}>${value}</${tag}>`);
    }

    /**
     * Adds an h3 tag to the current document
     * @param value 
     * @returns 
     */
    public addHeadline3(value: string) {
        return this.addTag("h3", value);
    }

    /**
     * Adds an h2 tag to the current document
     * @param value 
     * @returns 
     */
    public addHeadline2(value: string) {
        return this.addTag("h2", value);
    }

    /**
     * Adds an p tag to the current document
     * @param value 
     * @returns 
     */

    public addParagraph(value: string) {
        return this.addTag("p", value);
    }

    /**
     * Iterates over all properties of an object and displays them in an HTML table
     * @returns 
     */
    public addPropertyTable(obj: any, keyPrefix = "", keyColumnTitle = "Key", valueColumnTitle = "Value") {
        return this.add(`<table>
        <tr><th>${keyColumnTitle}</th><th>${valueColumnTitle}</th></tr>    
            ${Object.keys(obj).reduce((propstring: string, prop: string) => {
            return propstring += `<tr><td>{{${keyPrefix}${prop}}}</td><td>${obj[prop]}</td></tr>\n`;
        }, "")}
        </table>`
        );

    }
}