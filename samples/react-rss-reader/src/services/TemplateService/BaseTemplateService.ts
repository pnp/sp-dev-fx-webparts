import { html } from               'common-tags';
import * as Handlebars from        'handlebars';

import                             'core-js/modules/es7.array.includes.js';
import                             'core-js/modules/es6.string.includes.js';
import                             'core-js/modules/es6.number.is-nan.js';

import templateStyles from         './BaseTemplateService.module.scss';

abstract class BaseTemplateService {
    private _helper = null;
    public CurrentLocale = "en";

    constructor() {
        // Registers all helpers
        this.registerTemplateServices();
    }

    private async LoadHandlebarsHelpers() {
        let component = await import(
            /* webpackChunkName: 'search-handlebars-helpers' */
            'handlebars-helpers'
        );
        this._helper = component({
            handlebars: Handlebars
        });
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
                    {{getDate channel/item/pubDate "MM/DD/YYYY"}}
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
                                        <span class="dateText">{{getDate channel/item/pubDate "MM/DD/YYYY"}}</span>
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
    private registerTemplateServices() {
        // Return the URL or Title part of a URL automatic managed property
        // <p>{{getUrlField MyLinkOWSURLH "Title"}}</p>
        Handlebars.registerHelper("getUrlField", (urlField: string, value: "URL" | "Title") => {
            let separatorPos = urlField.indexOf(",");
            if (value === "URL") {
                return urlField.substr(0, separatorPos);
            }
            return urlField.substr(separatorPos + 1).trim();
        });

        // Return the formatted date according to current locale using moment.js
        // <p>{{getDate Created "LL"}}</p>
        Handlebars.registerHelper("getDate", (date: string, format: string) => {
          try {
              let d = this._helper.moment(date, format, { lang: this.CurrentLocale, datejs: false });
              return d;
          } catch (error) {
              return;
          }
        });

        // Get the first maxLength characters from a string
        // <p>{{getShortText Description 100}}</p>
        Handlebars.registerHelper("getShortText", (inputString: string, maxLength: number, ignoreHtml: boolean) => {
          if (!inputString || inputString.length < 1) {
            return "";
          }

          //remove Html tags if necessary
          if (ignoreHtml) {
            let div = document.createElement("div");
            div.innerHTML = inputString;
            inputString = (div.textContent || div.innerText || "").replace(/\&nbsp;/ig, "").trim();
          }

          if (inputString.length < maxLength) {
            return inputString;
          }
          else {
            return inputString.substr(0, maxLength).trim() + "...";
          }
        });
    }

    /**
     * Compile the specified Handlebars template with the associated context object¸
     * @returns the compiled HTML template string
     */
    public async processTemplate(templateContext: any, templateContent: string): Promise<string> {
        // Process the Handlebars template
        const handlebarFunctionNames = [
            "getDate",
            "after",
            "arrayify",
            "before",
            "eachIndex",
            "filter",
            "first",
            "forEach",
            "inArray",
            "isArray",
            "itemAt",
            "join",
            "last",
            "lengthEqual",
            "map",
            "some",
            "sort",
            "sortBy",
            "withAfter",
            "withBefore",
            "withFirst",
            "withGroup",
            "withLast",
            "withSort",
            "embed",
            "gist",
            "jsfiddle",
            "isEmpty",
            "iterate",
            "length",
            "and",
            "compare",
            "contains",
            "gt",
            "gte",
            "has",
            "eq",
            "ifEven",
            "ifNth",
            "ifOdd",
            "is",
            "isnt",
            "lt",
            "lte",
            "neither",
            "or",
            "unlessEq",
            "unlessGt",
            "unlessLt",
            "unlessGteq",
            "unlessLteq",
            "moment",
            "fileSize",
            "read",
            "readdir",
            "css",
            "ellipsis",
            "js",
            "sanitize",
            "truncate",
            "ul",
            "ol",
            "thumbnailImage",
            "i18n",
            "inflect",
            "ordinalize",
            "info",
            "bold",
            "warn",
            "error",
            "debug",
            "_inspect",
            "markdown",
            "md",
            "mm",
            "match",
            "isMatch",
            "add",
            "subtract",
            "divide",
            "multiply",
            "floor",
            "ceil",
            "round",
            "sum",
            "avg",
            "default",
            "option",
            "noop",
            "withHash",
            "addCommas",
            "phoneNumber",
            "random",
            "toAbbr",
            "toExponential",
            "toFixed",
            "toFloat",
            "toInt",
            "toPrecision",
            "extend",
            "forIn",
            "forOwn",
            "toPath",
            "get",
            "getObject",
            "hasOwn",
            "isObject",
            "merge",
            "JSONparse",
            "parseJSON",
            "pick",
            "JSONstringify",
            "stringify",
            "absolute",
            "dirname",
            "relative",
            "basename",
            "stem",
            "extname",
            "segments",
            "camelcase",
            "capitalize",
            "capitalizeAll",
            "center",
            "chop",
            "dashcase",
            "dotcase",
            "hyphenate",
            "isString",
            "lowercase",
            "occurrences",
            "pascalcase",
            "pathcase",
            "plusify",
            "reverse",
            "replace",
            "sentence",
            "snakecase",
            "split",
            "startsWith",
            "titleize",
            "trim",
            "uppercase",
            "encodeURI",
            "decodeURI",
            "urlResolve",
            "urlParse",
            "stripQuerystring",
            "stripProtocol"
        ];

        for (let i = 0; i < handlebarFunctionNames.length; i++) {
            const element = handlebarFunctionNames[i];

            let regEx = new RegExp("{{#?.*?" + element + ".*?}}", "m");
            if (regEx.test(templateContent)) {
                await this.LoadHandlebarsHelpers();
                break;
            }
        }

        let template = Handlebars.compile(templateContent);
        let result = template(templateContext);

        return result;
    }

    /**
     * Verifies if the template fiel path is correct
     * @param filePath the file path string
     */
    public static isValidTemplateFile(filePath: string): boolean {

        let path = filePath.toLowerCase().trim();
        let pathExtension = path.substring(path.lastIndexOf('.'));
        return (pathExtension == '.htm' || pathExtension == '.html');
    }

    public abstract getFileContent(fileUrl: string): Promise<string>;

    public abstract ensureFileResolves(fileUrl: string): Promise<void>;
}

export default BaseTemplateService;

