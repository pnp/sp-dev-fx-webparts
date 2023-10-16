import { IPersonaProps } from "@fluentui/react";

export interface IVersionsFilter {
    StartDate?: Date;
    EndDate?: Date;
    Author?: IPersonaProps;
    VersionNumbers?: number[];
}