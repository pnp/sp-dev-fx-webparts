import { IProperty, ILabel, IDescription } from ".";

export interface ITerm {
    id: string;
    createdDateTime: Date;
    lastModifiedDateTime: Date;
    labels: ILabel[];
    descriptions: IDescription[];
    properties: IProperty[];
}