declare module 'jsoneditor' {
    import * as react from 'react';
    export default class JSONEditor  {
        constructor(container: HTMLElement, options:JsonEditorOptions)
        get():any;
        set(value:object):any;
        destroy():any;
    }
    export interface JsonEditorOptions {
        onChange:()=>void;
      }
  }
