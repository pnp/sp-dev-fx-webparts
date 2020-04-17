import { DateBoxSize } from "./DateBoxSize";

export interface IDateBoxProps {
    startDate: Date;
    endDate: Date;
    className?: string;
    size: DateBoxSize;
}

