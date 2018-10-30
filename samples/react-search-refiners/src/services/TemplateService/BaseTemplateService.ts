import * as Handlebars from 'handlebars';
import { ISearchResult } from '../../models/ISearchResult';
import { html } from 'common-tags';
import { isEmpty, uniqBy, uniq } from '@microsoft/sp-lodash-subset';
import * as strings from 'SearchWebPartStrings';
import { Text } from '@microsoft/sp-core-library';
import 'video.js/dist/video-js.css';
import { Logger } from '@pnp/logging';
import templateStyles from './BaseTemplateService.module.scss';
import { DomHelper } from '../../helpers/DomHelper';
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
                        <div class="template_result">
                            <img class="template_icon" src="{{iconSrc}}"/>
                            <div class="template_contentContainer">
                                <span class=""><a href="{{getUrl item}}">{{Title}}</a></span>
                                <span class="">{{getSummary HitHighlightedSummary}}</span>
                                <span class=""><span>{{getDate Created "LL"}}</span></span> 
                            </div>
                        </div>
                        <div class="template_previewContainer ms-hiddenSm">
                            {{#eq item.contentclass compare='STS_ListItem_851'}}
                                <div class="video-container">
                                    <div class="img-container">
                                        <img id="preview_{{@index}}" class="img-preview  video-preview-item" src="{{PictureThumbnailURL}}" data-url="{{DefaultEncodingURL}}" data-fileext="{{FileType}}"/>
                                        <div class="hover">
                                            <div class="${templateStyles.hoverIcon}"><i class="ms-Icon ms-Icon--ImageSearch" aria-hidden="true"></i></div>
                                        </div>
                                    </div>
                                </div>
                            {{/eq}}
        
                            {{#eq item.contentclass compare='STS_ListItem_DocumentLibrary'}}
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

    private async _initVideoPreviews() {

        // Load Videos-Js on Demand 
        // Webpack will create a other bundle loaded on demand just for this library
        const videoJs = await System.import(
            /* webpackChunkName: 'videos-js' */
            'video.js',
        );

        const Video = videoJs.default;

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

                let player = Video.getPlayer(`#${playerId}`);

                // Case when the player is still registered in Video.js but does not exist in the DOM (due to page mode switch or tempalte update)
                if (player && !document.getElementById(playerId)) {

                    // In this case, we simply delete the player instance and recreate it
                    player.dispose();
                    player = Video.getPlayer(`#${playerId}`);
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
                            <video id="${playerId}" class="video-js vjs-big-play-centered">
                                <source src="${url}" type="video/${fileExtension}">
                            </video>
                        `;

                        // Build the preview HTML element
                        const previewHtml = this._getPreviewContainerElement(previewContainedId, closeBtnId, innerPreviewHtml, `${templateStyles.previewContainer} ${templateStyles.videoPreview}`);
                        const newEl = document.createElement('div');
                        newEl.innerHTML = previewHtml;
                        DomHelper.insertAfter(newEl, thumbnailElt.parentElement);

                        // Instantiate a new player with Video.js
                        const videoPlayer = new Video(playerId, {
                            controls: true,
                            autoplay: false,
                            preload: "metadata",
                            fluid: true,
                            poster: thumbnailSrc ? thumbnailSrc : null
                        });

                        document.getElementById(closeBtnId).addEventListener("click", ((ev) => {
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