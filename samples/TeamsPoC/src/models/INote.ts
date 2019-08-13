import { ISPListItem } from "./ISPList";

export interface INote extends ISPListItem {
    MNMatter?: number;
    MNNoteText?: string;
}