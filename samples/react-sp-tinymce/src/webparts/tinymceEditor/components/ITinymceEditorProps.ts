import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFieldSchema } from "../model/IFieldSchema";
import { DisplayMode } from "@microsoft/sp-core-library";

export interface ITinymceEditorProps {
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
  listId: string;
  siteUrl: string;
  listItemId:string;
  listFieldsSchema: IFieldSchema[]; 
  userId?: string;  
  context: WebPartContext;
  onContentUpdate: (content: string) => Promise<void>
  editorContent: string;
  displayMode: DisplayMode;
  
}
