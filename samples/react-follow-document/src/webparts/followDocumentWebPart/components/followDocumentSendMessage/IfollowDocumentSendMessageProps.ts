import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IfollowDocumentSendMessageProps {
    close: () => void;
    url: string;
    context: WebPartContext;
    fileInfo:any;
}