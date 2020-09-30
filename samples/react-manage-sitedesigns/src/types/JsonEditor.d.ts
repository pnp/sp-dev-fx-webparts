declare module '@dr-kobros/react-jsoneditor' {
    import * as react from 'react';
    export default class JsonEditor extends React.PureComponent<JsonEditorProps, any> {  
    }
    export interface JsonEditorProps {
        onChange:(json:any)=>void;
        onDirty:(json:any)=>void;
        value:object;
        options:any;
        width:string;
        height:string;
      }
  }