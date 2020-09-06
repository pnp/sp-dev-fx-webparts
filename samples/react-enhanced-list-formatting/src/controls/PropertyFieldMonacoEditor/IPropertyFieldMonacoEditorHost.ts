import { IPropertyFieldMonacoEditorPropsInternal } from './IPropertyFieldMonacoEditor';


/**
* PropertyFieldNumberHost properties interface
*/
export interface IPropertyFieldMonacoEditorHostProps extends IPropertyFieldMonacoEditorPropsInternal  {
  onChange: (targetProperty?: string, newValue?: any) => void;
}

export interface IPropertyFieldMonacoEditorHostState {
  //annotations: string[];
  editorClassName?: string;
  editorHeight?: string;
  //errorMessage?: string;
  value: string;
  fullScreen: boolean;
}
