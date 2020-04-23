import { IPropertyPaneAccessor } from "@microsoft/sp-webpart-base";
export interface IScriptEditorProps {
    script: string;
    title: string;
    propPaneHandle: IPropertyPaneAccessor;
}
