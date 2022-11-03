import { Moment } from "moment-timezone";
import { Guid } from "@microsoft/sp-core-library";
import { User } from "../User";
import { ListItemEntity } from "./ListItemEntity";
import { ListItemRating } from "./ListItemRating";

export abstract class RateableListItemEntity<S> extends ListItemEntity<S> {
    public static RatingAscComparer<S>(a: RateableListItemEntity<S>, b: RateableListItemEntity<S>) {
        return a.rating.averageRating - b.rating.averageRating;
    }
    public static RatingDescComparer<S>(a: RateableListItemEntity<S>, b: RateableListItemEntity<S>) {
        return -RateableListItemEntity.RatingAscComparer(a, b);
    }

    constructor(author: User, editor?: User, created?: Moment, modified?: Moment, id: number = 0, uniqueId: Guid = Guid.empty, etag: number = 0) {
        super(author, editor, created, modified, id, uniqueId, etag);

        this.rating = new ListItemRating(this);
    }

    public readonly rating: ListItemRating;

    public hasChanges(): boolean {
        return super.hasChanges() || this.rating.hasChanges();
    }

    public stateVersion(): number {
        return super.stateVersion() + this.rating.stateVersion();
    }

    public snapshot() {
        super.snapshot();
        this.rating.snapshot();
    }

    public immortalize() {
        super.immortalize();
        this.rating.immortalize();
    }

    public beginLiveUpdate(isNew?: boolean): void {
        super.beginLiveUpdate(isNew);
        this.rating.beginLiveUpdate(isNew);
    }

    public endLiveUpdate(): void {
        super.endLiveUpdate();
        this.rating.endLiveUpdate();
    }
}