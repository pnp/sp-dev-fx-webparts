import { html } from 'common-tags';
import * as Handlebars from 'handlebars';
import templateStyles from './BaseTemplateService.module.scss';
import { format } from 'date-fns';  // For date formatting
import * as _ from 'lodash';

abstract class BaseTemplateService {
    public CurrentLocale: string = "en";

    constructor() {
        // Register custom helpers
        this.registerTemplateServices();
    }

    /**
     * Gets the default Handlebars list item template used in list layout
     * @returns the template HTML markup
     */
    public static getListDefaultTemplate(): string {
        return html`
<div class="template_root">
    <div class="template_rss_list">
        {{#each items as |item|}}
            <div class="listItem">
                <div class="itemTitle">
                    <a href="{{channel/item/link}}" target="_blank">{{channel/item/title}}</a>
                </div>
                <div class="itemDate">
                    {{getDate channel/item/pubDate "MM/dd/yyyy"}}
                </div>
                <div class="itemContent">
                    {{{getShortText channel/item/description 100 true}}}
                </div>
            </div>
        {{/each}}
    </div>
</div>
        `;
    }

    /**
     * Gets the default Handlebars custom blank item template
     * @returns the template HTML markup
     */
    public static getBlankDefaultTemplate(): string {
        return `
<style>
    /* Insert your CSS here */
</style>

<div class="template_root">
    <div class="template_rss_tileList">
        <div class="ms-Grid">
            <div class="ms-Grid-row">
                {{#each items as |item|}}
                    <div class="ms-Grid-col ms-sm12 ms-md6 ms-lg6">
                        <div class="singleCard" onClick="window.location = '{{channel/item/link}}'; return false;">
                            <div class="ms-Grid">
                                <div class="ms-Grid-row">
                                    <div class="ms-Grid-col ms-sm12">
                                        <span class="primaryText"><a href="{{channel/item/link}}">{{channel/item/title}}</a></span>
                                        <span class="secondaryText">{{{getShortText channel/item/description 100 true}}}</span>
                                        <span class="dateText">{{getDate channel/item/pubDate "MM/dd/yyyy"}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                {{/each}}
            </div>

            <div class="template_resultCount">
                <label class="ms-fontWeight-normal">Total items: {{returnedItemCount}}</label>
            </div>
        </div>
    </div>
</div>
        `;
    }

    /**
     * Registers useful helpers for search results templates
     */
    private registerTemplateServices(): void {
        // Register a helper for URL field extraction
        Handlebars.registerHelper("getUrlField", (urlField: string, value: "URL" | "Title") => {
            const separatorPos = urlField.indexOf(",");
            return value === "URL" ? urlField.substring(0, separatorPos) : urlField.substring(separatorPos + 1).trim();
        });

        // Register a date formatting helper using date-fns
        Handlebars.registerHelper("getDate", (date: string, formatPattern: string) => {
            return format(new Date(date), formatPattern); // Adjusts date format using date-fns
        });

        // Register a helper for getting a substring
        Handlebars.registerHelper("getShortText", (inputString: string, maxLength: number, ignoreHtml: boolean) => {
            if (!inputString) return "";

            if (ignoreHtml) {
                const div = document.createElement("div");
                div.innerHTML = inputString;
                inputString = (div.textContent || div.innerText || "").replace(/&nbsp;/g, "").trim();
            }

            return inputString.length <= maxLength ? inputString : `${inputString.slice(0, maxLength)}...`;
        });
    }

    private registerHandlebarsHelpers():void {
        // Lodash-based helpers
        Handlebars.registerHelper('after', (arr, n) => _.after(n, arr));
        Handlebars.registerHelper('filter', (arr, predicate) => _.filter(arr, predicate));
        Handlebars.registerHelper('first', arr => _.first(arr));
        Handlebars.registerHelper('forEach', (arr, fn) => _.forEach(arr, fn));
        Handlebars.registerHelper('isArray', value => _.isArray(value));
        Handlebars.registerHelper('join', (arr, separator) => _.join(arr, separator));
        Handlebars.registerHelper('last', arr => _.last(arr));
        Handlebars.registerHelper('lengthEqual', (arr, length) => _.size(arr) === length);
        Handlebars.registerHelper('map', (arr, fn) => _.map(arr, fn));
        Handlebars.registerHelper('sort', arr => _.sortBy(arr));
        Handlebars.registerHelper('sum', arr => _.sum(arr));
        Handlebars.registerHelper('truncate', (str, length) => _.truncate(str, { length }));
        Handlebars.registerHelper('capitalize', str => _.capitalize(str));
        Handlebars.registerHelper('camelCase', str => _.camelCase(str));
        Handlebars.registerHelper('toUpper', str => _.toUpper(str));
        Handlebars.registerHelper('toLower', str => _.toLower(str));

        // Native JS-based helpers
        Handlebars.registerHelper('encodeURI', str => encodeURI(str));
        Handlebars.registerHelper('decodeURI', str => decodeURI(str));
        Handlebars.registerHelper('toFixed', (num, digits) => Number(num).toFixed(digits));

        // Custom helpers
        Handlebars.registerHelper('add', (a, b) => a + b);
        Handlebars.registerHelper('subtract', (a, b) => a - b);
        Handlebars.registerHelper('multiply', (a, b) => a * b);
        Handlebars.registerHelper('divide', (a, b) => a / b);
    }


    /**
     * Compile the specified Handlebars template with the associated context object¸
     * @returns the compiled HTML template string
     */
    public async processTemplate(templateContext: any, templateContent: string): Promise<string> {
        // Register helpers only once
        if (!Handlebars.helpers.after) this.registerHandlebarsHelpers();

        // Compile and execute template
        const template = Handlebars.compile(templateContent);
        return template(templateContext);
    }

    public static isValidTemplateFile(filePath: string): boolean {
        const path = filePath.toLowerCase().trim();
        const extension = path.substring(path.lastIndexOf('.'));
        return extension === '.htm' || extension === '.html';
    }

    public abstract getFileContent(fileUrl: string): Promise<string>;
    public abstract ensureFileResolves(fileUrl: string): Promise<void>;
}

export default BaseTemplateService;
