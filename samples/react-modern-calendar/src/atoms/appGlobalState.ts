import { IAppGlobalState } from "../models/IAppGlobalState";
import { atom } from "jotai";

export const appGlobalStateAtom = atom<IAppGlobalState>({
  refresh: false,
} as {} as IAppGlobalState);
