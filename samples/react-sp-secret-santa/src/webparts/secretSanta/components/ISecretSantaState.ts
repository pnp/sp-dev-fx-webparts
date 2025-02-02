import { ISecretSantaItem } from "./ISecretSantaItem";

export interface ISecretSantaState {
    items: ISecretSantaItem[];
    loading: boolean;
    error: string ;
}
