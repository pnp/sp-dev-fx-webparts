import { sum } from 'lodash';
import { Entity } from "../Entity";
import { User } from "../User";
import { IListItemEntity } from './ListItemEntity';

interface IState {
    ratings: number[];
    ratedBy: User[];
}

export class ListItemRating extends Entity<IState> {
    constructor(private readonly _item: IListItemEntity) {
        super(1);

        this.state.ratings = [];
        this.state.ratedBy = [];
    }

    public get id(): number {
        return this._item.id;
    }

    public get displayName(): string {
        return `${this.averageRating} stars`;
    }

    public get ratingsCount(): number {
        const { ratings } = this.state;
        return ratings.length;
    }

    public get averageRating(): number {
        const { ratings } = this.state;
        return ratings.length > 0 ? sum(ratings) / ratings.length : Number.NaN;
    }

    public get ratings(): number[] { return this.state.ratings; }
    public set ratings(val: number[]) { this.state.ratings = val; }

    public get ratedBy(): User[] { return this.state.ratedBy; }
    public set ratedBy(val: User[]) { this.state.ratedBy = val; }

    public forUser(user: User): number {
        const { ratings, ratedBy } = this.state;

        for (let i = 0; i < ratings.length; i++) {
            if (User.equal(ratedBy[i], user)) {
                return ratings[i];
            }
        }

        return Number.NaN;
    }

    public rate(user: User, rating: number) {
        const { ratings, ratedBy } = this.state;

        let rated = false;
        for (let i = 0; i < ratings.length; i++) {
            if (User.equal(ratedBy[i], user)) {
                ratings[i] = rating;
                rated = true;
            }
        }

        if (!rated) {
            ratings.push(rating);
            ratedBy.push(user);
        }
    }
}