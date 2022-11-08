import { WebPartContext } from "@microsoft/sp-webpart-base";
import { FollowDocument } from '../../models/followDocument';
export interface IfollowDocumentSendMessageProps {
    close: () => void;
    url: string;
    context: WebPartContext;
    fileInfo: FollowDocument;
}