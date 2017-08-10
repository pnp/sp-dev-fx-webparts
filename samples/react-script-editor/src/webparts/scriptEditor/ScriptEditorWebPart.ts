import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { SPComponentLoader } from '@microsoft/sp-loader';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneCustomField
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
        save: this.save
      }
    );

    if (this.displayMode == DisplayMode.Read) {
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
        <div style="float:right"><img src="//www.puzzlepart.com/wp-content/uploads/2017/08/Pzl-LogoType-200.png" onerror="this.style.display = \'none\'";"></div>
      </div>`;
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: 'No settings to change for this web part.'
          },
          groups: [
            {
              groupFields: [
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

  // Finds and executes scripts in a newly added element's body.
  // Needed since innerHTML does not run scripts.
  //
  // Argument element is an element in the dom.
  private executeScript(element: HTMLElement) {
    // Define global name to tack scripts on in case script to be loaded is not AMD/UMD
    (<any>window).ScriptGlobal = {};

    function nodeName(elem, name) {
      return elem.nodeName && elem.nodeName.toUpperCase() === name.toUpperCase();
    }

    function evalScript(elem) {
      var data = (elem.text || elem.textContent || elem.innerHTML || ""),
        head = document.getElementsByTagName("head")[0] ||
          document.documentElement,
        script = document.createElement("script");

      script.type = "text/javascript";
      if (elem.src && elem.src.length > 0) {
        return;
      }
      if (elem.onload && elem.onload.length > 0) {
        script.onload = elem.onload;
      }

      try {
        // doesn't work on ie...
        script.appendChild(document.createTextNode(data));
      } catch (e) {
        // IE has funky script nodes
        script.text = data;
      }

      head.insertBefore(script, head.firstChild);
      head.removeChild(script);
    }

    // main section of function
    var scripts = [],
      script,
      children_nodes = element.childNodes,
      child,
      i;

    for (i = 0; children_nodes[i]; i++) {
      child = children_nodes[i];
      if (nodeName(child, "script") &&
        (!child.type || child.type.toLowerCase() === "text/javascript")) {
        scripts.push(child);
      }
    }

    const urls = [];
    const onLoads = [];
    for (i = 0; scripts[i]; i++) {
      script = scripts[i];
      if (script.src && script.src.length > 0) {
        urls.push(script.src);
      }
      if (script.onload && script.onload.length > 0) {
        onLoads.push(script.onload);
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
        for (i = 0; onLoads[i]; i++) {
          onLoads[i]();
        }
        // execute script blocks
        for (i = 0; scripts[i]; i++) {
          script = scripts[i];
          if (script.parentNode) { script.parentNode.removeChild(script); }
          evalScript(scripts[i]);
        }
      }).catch(console.error);
  };
}