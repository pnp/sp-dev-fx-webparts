import * as riot from "riot/riot+compiler";

export class Observable {
   public on(events: string, callback: Function) {}
   public one(events: string, callback: Function) {}
   public off(events: string) {}
   public trigger(eventName: string, ...args) {}

   constructor() {
      riot.observable(this);
   }
}

export interface LifeCycle
{
   mounted?(F: Function);
   unmounted?(F: Function);
   beforeMount?(F: Function);
   beforeUnmount?(F: Function);
   updating?(F: Function);
   updated?(F: Function);
}

export interface HTMLRiotElement extends HTMLElement
{
   _tag: Element;
}

export abstract class Element implements Observable, LifeCycle {
   public opts: any;
   public parent: Element;
   public root: HTMLElement;
   public tags: any;
   public tagName: string;
   public template: string;
   public isMounted: boolean;
   public element: HTMLElement;

   public update(data?: any) { }
   public unmount(keepTheParent?: boolean) { }
   public on(eventName: string,fun: Function) { }
   public one(eventName: string,fun: Function) { }
   public off(events: string) {}
   public trigger(eventName: string,...args) {}
   public mixin(mixinObject: Object|Function|string, instance?: any) {}

   protected abstract getSubComponentTypes() : any;

   public static createElement(options?:any): HTMLRiotElement {
      var tagName = (this.prototype as any).tagName;
      var el = document.createElement(tagName);
      riot.mount(el, tagName, options);
      let riotElement = el as any as HTMLRiotElement;
      return riotElement;
   }
}

// new extend, works with getters and setters
function extend(d, element) {
   var map = Object.keys(element.prototype).reduce((descriptors, key) => {
      descriptors[key] = Object.getOwnPropertyDescriptor(element.prototype, key);
      return descriptors;
   },{}) as PropertyDescriptorMap;
   Object.defineProperties(d, map);
}

export var precompiledTags: { [fileName: string]: CompilerResult } = {};

export function registerClass(element: Function) {

   function registerTag(compiledTag: CompilerResult) {

      var transformFunction = function (opts) {
        extend(this,element);         // copies prototype into "this"
        element.apply(this, [opts]);  // calls class constructor applying it on "this"

        if(element.prototype.mounted !== undefined)       this.on("mount"   , this.mounted);
        if(element.prototype.unmounted !== undefined)     this.on("unmount" , this.unmounted);
        if(element.prototype.updating !== undefined)      this.on("update"  , this.updating);
        if(element.prototype.updated !== undefined)       this.on("updated" , this.updated);
        if(element.prototype.beforeMount !== undefined)   this.on("before-mount" , this.beforeMount);
        if(element.prototype.beforeUnmount !== undefined) this.on("before-unmount" , this.beforeUnmount);
      };

      riot.tag(compiledTag.tagName, compiledTag.html, compiledTag.css, compiledTag.attribs, transformFunction, riot.settings.brackets);

      return compiledTag.tagName;
   }

   let compiled: CompilerResult;

   // gets string template
   if(element.prototype.template !== undefined) {
      const tagTemplate: string = (element.prototype.template as string).replace(/\r\n/g, '');
      compiled = riot.compile(tagTemplate, true, {entities: true})[0];
      element.prototype.tagName = registerTag(compiled);
   }
   else throw "template property not specified";
}

// @template decorator
export function template(template: string) {
  return (target: Function)  => {
    target.prototype["template"] = template;
    registerClass(target);
  };
}

export interface Router {
   (callback: Function): void;
   (filter: string, callback: Function): void;
   (to: string, title?: string): void;

   create(): Router;
   start(autoExec?: boolean): void;
   stop(): void;
   exec(): void;
   query(): any;

   base(base: string): any;
   parser(parser: (path: string)=>string, secondParser?: Function ): any;
}

export interface CompilerResult {
   tagName: string;
   html: string;
   css: string;
   attribs: string;
   js: string;
}

export interface Settings {
   brackets: string;
}