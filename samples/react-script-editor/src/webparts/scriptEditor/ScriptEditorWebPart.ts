import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneToggle,
    PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { IScriptEditorProps } from './components/IScriptEditorProps';
import { IScriptEditorWebPartProps } from './IScriptEditorWebPartProps';
import PropertyPaneLogo from './PropertyPaneLogo';

export default class ScriptEditorWebPart extends BaseClientSideWebPart<IScriptEditorWebPartProps> {
    public save: (script: string) => void = (script: string) => {
        this.properties.script = script;
        this.render();
    }

    public async render(): Promise<void> {
        if (this.displayMode == DisplayMode.Read) {
            if (this.properties.removePadding) {
                this.domElement.parentElement.parentElement.parentElement.style.paddingTop = "0";
                this.domElement.parentElement.parentElement.parentElement.style.paddingBottom = "0";
                this.domElement.parentElement.parentElement.parentElement.style.marginTop = "0";
                this.domElement.parentElement.parentElement.parentElement.style.marginBottom = "0";
            } else {
                this.domElement.parentElement.parentElement.parentElement.style.paddingTop = "";
                this.domElement.parentElement.parentElement.parentElement.style.paddingBottom = "";
                this.domElement.parentElement.parentElement.parentElement.style.marginTop = "";
                this.domElement.parentElement.parentElement.parentElement.style.marginBottom = "";

            }
            this.domElement.innerHTML = this.properties.script;
            this.executeScript(this.domElement);
        } else {
            // Dynamically load the editor pane to reduce overall bundle size
            const editorPopUp = await import(
                /* webpackChunkName: 'scripteditor' */
                './components/ScriptEditor'
            );
            const element: React.ReactElement<IScriptEditorProps> = React.createElement(
                editorPopUp.default,
                {
                    script: this.properties.script,
                    title: this.properties.title,
                    save: this.save
                }
            );
            ReactDom.render(element, this.domElement);
        }
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    groups: [
                        {
                            groupFields: [
                                PropertyPaneTextField("title", {
                                    label: "Title to show in edit mode",
                                    value: this.properties.title
                                }),
                                PropertyPaneToggle("removePadding", {
                                    label: "Remove top/bottom padding of web part container",
                                    checked: this.properties.removePadding,
                                    onText: "Remove padding",
                                    offText: "Keep padding"
                                }),
                                PropertyPaneToggle("spPageContextInfo", {
                                    label: "Enable classic _spPageContextInfo",
                                    checked: this.properties.spPageContextInfo,
                                    onText: "Enabled",
                                    offText: "Disabled"
                                }),
                                new PropertyPaneLogo()
                            ]
                        }
                    ]
                }
            ]
        };
    }


    private evalScript(elem) {
        const data = (elem.text || elem.textContent || elem.innerHTML || "");
        const headTag = document.getElementsByTagName("head")[0] || document.documentElement;
        const scriptTag = document.createElement("script");

        scriptTag.type = "text/javascript";
        if (elem.src && elem.src.length > 0) {
            return;
        }
        if (elem.onload && elem.onload.length > 0) {
            scriptTag.onload = elem.onload;
        }

        try {
            // doesn't work on ie...
            scriptTag.appendChild(document.createTextNode(data));
        } catch (e) {
            // IE has funky script nodes
            scriptTag.text = data;
        }

        headTag.insertBefore(scriptTag, headTag.firstChild);
        headTag.removeChild(scriptTag);
    }

    private nodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
    }


    // Finds and executes scripts in a newly added element's body.
    // Needed since innerHTML does not run scripts.
    //
    // Argument element is an element in the dom.
    private async executeScript(element: HTMLElement) {
        // Define global name to tack scripts on in case script to be loaded is not AMD/UMD

        if (this.properties.spPageContextInfo && !window["_spPageContextInfo"]) {
            window["_spPageContextInfo"] = this.context.pageContext.legacyPageContext;
        }

        (<any>window).ScriptGlobal = {};

        // main section of function
        const scripts = [];
        const children_nodes = element.childNodes;

        for (let i = 0; children_nodes[i]; i++) {
            const child: any = children_nodes[i];
            if (this.nodeName(child, "script") &&
                (!child.type || child.type.toLowerCase() === "text/javascript")) {
                scripts.push(child);
            }
        }

        const urls = [];
        const onLoads = [];
        for (let i = 0; scripts[i]; i++) {
            const scriptTag = scripts[i];
            if (scriptTag.src && scriptTag.src.length > 0) {
                urls.push(scriptTag.src);
            }
            if (scriptTag.onload && scriptTag.onload.length > 0) {
                onLoads.push(scriptTag.onload);
            }
        }

        let oldamd = null;
        if (window["define"] && window["define"].amd) {
            oldamd = window["define"].amd;
            window["define"].amd = null;
        }

        for (let i = 0; i < urls.length; i++) {
            try {
                await SPComponentLoader.loadScript(urls[i], { globalExportsName: "ScriptGlobal" });
            } catch (error) {
                console.error(error);
            }
        }
        if (oldamd) {
            window["define"].amd = oldamd;
        }

        for (let i = 0; scripts[i]; i++) {
            const scriptTag = scripts[i];
            if (scriptTag.parentNode) { scriptTag.parentNode.removeChild(scriptTag); }
            this.evalScript(scripts[i]);
        }
        // execute any onload people have added
        for (let i = 0; onLoads[i]; i++) {
            onLoads[i]();
        }
    }
}
