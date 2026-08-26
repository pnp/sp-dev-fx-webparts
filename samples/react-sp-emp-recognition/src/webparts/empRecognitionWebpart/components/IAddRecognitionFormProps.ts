import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IAddRecognitionFormProps {
    context: WebPartContext;
    listName: string;
    onItemAdded: () => void;
}