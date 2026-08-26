import { toggleBold } from "roosterjs-content-model-api";
import { RibbonItem } from "../type/RibbonItem";

export const BoldButton: RibbonItem = {
  key: "buttonNameBold",
  type: "toggle",
  text: "Bold",
  value: "Bold",
  iconName: "TextBoldRegular",
  onClick: (editor, key) => {
    toggleBold(editor);
  },
};
