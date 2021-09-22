import { IReadonlyTheme } from '@microsoft/sp-component-base';

export interface IDateBoxProps {
    startDate: any;
    endDate: any;
    className?: string;
    size: IDateBoxSize;
    themeVariant?: IReadonlyTheme;
}

export enum IDateBoxSize {
    Small,
    Medium
}