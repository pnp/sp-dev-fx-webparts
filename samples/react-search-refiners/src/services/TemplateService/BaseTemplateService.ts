import * as Handlebars from 'handlebars';
import { ISearchResult } from '../../models/ISearchResult';
import { html } from 'common-tags';
import { isEmpty } from '@microsoft/sp-lodash-subset';
import * as strings from 'SearchWebPartStrings';
import { Text } from '@microsoft/sp-core-library';
declare var System: any;

abstract class BaseTemplateService {
    private _helper = null;
    public CurrentLocale = "en";

    constructor() {
        // Registers all helpers
        this.registerTemplateServices();
    }

    public async LoadHandlebarsHelpers(load: boolean) {
        if (load) {
            let component = await System.import(
                /* webpackChunkName: 'search-handlebars-helpers' */
                'handlebars-helpers'
            );

            this._helper = component({
                handlebars: Handlebars
            });
        }
    }


    /**
     * Gets the default Handlebars list item template used in list layout
     * @returns the template HTML markup
     */
    public static getListDefaultTemplate(): string {
        return html`
        <div class="template_root">
            {{#if showResultsCount}}
                <div class="template_resultCount">
                    <label class="ms-fontWeight-semibold">{{getCountMessage totalRows keywords}}</label>
                </div>
            {{/if}}
            <ul class="ms-List template_defaultList">
                {{#each items as |item|}}
                    <li class="ms-ListItem ms-ListItem--image" tabindex="0">
                    <div class="ms-ListItem-image template_icon" style="background-image:url('{{iconSrc}}')">
                    </div>
                    <span class="ms-ListItem-primaryText"><a href="{{getUrl item}}">{{Title}}</a></span>
                    <span class="ms-ListItem-secondaryText">{{getSummary HitHighlightedSummary}}</span>
                    <span class="ms-ListItem-tertiaryText">{{getDate Created "LL"}}</span> 
                    <div class="ms-ListItem-selectionTarget"></div>
                    </li>
                {{/each}}
            </ul>
        </div>
        `;
    }

    /**
     * Gets the default Handlebars list item template used in list layout
     * @returns the template HTML markup
     */
    public static getTilesDefaultTemplate(): string {
        return html`
        <div class="template_root">
            <div class="template_defaultCard">
                {{#if showResultsCount}}
                    <div class="template_resultCount">
                        <label class="ms-fontWeight-semibold">{{getCountMessage totalRows keywords}}</label>
                    </div>
                {{/if}}
                <div class="ms-Grid"> 
                    <div class="ms-Grid-row">
                    {{#each items as |item|}}
                        <div class="ms-Grid-col ms-sm12 ms-md6 ms-lg4">
                            <div class="singleCard">
                                <div class="previewImg" style="background-image: url('{{getPreviewSrc item}}')">
                                    <img class="cardFileIcon" src="{{iconSrc}}"/>
                                </div>
                                <li class="ms-ListItem ms-ListItem--document" tabindex="0">
                                    <div class="cardInfo">
                                    <span class="ms-ListItem-primaryText"><a href="{{getUrl item}}">{{Title}}</a></span>
                                    <span class="ms-ListItem-secondaryText">{{getSummary HitHighlightedSummary}}</span>
                                    <span class="ms-ListItem-tertiaryText">{{getDate Created "LL"}}</span> 
                                    <div class="ms-ListItem-selectionTarget"></div>
                                    </div>
                                </li>
                            </div>
                        </div>
                    {{/each}}
                    </div>
                </div>
            </div>
        </div>
        `;
    }

    /**
     * Gets the default Handlebars custom blank item template
     * @returns the template HTML markup
     */
    public static getBlankDefaultTemplate(): string {
        return html`
            <style>
                /* Insert your CSS here */
            </style>
            
            <div class="template_root">
                <ul class="ms-List">
                    {{#each items as |item|}}
                        <li class="ms-ListItem ms-ListItem--image" tabindex="0">
                        <span class="ms-ListItem-primaryText"><a href="{{getUrl item}}">{{Title}}</a></span>
                        </li>
                    {{/each}}
                </ul>
            </div>
        `;
    }

    /**
     * Registers useful helpers for search results templates
     */
    private registerTemplateServices() {

        // Return the URL of the search result item
        // Usage: <a href="{{url item}}">
        Handlebars.registerHelper("getUrl", (item: ISearchResult) => {
            if (!isEmpty(item))
                return item.ServerRedirectedURL ? item.ServerRedirectedURL : item.Path;
        });

        // Return the search result count message
        // Usage: {{getCountMessage totalRows keywords}} or {{getCountMessage totalRows null}}
        Handlebars.registerHelper("getCountMessage", (totalRows: string, inputQuery?: string) => {

            const countResultMessage = inputQuery ? Text.format(strings.CountMessageLong, totalRows, inputQuery) : Text.format(strings.CountMessageShort, totalRows);
            return new Handlebars.SafeString(countResultMessage);
        });

        // Return the preview image URL for the search result item
        // Usage: <img src="{{previewSrc item}}""/>
        Handlebars.registerHelper("getPreviewSrc", (item: ISearchResult) => {

            let previewSrc = "";

            if (item) {
                if (!isEmpty(item.SiteLogo)) previewSrc = item.SiteLogo;
                else if (!isEmpty(item.PreviewUrl)) previewSrc = item.PreviewUrl;
                else if (!isEmpty(item.PictureThumbnailURL)) previewSrc = item.PictureThumbnailURL;
                else if (!isEmpty(item.ServerRedirectedPreviewURL)) previewSrc = item.ServerRedirectedPreviewURL;
            }

            return previewSrc;
        });

        // Return the highlighted summary of the search result item
        // <p>{{summary HitHighlightedSummary}}</p>
        Handlebars.registerHelper("getSummary", (hitHighlightedSummary: string) => {
            if (!isEmpty(hitHighlightedSummary)) {
                return new Handlebars.SafeString(hitHighlightedSummary.replace(/c0/g, "strong").replace(/<ddd\/>/g, "&#8230;"));
            }
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

        // Return the URL or Title part of a URL automatic managed property
        // <p>{{getDate MyLinkOWSURLH "Title"}}</p>
        Handlebars.registerHelper("getUrlField", (urlField: string, value: "URL" | "Title") => {
            let separatorPos = urlField.lastIndexOf(",");
            if (value === "URL") {
                return urlField.substr(0, separatorPos);
            }
            return urlField.substr(separatorPos + 1).trim();
        });
    }

    /**
     * Compile the specified Handlebars template with the associated context object¸
     * @returns the compiled HTML template string 
     */
    public async processTemplate(templateContext: any, templateContent: string): Promise<string> {
        // Process the Handlebars template
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