import { atom, selector } from "recoil";
import { ITerm } from "../webparts/preferences/types/Component.Types";

export const tagsListAtom = atom({
  key: "tagList",
  default: [] as ITerm[],
});

export const tagSelectedSelector = selector({
  key: "tagSelected",
  get: ({ get }) => {
    const tagList = get(tagsListAtom);
    return tagList;
  },
});
