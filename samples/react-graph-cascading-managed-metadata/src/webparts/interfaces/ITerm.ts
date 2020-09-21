import { IDescription } from "./IDescription";
import { ILabel } from "./ILabel";

export interface ITerm {
    id: string;
    createdDateTime: Date;
    lastModifiedDateTime: Date;
    labels: ILabel[];
    descriptions: IDescription[];
}