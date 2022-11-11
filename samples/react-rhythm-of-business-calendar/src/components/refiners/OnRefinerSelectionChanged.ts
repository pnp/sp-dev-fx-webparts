import { RefinerValue } from "model";

interface IChanges {
    added: readonly RefinerValue[];
    removed: readonly RefinerValue[];
}

export type OnRefinerSelectionChanged = (changes: IChanges) => void;