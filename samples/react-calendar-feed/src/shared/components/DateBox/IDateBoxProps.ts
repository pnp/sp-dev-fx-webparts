import { DateBoxSize } from "./DateBoxSize";
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IDateBoxProps {
    startDate: Date;
    endDate: Date;
    className?: string;
    size: DateBoxSize;
    themeVariant?: IReadonlyTheme;
}

