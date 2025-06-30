

import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFieldSchema } from "../../model/IFieldSchema";

export interface IRenderContentEditProps {
    context: WebPartContext;    
    listFieldsSchema: IFieldSchema[]; 
    onContentUpdate: (content: string) => Promise<void>;
    editorContent: string;  
    listData: any;
}