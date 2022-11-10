import { IFieldInfo } from "@pnp/sp/fields/types";

export interface IChoiceFieldInfo extends IFieldInfo {
    readonly Choices: string[];
    readonly FillInChoice: boolean;
}