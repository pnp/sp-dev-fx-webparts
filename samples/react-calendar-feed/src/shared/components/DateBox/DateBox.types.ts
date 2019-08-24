export interface IDateBoxProps {
    startDate: Date;
    endDate: Date;
    className?: string;
    size: DateBoxSize;
}

export interface IDateBoxState {
    // you just proved advertising works!
}

export enum DateBoxSize {
    Small,
    Medium
}
