import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneCustomField,
    PropertyPaneToggle,
    PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import ScriptEditor from './components/ScriptEditor';
import { IScriptEditorProps } from './components/IScriptEditorProps';
import { IScriptEditorWebPartProps } from './IScriptEditorWebPartProps';

export default class ScriptEditorWebPart extends BaseClientSideWebPart<IScriptEditorWebPartProps> {
    public save: (script: string) => void = (script: string) => {
        this.properties.script = script;
        this.render();
    }

    public render(): void {
        const element: React.ReactElement<IScriptEditorProps> = React.createElement(
            ScriptEditor,
            {
                script: this.properties.script,
                title: this.properties.title,
                save: this.save
            }
        );

        if (this.displayMode == DisplayMode.Read) {
            if (this.properties.removePadding) {
                this.domElement.parentElement.parentElement.parentElement.style.paddingTop = "0";
                this.domElement.parentElement.parentElement.parentElement.style.paddingBottom = "0";
            } else {
                this.domElement.parentElement.parentElement.parentElement.style.paddingTop = "";
                this.domElement.parentElement.parentElement.parentElement.style.paddingBottom = "";
            }
            this.domElement.innerHTML = this.properties.script;
            this.executeScript(this.domElement);
        } else {
            ReactDom.render(element, this.domElement);
        }
    }

    protected get dataVersion(): Version {
        return Version.parse('1.0');
    }

    protected renderLogo(domElement: HTMLElement) {
        domElement.innerHTML = `
      <div style="margin-top: 30px">
        <div style="float:right">Author: <a href="mailto:mikael.svenson@puzzlepart.com" tabindex="-1">Mikael Svenson</a></div>
        <div style="float:right"><a href="https://www.puzzlepart.com/" target="_blank"><img src="//www.puzzlepart.com/wp-content/uploads/2017/08/Pzl-LogoType-200.png" onerror="this.style.display = \'none\'";"></a></div>
      </div>`;
    }

    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
        return {
            pages: [
                {
                    groups: [
                        {
                            groupFields: [
                                PropertyPaneTextField("title",{
                                    label: "Title to show in edit mode",
                                    value: this.properties.title
                                }),
                                PropertyPaneToggle("removePadding", {
                                    label: "Remove top/bottom padding of web part container",
                                    checked: this.properties.removePadding,
                                    onText: "Remove padding",
                                    offText: "Keep padding"
                                }),
                                PropertyPaneCustomField({
                                    onRender: this.renderLogo,
                                    key: "logo"
                                })
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
    private executeScript(element: HTMLElement) {
        // Define global name to tack scripts on in case script to be loaded is not AMD/UMD
        (<any>window).ScriptGlobal = {};

        // main section of function
        const scripts = [];
        const children_nodes = element.childNodes;

        for (var i = 0; children_nodes[i]; i++) {
            const child: any = children_nodes[i];
            if (this.nodeName(child, "script") &&
                (!child.type || child.type.toLowerCase() === "text/javascript")) {
                scripts.push(child);
            }
        }

        const urls = [];
        const onLoads = [];
        for (var j = 0; scripts[j]; j++) {
            const scriptTag = scripts[j];
            if (scriptTag.src && scriptTag.src.length > 0) {
                urls.push(scriptTag.src);
            }
            if (scriptTag.onload && scriptTag.onload.length > 0) {
                onLoads.push(scriptTag.onload);
            }
        }

        // Execute promises in sequentially - https://hackernoon.com/functional-javascript-resolving-promises-sequentially-7aac18c4431e
        // Use "ScriptGlobal" as the global namein case script is AMD/UMD
        const allFuncs = urls.map(url => () => SPComponentLoader.loadScript(url, { globalExportsName: "ScriptGlobal" }));

        const promiseSerial = funcs =>
            funcs.reduce((promise, func) =>
                promise.then(result => func().then(Array.prototype.concat.bind(result))),
                Promise.resolve([]));

        // execute Promises in serial
        promiseSerial(allFuncs)
            .then(() => {
                // execute any onload people have added
                for (j = 0; onLoads[j]; j++) {
                    onLoads[j]();
                }
                // execute script blocks
                for (j = 0; scripts[j]; j++) {
                    const scriptTag = scripts[j];
                    if (scriptTag.parentNode) { scriptTag.parentNode.removeChild(scriptTag); }
                    this.evalScript(scripts[j]);
                }
            }).catch(console.error);
    }
}