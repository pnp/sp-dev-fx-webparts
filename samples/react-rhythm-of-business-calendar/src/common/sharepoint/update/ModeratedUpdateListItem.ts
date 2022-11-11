import { ModerationStatus } from "../ModerationStatus";
import { IUpdateListItem } from "./IUpdateListItem";

export interface IModeratedUpdateListItem extends IUpdateListItem {
    OData__ModerationStatus: number;
}

export class ModeratedUpdateListItem implements IModeratedUpdateListItem {
    public readonly Title: string;
    public OData__ModerationStatus: number;

    constructor(moderationStatus: ModerationStatus) {
        this.OData__ModerationStatus = moderationStatus && moderationStatus.value;
    }
}