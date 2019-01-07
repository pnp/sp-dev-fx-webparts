import 'core-js/modules/es7.array.includes.js';
import 'core-js/modules/es6.string.includes.js';
import 'core-js/modules/es6.number.is-nan.js';
import * as Handlebars from 'handlebars';
import { ISearchResult } from '../../models/ISearchResult';
import { html } from 'common-tags';
import { isEmpty, uniqBy, uniq } from '@microsoft/sp-lodash-subset';
import * as strings from 'SearchResultsWebPartStrings';
import { Text } from '@microsoft/sp-core-library';
import { Logger } from '@pnp/logging';
import templateStyles from './BaseTemplateService.module.scss';
import { DomHelper } from '../../helpers/DomHelper';
import { ISearchResultType, ResultTypeOperator } from '../../models/ISearchResultType';

abstract class BaseTemplateService {
    private _helper = null;
    private _videoJs = null;
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
        <style>
        .template_listItem {
            display:flex;
            display: -ms-flexbox;
            padding: 10px;
            justify-content: space-between;
        }

        .template_listItem img.img-preview  {
            width: 120px;
            opacity: 1;
            display: block;
            height: auto;
            transition: .5s ease;
            backface-visibility: hidden;
        }          

        .template_result {
            display: flex;    
            display: -ms-flexbox;
        }

        .template_listItem iframe, .template_listItem .video-js {
            height: 250px;
            margin: 10px;
        }

        .template_contentContainer {
            display: flex;
            width: 100%;
            display: -ms-flexbox;
            flex-direction: column;
            margin-right: 15px;
        }

        .template_previewContainer {
            align-items: center;
            display: flex;
            display: -ms-flexbox;
        }

        /* Width for the documents and videos preview */
        .videoPreview, .iframePreview {
            width: 400px;
        }

        .template_icon {
            height: 32px;
            margin-right: 15px;
        }

        .hover {
            transition: .5s ease;
            opacity: 0;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            -ms-transform: translate(-50%, -50%);
            text-align: center;
            pointer-events: none;
        }

        .img-container {
            position: relative;
        }

        .img-container:hover img {
            opacity: 0.2;
        }

        .img-container:hover .hover {
            opacity: 1;
        }

        </style>
        <div class="template_root">
            {{#if showResultsCount}}
                <div class="template_resultCount">
                    <label class="ms-fontWeight-semibold">{{getCountMessage totalRows keywords}}</label>
                </div>
            {{/if}}
            {{#if promotedResults}}
                <ul class="ms-List template_defaultList template_promotedResults">
                <li class="ms-fontWeight-semibold title">{{strings.PromotedResultsLabel}}</li>
                {{#each promotedResults as |promotedResult|}}
                    <li class="ms-ListItem-primaryText">
                        <div>
                            <i class="ms-Icon ms-Icon--MiniLink" aria-hidden="true"></i>
                        </div>
                        <div>
                            <a class="ms-font-l" href="{{Url}}">{{Title}}</a>
                            <div class="ms-font-s">{{Description}}</div>
                        </div>
                    </li>
                {{/each}}
                </ul>
            {{/if}}
            <ul class="ms-List template_defaultList">
                {{#each items as |item|}}
                    <li class="template_listItem" tabindex="0">
                        {{#> resultTypes}}
                            {{!-- The block below will be used as default item template if no result types matched --}}
                            <div class="template_result">
                                    <img class="template_icon" src="{{iconSrc}}"/>
                                    <div class="template_contentContainer">
                                        <span class=""><a href="{{getUrl item}}">{{Title}}</a></span>
                                        <span class="">{{getSummary HitHighlightedSummary}}</span>
                                        <span class=""><span>{{getDate Created "LL"}}</span></span>   
                                        <div class="${templateStyles.tags}">
                                            {{#if owstaxidmetadataalltagsinfo}}
                                                <i class="ms-Icon ms-Icon--Tag" aria-hidden="true"></i>
                                                {{#each (split owstaxidmetadataalltagsinfo ";") as |tag| }}                                                    
                                                    <a href="#owstaxidmetadataalltagsinfo:{{getLabel tag}}">{{getLabel tag}}</a>
                                                {{/each}}
                                            {{/if}}
                                        </div>
                                    </div>
                            </div>
                            <div class="template_previewContainer ms-hiddenSm">                           
                                {{#eq item.contentclass 'STS_ListItem_851'}}
                                    <div class="video-container">
                                        <div class="img-container">
                                            <img id="preview_{{@index}}" class="img-preview  video-preview-item" src="{{PictureThumbnailURL}}" data-url="{{DefaultEncodingURL}}" data-fileext="{{FileType}}"/>
                                            <div class="hover">
                                                <div class="${templateStyles.hoverIcon}"><i class="ms-Icon ms-Icon--ImageSearch" aria-hidden="true"></i></div>
                                            </div>
                                        </div>
                                    </div>
                                {{/eq}}                                
                                {{#eq item.contentclass 'STS_ListItem_DocumentLibrary'}}
                                    {{#if ServerRedirectedPreviewURL}}
                                        <div class="doc-container">
                                            <div class="img-container">
                                                <img id="preview_{{@index}}" class="img-preview document-preview-item" src="{{ServerRedirectedPreviewURL}}" data-url="{{ServerRedirectedEmbedURL}}"/>
                                                <div class="hover">
                                                    <div class="${templateStyles.hoverIcon}"><i class="ms-Icon ms-Icon--ImageSearch" aria-hidden="true"></i></div>
                                                </div>
                                            </div>
                                        </div>
                                    {{/if}}
                                {{/eq}}
                            </div>
                        {{/resultTypes}}
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
                            {{#> resultTypes}}
                                {{!-- The block below will be used as default item template if no result types matched --}}
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
                            {{/resultTypes}}
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
                        {{#> resultTypes}}
                            {{!-- The block below will be used as default item template if no result types matched --}}
                            <li class="ms-ListItem ms-ListItem--image" tabindex="0">
                                <span class="ms-ListItem-primaryText"><a href="{{getUrl item}}">{{Title}}</a></span>
                            </li>
                        {{/resultTypes}}
                    {{/each}}
                </ul>
            </div>
        `;
    }
    
    /**
     * Gets the default Handlebars result type list item
     * @returns the template HTML markup
     */
    public static getDefaultResultTypeListItem(): string {
        return html`
            <style>
                /* Insert your CSS here */
            </style>
            
            <div class="template_result">
                    <img class="template_icon" src="{{iconSrc}}"/>
                    <div class="template_contentContainer">
                        <span class=""><a href="{{getUrl item}}">{{Title}}</a></span>
                        <span class="">{{getSummary HitHighlightedSummary}}</span>
                    </div>
            </div>
        `;
    }

    /**
     * Gets the default Handlebars result type tile item
     * @returns the template HTML markup
     */
    public static getDefaultResultTypeTileItem(): string {
        return html`
            <style>
                /* Insert your CSS here */
            </style>
            
            <div class="singleCard">
                <div class="previewImg" style="background-image: url('{{getPreviewSrc item}}')">
                    <img class="cardFileIcon" src="{{iconSrc}}"/>
                </div>
                <li class="ms-ListItem ms-ListItem--document" tabindex="0">
                    <div class="cardInfo">
                        <span class="ms-ListItem-primaryText"><a href="{{getUrl item}}">{{Title}}</a></span>
                        <span class="ms-ListItem-secondaryText">{{getSummary HitHighlightedSummary}}</span>
                    </div>
                </li>
            </div>
        `;
    }

    /**
     * Gets the default Handlebars result type custom item
     * @returns the template HTML markup
     */
    public static getDefaultResultTypeCustomItem(): string {
        return html`
            <li class="ms-ListItem ms-ListItem--image" tabindex="0">
                <span class="ms-ListItem-primaryText"><a href="{{getUrl item}}">{{Title}}</a></span>
            </li>
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
                return new Handlebars.SafeString(hitHighlightedSummary.replace(/<c0\>/g, "<strong>").replace(/<\/c0\>/g, "</strong>").replace(/<ddd\/>/g, "&#8230;"));
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
        // <p>{{getUrlField MyLinkOWSURLH "Title"}}</p>
        Handlebars.registerHelper("getUrlField", (urlField: string, value: "URL" | "Title") => {
            let separatorPos = urlField.indexOf(",");
            if (value === "URL") {
                return urlField.substr(0, separatorPos);
            }
            return urlField.substr(separatorPos + 1).trim();
        });

        // Return the unique count based on an array or property of an object in the array
        // <p>{{getUniqueCount items "Title"}}</p>
        Handlebars.registerHelper("getUniqueCount", (array: any[], property: string) => {
            if (!Array.isArray(array)) return 0;
            if (array.length === 0) return 0;

            let result;
            if (property) {
                result = uniqBy(array, property);

            }
            else {
                result = uniq(array);
            }
            return result.length;
        });

        // Return the text label from amn'owstaxid_' type managed property 
        // <p>{{getLabel "L0|#045686734-5215-4aad-bed7-8c3f0dbb61fc|Document"}}</p>
        Handlebars.registerHelper("getLabel", (owsTaxIdValue: string) => {

            let termLabel = owsTaxIdValue;
            const matches = /L0\|#.+\|(.*)/.exec(owsTaxIdValue);
            if (matches) {
                termLabel = matches[1];
            }

            return termLabel;
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

            let regEx = new RegExp("{{#.*?" + element + ".*?}}", "m");
            if (regEx.test(templateContent)) {
                await this.LoadHandlebarsHelpers();
                break;
            }
        }

        let template = Handlebars.compile(templateContent);
        let result = template(templateContext);
        if (result.indexOf("-preview-item") !== -1) {
            await this._loadVideoLibrary();
        }

        return result;
    }

    /**
     * Builds and registers the result types as Handlebars partials 
     * Based on https://github.com/helpers/handlebars-helpers/ operators
     * @param resultTypes the configured result types from the property pane
     */
    public async registerResultTypes(resultTypes: ISearchResultType[]) : Promise<void> {
  
        if (resultTypes.length > 0) {
            let content = await this._buildCondition(resultTypes, resultTypes[0], 0);
            let template = Handlebars.compile(content);
            Handlebars.registerPartial('resultTypes', template);
        } else {
            Handlebars.registerPartial('resultTypes', '{{> @partial-block }}');
        }
    }

    /**
     * Builds the Handlebars nested conditions recursively to reflect the result types configuration
     * @param resultTypes the configured result types from the property pane 
     * @param currentResultType the current processed result type
     * @param currentIdx current index
     */
    private async _buildCondition(resultTypes: ISearchResultType[], currentResultType: ISearchResultType, currentIdx: number): Promise<string> {

        let conditionBlockContent;
        let templateContent = currentResultType.inlineTemplateContent;

        if (currentResultType.externalTemplateUrl) {
            templateContent = await this.getFileContent(currentResultType.externalTemplateUrl);
        }

        let handlebarsToken = currentResultType.value.match(/^\{\{(.*)\}\}$/);

        let operator = currentResultType.operator;
        let param1 = currentResultType.property;

        // Use a token or a string value
        let param2 = handlebarsToken ? handlebarsToken[1] : `"${currentResultType.value}"`;

        // Operator: "Starts With"
        if (currentResultType.operator === ResultTypeOperator.StartsWith) {
            param1 = `"${currentResultType.value}"`;
            param2 = `${currentResultType.property}`;
        }

        // Operator: "Not null"
        if (currentResultType.operator === ResultTypeOperator.NotNull) {
            param2 = null; 
        }

        const baseCondition = `{{#${operator} ${param1} ${param2 || ""}}} 
                                    ${templateContent}`;

         if (currentIdx === resultTypes.length - 1) {
            // Renders inner content set in the 'resultTypes' partial
            conditionBlockContent = "{{> @partial-block }}";
         } else {
            conditionBlockContent = await this._buildCondition(resultTypes, resultTypes[currentIdx+1], currentIdx+1);
         }
                
        return `${baseCondition}   
                {{else}} 
                    ${conditionBlockContent}
                {{/${operator}}}`;                       
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

    /**
     * Initializes the previews on search results for documents and videos. Called when a template is updated/changed
     */
    public initPreviewElements(): void {
        this._initVideoPreviews();
        this._initDocumentPreviews();
    }

    public abstract getFileContent(fileUrl: string): Promise<string>;

    public abstract ensureFileResolves(fileUrl: string): Promise<void>;

    /**
     * Gets the preview HTML element to render depending on the file type
     * @param containerId the container id
     * @param closeButtonId the close button id to be able to bind events on it
     * @param innerHtml the content to render inside the container depending the file type
     */
    private _getPreviewContainerElement(containerId: string, closeButtonId: string, innerHtml: string, containerClass: string): string {
        return `
            <div id="${containerId}" class="${containerClass} ms-bgColor-neutralLighter"}>
                <i id="${closeButtonId}" class="ms-Icon ms-Icon--ChromeClose ${templateStyles.closeBtn}" aria-hidden="true"></i>
                ${innerHtml}
            </div>
        `;
    }

    private _initDocumentPreviews() {

        const nodes = document.querySelectorAll('.document-preview-item');

        DomHelper.forEach(nodes, ((index, el) => {
            el.addEventListener("click", (event) => {
                const thumbnailElt = event.srcElement;

                // Get infos about the video to render
                const url = event.srcElement.getAttribute("data-url");

                const iframeId = `document_${event.target.id}`; // ex: 'document-preview-itemXXX';
                const previewContainedId = `${iframeId}_container`;
                let containerElt = document.getElementById(previewContainedId);

                if (containerElt) {
                    thumbnailElt.parentElement.style.display = 'none';
                    containerElt.style.display = '';
                } else {
                    if (url) {

                        thumbnailElt.parentElement.style.display = 'none';
                        const closeBtnId = `${iframeId}_closeBtn`;
                        const innerPreviewHtml = `
                            <iframe id="${iframeId}" class="iframePreview" src="${url}" frameborder="0">
                            </iframe>
                        `;

                        // Build the preview HTML element
                        const previewHtml = this._getPreviewContainerElement(previewContainedId, closeBtnId, innerPreviewHtml, `${templateStyles.previewContainer} ${templateStyles.documentPreview}`);
                        const newEl = document.createElement('div');
                        newEl.innerHTML = previewHtml;
                        DomHelper.insertAfter(newEl, thumbnailElt.parentElement);

                        document.getElementById(closeBtnId).addEventListener("click", ((_event) => {
                            thumbnailElt.parentElement.style.display = '';
                            document.getElementById(previewContainedId).style.display = 'none';
                        }).bind(containerElt, thumbnailElt));
                    } else {
                        Logger.write(`The URL of the video was empty for the document. Make sure you've included the 'ServerRedirectedEmbedURL' property in the selected properties options in the Web Part property pane`);
                    }
                }
            });
        }));
    }

    private async _loadVideoLibrary() {

        // Load Videos-Js on Demand 
        // Webpack will create a other bundle loaded on demand just for this library
        const videoJs = await import(
            /* webpackChunkName: 'videos-js' */
            './video-js',
        );
        this._videoJs = videoJs.default.getVideoJs();
    }

    private _initVideoPreviews() {
        const nodes = document.querySelectorAll('.video-preview-item');

        DomHelper.forEach(nodes, ((index, el) => {
            el.addEventListener("click", (event) => {

                const thumbnailElt = event.srcElement;

                // Get infos about the video to render
                const url = event.srcElement.getAttribute("data-url");
                const fileExtension = event.srcElement.getAttribute("data-fileext");
                const thumbnailSrc = event.srcElement.getAttribute("src");

                const playerId = `video_${event.target.id}`; // ex: 'video-preview-itemXXX';
                const previewContainedId = `${playerId}_container`;
                let containerElt = document.getElementById(previewContainedId);

                let player = this._videoJs.getPlayer(`#${playerId}`);

                // Case when the player is still registered in Video.js but does not exist in the DOM (due to page mode switch or tempalte update)
                if (player && !document.getElementById(playerId)) {

                    // In this case, we simply delete the player instance and recreate it
                    player.dispose();
                    player = this._videoJs.getPlayer(`#${playerId}`);
                }

                // Remove exiting instance if there is already a player registered with  id
                if (player) {
                    thumbnailElt.parentElement.style.display = 'none';
                    containerElt.style.display = '';
                } else {
                    if (url && fileExtension) {

                        thumbnailElt.parentElement.style.display = 'none';

                        const closeBtnId = `${playerId}_closeBtn`;

                        const innerPreviewHtml = `
                            <video id="${playerId}" class="videoPreview video-js vjs-big-play-centered">
                                <source src="${url}" type="video/${fileExtension}">
                            </video>
                        `;

                        // Build the preview HTML element
                        const previewHtml = this._getPreviewContainerElement(previewContainedId, closeBtnId, innerPreviewHtml, `${templateStyles.previewContainer} ${templateStyles.videoPreview}`);
                        const newEl = document.createElement('div');
                        newEl.innerHTML = previewHtml;
                        DomHelper.insertAfter(newEl, thumbnailElt.parentElement);

                        // Instantiate a new player with Video.js
                        const videoPlayer = new this._videoJs(playerId, {
                            controls: true,
                            autoplay: false,
                            preload: "metadata",
                            fluid: false,
                            poster: thumbnailSrc ? thumbnailSrc : null
                        });

                        document.getElementById(closeBtnId).addEventListener("click", (() => {
                            thumbnailElt.parentElement.style.display = '';
                            if (!videoPlayer.paused()) {
                                videoPlayer.pause();
                            }
                            document.getElementById(previewContainedId).style.display = 'none';
                        }).bind(videoPlayer, thumbnailElt));

                    } else {
                        Logger.write(`The URL of the video was empty for the video. Make sure you've included the 'DefaultEncodingURL' property in the selected properties options in the Web Part property pane`);
                    }
                }
            });
        }));
    }
}

export default BaseTemplateService;