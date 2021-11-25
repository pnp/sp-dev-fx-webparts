import { WebPartContext } from "@microsoft/sp-webpart-base";
import { FollowDocument } from "../../models/followDocument";
export interface IfollowDocumentPreviewProps {
  isOpen: boolean;
  url?:string;
  filename?:string;
  context: WebPartContext;
  visible?:boolean;
  FollowDocument: FollowDocument;

}