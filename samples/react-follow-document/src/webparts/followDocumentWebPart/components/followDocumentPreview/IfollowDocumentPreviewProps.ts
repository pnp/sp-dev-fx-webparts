import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IfollowDocumentPreviewProps {
  isOpen: boolean;
  url?:string;
  filename?:string;
  context: WebPartContext;
  visible?:boolean;

}